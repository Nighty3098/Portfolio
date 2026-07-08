import ProjectCard from "./../components/project_card";
import SEO from "../components/SEO";
import { useTranslate } from "../context/I18nContext";

const projectsData = {
  projects: [
    {
      id: 0,
      images: ["/images/Crimson.png"],
      link: "https://github.com/Nighty3098/Crimson/",
    },
    {
      id: 1,
      images: ["/images/grabber.png"],
      link: "https://github.com/He4vyL0v3/GhostlyGrabber/",
    },
    {
      id: 2,
      images: ["/images/IStealU.png"],
      link: "https://github.com/He4vyL0v3/IStealU/",
    },
    {
      id: 3,
      images: ["/images/Thunder.png"],
      link: "https://github.com/He4vyL0v3/Thunder/",
    },
    {
      id: 4,
      images: ["/images/ProxySniffer.png"],
      link: "https://github.com/He4vyL0v3/ProxySniffer",
    },
  ],
};

function He4vyL0v3() {
  const { t, tt } = useTranslate();
  const items = tt("pentesting.items") as Array<{
    title: string;
    info: string;
    brief: string;
    description: string;
  }>;

  return (
    <>
      <SEO title={t("pentesting.title")} description={t("html.description")} path="/pentesting" />
      <section
        id="projects"
        className="content-block content projects-block projects-page-tiling"
      >
        <div className="content-block about-block heavylove-tiling projects-page-header">
          <h1>{t("pentesting.title")}</h1>
        </div>
      <div className="spacer-h-100"></div>
      <div className="projects-grid">
        {projectsData.projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            title={items[i].title}
            description={items[i].description}
            brief={items[i].brief}
            info={items[i].info}
            images={project.images}
            link={project.link}
            id={project.id}
            index={i}
            technologies={[]}
          />
        ))}
      </div>
      <div className="spacer-h-100"></div>
      </section>
    </>
  );
}

export default He4vyL0v3;
