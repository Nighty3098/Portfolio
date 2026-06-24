import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { getAggregatedStats, type AggregatedStats } from "../api/github";
import { useTranslate } from "../context/I18nContext";

interface GitHubStatsProps {
  show: boolean;
  onClose: () => void;
}

const handleOpenLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

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

    if (show) {
      dialog.showModal();
      gsap.set(dialog, { opacity: 0 });
      gsap.to(dialog, { opacity: 1, duration: 0.3 });
      document.body.style.overflow = "hidden";
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscKey);

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

  const total = stats?.languages.reduce((s, l) => s + l.count, 0) ?? 0;
  const colors = ["var(--accent)", "var(--red)", "var(--fg)", "#73d0ff"];
  const langColors = (stats?.languages ?? []).map((l, i) => ({
    ...l,
    pct: (l.count / total) * 100,
    color: colors[i % colors.length],
  }));

  return (
    <dialog ref={dialogRef} className="modal" onClick={handleClose}>
      <section className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleClose}
          aria-label={t("github_stats.close")}
          className="modal-close-btn"
        >
          ✕
        </button>

        <h2>{t("github_stats.title")}</h2>

        {loading && <p className="stat-loading">{t("github_stats.loading")}</p>}
        {error && <p className="stat-error">{error}</p>}

        {stats && (
          <div className="gh-stats-grid">
            <div className="gh-stat-cell">
              <span className="gh-stat-value">{stats.totalStars}</span>
              <span className="gh-stat-label">{t("github_stats.stars")}</span>
            </div>
            <div className="gh-stat-cell">
              <span className="gh-stat-value">{stats.totalRepos}</span>
              <span className="gh-stat-label">{t("github_stats.repos")}</span>
            </div>
            <div className="gh-stat-cell">
              <span className="gh-stat-value">
                {stats.totalCommits === -1
                  ? t("github_stats.na")
                  : stats.totalCommits}
              </span>
              <span className="gh-stat-label">{t("github_stats.commits")}</span>
            </div>
            <div className="gh-stat-cell">
              <span className="gh-stat-value">{stats.totalPRs}</span>
              <span className="gh-stat-label">
                {t("github_stats.pull_requests")}
              </span>
            </div>
            <div className="gh-stat-cell">
              <span className="gh-stat-value">{stats.totalIssues}</span>
              <span className="gh-stat-label">{t("github_stats.issues")}</span>
            </div>

            {langColors.length > 0 && (
              <div className="gh-stat-cell gh-stat-cell-lang">
                <div className="gh-lang-bar">
                  {langColors.map((l) => (
                    <div
                      key={l.name}
                      className="gh-lang-seg"
                      style={{
                        width: `${l.pct}%`,
                        backgroundColor: l.color,
                      }}
                      title={`${l.name}: ${l.pct.toFixed(1)}%`}
                    />
                  ))}
                </div>
                <div className="gh-lang-tags">
                  {langColors.map((l) => (
                    <span key={l.name} className="gh-lang-tag">
                      <span
                        className="gh-lang-dot"
                        style={{ backgroundColor: l.color }}
                      />
                      {l.name}
                      <span className="gh-lang-count">{l.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <button
          className="modal-link"
          onClick={() => handleOpenLink("https://github.com/Nighty3098")}
        >
          Open GitHub
        </button>
      </section>
    </dialog>
  );
};

export default GitHubStats;
