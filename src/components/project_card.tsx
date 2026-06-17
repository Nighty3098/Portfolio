import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslate } from "../context/I18nContext";
import gsap from "gsap";

interface ProjectCardProps {
  title: string;
  description: string;
  info: string;
  images: string[];
  link: string;
  id: number;
  index: number;
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
  const [fadeOut, setFadeOut] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(currentIndex);
  const transitioningRef = useRef(false);

  currentIndexRef.current = currentIndex;

  const completeTransition = useCallback(() => {
    setFadeOut(null);
    transitioningRef.current = false;
  }, []);

<<<<<<< Updated upstream
  const goToNext = useCallback(() => {
    if (transitioningRef.current) return;
    const idx = currentIndexRef.current;
    transitioningRef.current = true;
    setFadeOut(images[idx]);
    setCurrentIndex((idx + 1) % images.length);
  }, [images]);

  const goToPrev = useCallback(() => {
    if (transitioningRef.current) return;
    const idx = currentIndexRef.current;
    transitioningRef.current = true;
    setFadeOut(images[idx]);
    setCurrentIndex((idx - 1 + images.length) % images.length);
  }, [images]);

  const goToIndex = useCallback(
    (index: number) => {
      if (transitioningRef.current) return;
      const idx = currentIndexRef.current;
      transitioningRef.current = true;
      setFadeOut(images[idx]);
      setCurrentIndex(index);
=======
  const goToNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setFadeOut(images[currentIndexRef.current]);
      setCurrentIndex((currentIndexRef.current + 1) % images.length);
    },
    [images],
  );

  const goToPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setFadeOut(images[currentIndexRef.current]);
      setCurrentIndex((currentIndexRef.current - 1 + images.length) % images.length);
>>>>>>> Stashed changes
    },
    [images],
  );

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setFadeOut(images[currentIndexRef.current]);
      setCurrentIndex((currentIndexRef.current + 1) % images.length);
    }, 3000);
  }, [images]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (images.length > 1 && isAutoPlaying) {
      startAutoPlay();
    }
    return () => stopAutoPlay();
  }, [images.length, isAutoPlaying, startAutoPlay, stopAutoPlay]);

  if (images.length === 0) return null;

  return (
    <div
      className="carousel-container carousel-modal"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => { if (images.length > 1) setIsAutoPlaying(true); }}
    >
      <div className="carousel-wrapper">
        <div className="carousel-image-container">
          <img
            src={images[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            className="carousel-image carousel-image-modal"
            style={{ position: "absolute", inset: 0 }}
          />
          {fadeOut && (
            <motion.img
              key={fadeOut}
              src={fadeOut}
              alt=""
              className="carousel-image carousel-image-modal"
              style={{ position: "absolute", inset: 0 }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onAnimationComplete={completeTransition}
            />
          )}
        </div>
        {images.length > 1 && (
          <>
<<<<<<< Updated upstream
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

            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
                  onClick={() => goToIndex(index)}
                  aria-label={t("project_card.go_to_image", { n: index + 1 })}
                />
              ))}
            </div>
=======
            <button className="carousel-btn carousel-btn-prev" onClick={goToPrev} aria-label={t("project_card.prev_image")}>‹</button>
            <button className="carousel-btn carousel-btn-next" onClick={goToNext} aria-label={t("project_card.next_image")}>›</button>
>>>>>>> Stashed changes
          </>
        )}
      </div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ show, onClose, title, description, images, link, t }) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (show) {
      dialogRef.current?.showModal();
      document.addEventListener("keydown", handleEscKey);
      document.body.style.overflow = "hidden";
    } else {
      dialogRef.current?.close();
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "unset";
    };
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.dialog
          ref={dialogRef}
          className="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            className="modal-content modal-content-scrollable"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label={t("project_card.close")} className="modal-close-btn">✕</button>
            <h2>{title}</h2>
            <Carousel images={images} title={title} t={t} />
            <p>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="modal-link">
              {t("project_card.open")}
            </a>
          </motion.section>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  info,
  images,
  link,
  id,
  index,
}) => {
  const { t } = useTranslate();
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setHovered(true);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 0.97,
        duration: 0.6,
        ease: "spring(0.6, 100, 8)",
        overwrite: "auto",
      });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.6,
        ease: "spring(0.6, 100, 8)",
        overwrite: "auto",
      });
    }
  };

  return (
    <>
      <motion.div
        key={id}
<<<<<<< Updated upstream
        className="project-card project-card-grab"
        onClick={() => setModalOpen(true)}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
=======
        ref={cardRef}
        className="project-card"
        onClick={() => setModalOpen(true)}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
>>>>>>> Stashed changes
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
<<<<<<< Updated upstream
        <motion.div
          className="project-image-wrapper"
          initial="rest"
          animate="rest"
          whileHover="hover"
          variants={{
            rest: { y: 0 },
            hover: { y: 0, transition: { duration: 0.3 } },
          }}
        >
          <motion.div className="project-header">
            <Carousel images={images} title={title} isModal={false} t={t} />
            <motion.h3 className="project-title">{title}</motion.h3>
          </motion.div>
          <motion.div
            className="project-description-overlay"
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1, transition: { duration: 0.3 } },
            }}
          >
            {info}
          </motion.div>
        </motion.div>
=======
        <div className="project-image-wrapper">
          <img
            src={images[0]}
            alt={title}
            className="project-image-preview"
            loading="lazy"
          />
          {images.length > 1 && (
            <motion.img
              src={images[1]}
              alt=""
              className="project-image-hover"
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          )}
          <div className="project-overlay">
            <div className="project-overlay-content">
              <span className="project-overlay-tech">
                {technologies.join(" / ")}
              </span>
            </div>
          </div>
        </div>
        <div className="project-info">
          <h3 className="project-name">{title}</h3>
          <p className="project-tagline">{info}</p>
        </div>
>>>>>>> Stashed changes
      </motion.div>

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
