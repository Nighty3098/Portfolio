const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";
const GITHUB_REST_URL = "https://api.github.com";
const CACHE_PREFIX = "github_cache_";
const DEFAULT_CACHE_DURATION = 4 * 60 * 60 * 1000;
const PROJECT_STARS_CACHE_DURATION = 3 * 60 * 60 * 1000;

// Project cards mount at the same time and all ask for the same star map.
// Keep one in-flight request per user instead of firing one per card.
const repoStarsRequests = new Map<
  string,
  Promise<Record<string, number>>
>();

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function cacheKey(key: string): string {
  return `${CACHE_PREFIX}${key}`;
}

function getCached<T>(key: string, maxAge = DEFAULT_CACHE_DURATION): T | null {
  const raw = localStorage.getItem(cacheKey(key));
  if (!raw) return null;

  try {
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > maxAge) {
      localStorage.removeItem(cacheKey(key));
      return null;
    }
    return entry.data;
  } catch {
    localStorage.removeItem(cacheKey(key));
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  const entry: CacheEntry<T> = { data, timestamp: Date.now() };
  localStorage.setItem(cacheKey(key), JSON.stringify(entry));
}

class GitHubApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
  }
}

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown>,
  key: string,
  maxAge = DEFAULT_CACHE_DURATION,
): Promise<T> {
  const cached = getCached<T>(key, maxAge);
  if (cached) return cached;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new GitHubApiError(`GitHub GraphQL error: ${res.status} ${res.statusText}`, res.status);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new GitHubApiError(json.errors[0]?.message || "GitHub GraphQL error");
  }

  const data = json.data as T;
  setCache(key, data);
  return data;
}

async function fetchRest<T>(
  path: string,
  key: string,
  maxAge = DEFAULT_CACHE_DURATION,
  headers?: Record<string, string>,
): Promise<T> {
  const cached = getCached<T>(key, maxAge);
  if (cached) return cached;

  const res = await fetch(`${GITHUB_REST_URL}${path}`, { headers });
  if (!res.ok) {
    throw new GitHubApiError(`GitHub REST error: ${res.status} ${res.statusText}`, res.status);
  }
  const data = (await res.json()) as T;
  setCache(key, data);
  return data;
}

