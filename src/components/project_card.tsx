import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslate } from "../context/I18nContext";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  description: string;
  info: string;
  images: string[];
  link: string;
  id: number;
  index: number;
  technologies: string[];
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  images: string[];
  link: string;
  t: (key: string, params?: Record<string, string | number>) => string;
}

interface CarouselProps {
  images: string[];
  title: string;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const Carousel: React.FC<CarouselProps> = ({ images, title, t }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const transitioningRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const goToNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images.length],
  );

  const goToPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    const img = imageRef.current?.querySelector("img");
    if (!img) return;
    if (transitioningRef.current) {
      gsap.fromTo(img, { opacity: 0 }, { opacity: 1, duration: 0.4, onComplete: () => { transitioningRef.current = false; } });
    } else {
      gsap.set(img, { opacity: 1 });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return;
    intervalRef.current = setInterval(() => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isAutoPlaying, images.length]);

  if (images.length === 0) return null;

  return (
    <div
      className="carousel-container carousel-modal"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => {
        if (images.length > 1) setIsAutoPlaying(true);
      }}
    >
      <div className="carousel-wrapper">
        <div className="carousel-image-container" ref={imageRef}>
          <img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            className="carousel-image carousel-image-modal"
            style={{ position: "absolute", inset: 0, opacity: 0 }}
          />
        </div>
        {images.length > 1 && (
          <>
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={goToPrev}
              aria-label={t("project_card.prev_image")}
            >
              ‹
            </button>
            <button
              className="carousel-btn carousel-btn-next"
              onClick={goToNext}
              aria-label={t("project_card.next_image")}
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  description,
  images,
  link,
  t,
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.showModal();
    gsap.set(dialog, { opacity: 0 });
    gsap.to(dialog, { opacity: 1, duration: 0.3 });

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    gsap.to(dialog, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        onCloseRef.current();
      },
    });
  };

  if (!show) return null;

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={handleClose}
    >
      <section
        className="modal-content modal-content-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label={t("project_card.close")}
          className="modal-close-btn"
        >
          ✕
        </button>
        <h2>{title}</h2>
        <Carousel images={images} title={title} t={t} />
        <p>{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="modal-link"
        >
          {t("project_card.open")}
        </a>
      </section>
    </dialog>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  images,
  link,
  id,
  index,
  technologies,
}) => {
  const { t } = useTranslate();
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
        t={t}
      />
    </>
  );
};

export default ProjectCard;
