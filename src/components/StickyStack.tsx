import { useRef, useEffect } from "react";
import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
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

interface StickyStackProps {
  projects: ProjectItem[];
}

function StickyStack({ projects }: StickyStackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        cards,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          stagger: 0.3,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <>
      <div ref={ref} className="sticky-stack-section">
        {projects.map((p) => (
          <div
            key={p.id}
            className="stack-card"
            onClick={() => setModalProject(p)}
          >
            <div className="stack-card-bg">
              <img src={p.images[0]} alt={p.title} />
              <div className="stack-card-overlay" />
            </div>
            <div className="stack-card-content">
              <div className="stack-card-tags">
                {p.technologies.map((tech) => (
                  <span key={tech} className="stack-card-tag">{tech}</span>
                ))}
              </div>
              <h3 className="stack-card-title">{p.title}</h3>
              <p className="stack-card-info">{p.info}</p>
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

export default StickyStack;
