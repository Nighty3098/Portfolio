import { useRef, useEffect } from "react";
import { useTranslate } from "../context/I18nContext";
import { useReducedMotion } from "../hooks/useReducedMotion";
import gsap from "gsap";

function Hero() {
  const { t, locale } = useTranslate();
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hero = heroRef.current;
    const media = mediaRef.current;
    if (!hero) return;

    const card = hero.querySelector<HTMLElement>(".hero-card");
    const lines = Array.from(
      hero.querySelectorAll<HTMLElement>(".hero-line-inner"),
    );

    if (reduce) {
      gsap.set([card, media, ...lines], { clearProps: "all" });
      return;
    }

    const tl = gsap.timeline();

    if (card) {
      gsap.set(card, { scale: 0, transformOrigin: "50% 100%" });
      tl.to(card, { scale: 1, duration: 1.4, ease: "power4.inOut" }, 0);
    }

    if (media) {
      gsap.set(media, { scale: 2.2 });
      tl.to(media, { scale: 1, duration: 2.8, ease: "power2.out" }, 0);
    }

    tl.fromTo(
      lines,
      { yPercent: 120, rotateZ: 16, filter: "blur(12px)" },
      {
        yPercent: 0,
        rotateZ: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.16,
      },
      0.35,
    );

    return () => {
      tl.kill();
      gsap.set([card, media, ...lines], { clearProps: "all" });
    };
  }, [locale, reduce]);

  return (
    <section ref={heroRef} className="hero" aria-label="Software Engineer">
      <div className="hero-card">
        <div className="hero-media">
          <img ref={mediaRef} src="/bg_1.webp" alt="" fetchPriority="high" decoding="async" />
        </div>
        <div className="hero-scrim" />
        <h1 className="hero-caption">
          {[t("welcome.hero_line_1"), t("welcome.hero_line_2")].map((line) => (
            <span key={line} className="hero-line">
              <span className="hero-line-inner">{line}</span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}

export default Hero;