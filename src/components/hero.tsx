import { useRef, useEffect } from "react";
import { useTranslate } from "../context/I18nContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const { t, locale } = useTranslate();
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;

    const titleEl = titleRef.current;
    const visualEl = visualRef.current;
    const scrollEl = scrollRef.current;
    if (!titleEl || !visualEl || !scrollEl) return;

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

    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;
    let isVisible = false;
    let lastMoveTime = 0;

    const spring = { x: 0, y: 0, vx: 0, vy: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const heroRect = container.getBoundingClientRect();
      const isHeroVisible =
        heroRect.bottom > 0 && heroRect.top < window.innerHeight;
      if (!isHeroVisible) {
        if (isVisible) {
          isVisible = false;
          gsap.to(visualEl, {
            scale: 0.85,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        return;
      }

      const menuOverlay = document.querySelector(".menu-overlay");
      const isMenuOpen =
        menuOverlay && getComputedStyle(menuOverlay).display !== "none";
      if (isMenuOpen) {
        if (isVisible) {
          isVisible = false;
          gsap.to(visualEl, {
            scale: 0.85,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        return;
      }

      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = performance.now();

      const titleRect = titleEl.getBoundingClientRect();
      const isOverTitle =
        e.clientX >= titleRect.left &&
        e.clientX <= titleRect.right &&
        e.clientY >= titleRect.top &&
        e.clientY <= titleRect.bottom;

      if (isOverTitle !== isVisible) {
        isVisible = isOverTitle;
        gsap.to(visualEl, {
          scale: isOverTitle ? 1 : 0.85,
          opacity: isOverTitle ? 1 : 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const animate = () => {
      const dx = mouseX + 20 - spring.x;
      const dy = mouseY - 20 - spring.y;

      const dt = Math.min((performance.now() - lastMoveTime) / 16, 4);
      const stiffness = dt < 2 ? 0.045 : 0.02;

      spring.vx += dx * stiffness;
      spring.vy += dy * stiffness;
      spring.vx *= 0.78;
      spring.vy *= 0.78;
      spring.x += spring.vx;
      spring.y += spring.vy;

      const stretchX = spring.vx * 0.003;
      const stretchY = spring.vy * 0.003;
      const scaleX = 1 - stretchX + stretchY * 0.5;
      const scaleY = 1 - stretchY + stretchX * 0.5;

      gsap.set(visualEl, {
        x: spring.x,
        y: spring.y,
        scaleX,
        scaleY,
      });

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      tl.kill();
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [locale]);

  return (
    <section className="section-hero" ref={heroRef}>
      <div className="hero-bg" />
      <div className="hero-content">
        <div className="heading-appear">
          <h1 ref={titleRef} className="hero-title">
            {t("welcome.name")
              .split("\n")
              .map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
          </h1>
        </div>
      </div>
      <div ref={visualRef} className="hero-visual">
        <div className="hero-visual-frame">
          <div className="hero-visual-zoom">
            <img src="me_2.jpg" alt="" className="hero-visual-image" />
          </div>
        </div>
      </div>
      <div ref={scrollRef} className="hero-scroll">
        <span className="hero-scroll-bracket">[</span>
        <span className="hero-scroll-text">Scroll</span>
        <span className="hero-scroll-bracket">]</span>
      </div>
      <div className="hero-info">
        <FontAwesomeIcon icon={faLocationDot} />
        <span>{t("welcome.city")}</span>
      </div>
    </section>
  );
}

export default Hero;
