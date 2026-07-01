import { useRef, useEffect, useState } from "react";
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

interface HorizontalPanProps {
  projects: ProjectItem[];
}

function HorizontalPan({ projects }: HorizontalPanProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [modalProject, setModalProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (reduce || !wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        gsap.utils.toArray<HTMLElement>(".pan-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, wrap);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <>
      <section ref={wrap} className="horizontal-pan-section">
        <div ref={track} className="horizontal-pan-track">
          {projects.map((p) => (
            <div
              key={p.id}
              className="pan-card"
              onClick={() => setModalProject(p)}
            >
              <div className="pan-card-image-wrap">
                <img src={p.images[0]} alt={p.title} className="pan-card-image" />
                <div className="pan-card-gradient" />
              </div>
              <div className="pan-card-body">
                <div className="pan-card-tags">
                  {p.technologies.map((tech) => (
                    <span key={tech} className="pan-card-tag">{tech}</span>
                  ))}
                </div>
                <h3 className="pan-card-title">{p.title}</h3>
                <p className="pan-card-info">{p.info}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

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

export default HorizontalPan;
