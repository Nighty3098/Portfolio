import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import SwapLabel from "./swapLabel";
import GitHubStatsTable from "./githubStats";

type Tab = "about" | "github";

function About() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLElement>(null);
  const restTexts = ["about.p5"];
  const [tab, setTab] = useState<Tab>("about");

  useSectionReveal(ref, [locale]);

  const scrollToContacts = () => {
    const el = document.getElementById("my-contacts");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="about-tabs" style={{ display: "None" }}>
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
          <section id="about-me" ref={ref} className="about-section">
            <div className="about-copy about-tile">
              <div className="about-columns">
                <h1 className="about-copy--lead" data-reveal="words-mask" style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", justifyContent: "center", fontSize: "var(--text-hero)", fontFamily: "var(--font-hand)", gap: "var(--sp-l)" }}>
                  {t("about.p1")}
                </h1>
                <p data-reveal="words-mask" style={{ maxWidth: "700px" }}>{t("about.p2")}</p>
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
              <img
                src="me_original.webp"
                alt="me"
                className="about-me-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </section>

          <section id="about-me" ref={ref} className="about-section" key={locale}>
            <div className="about-copy" style={{ minHeight: "100vh", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
              {restTexts.map((key) => (
                <p key={key} data-reveal="words-mask" className="about-copy-big">
                  {t(key)}
                </p>
              ))}
              <p>
                {t("about.p3")}
              </p>
              <div className="about-buttons">
                <Link to="/all-projects?category=osint" className="btn">
                  <SwapLabel text={t("about.osint_link")} />
                </Link>
                <Link to="/all-projects?category=pentest" className="btn">
                  <SwapLabel text={t("about.pentest_link")} />
                </Link>
              </div>
            </div>
          </section>
        </div>

      ) : (
        <GitHubStatsTable />
      )}
    </>
  );
}

export default About;
