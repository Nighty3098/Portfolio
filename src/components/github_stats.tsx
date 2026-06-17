import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { getAggregatedStats, type AggregatedStats } from "../api/github";
import { useTranslate } from "../context/I18nContext";

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
      if (e.key === "Escape") onClose();
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
          <motion.section
<<<<<<< Updated upstream
            className="modal-content modal-content-scrollable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              margin: "0px",
              height: "100%",
              width: "calc(100% - var(--spacing-xl) - var(--spacing-xl))",
              padding: "var(--spacing-xl)",
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
=======
            className="gh-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
>>>>>>> Stashed changes
            onClick={(e) => e.stopPropagation()}
          >
<<<<<<< Updated upstream
            <motion.button
              onClick={onClose}
              aria-label={t("github_stats.close")}
              className="close-button modal-close-button-alt"
            >
              ✕
            </motion.button>
            <div className="spacer-h-50"></div>
            <h2>{t("github_stats.title")}</h2>
            <div className="modal-stats-container">
              {loading && <p className="stat-loading">{t("github_stats.loading")}</p>}
              {error && <p className="stat-error">{error}</p>}
              {stats && (
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalStars}</span>
                    <span className="stat-label">{t("github_stats.stars")}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalRepos}</span>
                    <span className="stat-label">{t("github_stats.repos")}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {stats.totalCommits === -1 ? t("github_stats.na") : stats.totalCommits}
                    </span>
                    <span className="stat-label">{t("github_stats.commits")}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalPRs}</span>
                    <span className="stat-label">{t("github_stats.pull_requests")}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalIssues}</span>
                    <span className="stat-label">{t("github_stats.issues")}</span>
                  </div>
                  <div className="stat-item stat-item-languages">
                    <span className="stat-label">{t("github_stats.languages")}</span>
                    <div className="stat-languages">
                      {stats.languages.map((l) => (
                        <span key={l.name} className="stat-language-tag">
                          {l.name} ({l.count})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="spacer-h-150"></div>
=======
            <button onClick={onClose} aria-label={t("github_stats.close")} className="gh-close">✕</button>
            <h2 className="gh-title">{t("github_stats.title")}</h2>

            {loading && <p className="gh-status">{t("github_stats.loading")}</p>}
            {error && <p className="gh-status gh-error">{error}</p>}

            {stats && (
              <div className="gh-stats">
                <div className="gh-stat">
                  <span className="gh-label">{t("github_stats.stars")}</span>
                  <span className="gh-value">{stats.totalStars}</span>
                </div>
                <div className="gh-stat">
                  <span className="gh-label">{t("github_stats.repos")}</span>
                  <span className="gh-value">{stats.totalRepos}</span>
                </div>
                <div className="gh-stat">
                  <span className="gh-label">{t("github_stats.commits")}</span>
                  <span className="gh-value">
                    {stats.totalCommits === -1 ? t("github_stats.na") : stats.totalCommits}
                  </span>
                </div>
                <div className="gh-stat">
                  <span className="gh-label">{t("github_stats.pull_requests")}</span>
                  <span className="gh-value">{stats.totalPRs}</span>
                </div>
                <div className="gh-stat">
                  <span className="gh-label">{t("github_stats.issues")}</span>
                  <span className="gh-value">{stats.totalIssues}</span>
                </div>
                <div className="gh-stat gh-stat-lang">
                  {(() => {
                    const total = stats.languages.reduce((s, l) => s + l.count, 0);
                    const colors = ["var(--accent)", "var(--red)", "var(--fg)", "#73d0ff"];
                    const langColors = stats.languages.map((l, i) => ({
                      ...l,
                      pct: (l.count / total) * 100,
                      color: colors[i % colors.length],
                    }));
                    return (
                      <>
                        <div className="gh-lang-bar">
                          {langColors.map((l) => (
                            <div
                              key={l.name}
                              className="gh-lang-seg"
                              style={{ width: `${l.pct}%`, backgroundColor: l.color }}
                              title={`${l.name}: ${l.pct.toFixed(1)}%`}
                            />
                          ))}
                        </div>
                        <div className="gh-lang-list">
                          {langColors.map((l) => (
                            <span key={l.name} className="gh-lang-tag" style={{ backgroundColor: l.color }}>
                              {l.name} ({l.count})
                            </span>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

            <a href="https://github.com/Nighty3098" target="_blank" rel="noopener noreferrer" className="gh-link">
              Open GitHub
            </a>
>>>>>>> Stashed changes
          </motion.section>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default GitHubStats;
