import { useRef, useEffect } from "react";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const { t, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);
  const texts = ["about.p1", "about.p2", "about.p3", "about.p4"];

  useSectionReveal(ref, [locale]);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const frame = container.querySelector<HTMLElement>(".about-image-frame");
    if (!frame) return;

    gsap.set(frame, {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: frame,
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.to(frame, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 1,
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, [locale]);

  return (
    <section id="about-me" ref={ref} className="about-section">
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
            <p key={i} data-reveal={i === 0 ? "letters" : "words-fade"}>
              {t(key)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
