import { motion } from "framer-motion";
import { useTranslate } from "../context/I18nContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

function AboutMePage() {
  const { t } = useTranslate();
  const aboutTexts = ["about.p1", "about.p2", "about.p3", "about.p4"];

  return (
    <motion.section
      id="about-me"
      className="section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="section-title" variants={itemVariants}>
        {t("about.title")}
      </motion.h2>
      <div className="about-grid">
        <div className="about-text">
          {aboutTexts.map((key, i) => (
            <motion.p key={i} variants={itemVariants}>
              {t(key)}
            </motion.p>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default AboutMePage;
