import React, { useEffect, useState } from "react";
import { getAggregatedStats, type AggregatedStats } from "../api/github";
import { useTranslate } from "../context/I18nContext";

const GitHubStatsTable: React.FC = () => {
  const { t } = useTranslate();
  const [stats, setStats] = useState<AggregatedStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!stats && !loading) {
      setLoading(true);
      setError("");
      getAggregatedStats("Nighty3098")
        .then(setStats)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [stats, loading]);

  if (loading) return <p className="stat-loading">{t("github_stats.loading")}</p>;
  if (error) return <p className="stat-error">{error}</p>;
  if (!stats) return null;

  const cards = [
    { value: stats.totalFollowers, label: t("github_stats.followers") },
    { value: stats.totalStars, label: t("github_stats.stars") },
    { value: stats.totalRepos, label: t("github_stats.repos") },
    {
      value: stats.totalCommits === -1 ? t("github_stats.na") : stats.totalCommits,
      label: t("github_stats.commits"),
    },
    { value: stats.totalPRs, label: t("github_stats.pull_requests") },
    { value: stats.totalIssues, label: t("github_stats.issues") },
  ];

  return (
    <div className="gh-cards-wrap">
      <div className="gh-cards-grid">
        {cards.map((c) => (
          <div key={c.label} className="gh-card">
            <span className="gh-card-value">{c.value}</span>
            <span className="gh-card-label">{c.label}</span>
          </div>
        ))}
      </div>
      <a
        href="https://github.com/Nighty3098"
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        Open GitHub
      </a>
    </div>
  );
};

export default GitHubStatsTable;