function shouldFallbackToRest(err: unknown): boolean {
  if (err instanceof GitHubApiError) {
    if (err.status === 401 || err.status === 403 || err.status === 429) return true;
    // GraphQL can return 200 with errors (e.g. auth/rate-limit); fallback to REST for public data.
    if (!err.status) return true;
  }
  return false;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export interface GitHubSearchResult {
  total_count: number;
}

export interface AggregatedStats {
  totalFollowers: number;
  totalStars: number;
  totalRepos: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  languages: { name: string; count: number }[];
}

const USER_QUERY = `
  query User($login: String!) {
    user(login: $login) {
      login
      avatarUrl
      url
      name
      bio
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(ownerAffiliations: OWNER) {
        totalCount
      }
    }
  }
`;

const USER_REPOS_QUERY = `
  query UserRepos($login: String!, $first: Int!, $after: String) {
    user(login: $login) {
      repositories(
        first: $first
        after: $after
        ownerAffiliations: OWNER
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          databaseId
          name
          description
          url
          primaryLanguage {
            name
          }
          stargazerCount
          forkCount
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

const AGGREGATED_STATS_QUERY = `
  query AggregatedStats($login: String!, $prQuery: String!, $issueQuery: String!) {
    user(login: $login) {
      followers {
        totalCount
      }
      repositories(ownerAffiliations: OWNER) {
        totalCount
      }
      reposForStats: repositories(
        first: 100
        ownerAffiliations: OWNER
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        nodes {
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        restrictedContributionsCount
      }
    }
    prs: search(query: $prQuery, type: ISSUE) {
      issueCount
    }
    issues: search(query: $issueQuery, type: ISSUE) {
      issueCount
    }
  }
`;

const REPO_STARS_QUERY = `
  query Stars($login: String!, $first: Int!, $after: String) {
    user(login: $login) {
      login
      repositories(
        first: $first
        after: $after
        ownerAffiliations: OWNER
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          nameWithOwner
          stargazerCount
        }
      }
    }
  }
`;

export async function getUser(username: string): Promise<GitHubUser> {
  type Resp = {
    user: {
      login: string;
      avatarUrl: string;
      url: string;
      name: string | null;
      bio: string | null;
      followers: { totalCount: number };
      following: { totalCount: number };
      repositories: { totalCount: number };
    } | null;
  };

  try {
    const data = await fetchGraphQL<Resp>(USER_QUERY, { login: username }, `user:${username}`);
    if (!data.user) throw new Error("GitHub user not found");

    return {
      login: data.user.login,
      avatar_url: data.user.avatarUrl,
      html_url: data.user.url,
      name: data.user.name ?? "",
      bio: data.user.bio ?? "",
      public_repos: data.user.repositories.totalCount,
      followers: data.user.followers.totalCount,
      following: data.user.following.totalCount,
    };
  } catch (err) {
    if (!shouldFallbackToRest(err)) throw err;
    const u = await fetchRest<any>(`/users/${username}`, `user:rest:${username}`);
    return {
      login: u.login,
      avatar_url: u.avatar_url,
      html_url: u.html_url,
      name: u.name ?? "",
      bio: u.bio ?? "",
      public_repos: u.public_repos ?? 0,
      followers: u.followers ?? 0,
      following: u.following ?? 0,
    };
  }
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  type RepoNode = {
    databaseId: number | null;
    name: string;
    description: string | null;
    url: string;
    primaryLanguage: { name: string } | null;
    stargazerCount: number;
    forkCount: number;
  };
  type Resp = {
    user: {
      repositories: {
        nodes: RepoNode[];
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
      };
    } | null;
  };

  try {
    const all: GitHubRepo[] = [];
    let after: string | null = null;
    let hasNextPage = true;

    while (hasNextPage && all.length < 100) {
      const pageKey = `repos:${username}:${after ?? "first"}`;
      const data: Resp = await fetchGraphQL<Resp>(
        USER_REPOS_QUERY,
        { login: username, first: 100, after },
        pageKey,
      );
      if (!data.user) break;

      const nodes = data.user.repositories.nodes || [];
      for (const n of nodes) {
        all.push({
          id: n.databaseId ?? 0,
          name: n.name,
          description: n.description ?? "",
          html_url: n.url,
          language: n.primaryLanguage?.name ?? "",
          stargazers_count: n.stargazerCount,
          forks_count: n.forkCount,
        });
      }

      hasNextPage = data.user.repositories.pageInfo.hasNextPage;
      after = data.user.repositories.pageInfo.endCursor;
      if (nodes.length === 0) break;
    }

    return all;
  } catch (err) {
    if (!shouldFallbackToRest(err)) throw err;
    const repos = await fetchRest<any[]>(
      `/users/${username}/repos?per_page=100&sort=updated`,
      `repos:rest:${username}`,
    );
    return (repos || []).map((r) => ({
      id: r.id ?? 0,
      name: r.name ?? "",
      description: r.description ?? "",
      html_url: r.html_url ?? "",
      language: r.language ?? "",
      stargazers_count: r.stargazers_count ?? 0,
      forks_count: r.forks_count ?? 0,
    }));
  }
}

export async function getAggregatedStats(username: string): Promise<AggregatedStats> {
  type Resp = {
    user: {
      followers: { totalCount: number };
      repositories: { totalCount: number };
      reposForStats: {
        nodes: Array<{
          stargazerCount: number;
          primaryLanguage: { name: string } | null;
        }>;
      };
      contributionsCollection: {
        totalCommitContributions: number;
        restrictedContributionsCount: number;
      };
    } | null;
    prs: { issueCount: number };
    issues: { issueCount: number };
  };

  try {
    const data = await fetchGraphQL<Resp>(
      AGGREGATED_STATS_QUERY,
      {
        login: username,
        prQuery: `author:${username} type:pr`,
        issueQuery: `author:${username} type:issue`,
      },
      `stats:${username}`,
    );

    if (!data.user) throw new Error("GitHub user not found");

    const repos = data.user.reposForStats.nodes || [];
    const totalStars = repos.reduce((sum, r) => sum + r.stargazerCount, 0);

    const langCount: Record<string, number> = {};
    for (const r of repos) {
      const lang = r.primaryLanguage?.name;
      if (lang) langCount[lang] = (langCount[lang] || 0) + 1;
    }
    const languages = Object.entries(langCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const commits =
      (data.user.contributionsCollection?.totalCommitContributions ?? 0) +
      (data.user.contributionsCollection?.restrictedContributionsCount ?? 0);

    return {
      totalFollowers: data.user.followers.totalCount,
      totalStars,
      totalRepos: data.user.repositories.totalCount,
      totalCommits: commits,
      totalPRs: data.prs?.issueCount ?? 0,
      totalIssues: data.issues?.issueCount ?? 0,
      languages,
    };
  } catch (err) {
    if (!shouldFallbackToRest(err)) throw err;
    const [user, repos, prSearch, issueSearch] = await Promise.all([
      getUser(username),
      getUserRepos(username),
      fetchRest<{ total_count: number }>(`/search/issues?q=author:${username}+type:pr`, `stats:rest:pr:${username}`),
      fetchRest<{ total_count: number }>(`/search/issues?q=author:${username}+type:issue`, `stats:rest:issue:${username}`),
    ]);
    let totalCommits = -1;
    try {
      const commitSearch = await fetchRest<{ total_count: number }>(
        `/search/commits?q=author:${username}`,
        `stats:rest:commits:${username}`,
        DEFAULT_CACHE_DURATION,
        { Accept: "application/vnd.github.cloak-preview" },
      );
      totalCommits = commitSearch.total_count ?? -1;
    } catch {
      totalCommits = -1;
    }
    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const langCount: Record<string, number> = {};
    for (const r of repos) {
      if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
    const languages = Object.entries(langCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    return {
      totalFollowers: user.followers,
      totalStars,
      totalRepos: user.public_repos,
      totalCommits,
      totalPRs: prSearch.total_count ?? 0,
      totalIssues: issueSearch.total_count ?? 0,
      languages,
    };
  }
}

function normalizeRepoNameFromSource(source: string): string | null {
  if (!source) return null;
  const trimmed = source.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (!/github\.com$/i.test(url.hostname)) return null;
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return `${parts[0]}/${parts[1]}`.toLowerCase();
  } catch {
    return null;
  }
}

async function loadAllRepoStarsMap(
  cacheId: string,
  username: string,
): Promise<Record<string, number>> {
  try {
    type Resp = {
      user: {
        repositories: {
          pageInfo: { hasNextPage: boolean; endCursor: string | null };
          nodes: Array<{ nameWithOwner: string; stargazerCount: number }>;
        };
      } | null;
    };

    const starMap: Record<string, number> = {};
    let after: string | null = null;
    let hasNextPage = true;

    while (hasNextPage) {
      const pageKey = `${cacheId}:page:${after ?? "first"}`;
      const data: Resp = await fetchGraphQL<Resp>(
        REPO_STARS_QUERY,
        { login: username, first: 100, after },
        pageKey,
        PROJECT_STARS_CACHE_DURATION,
      );
      if (!data.user) break;

      for (const node of data.user.repositories.nodes || []) {
        starMap[node.nameWithOwner.toLowerCase()] = node.stargazerCount;
      }

      hasNextPage = data.user.repositories.pageInfo.hasNextPage;
      after = data.user.repositories.pageInfo.endCursor;
    }

    setCache(cacheId, starMap);
    return starMap;
  } catch (err) {
    if (!shouldFallbackToRest(err)) throw err;

    const starMap: Record<string, number> = {};
    let page = 1;
    while (page <= 10) {
      const repos = await fetchRest<any[]>(
        `/users/${username}/repos?per_page=100&type=owner&sort=updated&page=${page}`,
        `${cacheId}:rest:${page}`,
        PROJECT_STARS_CACHE_DURATION,
      );
      if (!Array.isArray(repos) || repos.length === 0) break;
      for (const r of repos) {
        const full = (r.full_name || `${username}/${r.name || ""}`).toLowerCase();
        starMap[full] = r.stargazers_count ?? 0;
      }
      if (repos.length < 100) break;
      page += 1;
    }

    setCache(cacheId, starMap);
    return starMap;
  }
}

async function getAllRepoStarsMap(
  username: string,
): Promise<Record<string, number>> {
  const cacheId = `project-stars-v2:${username}`;
  const cached = getCached<Record<string, number>>(
    cacheId,
    PROJECT_STARS_CACHE_DURATION,
  );
  if (cached) return cached;

  const existing = repoStarsRequests.get(cacheId);
  if (existing) return existing;

  const request = loadAllRepoStarsMap(cacheId, username);
  repoStarsRequests.set(cacheId, request);

  try {
    return await request;
  } finally {
    repoStarsRequests.delete(cacheId);
  }
}

export async function getRepoStarsBySources(
  sources: string[],
  username = "Nighty3098",
): Promise<Record<string, number>> {
  const starMap = await getAllRepoStarsMap(username);
  const result: Record<string, number> = {};
  for (const source of sources) {
    const repo = normalizeRepoNameFromSource(source);
    if (!repo) continue;
    const stars = starMap[repo];
    if (typeof stars === "number" && stars > 0) {
      result[repo] = stars;
    }
  }
  return result;
}

export function clearGitHubCache(): void {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
}
