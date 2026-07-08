import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BentoGrid from "../components/BentoGrid";
import Header from "../components/Header";
import Footer from "../components/footer";
import ScrollProgress from "../components/ScrollProgress";
import SEO from "../components/SEO";
import { projectsData } from "../components/projects";
import { useTranslate } from "../context/I18nContext";
import { useTheme } from "../context/ThemeContext";
import { preloadImages, allProjectImages } from "../utils/preloadImages";

const categories = ["all", "dev", "osint", "pentest", "bots"] as const;
type Category = (typeof categories)[number];

function AllProjects() {
  const { t, tt, locale } = useTranslate();
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState<Category>(
    categories.includes(initialCategory as Category) ? (initialCategory as Category) : "all"
  );

  useEffect(() => {
    preloadImages(allProjectImages);
  }, []);

  const catLabels = tt("projects.categories") as Record<string, string>;

  const items = tt("projects.items") as Array<{
    title: string;
    info: string;
    brief: string;
    description: string;
  }>;

  const all = projectsData.projects
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .map((p, i) => ({
      ...p,
      title: items[p.id - 1]?.title ?? "",
      info: items[p.id - 1]?.info ?? "",
      brief: items[p.id - 1]?.brief ?? "",
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
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(cat);
                setSearchParams(cat === "all" ? {} : { category: cat });
              }}
            >
              {catLabels[cat]}
            </button>
          ))}
        </div>
        <BentoGrid projects={all} uniform={activeCategory !== "all"} />
      </section>
        <Footer />
      </div>
    </>
  );
}

export default AllProjects;