import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";

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
  id: number;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  images: string[];
  link: string;
}

interface CarouselProps {
  images: string[];
  title: string;
  isModal?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, title, isModal = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
  }, [images.length]);

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

  const goToNext = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev + 1) % images.length);
    if (isAutoPlaying) setTimeout(startAutoPlay, 100);
  };

  const goToPrev = () => {
    stopAutoPlay();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    if (isAutoPlaying) setTimeout(startAutoPlay, 100);
  };

  const goToIndex = (index: number) => {
    stopAutoPlay();
    setCurrentIndex(index);
    if (isAutoPlaying) setTimeout(startAutoPlay, 100);
  };

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
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${title} - ${currentIndex + 1}`}
              className={`carousel-image ${isModal ? "carousel-image-modal" : ""}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>
        </div>

        {images.length > 1 && (
          <>
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={goToPrev}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="carousel-btn carousel-btn-next"
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>

            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
                  onClick={() => goToIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
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
            className="modal-content"
            style={{
              overflowY: "auto",
            }}
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
              <motion.button onClick={onClose} aria-label="Close" className="close-button" style={{ color: "var(--red)", fontSize: "30px", height: "40px", width: "100%", textAlign: "right" }}>
                ✕
              </motion.button>
            <div
              style={{
                backgroundColor: "transparent",
                height: "150px",
                minHeight: "150px",
                width: "100%",
              }}
            ></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ width: "100%", textAlign: "left" }}>{title}</h2>
            </div>
            <div style={{ width: "100%", maxWidth: "800px" }}>
              <Carousel images={images} title={title} isModal={true} />
            </div>
            <p>{description}</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: "var(--bg)",
                padding: "var(--spacing-m)",
                borderRadius: "5px",
                width: "200px",
                textAlign: "center",
              }}
            >
              Open
            </a>
            <div
              style={{
                backgroundColor: "transparent",
                height: "150px",
                minHeight: "150px",
                width: "100%",
              }}
            ></div>
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
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        key={id}
        className="project-card"
        style={{ cursor: "grab" }}
        onClick={() => setModalOpen(true)}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
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
            <Carousel images={images} title={title} isModal={false} />
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
      </motion.div>

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
