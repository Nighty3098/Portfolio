import { motion } from "framer-motion";
import CatSvg from "./cat";
import React from "react";

function AboutMePage() {
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
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
        }}
      >
        <h2>About me</h2>
        <p>
          Hello! I am Artem.
        </p>
        <p>
          I am 19 years old, and I spent 5 of them at the SAIKT Programming
          Academy, and now I am studying at SibSUTIS University.
        </p>
        <p>
          I strive to grow in IT and work on large-scale projects that improve
          people's lives.
        </p>
        <p>
          You can check out my open source projects on GitHub and in my
          organizations.
        </p>
      </div>
      <CatSvg />
    </motion.div>
  );
}

export default AboutMePage;
