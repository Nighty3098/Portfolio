import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "../components/projectCard";
import Header from "../components/header";
import Footer from "../components/footer";
import ScrollProgress from "../components/scrollProgress";
import Seo from "../components/SEO";
import { projectsData } from "../components/projects";
import { useTranslate } from "../context/I18nContext";
import { useSectionReveal } from "../hooks/useSectionReveal";

const categories = [
  "all",
  "other",
  "ml",
  "osint",
  "pentest",
  "bots",
  "sites",
] as const;
type Category = (typeof categories)[number];

function AllProjects() {
  const { t, tt, locale } = useTranslate();
  const headRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState<Category>(
    categories.includes(initialCategory as Category)
      ? (initialCategory as Category)
      : "all",
  );

  useSectionReveal(headRef, [locale, activeCategory]);

  const catLabels = tt("projects.categories") as Record<string, string>;

  const items = tt("projects.items") as Array<{
    title: string;
    info: string;
    brief: string;
    description: string;
  }>;

  const all = projectsData.projects
    .filter(
      (p) => activeCategory === "all" || p.categories.includes(activeCategory),
    )
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
      <Seo
        title={t("projects.all_title")}
        description={t("html.description")}
        path="/all-projects"
      />
      <div className="App all-page" key={locale}>
        <ScrollProgress />
        <Header />

        <div ref={headRef} className="page-head">
          <div>
            <h1 className="section-title">{t("projects.all_title")}</h1>
            <a href="#/" className="back-home">
              {t("projects.back_home")}
            </a>
          </div>
        </div>

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

        <div className="projects-grid">
          {all.map((p) => (
            <ProjectCard
              key={p.id}
              title={p.title}
              brief={p.brief}
              description={p.description}
              images={p.images}
              source={p.source}
              demo={p.demo}
              id={p.id}
              index={p.index}
              technologies={p.technologies}
              variant="card"
            />
          ))}
        </div>

        <Footer />
      </div>
    </>
  );
}

export default AllProjects;
