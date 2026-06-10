import { useNavigate } from "react-router-dom";
import { useTranslate } from "../context/I18nContext";
import ProjectCard from "./../components/project_card";

const projectsData = {
  projects: [
    {
      id: 0,
      images: ["/images/Crimson.png"],
      link: "https://github.com/Nighty3098/Crimson/",
      technologies: ["C++", "Python"],
    },
    {
      id: 1,
      images: ["/images/grabber.png"],
      link: "https://github.com/He4vyL0v3/GhostlyGrabber/",
      technologies: ["Python"],
    },
    {
      id: 2,
      images: ["/images/IStealU.png"],
      link: "https://github.com/He4vyL0v3/IStealU/",
      technologies: ["C++"],
    },
    {
      id: 3,
      images: ["/images/Thunder.png"],
      link: "https://github.com/He4vyL0v3/Thunder/",
      technologies: ["Python"],
    },
    {
      id: 4,
      images: ["/images/ProxySniffer.png"],
      link: "https://github.com/He4vyL0v3/ProxySniffer",
      technologies: ["Python"],
    },
  ],
};

function He4vyL0v3() {
  const { t, tt } = useTranslate();
  const navigate = useNavigate();
  const items = tt("pentesting.items") as Array<{
    title: string;
    info: string;
    description: string;
  }>;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <button onClick={() => navigate("/")} className="navbar-logo">
            ← Portfolio
          </button>
          <div className="navbar-links">
            <span className="navbar-link" style={{ cursor: "default" }}>
              {t("pentesting.title")}
            </span>
          </div>
        </div>
      </nav>
      <div className="heavylove-header">
        <h1>{t("pentesting.title")}</h1>
      </div>
      <section className="section" style={{ paddingTop: 0 }}>
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
    </>
  );
}

export default He4vyL0v3;
