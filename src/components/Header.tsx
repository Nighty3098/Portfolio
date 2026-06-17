import { useState, useRef, useEffect } from "react";
import { useTranslate } from "../context/I18nContext";
import GitHubStats from "./github_stats";
import gsap from "gsap";

const navItems = [
  { key: "nav.projects", sectionId: "projects" },
  { key: "nav.about", sectionId: "about-me" },
  { key: "nav.contacts", sectionId: "my-contacts" },
  { key: "about.resume", href: "https://docs.google.com/document/d/1F56DLD5cfGlKVzTzlpU5TD-zoJlGTi2LhfMb9mejHe8/edit?usp=sharing", external: true },
];

function Header() {
  const { t, locale, setLocale } = useTranslate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const [githubStatsOpen, setGitHubStatsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!menuRef.current || !overlayRef.current || !menuItemsRef.current) return;

    const items = Array.from(menuItemsRef.current.children);

    if (isMenuOpen) {
      const tl = gsap.timeline();
      tl.set(menuRef.current, { display: "flex" });
      tl.set(menuContentRef.current, { autoAlpha: 1 });
      tl.set(items, { x: -60, opacity: 0 });
      tl.fromTo(
        overlayRef.current,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.6, ease: "power3.inOut" }
      );
      tl.to(
        items,
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        "-=0.3"
      );
    } else {
      const tl = gsap.timeline();
      tl.to(items, {
        x: -30,
        opacity: 0,
        duration: 0.15,
        stagger: 0.02,
        ease: "power2.in",
      });
      tl.to(
        overlayRef.current,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", duration: 0.4, ease: "power3.inOut" },
        "-=0.1"
      );
      tl.set(menuRef.current, { display: "none" });
    }
  }, [isMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <span className="header-logo">NIGHTY</span>
          <div className="header-right">
            <button
              className={`header-menu-btn ${isMenuOpen ? "is-active" : ""}`}
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="menu-bar" />
              <span className="menu-bar" />
            </button>
          </div>
        </div>
      </header>

      <div ref={menuRef} className="menu-overlay" style={{ display: "none" }}>
        <div ref={overlayRef} className="menu-overlay-bg" />
        <div ref={menuContentRef} className="menu-overlay-content" style={{ visibility: "hidden" }}>
          <nav ref={menuItemsRef} className="menu-nav">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.key}
                  className="menu-nav-item"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(item.key)}
                </a>
              ) : (
                <button
                  key={item.key}
                  className="menu-nav-item"
                  onClick={() => scrollToSection(item.sectionId!)}
                >
                  {t(item.key)}
                </button>
              )
            )}
            <button
              className="menu-nav-item"
              onClick={() => {
                setMenuOpen(false);
                setGitHubStatsOpen(true);
              }}
            >
              {t("nav.github")}
            </button>
            <button
              className="menu-nav-item menu-lang-btn"
              onClick={() => setLocale(locale === "en" ? "ru" : "en")}
            >
              {locale === "en" ? "EN" : "RU"}
            </button>
          </nav>
        </div>
      </div>

      <GitHubStats
        show={githubStatsOpen}
        onClose={() => setGitHubStatsOpen(false)}
      />
    </>
  );
}

export default Header;
