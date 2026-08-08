import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";
import { useReducedMotion } from "../hooks/useReducedMotion";
import ProjectCard from "./projectCard";
import SwapLabel from "./swapLabel";

gsap.registerPlugin(ScrollTrigger);

type ProjectCategory = "other" | "ml" | "osint" | "pentest" | "bots" | "sites";

interface ProjectData {
  id: number;
  images: string[];
  technologies: string[];
  demo: string;
  source: string;
  showOnHome: boolean;
  categories: ProjectCategory[];
}

const projectsData: { projects: ProjectData[] } = {
  projects: [
    {
      id: 11,
      showOnHome: true,
      categories: ["osint"],
      images: [
        "/images/skyfall_tg.webp",
        "/images/skyfall_dorks.webp",
        "/images/skyfall_github.webp",
        "/images/skyfall_graph.webp",
        "/images/skyfall_mail.webp",
        "/images/skyfall_username.webp",
        "/images/skyfall_website.webp",
      ],
      technologies: ["Python", "PySide6", "OSINT", "React"],
      demo: "https://skyfallosint.vercel.app/",
      source: "",
    },
    {
      id: 17,
      showOnHome: true,
      categories: ["bots", "ml"],
      images: [
        "/images/ai_video_summary_bot_1.webp",
        "/images/ai_video_summary_bot_2.webp",
      ],
      technologies: ["Python", "Whisper", "Qwen AI", "yt-dlp"],
      source: "https://github.com/Nighty3098/VideoToSummaryAiBot",
      demo: "",
    },
    {
      id: 1,
      showOnHome: false,
      categories: ["osint"],
      images: [
        "/images/gh_1.webp",
        "/images/gh_2.webp",
        "/images/gh_3.webp",
        "/images/gh_4.webp",
        "/images/gh_5.webp",
      ],
      technologies: ["Python", "C++", "QT"],
      source: "https://github.com/Nighty3098/GhostlyGrabber/",
      demo: "",
    },
    {
      id: 3,
      showOnHome: true,
      categories: ["other"],
      images: [
        "/images/owl/1.webp",
        "/images/owl/2.webp",
        "/images/owl/3.webp",
        "/images/owl/4.webp",
        "/images/owl/5.webp",
        "/images/owl/6.webp",
        "/images/owl/7.webp",
        "/images/owl/8.webp",
        "/images/owl/9.webp",
      ],
      technologies: ["React", "TypeScript"],
      demo: "https://owl-gamma.vercel.app/",
      source: "",
    },
    {
      id: 4,
      showOnHome: true,
      categories: ["other"],
      images: ["/images/owl_rest_api.webp"],
      technologies: ["Python", "Flask", "PostgreSQL"],
      demo: "https://owl-gamma.vercel.app/",
      source: "",
    },
    {
      id: 5,
      showOnHome: true,
      categories: ["bots"],
      images: ["/images/IPSA.webp"],
      technologies: ["Python", "Tensorflow", "Keras", "Pyrogram"],
      source: "https://github.com/Nighty3098/InvestingAssistant/",
      demo: "",
    },
    {
      id: 6,
      showOnHome: true,
      categories: ["ml"],
      images: ["/images/ipsa_model_1.webp", "/images/ipsa_model_2.webp"],
      technologies: ["Python", "Tensorflow", "Keras"],
      source: "https://github.com/Nighty3098/IPSA_MODEL/",
      demo: "",
    },
    {
      id: 10,
      showOnHome: true,
      categories: ["sites"],
      images: ["/images/skyfall_website.webp"],
      technologies: ["React", "TypeScript", "GSAP"],
      demo: "https://SkyFallOsint.vercel.app",
      source: "https://github.com/Nighty3098/SkyFallWebPage",
    },
    {
      id: 7,
      showOnHome: true,
      categories: ["sites"],
      images: ["/images/PrettyProfile_1.webp", "/images/PrettyProfile_2.webp"],
      technologies: ["NodeJS", "Vercel"],
      demo: "https://pretty-profile.vercel.app/",
      source: "https://github.com/Nighty3098/PrettyProfile",
    },
    {
      id: 2,
      showOnHome: false,
      categories: ["pentest"],
      images: [
        "/images/crimson_1.webp",
        "/images/crimson_2.webp",
        "/images/crimson_3.webp",
        "/images/crimson_4.webp",
        "/images/crimson_5.webp",
        "/images/crimson_6.webp",
      ],
      technologies: ["Python", "C"],
      demo: "",
      source: "https://github.com/Nighty3098/Crimson",
    },
    {
      id: 8,
      showOnHome: false,
      categories: ["other"],
      images: [
        "/images/LogInsight_1.webp",
        "/images/LogInsight_2.webp",
        "/images/LogInsight_3.webp",
        "/images/LogInsight_4.webp",
      ],
      technologies: ["C"],
      source: "https://github.com/He4vyL0v3/LogInsight",
      demo: "",
    },
    {
      id: 9,
      showOnHome: false,
      categories: ["bots"],
      images: [
        "/images/tech_support_bot.webp",
        "/images/tech_support_bot_2.webp",
      ],
      technologies: ["TypeScript"],
      source: "https://github.com/Nighty3098/TechSupportBot",
      demo: "https://t.me/He4vyL0v3_bot",
    },
    {
      id: 12,
      showOnHome: false,
      categories: ["bots"],
      images: ["/images/cv_bot.webp", "/images/cv_bot_2.webp"],
      technologies: ["TypeScript", "Telegraf", "Express", "Vercel"],
      source: "https://t.me/cv_creator_example_bot",
      demo: "https://t.me/cv_creator_example_bot",
    },
    {
      id: 13,
      showOnHome: false,
      categories: ["pentest"],
      images: [
        "/images/ProxySniffer.webp",
        "/images/proxy_1.webp",
        "/images/proxy_2.webp",
        "/images/proxy_3.webp",
      ],
      technologies: ["Python"],
      source: "https://github.com/Nighty3098/ProxySniffer",
      demo: "",
    },
    {
      id: 14,
      showOnHome: false,
      categories: ["pentest"],
      images: ["/images/Thunder.webp"],
      technologies: ["Python"],
      source: "https://github.com/Nighty3098/Thunder",
      demo: "",
    },
    {
      id: 15,
      showOnHome: false,
      categories: ["pentest"],
      images: ["/images/IStealU.webp"],
      technologies: ["C++"],
      source: "https://github.com/Nighty3098/IStealU",
      demo: "",
    },
    {
      id: 16,
      showOnHome: false,
      categories: ["sites"],
      images: ["/images/owl_website.webp"],
      technologies: ["React", "TypeScript", "GSAP"],
      source: "https://github.com/Nighty3098/owl_website",
      demo: "https://owl-web.vercel.app/",
    },
  ],
};

