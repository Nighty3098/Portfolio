import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

function About() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);
  const restTexts = ["about.p2", "about.p5", "about.p3"];

  useSectionReveal(ref, [locale]);

  const scrollToContacts = () => {
    const el = document.getElementById("my-contacts");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about-me" ref={ref} className="about-section" key={locale}>
      <div className="about-header">
        <h2 data-reveal="letters">
          {t("about.title_prefix")} {t("about.title_suffix")}
        </h2>
      </div>

      <div className="about-grid">
        <div className="about-text-col about-intro-col">
          <div className="about-text-col">
            <p>{t("about.p1")}</p>
            <p>{t("about.p4")}</p>
          </div>
          <div className="about-buttons">
            <button className="about-contact-btn" onClick={scrollToContacts}>
              {t("about.contact_me")}
            </button>
            <a
              className="about-contact-btn"
              href="https://docs.google.com/document/d/1F56DLD5cfGlKVzTzlpU5TD-zoJlGTi2LhfMb9mejHe8/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("about.resume")}
            </a>
          </div>
        </div>
        <div className="about-image-col">
          <div className="about-image-frame">
            <img
              src="me_2.jpg"
              alt="me"
              className="about-avatar"
              loading="lazy"
            />
          </div>
        </div>
        <div className="about-text-col">
          {restTexts.map((key) => (
            <p key={key}>{t(key)}</p>
          ))}
          <div className="about-buttons about-category-links">
            <Link
              to="/all-projects?category=osint"
              className="about-contact-btn"
            >
              {t("about.osint_link")}
            </Link>
            <Link
              to="/all-projects?category=pentest"
              className="about-contact-btn"
            >
              {t("about.pentest_link")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
