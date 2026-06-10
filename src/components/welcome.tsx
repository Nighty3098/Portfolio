import { motion } from "framer-motion";
import CatSvg from "./cat";
import { useTranslate } from "../context/I18nContext";

function WelcomePage() {
  const { t } = useTranslate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-inner">
        <motion.div
          className="hero-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="hero-avatar-wrapper">
            <img src="me.png" className="hero-avatar" alt="me" />
          </div>
        </motion.div>
        <motion.h1
          className="hero-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          {t("welcome.name")}
        </motion.h1>
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          {t("welcome.whoami")}
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
        >
          <button
            className="hero-btn hero-btn-primary"
            onClick={() => scrollToSection("projects")}
          >
            {t("nav.projects")}
          </button>
          <button
            className="hero-btn hero-btn-secondary"
            onClick={() => scrollToSection("my-contacts")}
          >
            {t("nav.contacts")}
          </button>
        </motion.div>
      </div>
      <motion.div className="hero-cat">
        <CatSvg />
      </motion.div>
    </section>
  );
}

export default WelcomePage;
