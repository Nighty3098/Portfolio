import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Modal } from "./modal";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  description: string;
  brief: string;
  images: string[];
  source: string;
  demo: string;
  id: number;
  index: number;
  technologies: string[];
  variant?: "row" | "card";
  inSlider?: boolean;
}

function ProjectCard({
  title,
  description,
  brief,
  images,
  source,
  demo,
  id,
  index,
  variant = "row",
  inSlider = false,
}: Readonly<ProjectCardProps>) {
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (reduce || inSlider) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, rotateZ: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (variant === "row") {
        const fromLeft = index % 2 === 0;
        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: fromLeft ? -90 : 90,
            scale: 0.94,
            rotateZ: fromLeft ? -3 : 3,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            rotateZ: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: (index % 6) * 0.06,
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              once: true,
            },
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, [index, reduce, variant, inSlider]);

  if (variant === "row") {
    return (
      <>
        <button
          ref={cardRef}
          className="project-row"
          onClick={() => setModalOpen(true)}
          style={{ opacity: 0 }}
          type="button"
        >
          <div className="project-row-media">
            <img src={images[0]} alt={title} loading="lazy" decoding="async" />
            <div className="project-row-overlay">
              <p className="project-row-brief">{brief}</p>
            </div>
          </div>
          <div className="project-row-cap">
            <h3 className="project-row-name">{title}</h3>
            <span className="project-row-arrow" aria-hidden="true">
              →
            </span>
          </div>
        </button>

        <Modal
          show={modalOpen}
          onClose={() => setModalOpen(false)}
          title={title}
          description={description}
          images={images}
          source={source}
          demo={demo}
        />
      </>
    );
  }

  return (
    <>
      <button
        ref={cardRef}
        className="project-card"
        onClick={() => setModalOpen(true)}
        style={{ opacity: 0 }}
        type="button"
      >
        <div className="project-card-media">
          <img src={images[0]} alt={title} loading="lazy" decoding="async" />
          <div className="project-card-overlay">
            <p className="project-card-brief">{brief}</p>
          </div>
        </div>
        <h3 className="project-card-title">{title}</h3>
      </button>

      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        description={description}
        images={images}
        source={source}
        demo={demo}
      />
    </>
  );
}

export default ProjectCard;