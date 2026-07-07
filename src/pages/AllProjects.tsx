import { useEffect, useRef } from "react";
import BentoGrid from "../components/BentoGrid";
import Header from "../components/Header";
import Footer from "../components/footer";
import ScrollProgress from "../components/ScrollProgress";
import SEO from "../components/SEO";
import { projectsData } from "../components/projects";
import { useTranslate } from "../context/I18nContext";
import { useTheme } from "../context/ThemeContext";
import { preloadImages, allProjectImages } from "../utils/preloadImages";

function AllProjects() {
  const { t, tt, locale } = useTranslate();
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    preloadImages(allProjectImages);
  }, []);

  const items = tt("projects.items") as Array<{
    title: string;
    info: string;
    description: string;
  }>;

  const all = projectsData.projects.map((p, i) => ({
    ...p,
    title: items[p.id - 1]?.title ?? "",
    info: items[p.id - 1]?.info ?? "",
    description: items[p.id - 1]?.description ?? "",
    index: i,
  }));

  return (
    <>
      <SEO title={t("projects.all_title")} description={t("html.description")} path="/all-projects" />
      <div className="App" key={`${locale}-${theme}`}>
        <ScrollProgress />
        <Header />
      <section
        ref={ref}
        className="content-block content projects-block projects-page-wrapper all-projects-page"
      >
        <h2>{t("projects.all_title")}</h2>
        <BentoGrid projects={all} />
      </section>
        <Footer />
      </div>
    </>
  );
}

export default AllProjects;
