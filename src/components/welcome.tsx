import { useRef, useEffect } from "react";
import GitHubStats from "./github_stats";
import { useState } from "react";
import { useTranslate } from "../context/I18nContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface NavigationProps {
  onGitHubStatsClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onGitHubStatsClick }) => {
  const { t } = useTranslate();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { key: "nav.projects", action: () => scrollToSection("projects") },
    { key: "nav.contacts", action: () => scrollToSection("my-contacts") },
    { key: "nav.github", action: onGitHubStatsClick },
  ];

  return (
    <nav className="hero-nav">
      <div className="hero-nav-links">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={item.action}
            className="hero-nav-btn"
          >
            {t(item.key)}
          </button>
        ))}
      </div>
    </nav>
  );
};

function WelcomePage() {
  const { t, locale } = useTranslate();
  const [githubStatsOpen, setGitHubStatsOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = heroRef.current;
    if (!container) return;

    const whoamiEl = container.querySelector<HTMLElement>(".hero-whoami");
    const nameEl = container.querySelector<HTMLElement>(".hero-name");
    const subtitleEl = container.querySelector<HTMLElement>(".hero-subtitle");

    const splits: SplitType[] = [];

    const initTargets = (
      el: HTMLElement | null,
      type: "chars" | "words",
    ) => {
      if (!el) return null;
      const split = new SplitType(el, { types: type });
      splits.push(split);
      const targets = type === "chars" ? split.chars : split.words;
      if (!targets || targets.length === 0) return null;
      return targets;
    };

    const whoamiTargets = initTargets(whoamiEl, "words");
    let nameTargets: Element[] | null = null;
    if (nameEl) {
      const split = new SplitType(nameEl, { types: "chars,lines" });
      splits.push(split);
      nameTargets = split.chars || null;
    }
    const subtitleTargets = initTargets(subtitleEl, "words");

    const tl = gsap.timeline();

    // Reveal containers and set initial hidden state for all targets at time 0
    tl.set([whoamiEl, nameEl, subtitleEl], { visibility: "visible" }, 0);
    if (whoamiTargets) tl.set(whoamiTargets, { x: "2em", opacity: 0 }, 0);
    if (nameTargets) tl.set(nameTargets, { yPercent: 110, opacity: 0 }, 0);
    if (subtitleTargets) tl.set(subtitleTargets, { yPercent: 100, opacity: 0 }, 0);

    // Animate in
    if (whoamiTargets) {
      tl.to(whoamiTargets, {
        x: 0,
        opacity: 0.55,
        duration: 0.7,
        ease: "power3.out",
        stagger: { amount: 0.3 },
      }, 0);
    }
    if (nameTargets) {
      tl.to(nameTargets, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: { amount: 0.15 },
      }, 0.2);
    }
    if (subtitleTargets) {
      tl.to(subtitleTargets, {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        stagger: { amount: 0.3 },
      }, 0.45);
    }

    // Photo parallax on scroll
    const photo = container.querySelector<HTMLElement>(".hero-photo");
    let parallaxST: ScrollTrigger | null = null;
    if (photo) {
      gsap.set(photo, { scale: 1.5 });
      const anim = gsap.to(photo, {
        yPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      parallaxST = anim.scrollTrigger as ScrollTrigger;
    }

    return () => {
      tl.kill();
      if (parallaxST) parallaxST.kill();
      splits.forEach((s) => {
        try {
          s.revert();
        } catch {}
      });
    };
  }, [locale]);

  return (
    <div className="hero" ref={heroRef}>
      <Navigation onGitHubStatsClick={() => setGitHubStatsOpen(true)} />
      <GitHubStats
        show={githubStatsOpen}
        onClose={() => setGitHubStatsOpen(false)}
      />

      <div className="hero-split">
        <div className="hero-split-left">
          <p className="hero-whoami">
            {t("welcome.whoami")}
          </p>
          <div className="hero-text-block">
            <h1 className="hero-name">
              {t("welcome.name")}
            </h1>
            <p className="hero-subtitle">
              {t("welcome.city")}
            </p>
          </div>
        </div>
        <div className="hero-split-right">
          <img src="me_2.jpg" alt={t("welcome.name")} className="hero-photo" loading="eager" width="1536" height="2048" />
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
