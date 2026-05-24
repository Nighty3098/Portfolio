import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import GitHubStats from "./github_stats";
import { useState } from "react";
import { useTranslate } from "../context/I18nContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface NavigationProps {
  onGitHubStatsClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onGitHubStatsClick }) => {
  const { t, locale, setLocale } = useTranslate();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { key: "nav.projects", action: () => scrollToSection("projects") },
    { key: "nav.contacts", action: () => scrollToSection("my-contacts") },
    { key: "nav.github", action: onGitHubStatsClick },
  ];

  return (
    <motion.div
      className="navigation"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
      }}
    >
      {navItems.map((item) => {
        return (
          <motion.button
            key={item.key}
            onClick={item.action}
            variants={{
              hidden: { opacity: 0, y: -100 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ letterSpacing: "10px", color: "var(--accent)" }}
            className="navigation-button"
            transition={{ duration: 0.5 }}
          >
            {t(item.key)}
          </motion.button>
        );
      })}
      <motion.button
        onClick={() => setLocale(locale === "en" ? "ru" : "en")}
        className="navigation-button lang-switcher"
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
        whileHover={{ letterSpacing: "5px", color: "var(--accent)" }}
        transition={{ duration: 0.5 }}
      >
        {locale === "en" ? "EN" : "RU"}
      </motion.button>
    </motion.div>
  );
};

function WelcomePage() {
  const { t } = useTranslate();
  const [githubStatsOpen, setGitHubStatsOpen] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.to(topRef.current, { yPercent: -100, ease: "none" }, 0);
    tl.to(bottomRef.current, { yPercent: 100, ease: "none" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="welcome-block content welcome-block-bg" ref={sectionRef}>
      <div className="split-screen-container">
        <div className="split-top" ref={topRef} />
        <div className="split-bottom" ref={bottomRef} />
      </div>
      <Navigation onGitHubStatsClick={() => setGitHubStatsOpen(true)} />
      <GitHubStats
        show={githubStatsOpen}
        onClose={() => setGitHubStatsOpen(false)}
      />
      <div className="welcome-tiling">
        <div className="welcome-content">
          <h1>{t("welcome.name")}</h1>
          <div className="welcome-text-container">
            <p>{t("welcome.tagline")}</p>
          </div>
        </div>
        <img src="me.png" className="avatar-image" alt="me" />
      </div>
    </div>
  );
}

export default WelcomePage;
