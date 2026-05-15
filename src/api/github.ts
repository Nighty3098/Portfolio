const BASE_URL = "https://api.github.com";
const CACHE_DURATION = 4 * 60 * 60 * 1000;
const CACHE_PREFIX = "github_cache_";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function cacheKey(endpoint: string): string {
  return `${CACHE_PREFIX}${endpoint}`;
}

function getCached<T>(endpoint: string): T | null {
  const raw = localStorage.getItem(cacheKey(endpoint));
  if (!raw) return null;

  const entry: CacheEntry<T> = JSON.parse(raw);
  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    localStorage.removeItem(cacheKey(endpoint));
    return null;
  }

  return entry.data;
}

function setCache<T>(endpoint: string, data: T): void {
  const entry: CacheEntry<T> = { data, timestamp: Date.now() };
  localStorage.setItem(cacheKey(endpoint), JSON.stringify(entry));
}

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  const cached = getCached<T>(endpoint);
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  const data: T = await res.json();
  setCache(endpoint, data);
  return data;
}

async function searchGitHub<T>(endpoint: string, accept?: string): Promise<T> {
  const cached = getCached<T>(endpoint);
  if (cached) return cached;

  const headers: Record<string, string> = {};
  if (accept) headers["Accept"] = accept;

  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data: T = await res.json();
  setCache(endpoint, data);
  return data;
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
  totalStars: number;
  totalRepos: number;
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  languages: { name: string; count: number }[];
}

export async function getUser(username: string) {
  return fetchGitHub<GitHubUser>(`/users/${username}`);
}

export async function getUserRepos(username: string) {
  return fetchGitHub<GitHubRepo[]>(`/users/${username}/repos?per_page=100&sort=updated`);
}

export async function getAggregatedStats(username: string): Promise<AggregatedStats> {
  const [user, repos, prSearch, issueSearch] = await Promise.all([
    getUser(username),
    getUserRepos(username),
    searchGitHub<GitHubSearchResult>(`/search/issues?q=author:${username}+type:pr`),
    searchGitHub<GitHubSearchResult>(`/search/issues?q=author:${username}+type:issue`),
  ]);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalRepos = user.public_repos;

  let totalCommits = 0;
  try {
    const commitSearch = await searchGitHub<GitHubSearchResult>(
      `/search/commits?q=author:${username}`,
      "application/vnd.github.cloak-preview",
    );
    totalCommits = commitSearch.total_count;
  } catch {
    totalCommits = -1;
  }

  const langCount: Record<string, number> = {};
  for (const r of repos) {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
  }
  const languages = Object.entries(langCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return {
    totalStars,
    totalRepos,
    totalCommits,
    totalPRs: prSearch.total_count,
    totalIssues: issueSearch.total_count,
    languages,
  };
}

export function clearGitHubCache(): void {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
}
