import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  info: string;
  image: string;
  link: string;
  id: number;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
  link: string;
}

function useInView(ref: React.RefObject<Element | null>, options?: IntersectionObserverInit) {
  const [inView, setInView] = React.useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      options
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return inView;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  description,
  image,
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
            <img
              src={image}
              alt={title}
              style={{ width: "100%", borderRadius: 6 }}
            />
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
  image,
  link,
  id,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(cardRef, { threshold: 0.1 });

  return (
    <>
      <motion.div
        key={id}
        ref={cardRef}
        className="project-card"
        style={{ cursor: "grab" }}
        onClick={() => setModalOpen(true)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            <motion.img
              src={image}
              alt={title}
              className="project-image"
              variants={{
                rest: { scale: 1 },
                hover: { opacity: 0, transition: { duration: 0.3 } },
              }}
            />
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
        image={image}
        link={link}
      />
    </>
  );
};

export default ProjectCard;
