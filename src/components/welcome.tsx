import { motion } from "framer-motion";
import React, { useRef, useEffect } from "react";
import GitHubStats from "./github_stats";
import { useState } from "react";
import { useTranslate } from "../context/I18nContext";
import gsap from "gsap";

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
    <motion.nav
      className="hero-nav"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="hero-nav-links">
        {navItems.map((item) => (
          <motion.button
            key={item.key}
            onClick={item.action}
            className="hero-nav-btn"
            whileHover={{ letterSpacing: "8px", color: "var(--accent)" }}
            transition={{ duration: 0.3 }}
          >
            {t(item.key)}
          </motion.button>
        ))}
      </div>
      <motion.button
        onClick={() => setLocale(locale === "en" ? "ru" : "en")}
        className="hero-nav-btn hero-lang-btn"
        whileHover={{ letterSpacing: "4px", color: "var(--accent)" }}
        transition={{ duration: 0.3 }}
      >
        {locale === "en" ? "EN" : "RU"}
      </motion.button>
    </motion.nav>
  );
};

function WelcomePage() {
  const { t, locale } = useTranslate();
  const [githubStatsOpen, setGitHubStatsOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const whoamiRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        nameRef.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          whoamiRef.current,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.2",
        );
    }, heroRef);

    return () => ctx.revert();
  }, [locale]);

  return (
    <div className="hero" ref={heroRef}>
      <Navigation onGitHubStatsClick={() => setGitHubStatsOpen(true)} />
      <GitHubStats
        show={githubStatsOpen}
        onClose={() => setGitHubStatsOpen(false)}
      />

      <div className="hero-split">
        <div className="hero-split-left">
          <p ref={whoamiRef} className="hero-whoami">
            {t("welcome.whoami")}
          </p>
          <div className="hero-text-block">
            <h1 ref={nameRef} className="hero-name">
              {t("welcome.name")}
            </h1>
            <p ref={subtitleRef} className="hero-subtitle">
              {t("welcome.city")}
            </p>
          </div>
        </div>
        <div className="hero-split-right">
          <img src="me_2.jpg" alt={t("welcome.name")} className="hero-photo" />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
