import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

function About() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);
  const texts = ["about.p1", "about.p2", "about.p3", "about.p5"];

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
        <div className="about-image-col">
          <div className="about-image-frame">
            <img src="me.png" alt="me" className="about-avatar" loading="lazy" />
          </div>
        </div>
        <div className="about-text-col">
          {texts.map((key, i) => (
            <p key={i}>
              {t(key)}
            </p>
          ))}
          <div className="about-category-links">
            <Link to="/all-projects?category=osint" className="about-cat-link">
              {t("about.osint_link")}
            </Link>
            <Link to="/all-projects?category=pentest" className="about-cat-link">
              {t("about.pentest_link")}
            </Link>
          </div>
          <button className="about-contact-btn" onClick={scrollToContacts}>
            {t("about.contact_me")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;
