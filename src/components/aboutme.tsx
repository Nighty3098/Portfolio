import { motion } from "framer-motion";
import { useTranslate } from "../context/I18nContext";

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
  const { t } = useTranslate();
  const aboutTexts = ["about.p1", "about.p2", "about.p3", "about.p4"];

  return (
    <motion.div
      id="about-me"
      className="content-block about-block content about-section-wrapper"
      style={{}}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="spacer-h-150 mobile"></div>
      <div className="about-section-container">
        <motion.h2 variants={itemVariants}>{t("about.title")}</motion.h2>
        {aboutTexts.map((key, i) => (
          <motion.p key={i} variants={itemVariants}>
            {t(key)}
          </motion.p>
        ))}
      </div>
      <div className="spacer-h-100 mobile"></div>
      <motion.div
        variants={itemVariants}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="me.png" alt="me" className="about-avatar" />
      </motion.div>
    </motion.div>
  );
}

export default AboutMePage;
