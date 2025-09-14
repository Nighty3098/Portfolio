import { motion } from "framer-motion";
import React, { useState } from "react";

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
  if (!show) return null;

  return (
    <div className="modal">
      <section
        className="modal-content"
        style={{
          height: "100vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.stopPropagation();
          } else if (e.key === 'Escape') {
            onClose();
          }
        }}
        tabIndex={0}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title">{title}</h2>
        <img
          src={image}
          alt={title}
          style={{ width: "100%", borderRadius: 6 }}
        />
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          Open
        </a>
        <button
          style={{ position: "fixed", top: 10, right: 10 }}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </section>
    </div>
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
