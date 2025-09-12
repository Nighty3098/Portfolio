import { motion } from "framer-motion";

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
            id: 1,
            title: "Thunder",
            description:
                "Thunder is a multi-threaded HTTP HTTPS load testing tool designed for stress-testing web services",
            image: "/images/Thunder.png",
            link: "https://github.com/He4vyL0v3/Thunder/",
        },
        {
            id: 1,
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
            <div className="content-block about-block heavylove_tiling"
            >
                <h1>He4vyL0v3</h1>
            </div>
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
                                {project.description}
                                <motion.a

                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Open
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </motion.a>
                ))}
            </div>
        </section>
    )
}

export default He4vyL0v3
