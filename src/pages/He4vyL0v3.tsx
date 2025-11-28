import ProjectCard from "./../components/project_card";

const projectsData = {
  projects: [
    {
      id: 0,
      title: "Crimson",
      info: "Simple RAT written in C++ and Python. (windows / linux)",
      description:
        "Crimson is a remote access tool written in C++ and Python with the ability to build for windows and linux",
      image: "/images/Crimson.png",
      link: "https://github.com/Nighty3098/Crimson/",
    },
    {
      id: 1,
      title: "GhostlyGrabber",
      info: "A utility for automatically downloading media files from Telegram",
      description:
        "A utility for automatically downloading media files from Telegram channels and chats with convenient storage and organization of content",
      image: "/images/grabber.png",
      link: "https://github.com/He4vyL0v3/GhostlyGrabber/",
    },
    {
      id: 2,
      title: "IStealU",
      info: "Keylogger with sending logs via Telegram API",
      description:
        "IStealU is a spyware program for Windows designed to intercept and log user keystrokes, as well as send logs to Telegram via the Telegram API",
      image: "/images/IStealU.png",
      link: "https://github.com/He4vyL0v3/IStealU/",
    },
    {
      id: 3,
      title: "Thunder",
      info: "Simple multi-threaded DoS tool",
      description:
        "Thunder is a multi-threaded HTTP HTTPS load testing tool designed for stress-testing web services",
      image: "/images/Thunder.png",
      link: "https://github.com/He4vyL0v3/Thunder/",
    },
    {
      id: 4,
      title: "ProxySniffer",
      info: "Proxy parser and checker",
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
        padding: "0px",
        width: "calc(100vw)",
        margin: "0px",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="content-block about-block heavylove_tiling"
        style={{
          backgroundColor: "var(--bg-2)",
          width: "100%",
          margin: "0px",
          padding: "0px",
        }}
      >
        <h1 style={{ color: "var(--accent)" }}>He4vyL0v3</h1>
      </div>
      <div className="spacer" style={{ height: "100px" }}></div>
      <div className="projects-grid">
        {projectsData.projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            info={project.info}
            image={project.image}
            link={project.link}
            id={project.id}
          />
        ))}
      </div>
      <div className="spacer" style={{ height: "100px" }}></div>
    </section>
  );
}

export default He4vyL0v3;
