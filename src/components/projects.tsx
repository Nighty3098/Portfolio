import { motion } from "framer-motion";

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
      id: 1,
      title: "PrettyProfile",
      description:
        "Generate a pretty art style profile card from your GitHub data",
      image: "/images/PrettyProfile.png",
      technologies: ["NodeJS", "Vercel"],
      link: "https://github.com/Nighty3098/pretty-profile/",
    },
    {
      id: 1,
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
          <motion.a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{ textDecoration: "none", color: "inherit" }}
            whileHover="hover"
          >
            <motion.div
              className="project-image-wrapper"
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={{
                rest: { y: 0 },
                hover: { y: 0, transition: { duration: 0.3 } },
              }}
            >
              <motion.div className="project-header">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  variants={{
                    rest: { scale: 1 },
                    hover: { opacity: 0, transition: { duration: 0.3 } },
                  }}
                />
                <motion.h3 className="project-title">{project.title}</motion.h3>
              </motion.div>
              <motion.div
                className="project-description-overlay"
                variants={{
                  rest: { opacity: 0 },
                  hover: { opacity: 1, transition: { duration: 0.3 } },
                }}
              >
                “ {project.description} „
              </motion.div>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

export default Projects;
