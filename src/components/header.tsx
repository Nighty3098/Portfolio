import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import { useTheme } from "../context/ThemeContext";
import GitHubStats from "./githubStats";
import gsap from "gsap";

const navLinks = [
  { key: "nav.projects", section: "projects" },
  { key: "nav.about", section: "about-me" },
  { key: "nav.contacts", section: "my-contacts" },
  {
    key: "about.resume",
    href: "https://docs.google.com/document/d/1F56DLD5cfGlKVzTzlpU5TD-zoJlGTi2LhfMb9mejHe8/edit?usp=sharing",
    external: true,
  },
];

function Header() {
  const { t, locale, setLocale } = useTranslate();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [githubStatsOpen, setGithubStatsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  const goSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const items = menu.querySelectorAll<HTMLElement>(".menu-nav-item");
    const bg = menu.querySelector<HTMLElement>(".menu-overlay-bg");

    if (isMenuOpen) {
      const tl = gsap.timeline();
      tl.set(menu, { display: "flex" });
      tl.fromTo(
        bg,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "power3.inOut" },
      );
      tl.fromTo(
        items,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" },
        "-=0.2",
      );
    } else {
      const tl = gsap.timeline();
      tl.to(items, { yPercent: 40, opacity: 0, duration: 0.2, ease: "power2.in" });
      tl.to(
        bg,
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.4, ease: "power3.inOut" },
        "-=0.05",
      );
      tl.set(menu, { display: "none" });
    }
  }, [isMenuOpen]);

  return (
    <>
      <header ref={headerRef} className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <nav className="header-nav">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.key}
                  className="nav-link"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t(link.key)}
                </a>
              ) : (
                <button
                  key={link.key}
                  className="nav-link"
                  onClick={() =>
                    isHome ? goSection(link.section!) : window.location.assign(`#/?goto=${link.section}`)
                  }
                >
                  {t(link.key)}
                </button>
              ),
            )}
          </nav>

          <div className="header-actions">
            <button
              className="ctrl-btn active"
              onClick={() => setLocale(locale === "en" ? "ru" : "en")}
              aria-label="Switch language"
            >
              {locale === "en" ? "EN" : "RU"}
            </button>
            <button
              className="ctrl-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "DARK" : "LIGHT"}
            </button>
          </div>

          <button
            className={`header-menu-btn ${isMenuOpen ? "is-active" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="menu-bar" />
            <span className="menu-bar" />
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        className="menu-overlay"
        style={{ display: "none" }}
        data-lenis-prevent
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target === e.currentTarget || target.classList.contains("menu-overlay-bg")) {
            setIsMenuOpen(false);
          }
        }}
      >
        <div className="menu-overlay-bg" />
        <nav className="menu-overlay-content">
          <div className="menu-nav">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.key}
                  className="menu-nav-item"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(link.key)}
                </a>
              ) : (
                <button
                  key={link.key}
                  className="menu-nav-item"
                  onClick={() => goSection(link.section!)}
                >
                  {t(link.key)}
                </button>
              ),
            )}
            <button
              className="menu-nav-item"
              onClick={() => {
                setIsMenuOpen(false);
                setGithubStatsOpen(true);
              }}
            >
              {t("nav.github")}
            </button>
            <div className="menu-actions">
              <button
                className="menu-nav-item menu-lang-btn active"
                onClick={() => setLocale(locale === "en" ? "ru" : "en")}
              >
                {locale === "en" ? "EN" : "RU"}
              </button>
              <button className="menu-nav-item menu-theme-btn" onClick={toggleTheme}>
                {theme === "dark" ? "DARK" : "LIGHT"}
              </button>
            </div>
          </div>
        </nav>
      </div>

      <GitHubStats
        show={githubStatsOpen}
        onClose={() => setGithubStatsOpen(false)}
      />
    </>
  );
}

export default Header;