import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
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
              height: "100vh",
              overflowY: "auto",
            }}
            initial={{ y: "200px", opacity: 0 }}
            animate={{ y: "0px", opacity: 1 }}
            exit={{ y: "200px", opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
          >
            <div style={{ backgroundColor: "transparent", height: "200px", minHeight: "200px", width: "100%" }} ></div>
            <div style={{ width: "100%", display: "flex", flexDirection: "row-reverse", alignItems: "center", alignContent: "center", justifyContent: "space-between" }}>
              <button
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
              <h2 style={{ width: "100%", textAlign: "left" }}>{title}</h2>
            </div>
            <img
              src={image}
              alt={title}
              style={{ width: "100%", borderRadius: 6 }}
            />
            <p>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">
              Open
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
  image,
  link,
  id,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        key={id}
        className="project-card"
        style={{ cursor: "pointer" }}
        onClick={() => setModalOpen(true)}
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
            {description}
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
