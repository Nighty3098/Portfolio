import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { getAggregatedStats, type AggregatedStats } from "../api/github";
import { useTranslate } from "../context/I18nContext";

const LANG_COLORS: Record<string, string> = {
  Python: "#88ccca",
  "C++": "#c792ea",
  C: "#546e7a",
  TypeScript: "#82aaff",
  JavaScript: "#c3e88d",
  Rust: "#f78c6c",
  Go: "#80cbc4",
  Java: "#ffcb6b",
  HTML: "#f07178",
  CSS: "#c792ea",
  Shell: "#89ddff",
  Ruby: "#f07178",
  PHP: "#82aaff",
  Swift: "#f78c6c",
  Kotlin: "#c792ea",
  Dart: "#80cbc4",
  Lua: "#546e7a",
  Haskell: "#82aaff",
  Scala: "#f07178",
  Elixir: "#c792ea",
  Clojure: "#89ddff",
};

function langColor(name: string): string {
  return LANG_COLORS[name] || "#88ccca";
}

interface GitHubStatsProps {
  show: boolean;
  onClose: () => void;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ show, onClose }) => {
  const { t } = useTranslate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [stats, setStats] = useState<AggregatedStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (show && !stats && !loading) {
      setLoading(true);
      setError("");
      getAggregatedStats("Nighty3098")
        .then(setStats)
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, [show, stats, loading]);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      dialogRef.current?.showModal();
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.dialog
          ref={dialogRef}
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="gh-stats"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label={t("github_stats.close")}
              className="gh-stats-close"
            >
              ✕
            </button>

            <div className="gh-stats-header">
              <svg className="gh-stats-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <h2 className="gh-stats-title">{t("github_stats.title")}</h2>
              <span className="gh-stats-username">Nighty3098</span>
            </div>

            <div className="gh-stats-body">
              {loading && (
                <div className="gh-stats-loading">
                  <div className="gh-spinner" />
                  <span>{t("github_stats.loading")}</span>
                </div>
              )}
              {error && <p className="gh-stats-error">{error}</p>}
              {stats && (
                <>
                  <div className="gh-stats-grid">
                    <div className="gh-stat-card">
                      <span className="gh-stat-value">{stats.totalStars}</span>
                      <span className="gh-stat-label">{t("github_stats.stars")}</span>
                    </div>
                    <div className="gh-stat-card">
                      <span className="gh-stat-value">{stats.totalRepos}</span>
                      <span className="gh-stat-label">{t("github_stats.repos")}</span>
                    </div>
                    <div className="gh-stat-card">
                      <span className="gh-stat-value">
                        {stats.totalCommits === -1 ? t("github_stats.na") : stats.totalCommits}
                      </span>
                      <span className="gh-stat-label">{t("github_stats.commits")}</span>
                    </div>
                    <div className="gh-stat-card">
                      <span className="gh-stat-value">{stats.totalPRs}</span>
                      <span className="gh-stat-label">{t("github_stats.pull_requests")}</span>
                    </div>
                    <div className="gh-stat-card">
                      <span className="gh-stat-value">{stats.totalIssues}</span>
                      <span className="gh-stat-label">{t("github_stats.issues")}</span>
                    </div>
                  </div>

                  {stats.languages.length > 0 && (
                    <div className="gh-languages">
                      <span className="gh-languages-label">{t("github_stats.languages")}</span>
                      <div className="gh-languages-bar">
                        {stats.languages.map((l) => (
                          <span
                            key={l.name}
                            className="gh-lang-block"
                            style={{ flex: l.count, backgroundColor: langColor(l.name) }}
                            title={`${l.name}`}
                          />
                        ))}
                      </div>
                      <div className="gh-languages-list">
                        {stats.languages.map((l) => (
                          <span key={l.name} className="gh-lang-tag">
                            <span
                              className="gh-lang-dot"
                              style={{ backgroundColor: langColor(l.name) }}
                            />
                            {l.name}
                            <span className="gh-lang-count">{l.count}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default GitHubStats;
