import gsap from "gsap";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useTranslate } from "../context/I18nContext";

interface CarouselProps {
  images: string[];
  title: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, title }) => {
  const { t } = useTranslate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const transitioningRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const goTo = useCallback((newIndex: number) => {
    if (transitioningRef.current || !imgRef.current) return;
    transitioningRef.current = true;

    const img = imgRef.current;
    gsap.to(img, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        setCurrentIndex(newIndex);
      },
    });
  }, []);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (transitioningRef.current) {
      gsap.to(img, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          transitioningRef.current = false;
        },
      });
    } else {
      gsap.set(img, { opacity: 1 });
    }
  }, [currentIndex]);

  const goToNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      goTo((currentIndex + 1) % images.length);
    },
    [currentIndex, images.length, goTo],
  );

  const goToPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      goTo((currentIndex - 1 + images.length) % images.length);
    },
    [currentIndex, images.length, goTo],
  );

  useEffect(() => {
    if (images.length <= 1 || !isAutoPlaying) return;
    intervalRef.current = setInterval(() => {
      if (transitioningRef.current) return;
      goTo((currentIndex + 1) % images.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, images.length, currentIndex, goTo]);

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
        <div
          className="carousel-image-container"
          style={{ position: "relative", background: "var(--bg)" }}
        >
          <img
            ref={imgRef}
            src={images[currentIndex]}
            alt={`${title} - ${currentIndex + 1}`}
            className="carousel-image carousel-image-modal"
            style={{
              position: "relative",
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
        {images.length > 1 && (
          <>
            <button
              className="carousel-btn carousel-btn-prev"
              onClick={goToPrev}
              aria-label={t("project_card.prev_image")}
            />
            <button
              className="carousel-btn carousel-btn-next"
              onClick={goToNext}
              aria-label={t("project_card.next_image")}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  images: string[];
  demo: string;
  source: string;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  description,
  images,
  demo,
  source,
}) => {
  const { t } = useTranslate();
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
    <dialog ref={dialogRef} className="modal" onClick={handleClose}>
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
        <Carousel images={images} title={title} />
        <p>{description}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--spacing-m)",
          }}
        >
          {source && source.trim() !== "" && (
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link"
            >
              {t("project_card.source")}
            </a>
          )}

          {demo && demo.trim() !== "" && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link"
            >
              {t("project_card.demo")}
            </a>
          )}
        </div>
      </section>
    </dialog>
  );
};

export { Modal, Carousel };
