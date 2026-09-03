import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import SwapLabel from "./swapLabel";
import GitHubStatsTable from "./githubStats";

type Tab = "about" | "github";

function About() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLElement>(null);
  const restTexts = ["about.p5", "about.p3"];
  const [tilt] = useState(() => (Math.random() < 0.5 ? "-8deg" : "8deg"));
  const [tab, setTab] = useState<Tab>("about");

  useSectionReveal(ref, [locale]);

  const scrollToContacts = () => {
    const el = document.getElementById("my-contacts");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about-me" ref={ref} className="about-section" key={locale} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
      <div className="section-head">
        <h2 className="section-title">
          {t("about.title_prefix")}<img
            src="me.webp"
            alt="me"
            className="title-img"
            style={{ ["--tilt" as string]: tilt } as CSSProperties}
            loading="lazy"
            decoding="async"
          />
          {t("about.title_suffix")}
        </h2>
      </div>

      <div className="about-tabs">
        <button
          className={`about-tab ${tab === "about" ? "active" : ""}`}
          onClick={() => setTab("about")}
        >
          {t("about.tab_about")}
        </button>
        <button
          className={`about-tab ${tab === "github" ? "active" : ""}`}
          onClick={() => setTab("github")}
        >
          GitHub
        </button>
      </div>

      {tab === "about" ? (
        <div className="about-layout">
          <div className="about-copy">
            <p className="about-copy--lead" data-reveal="words-mask">
              {t("about.p1")}
            </p>
            <p data-reveal="words-mask">{t("about.p2")}</p>
            <div className="about-buttons">
              <button className="btn" onClick={scrollToContacts}>
                <SwapLabel text={t("about.contact_me")} />
              </button>
              <a
                className="btn"
                href="https://docs.google.com/document/d/1F56DLD5cfGlKVzTzlpU5TD-zoJlGTi2LhfMb9mejHe8/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SwapLabel text={t("about.resume")} />
              </a>
            </div>
          </div>

          <div className="about-copy">
            {restTexts.map((key) => (
              <p key={key} data-reveal="words-mask">
                {t(key)}
              </p>
            ))}
            <div className="about-buttons">
              <Link to="/all-projects?category=osint" className="btn">
                <SwapLabel text={t("about.osint_link")} />
              </Link>
              <Link to="/all-projects?category=pentest" className="btn">
                <SwapLabel text={t("about.pentest_link")} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <GitHubStatsTable />
      )}
    </section>
  );
}

export default About;
