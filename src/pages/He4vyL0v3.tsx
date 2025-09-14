import ProjectCard from "./../components/project_card";

const projectsData = {
  projects: [
    {
      id: 0,
      title: "Crimson",
      description:
        "Crimson is a remote access tool written in C++ with the ability to build for windows and linux",
      image: "/images/Crimson.png",
      link: "https://github.com/Nighty3098/Crimson/",
    },
    {
      id: 1,
      title: "GhostlyGrabber",
      description:
        "A utility for automatically downloading media files from Telegram channels and chats with convenient storage and organization of content",
      image: "/images/grabber.png",
      link: "https://github.com/He4vyL0v3/GhostlyGrabber/",
    },
    {
      id: 2,
      title: "IStealU",
      description:
        "IStealU is a spyware program for Windows designed to intercept and log user keystrokes, as well as send logs to Telegram via the Telegram API",
      image: "/images/IStealU.png",
      link: "https://github.com/He4vyL0v3/IStealU/",
    },
    {
      id: 3,
      title: "Thunder",
      description:
        "Thunder is a multi-threaded HTTP HTTPS load testing tool designed for stress-testing web services",
      image: "/images/Thunder.png",
      link: "https://github.com/He4vyL0v3/Thunder/",
    },
    {
      id: 4,
      title: "ProxySniffer",
      description:
        "A simple program for obtaining and testing working proxy sheets [ HTTP - HTTPS - SOCKS4 - SOCKS5 ]",
      image: "/images/ProxySniffer.png",
      link: "https://github.com/He4vyL0v3/ProxySniffer",
    },
  ],
};

function He4vyL0v3() {
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
      <div className="content-block about-block heavylove_tiling">
        <h1>He4vyL0v3</h1>
      </div>
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

export default He4vyL0v3;
