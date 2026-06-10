import { motion } from "framer-motion";
import { useTranslate } from "../context/I18nContext";
import ProjectCard from "./project_card";

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
  ],
};

function Projects() {
  const { t, tt } = useTranslate();
  const items = tt("projects.items") as Array<{
    title: string;
    info: string;
    description: string;
  }>;

  return (
    <section id="projects" className="section">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t("projects.title")}
      </motion.h2>
      <div className="projects-grid">
        {projectsData.projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            title={items[i].title}
            description={items[i].description}
            info={items[i].info}
            images={project.images}
            link={project.link}
            id={project.id}
            technologies={project.technologies}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
