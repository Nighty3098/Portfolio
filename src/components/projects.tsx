import ProjectCard from "./project_card";

const projectsData = {
  projects: [
    {
      id: 1,
      title: "The OWL",
      description:
        "OWL is a modern, developer-focused task and project management desktop app",
      image: "/images/the_owl.png",
      technologies: ["React", "Python", "Flask", "PostgreSQL"],
      link: "https://owl-gamma.vercel.app/",
    },
    {
      id: 2,
      title: "IPSA",
      description:
        "IPSA is a bot investment assistant with the ability to predict stock prices using its own neural network",
      image: "/images/IPSA.png",
      technologies: ["Python", "Tensorflow", "Keras"],
      link: "https://github.com/Nighty3098/InvestingAssistant/",
    },
    {
      id: 3,
      title: "PrettyProfile",
      description:
        "Generate a pretty art style profile card from your GitHub data",
      image: "/images/PrettyProfile.png",
      technologies: ["NodeJS", "Vercel"],
      link: "https://pretty-profile.vercel.app/",
    },
    {
      id: 4,
      title: "LogInsight",
      description:
        "Program for analyzing log files and detecting anomalies in program operation ",
      image: "/images/LogInsight.png",
      technologies: ["C"],
      link: "https://github.com/He4vyL0v3/LogInsight",
    },
  ],
};

function Projects() {
  return (
    <section
      id="projects"
      className="content-block content projects-block"
      style={{
        height: "auto",
        padding: "var(--spacing-xl)",
        width: "calc(100% - var(--spacing-xl) - var(--spacing-xl))",
        margin: "0px",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>My projects</h2>
      <div className="projects-grid">
        {projectsData.projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
            id={project.id}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
