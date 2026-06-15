import { useRef } from "react";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

function AboutMePage() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);
  const aboutTexts = ["about.p1", "about.p2", "about.p3", "about.p4"];

  useSectionReveal(ref, [locale]);

  return (
    <div
      id="about-me"
      ref={ref}
      className="content-block about-block content about-section-wrapper"
    >
      <div className="spacer-h-100 mobile"></div>
      <div className="image-container">
        <img src="me.png" alt="me" className="about-avatar" />
        <a
          className="button"
          href="https://docs.google.com/document/d/1F56DLD5cfGlKVzTzlpU5TD-zoJlGTi2LhfMb9mejHe8/edit?usp=sharing"
        >
          {t("about.resume")}
        </a>
      </div>
      <div className="about-section-container">
        <h2 data-reveal="letters">
          {t("about.title_prefix")} {t("about.title_suffix")}
        </h2>
        {aboutTexts.map((key, i) => (
          <p key={i}>
            {t(key)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default AboutMePage;
