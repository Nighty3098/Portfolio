import ProjectCard from "./project_card";
const projectsData = {
  projects: [
    {
      id: 1,
      title: "The OWL",
      description:
        "OWL is a powerful and intuitive desktop application for managing projects, boards, columns, and tasks, designed specifically for developers. It features a seamless interface, advanced statistics, keyboard shortcuts, and deep integration with the OWL_BACKEND REST API.",
      image: "/images/the_owl.png",
      technologies: ["React", "TypeScript"],
      link: "https://owl-gamma.vercel.app/",
    },
    {
      id: 2,
      title: "OWL Rest API",
      description:
        "OWL API is a microservice-based RESTful API for project, board, and task management, featuring user authentication, subscription management, and admin monitoring. All services are built with Flask, use PostgreSQL, and are orchestrated via Docker Compose.",
      image: "/images/owl_rest_api.png",
      technologies: ["Python", "Flask", "PostgreSQL"],
      link: "https://owl-gamma.vercel.app/",
    },
    {
      id: 3,
      title: "IPSA",
      description: "IPSA is a Telegram bot designed to provide users with stock market insights, including price predictions, news parsing, and fundamental analysis. Built using the Pyrogram library, the bot integrates with a deep learning model for stock price forecasting, a news parser for real-time market updates, and a database for user and stock management. The bot supports user authentication, stock tracking, and admin controls, with a token-based system for accessing premium features. The project leverages TensorFlow for stock price predictions, yfinance for financial data, and BeautifulSoup for web scraping. It includes asynchronous news parsing, real-time notifications, and report generation in Excel format.",
      image: "/images/IPSA.png",
      technologies: ["Python", "Tensorflow", "Keras", "Pyrogram"],
      link: "https://github.com/Nighty3098/InvestingAssistant/",
    },
    {
      id: 4,
      title: "IPSA AI MODEL",
      description: "This project implements a deep learning model for predicting stock prices using historical stock market data. The model leverages a combination of Convolutional Neural Networks (CNNs), Bidirectional Gated Recurrent Units (GRUs), and an Attention mechanism to capture temporal patterns and dependencies in stock data. The model is trained on a dataset containing multiple stock tickers and predicts the closing price based on a sequence of historical data. The codebase is written in Python, utilizing TensorFlow for model building, scikit-learn for preprocessing, and pandas for data handling. The model is designed to process multiple stock tickers, scale the data, create sequences for training, and evaluate performance using metrics like Mean Absolute Error (MAE), Mean Squared Error (MSE), and R² score.",
      image: "/images/ipsa_model.png",
      technologies: ["Python", "Tensorflow", "Keras"],
      link: "https://github.com/Nighty3098/IPSA_MODEL/",
    },
    {
      id: 5,
      title: "PrettyProfile",
      description:
        "Pretty Banner is a Next.js-based service for generating beautiful, customizable SVG banners with GitHub profile statistics. It is designed for use in GitHub READMEs, personal websites, and dashboards, providing visually appealing, themeable, and informative profile cards.",
      image: "/images/PrettyProfile.png",
      technologies: ["NodeJS", "Vercel"],
      link: "https://pretty-profile.vercel.app/",
    },
    {
      id: 6,
      title: "LogInsight",
      description:
        "LogInsight empowers developers and system administrators to monitor, filter, and analyze logs with ease. Whether you're debugging applications or tracking system performance, LogInsight provides real-time insights with a user-friendly cli.",
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
