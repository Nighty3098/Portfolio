import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from "react";

interface GitHubStatsProps {
  show: boolean;
  onClose: () => void;
}

const GitHubStats: React.FC<GitHubStatsProps> = ({ show, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
            <motion.button
              onClick={onClose}
              aria-label="Close"
              className="close-button"
              style={{
                color: "var(--red)",
                fontSize: "30px",
                height: "40px",
                width: "100%",
                textAlign: "right",
              }}
            >
              ✕
            </motion.button>
            <div
              style={{
                backgroundColor: "transparent",
                height: "50px",
                minHeight: "50px",
                width: "100%",
              }}
            ></div>
            <h2>GitHub Stats</h2>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
                gap: "var(--spacing-xl)",
              }}
            >
              <p>GitHub statistics coming soon...</p>
            </div>
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

export default GitHubStats;
