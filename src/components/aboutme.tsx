import { motion } from "framer-motion";
import CatSvg from "./cat";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function AboutMePage() {
  const aboutTexts = [
    "Hello! I am Artem.",
    "I am 19 years old, and I spent 5 of them at the SAIKT Programming Academy, and now I am studying at SibSUTIS University.",
    "I strive to grow in IT and work on large-scale projects that improve people's lives.",
    "You can check out my open source projects on GitHub and in my organizations.",
  ];

  return (
    <motion.div
      id="about-me"
      className="content-block about-block content"
      style={{
        height: "auto",
        minHeight: "100vh",
        padding: "var(--spacing-xl)",
        width: "calc(100% - var(--spacing-xl) - var(--spacing-xl))",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          gap: "var(--spacing-l)",
          padding: "0px",
          margin: "0px",
          width: "100%",
        }}
      >
        <motion.h2 variants={itemVariants}>About me</motion.h2>
        {aboutTexts.map((text, i) => (
          <motion.p key={i} variants={itemVariants}>
            {text}
          </motion.p>
        ))}
      </div>
      <motion.div variants={itemVariants}>
        <CatSvg />
      </motion.div>
    </motion.div>
  );
}

export default AboutMePage;
