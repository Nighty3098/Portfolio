import { motion } from "framer-motion";
import { useState } from "react";
import GitHubStats from "./github_stats";
import { useTranslate } from "../context/I18nContext";

const items = [
  {
    labelKey: "nav.projects" as const,
    sectionId: "projects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    labelKey: "nav.contacts" as const,
    sectionId: "my-contacts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 4l10 8 10-8" />
      </svg>
    ),
  },
  {
    labelKey: "nav.github" as const,
    sectionId: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
];

function Dock() {
  const { t, locale, setLocale } = useTranslate();
  const [githubStatsOpen, setGitHubStatsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        className="dock"
        initial={{ opacity: 0, y: 40, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.5 }}
      >
        {items.map((item) => (
          <motion.button
            key={item.labelKey}
            className="dock-item"
            onClick={() => {
              if (item.sectionId) scrollToSection(item.sectionId);
              else setGitHubStatsOpen(true);
            }}
            whileHover={{ scale: 1.3, y: -4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {item.icon}
            <span className="dock-tooltip">{t(item.labelKey)}</span>
          </motion.button>
        ))}
        <div className="dock-separator" />
        <motion.button
          className="dock-item"
          onClick={() => setLocale(locale === "en" ? "ru" : "en")}
          whileHover={{ scale: 1.3, y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          <span className="dock-tooltip">{locale === "en" ? "EN" : "RU"}</span>
        </motion.button>
      </motion.div>
      <GitHubStats
        show={githubStatsOpen}
        onClose={() => setGitHubStatsOpen(false)}
      />
    </>
  );
}

export default Dock;
