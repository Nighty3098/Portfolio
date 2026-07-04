import BentoGrid from "./BentoGrid";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

interface ProjectData {
  id: number;
  images: string[];
  technologies: string[];
  link: string;
  showOnHome: boolean;
}

const projectsData: { projects: ProjectData[] } = {
  projects: [
    {
      id: 1,
      showOnHome: true,
      images: [
        "/images/gh_1.png",
        "/images/gh_2.png",
        "/images/gh_3.png",
        "/images/gh_4.png",
        "/images/gh_5.png",
      ],
      technologies: ["Python", "C++", "QT"],
      link: "https://he4vyl0v3.vercel.app/",
    },
    {
      id: 2,
      showOnHome: true,
      images: [
        "/images/crimson_1.png",
        "/images/crimson_2.png",
        "/images/crimson_3.png",
        "/images/crimson_4.png",
        "/images/crimson_5.png",
        "/images/crimson_6.png",
      ],
      technologies: ["Python", "C"],
      link: "https://he4vyl0v3.vercel.app/",
    },
    {
      id: 3,
      showOnHome: true,
      images: ["/images/the_owl.png"],
      technologies: ["React", "TypeScript"],
      link: "https://owl-gamma.vercel.app/",
    },
    {
      id: 4,
      showOnHome: true,
      images: ["/images/owl_rest_api.png"],
      technologies: ["Python", "Flask", "PostgreSQL"],
      link: "https://owl-gamma.vercel.app/",
    },
    {
      id: 5,
      showOnHome: true,
      images: ["/images/IPSA.png"],
      technologies: ["Python", "Tensorflow", "Keras", "Pyrogram"],
      link: "https://github.com/Nighty3098/InvestingAssistant/",
    },
    {
      id: 6,
      showOnHome: true,
      images: ["/images/ipsa_model_1.png", "/images/ipsa_model_2.png"],
      technologies: ["Python", "Tensorflow", "Keras"],
      link: "https://github.com/Nighty3098/IPSA_MODEL/",
    },
    {
      id: 7,
      showOnHome: true,
      images: ["/images/PrettyProfile_1.png", "/images/PrettyProfile_2.png"],
      technologies: ["NodeJS", "Vercel"],
      link: "https://pretty-profile.vercel.app/",
    },
    {
      id: 8,
      showOnHome: false,
      images: [
        "/images/LogInsight_1.png",
        "/images/LogInsight_2.png",
        "/images/LogInsight_3.png",
        "/images/LogInsight_4.png",
      ],
      technologies: ["C"],
      link: "https://github.com/He4vyL0v3/LogInsight",
    },
    {
      id: 9,
      showOnHome: false,
      images: [
        "/images/tech_support_bot.png",
        "/images/tech_support_bot_2.png",
      ],
      technologies: ["TypeScript"],
      link: "https://github.com/Nighty3098/TechSupportBot",
    },
    {
      id: 10,
      showOnHome: true,
      images: ["/images/skyfall_website.png"],
      technologies: ["React", "TypeScript", "GSAP"],
      link: "https://SkyFallOsint.vercel.app",
    },
    {
      id: 11,
      showOnHome: true,
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
      link: "https://github.com/Nighty3098/SkyFall",
    },
    {
      id: 12,
      showOnHome: false,
      images: ["/images/cv_bot.png", "/images/cv_bot_2.png"],
      technologies: ["TypeScript", "Telegraf", "Express", "Vercel"],
      link: "https://t.me/cv_creator_example_bot",
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
    description: string;
  }>;

  useSectionReveal(ref, [locale]);

  const all = homeProjects.map((p, i) => ({
    ...p,
    title: items[p.id - 1]?.title ?? "",
    info: items[p.id - 1]?.info ?? "",
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
