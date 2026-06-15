import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTranslate } from "../context/I18nContext";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface ProjectCardProps {
  title: string;
  description: string;
  info: string;
  images: string[];
  link: string;
  technologies: string[];
  id: number;
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
  isModal?: boolean;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  title,
  isModal = false,
  t,
}) => {
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

  const goToNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (transitioningRef.current) return;
      const idx = currentIndexRef.current;
      transitioningRef.current = true;
      setFadeOut(images[idx]);
      setCurrentIndex((idx + 1) % images.length);
    },
    [images],
  );

  const goToPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (transitioningRef.current) return;
      const idx = currentIndexRef.current;
      transitioningRef.current = true;
      setFadeOut(images[idx]);
      setCurrentIndex((idx - 1 + images.length) % images.length);
    },
    [images],
  );

  const goToIndex = useCallback(
    (index: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (transitioningRef.current) return;
      const idx = currentIndexRef.current;
      transitioningRef.current = true;
      setFadeOut(images[idx]);
      setCurrentIndex(index);
    },
    [images],
  );

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (transitioningRef.current) return;
      const idx = currentIndexRef.current;
      transitioningRef.current = true;
      setFadeOut(images[idx]);
      setCurrentIndex((idx + 1) % images.length);
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
      className={`carousel-container ${isModal ? "carousel-modal" : "carousel-card"}`}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => {
        if (images.length > 1) {
          setIsAutoPlaying(true);
        }
      }}
    >
      <div className="carousel-wrapper">
        <div className="carousel-image-container">
          <img
            src={images[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            className={`carousel-image ${isModal ? "carousel-image-modal" : ""}`}
            style={{ position: "absolute", inset: 0 }}
          />
          {fadeOut && (
            <motion.img
              key={fadeOut}
              src={fadeOut}
              alt=""
              className={`carousel-image ${isModal ? "carousel-image-modal" : ""}`}
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
                  onClick={(e) => goToIndex(index, e)}
                  aria-label={t("project_card.go_to_image", { n: index + 1 })}
                />
              ))}
            </div>
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

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
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
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
          >
            <div className="spacer-h-50 mobile"></div>
            <motion.button
              onClick={onClose}
              aria-label={t("project_card.close")}
              className="close-button modal-close-button"
            >
              ✕
            </motion.button>
            <div className="modal-header-container">
              <h2>{title}</h2>
            </div>
            <div className="modal-image-container">
              <Carousel images={images} title={title} isModal={true} t={t} />
            </div>
            <p>{description}</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-action-link"
            >
              {t("project_card.open")}
            </a>
            <div className="spacer-h-150"></div>
          </motion.section>
        </motion.dialog>
      )}
    </AnimatePresence>
  );
};

const handleOpenLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  info,
  images,
  link,
  technologies,
  id,
}) => {
  const { t } = useTranslate();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        key={id}
        className="project-card project-card-grab"
        onClick={() => handleOpenLink(link)}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="project-image-wrapper">
          <Carousel images={images} title={title} isModal={false} t={t} />
          <h3 className="project-title">{title}</h3>
        </div>
        <div className="project-info">
          <p className="project-info-text">{info}</p>
        </div>
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
