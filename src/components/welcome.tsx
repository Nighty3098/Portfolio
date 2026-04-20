import { motion } from "framer-motion";
import React from "react";
import GitHubStats from "./github_stats";
import { useState } from "react";

interface NavigationProps {
  onGitHubStatsClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onGitHubStatsClick }) => {
  const navItems = [
    { text: "PROJECTS", href: "#projects" },
    { text: "CONTACTS", href: "#my-contacts" },
    { text: "GITHUB", action: onGitHubStatsClick },
  ];

  return (
    <motion.div
      className="navigation"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 0 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
      }}
    >
      {navItems.map((item, index) => {
        if (item.action) {
          return (
            <motion.button
              key={item.text}
              onClick={item.action}
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ letterSpacing: "10px", color: "var(--accent)" }}
              style={{
                margin: "0 10px",
                color: "var(--fg)",
                background: "transparent",
                border: "none",
                fontSize: "1rem",
                letterSpacing: "5px",
                cursor: "pointer",
                fontWeight: "bolder",
              }}
              transition={{ duration: 0.5 }}
            >
              {item.text}
            </motion.button>
          );
        }

        return (
          <motion.a
            key={item.text}
            href={item.href}
            variants={{
              hidden: { opacity: 0, y: -100 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ letterSpacing: "10px", color: "var(--accent)" }}
            style={{ margin: "0 10px", color: "var(--fg)" }}
            transition={{ duration: 0.5 }}
          >
            {item.text}
          </motion.a>
        );
      })}
    </motion.div>
  );
};

function WelcomePage() {
  const [githubStatsOpen, setGitHubStatsOpen] = useState(false);

  return (
    <motion.div
      className="welcome-block content"
      initial="hidden"
      animate="visible"
      style={{ backgroundColor: "var(--bg-2)" }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      <Navigation onGitHubStatsClick={() => setGitHubStatsOpen(true)} />
      <GitHubStats show={githubStatsOpen} onClose={() => setGitHubStatsOpen(false)} />
      <motion.div
        className="welcome-tiling"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="welcome-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.0 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            S.Artem
          </motion.h1>
          <motion.div
            style={{
              width: "100%",
              padding: "0px",
              margin: "0px",
              height: "auto",
            }}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
          >
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Backend Developer | Freelancer
            </motion.p>
          </motion.div>
        </motion.div>
        <motion.img
          src="me.png"
          className="avatar-image"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default WelcomePage;
