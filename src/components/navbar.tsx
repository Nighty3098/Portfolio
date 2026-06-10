import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslate } from "../context/I18nContext";

interface NavbarProps {
  onGitHubStatsClick?: () => void;
}

function Navbar({ onGitHubStatsClick }: NavbarProps) {
  const { t, locale, setLocale } = useTranslate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { key: "nav.projects", action: () => scrollToSection("projects") },
    { key: "nav.contacts", action: () => scrollToSection("my-contacts") },
    {
      key: "nav.github",
      action: () => {
        setMenuOpen(false);
        onGitHubStatsClick?.();
      },
    },
  ];

  const handleLangSwitch = () => {
    setLocale(locale === "en" ? "ru" : "en");
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navbar-inner">
        <button onClick={scrollToTop} className="navbar-logo">
          <svg
            className="navbar-cat"
            viewBox="0 0 32.623 58.785"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(-177.9889,-10.10772)">
              <path
                d="m 105.809,48.397 c 0,-3.891 -3.336,-4.466 -3.336,-14.894"
                transform="translate(92.3579,4.11772)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="m 109.397,38.324 v 9.997"
                transform="translate(92.3579,4.11772)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="m 112.883,48.152 c 0,-3.435 2.17,-7.598 2.17,-13.068 0,-5.471 -0.66,-10.289 -0.837,-13.274"
                transform="translate(92.3579,4.11772)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="m 112.951,22.241 c 0,0 3.384,-0.265 4.553,-5.546"
                transform="translate(92.3579,4.11772)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="m 107.788,11.843 c 0,0 -1.419,-4.409 -2.619,-4.409 -1.2,0 -3.299,5.753 -3.299,14.428 0,2.241 -11.689,8.123 -9.211,21.709 0.398,2.18 1.394,6.337 1.394,6.353 0,0.016 2.518,9.529 -2.869,9.529 -1.121,0 -1.658,-0.62 -2.779,-0.62 -1.12,0 -2.024,0.765 -2.024,1.758 0,0.993 1.11,3.434 5.065,3.434 7.147,0 7.419,-5.987 7.419,-9.867 0,-3.88 -0.036,-2.679 -0.036,-3.314 0,-2.127 1.772,-2.56 2.43,-2.801"
                transform="translate(92.3579,4.11772)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <ellipse
                transform="matrix(1.00474,-0.404483,0.370766,0.920982,85.4108,49.8267)"
                cx="111.892"
                cy="15.766"
                rx="1.032"
                ry="1.449"
                fill="currentColor"
              />
              <path
                d="m 110.074,10.347 c 3.543,0 4.374,4.288 7.066,4.288"
                transform="translate(92.3579,4.11772)"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </g>
          </svg>
          Nighty3098
        </button>

        <div className="navbar-desktop">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={item.action}
              className="navbar-link"
            >
              {t(item.key)}
            </button>
          ))}
          <button onClick={handleLangSwitch} className="navbar-link">
            {locale === "en" ? "EN" : "RU"}
          </button>
        </div>

        <button
          className={`navbar-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.action}
                className="navbar-link"
              >
                {t(item.key)}
              </button>
            ))}
            <button onClick={handleLangSwitch} className="navbar-link">
              {locale === "en" ? "EN" : "RU"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
