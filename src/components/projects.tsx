import BentoGrid from "./bentoGrid";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

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
        "/images/skyfall_tg.png",
        "/images/skyfall_dorks.png",
        "/images/skyfall_github.png",
        "/images/skyfall_graph.png",
        "/images/skyfall_mail.png",
        "/images/skyfall_username.png",
        "/images/skyfall_website.png",
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
        "/images/ai_video_summary_bot_1.png",
        "/images/ai_video_summary_bot_2.png",
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
        "/images/gh_1.png",
        "/images/gh_2.png",
        "/images/gh_3.png",
        "/images/gh_4.png",
        "/images/gh_5.png",
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
        "/images/owl/1.png",
        "/images/owl/2.png",
        "/images/owl/3.png",
        "/images/owl/4.png",
        "/images/owl/5.png",
        "/images/owl/6.png",
        "/images/owl/7.png",
        "/images/owl/8.png",
        "/images/owl/9.png",
      ],
      technologies: ["React", "TypeScript"],
      demo: "https://owl-gamma.vercel.app/",
      source: "",
    },
    {
      id: 4,
      showOnHome: true,
      categories: ["other"],
      images: ["/images/owl_rest_api.png"],
      technologies: ["Python", "Flask", "PostgreSQL"],
      demo: "https://owl-gamma.vercel.app/",
      source: "",
    },
    {
      id: 5,
      showOnHome: true,
      categories: ["bots"],
      images: ["/images/IPSA.png"],
      technologies: ["Python", "Tensorflow", "Keras", "Pyrogram"],
      source: "https://github.com/Nighty3098/InvestingAssistant/",
      demo: "",
    },
    {
      id: 6,
      showOnHome: true,
      categories: ["ml"],
      images: ["/images/ipsa_model_1.png", "/images/ipsa_model_2.png"],
      technologies: ["Python", "Tensorflow", "Keras"],
      source: "https://github.com/Nighty3098/IPSA_MODEL/",
      demo: "",
    },
    {
      id: 10,
      showOnHome: true,
      categories: ["sites"],
      images: ["/images/skyfall_website.png"],
      technologies: ["React", "TypeScript", "GSAP"],
      demo: "https://SkyFallOsint.vercel.app",
      source: "https://github.com/Nighty3098/SkyFallWebPage",
    },
    {
      id: 7,
      showOnHome: true,
      categories: ["sites"],
      images: ["/images/PrettyProfile_1.png", "/images/PrettyProfile_2.png"],
      technologies: ["NodeJS", "Vercel"],
      demo: "https://pretty-profile.vercel.app/",
      source: "https://github.com/Nighty3098/PrettyProfile",
    },
    {
      id: 2,
      showOnHome: true,
      categories: ["pentest"],
      images: [
        "/images/crimson_1.png",
        "/images/crimson_2.png",
        "/images/crimson_3.png",
        "/images/crimson_4.png",
        "/images/crimson_5.png",
        "/images/crimson_6.png",
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
        "/images/LogInsight_1.png",
        "/images/LogInsight_2.png",
        "/images/LogInsight_3.png",
        "/images/LogInsight_4.png",
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
        "/images/tech_support_bot.png",
        "/images/tech_support_bot_2.png",
      ],
      technologies: ["TypeScript"],
      source: "https://github.com/Nighty3098/TechSupportBot",
      demo: "https://t.me/He4vyL0v3_bot",
    },
    {
      id: 12,
      showOnHome: false,
      categories: ["bots"],
      images: ["/images/cv_bot.png", "/images/cv_bot_2.png"],
      technologies: ["TypeScript", "Telegraf", "Express", "Vercel"],
      source: "https://t.me/cv_creator_example_bot",
      demo: "https://t.me/cv_creator_example_bot",
    },
    {
      id: 13,
      showOnHome: false,
      categories: ["pentest"],
      images: [
        "/images/ProxySniffer.png",
        "/images/proxy_1.png",
        "/images/proxy_2.png",
        "/images/proxy_3.png",
      ],
      technologies: ["Python"],
      source: "https://github.com/Nighty3098/ProxySniffer",
      demo: "",
    },
    {
      id: 14,
      showOnHome: false,
      categories: ["pentest"],
      images: ["/images/Thunder.png"],
      technologies: ["Python"],
      source: "https://github.com/Nighty3098/Thunder",
      demo: "",
    },
    {
      id: 15,
      showOnHome: false,
      categories: ["pentest"],
      images: ["/images/IStealU.png"],
      technologies: ["C++"],
      source: "https://github.com/Nighty3098/IStealU",
      demo: "",
    },
    {
      id: 16,
      showOnHome: false,
      categories: ["sites"],
      images: ["/images/owl_website.png"],
      technologies: ["React", "TypeScript", "GSAP"],
      source: "https://github.com/Nighty3098/owl_website",
      demo: "https://owl-tech.vercel.app/",
    },
  ],
};

const homeProjects = projectsData.projects.filter((p) => p.showOnHome);

function Projects() {
  const { t, tt, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);
  const items = tt("projects.items") as Array<{
    title: string;
    info: string;
    brief: string;
    description: string;
  }>;

  useSectionReveal(ref, [locale]);

  const all = homeProjects.map((p, i) => ({
    ...p,
    title: items[p.id - 1]?.title ?? "",
    info: items[p.id - 1]?.info ?? "",
    brief: items[p.id - 1]?.brief ?? "",
    description: items[p.id - 1]?.description ?? "",
    index: i,
  }));

  return (
    <section
      id="projects"
      ref={ref}
      key={locale}
      className="content-block content projects-block projects-page-wrapper"
    >
      <h2 data-reveal="letters">{t("projects.title")}</h2>
      <BentoGrid projects={all} />
      <Link to="/all-projects" className="all-projects-btn">
        {t("projects.all")}
      </Link>
    </section>
  );
}

export default Projects;
export { projectsData };
