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
          style={{ margin: "0px", padding: "0px" }}
        >
          <motion.section
            className="content-block modal-content modal-content-scrollable"
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
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
          >
            <motion.button
              onClick={onClose}
              aria-label={t("github_stats.close")}
              className="close-button modal-close-button-alt"
            >
              ✕
            </motion.button>
            <div className="spacer-h-50"></div>
            <h2 style={{ textAlign: "center" }}>{t("github_stats.title")}</h2>
            <div className="modal-stats-container">
              {loading && (
                <p className="stat-loading">{t("github_stats.loading")}</p>
              )}
              {error && <p className="stat-error">{error}</p>}
              {stats && (
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalStars}</span>
                    <span className="stat-label">
                      {t("github_stats.stars")}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalRepos}</span>
                    <span className="stat-label">
                      {t("github_stats.repos")}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {stats.totalCommits === -1
                        ? t("github_stats.na")
                        : stats.totalCommits}
                    </span>
                    <span className="stat-label">
                      {t("github_stats.commits")}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalPRs}</span>
                    <span className="stat-label">
                      {t("github_stats.pull_requests")}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalIssues}</span>
                    <span className="stat-label">
                      {t("github_stats.issues")}
                    </span>
                  </div>
                  {(() => {
                    const total = stats.languages.reduce(
                      (s, l) => s + l.count,
                      0,
                    );
                    const colors = [
                      "var(--accent)",
                      "var(--red)",
                      "var(--fg)",
                      "#73d0ff",
                    ];
                    const langColors = stats.languages.map((l, i) => ({
                      ...l,
                      pct: (l.count / total) * 100,
                      color: colors[i % colors.length],
                    }));
                    return (
                      <>
                        <div className="stat-item" style={{ padding: "0px" }}>
                          <div className="stat-lang-bar">
                            {langColors.map((l) => (
                              <div
                                key={l.name}
                                className="stat-lang-segment"
                                style={{
                                  width: `${l.pct}%`,
                                  backgroundColor: l.color,
                                }}
                                title={`${l.name}: ${l.pct.toFixed(1)}%`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="stat-item stat-item-languages">
                          <span className="stat-label">
                            {t("github_stats.languages")}
                          </span>
                          <div className="stat-languages">
                            {langColors.map((l) => (
                              <span
                                key={l.name}
                                className="stat-language-tag"
                                style={{ backgroundColor: l.color }}
                              >
                                {l.name} ({l.count})
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
            <div className="spacer-h-150"></div>
          </motion.section>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default GitHubStats;
