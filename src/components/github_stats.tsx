import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { getAggregatedStats, type AggregatedStats } from "../api/github";

interface GitHubStatsProps {
  show: boolean;
  onClose: () => void;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ show, onClose }) => {
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
              aria-label="Close"
              className="close-button modal-close-button-alt"
            >
              ✕
            </motion.button>
            <div className="spacer-h-50"></div>
            <h2>GitHub Stats</h2>
            <div className="modal-stats-container">
              {loading && <p className="stat-loading">Loading...</p>}
              {error && <p className="stat-error">{error}</p>}
              {stats && (
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalStars}</span>
                    <span className="stat-label">Total Stars</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalRepos}</span>
                    <span className="stat-label">Repositories</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">
                      {stats.totalCommits === -1 ? "N/A" : stats.totalCommits}
                    </span>
                    <span className="stat-label">Commits</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalPRs}</span>
                    <span className="stat-label">Pull Requests</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{stats.totalIssues}</span>
                    <span className="stat-label">Issues</span>
                  </div>
                  <div className="stat-item stat-item-languages">
                    <span className="stat-label">Languages</span>
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
          </motion.section>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

export default GitHubStats;
