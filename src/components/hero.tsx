import { useRef, useEffect, useState } from "react";
import { useTranslate } from "../context/I18nContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";
import SplitType from "split-type";
import HeroCanvas from "./heroCanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Hero() {
  const { t, locale } = useTranslate();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());
  const reduce = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const titleEl = titleRef.current;
    const scrollEl = scrollRef.current;
    if (!titleEl || !scrollEl) return;

    if (reduce) {
      gsap.set(titleEl, { visibility: "visible" });
      gsap.set(scrollEl, { visibility: "visible", opacity: 1 });
      return;
    }

    const split = new SplitType(titleEl, { types: "chars" });
    const chars = split.chars;

    const tl = gsap.timeline();

    tl.set(titleEl, { visibility: "visible" });
    tl.set(scrollEl, { visibility: "visible" });

    if (chars) {
      tl.from(
        chars,
        {
          yPercent: 150,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.027,
        },
        0.2,
      );
    }

    tl.to(scrollEl, { opacity: 1, duration: 0.6 }, 0.2);

    return () => {
      tl.kill();
      try {
        split.revert();
      } catch {}
    };
  }, [locale, reduce]);

  return (
    <section className="section-hero" ref={heroRef}>
      <div className="hero-bg" />
      <div data-hero-field className="hero-canvas-layer">
        <HeroCanvas julia scale={6} />
      </div>
      <div data-hero-portrait className="hero-canvas-layer">
        <HeroCanvas portraitSrc="me_3.png" portraitOnly />
      </div>
      <div className="hero-fade" />
      <div className="hero-content">
        <div className="heading-appear">
          <h1 ref={titleRef} className="hero-title">
            {"software\nengineer"
              .split("\n")
              .map((line, i, arr) => (
                <span key={line}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
          </h1>
        </div>
      </div>
      <div ref={scrollRef} className="hero-scroll">
        <span className="hero-scroll-bracket">[</span>
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-bracket">]</span>
      </div>
      <div className="hero-info">
        <p>
        <FontAwesomeIcon icon={faLocationDot} />
          <span>{t("welcome.city")}</span>
        </p>
        <p>
        <FontAwesomeIcon icon={faClock} />
          <span>{time.toLocaleTimeString(locale === "ru" ? "ru-RU" : "en-US", { timeZone: "Etc/GMT-7", hour: "2-digit", minute: "2-digit" })}</span>
        </p>
      </div>
    </section>
  );
}

export default Hero;
