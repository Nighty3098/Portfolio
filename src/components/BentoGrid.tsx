import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Modal } from "./modal";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  title: string;
  info: string;
  description: string;
  images: string[];
  link: string;
  id: number;
  index: number;
  technologies: string[];
}

interface BentoGridProps {
  projects: ProjectItem[];
}

const cellStyles = [
  "bento-cell-wide",
  "",
  "",
  "bento-cell-wide",
  "",
  "",
  "bento-cell-wide",
  "",
  "",
];

function BentoGrid({ projects }: BentoGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".bento-cell");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.85, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power4.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={ref} className="bento-grid">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`bento-cell ${cellStyles[i]}`.trim()}
            onClick={() => setModalProject(p)}
          >
            <div className="bento-cell-bg">
              <img src={p.images[0]} alt={p.title} />
              <div className="bento-cell-overlay" />
            </div>
            <div className="bento-cell-content">
              <h3 className="bento-cell-title">{p.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {modalProject && (
        <Modal
          show={!!modalProject}
          onClose={() => setModalProject(null)}
          title={modalProject.title}
          description={modalProject.description}
          images={modalProject.images}
          link={modalProject.link}
        />
      )}
    </>
  );
}

export default BentoGrid;
