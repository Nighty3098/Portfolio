import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useState, useRef, useEffect } from "react";
import { Modal } from "./modal";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  description: string;
  info: string;
  brief: string;
  images: string[];
  link: string;
  id: number;
  index: number;
  technologies: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  brief,
  images,
  link,
  id,
  index,
  technologies,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hovered && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setImgIndex((prev) => (prev + 1) % images.length);
      }, 800);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [hovered, images.length]);

  useEffect(() => {
    if (!hovered) setImgIndex(0);
  }, [hovered]);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const tween = gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      },
    );
    return () => { tween.kill(); };
  }, [index]);

  return (
    <>
      <div
        key={id}
        ref={cardRef}
        className="project-card"
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="project-image-wrapper">
          <img
            key={images[imgIndex]}
            src={images[imgIndex]}
            alt={title}
            className="project-image-preview"
          />
          <div className="project-card-overlay">
            <p className="project-card-brief">{brief}</p>
          </div>
        </div>
        <div className="project-info">
          <h3 className="project-name">{title}</h3>
        </div>
      </div>

      <Modal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        description={description}
        images={images}
        link={link}
      />
    </>
  );
};

export default ProjectCard;
