import BentoGrid from "./BentoGrid";
import { useRef } from "react";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

const projectsData = {
  projects: [
    {
      id: 1,
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
      images: ["/images/the_owl.png"],
      technologies: ["React", "TypeScript"],
      link: "https://owl-gamma.vercel.app/",
    },
    {
      id: 4,
      images: ["/images/owl_rest_api.png"],
      technologies: ["Python", "Flask", "PostgreSQL"],
      link: "https://owl-gamma.vercel.app/",
    },
    {
      id: 5,
      images: ["/images/IPSA.png"],
      technologies: ["Python", "Tensorflow", "Keras", "Pyrogram"],
      link: "https://github.com/Nighty3098/InvestingAssistant/",
    },
    {
      id: 6,
      images: ["/images/ipsa_model_1.png", "/images/ipsa_model_2.png"],
      technologies: ["Python", "Tensorflow", "Keras"],
      link: "https://github.com/Nighty3098/IPSA_MODEL/",
    },
    {
      id: 7,
      images: ["/images/PrettyProfile_1.png", "/images/PrettyProfile_2.png"],
      technologies: ["NodeJS", "Vercel"],
      link: "https://pretty-profile.vercel.app/",
    },
    {
      id: 8,
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
      images: [
        "/images/tech_support_bot.png",
        "/images/tech_support_bot_2.png",
      ],
      technologies: ["TypeScript"],
      link: "https://github.com/Nighty3098/TechSupportBot",
    },
  ],
};

function Projects() {
  const { t, tt, locale } = useTranslate();
  const ref = useRef<HTMLDivElement>(null);
  const items = tt("projects.items") as Array<{
    title: string;
    info: string;
    description: string;
  }>;

  useSectionReveal(ref, [locale]);

  const all = projectsData.projects.map((p, i) => ({
    ...p,
    title: items[i]?.title ?? "",
    info: items[i]?.info ?? "",
    description: items[i]?.description ?? "",
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
    </section>
  );
}

export default Projects;
