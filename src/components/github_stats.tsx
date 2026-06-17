import gsap from "gsap";
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
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

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
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    gsap.set(dialog, { opacity: 0 });
    gsap.to(dialog, { opacity: 1, duration: 0.3 });

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    gsap.to(dialog, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        onCloseRef.current();
      },
    });
  };

  if (!show) return null;

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={handleClose}
    >
      <section
        className="gh-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} aria-label={t("github_stats.close")} className="gh-close">✕</button>
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
      </section>
    </dialog>
  );
};

export default GitHubStats;