const homeProjects = projectsData.projects.filter((p) => p.showOnHome);

function Projects() {
  const { t, tt, locale } = useTranslate();
  const ref = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const items = tt("projects.items") as Array<{
    title: string;
    info: string;
    brief: string;
    description: string;
  }>;

  useSectionReveal(ref, [locale]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const pinWrap = pinWrapRef.current;
    if (!wrap || !track || !pinWrap || reduce) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = ref.current;
      if (!section) return;

      wrap.classList.add("is-hscroll");
      pinWrap.classList.add("is-hscroll");

      const scrollAmount = () =>
        Math.max(0, track.scrollWidth - wrap.clientWidth);

      let lastHeight = "";
      const setHeight = () => {
        const height = `${section.offsetHeight + scrollAmount()}px`;
        if (height !== lastHeight) {
          lastHeight = height;
          pinWrap.style.height = height;
        }
      };
      setHeight();

      const ro = new ResizeObserver(setHeight);
      ro.observe(section);
      ro.observe(wrap);

      gsap.to(track, {
        x: () => -scrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: pinWrap,
          start: "top top",
          end: () => "+=" + scrollAmount(),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        wrap.classList.remove("is-hscroll");
        pinWrap.classList.remove("is-hscroll");
        pinWrap.style.height = "";
        ro.disconnect();
      };
    });

    return () => mm.revert();
  }, [reduce, locale]);

  const all = homeProjects.map((p, i) => ({
    ...p,
    title: items[p.id - 1]?.title ?? "",
    info: items[p.id - 1]?.info ?? "",
    brief: items[p.id - 1]?.brief ?? "",
    description: items[p.id - 1]?.description ?? "",
    index: i,
  }));

  return (
    <div className="projects-pin" ref={pinWrapRef}>
      <section id="projects" ref={ref} className="projects-section" key={locale} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
      <div className="section-head">
        <h2 className="section-title">
          <img src="code.webp" alt="me" className="title-img" loading="lazy" decoding="async" />{t("projects.title")}
        </h2>
      </div>

      <div className="projects-track-wrap" ref={wrapRef}>
        <div className="projects-track" ref={trackRef}>
          {all.map((p) => (
            <ProjectCard
              key={p.id}
              title={p.title}
              brief={p.brief}
              description={p.description}
              images={p.images}
              source={p.source}
              demo={p.demo}
              id={p.id}
              index={p.index}
              technologies={p.technologies}
              variant="row"
              inSlider
            />
          ))}
        </div>
      </div>

      <div className="projects-more">
        <Link to="/all-projects" className="btn btn-line">
          <SwapLabel text={t("projects.all")} />
        </Link>
      </div>
      </section>
    </div>
  );
}

export default Projects;
export { projectsData };