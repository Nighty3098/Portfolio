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

  const goTo = useCallback(
    (newIndex: number) => {
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
    },
    [],
  );

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

interface OriginRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  images: string[];
  link: string;
  originRect?: OriginRect | null;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  description,
  images,
  link,
  originRect,
}) => {
  const { t } = useTranslate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const openTween = useRef<gsap.core.Tween | null>(null);
  const closeTween = useRef<gsap.core.Tween | null>(null);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;
    const content = contentRef.current;
    const ghost = ghostRef.current;
    if (!dialog || !content) return;

    dialog.showModal();

    if (originRect && ghost && images[0]) {
      gsap.set(content, { opacity: 0, display: "none" });
      gsap.set(ghost, {
        opacity: 1,
        display: "block",
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        margin: 0,
        position: "fixed",
        overflow: "hidden",
        zIndex: 1,
        borderRadius: 20,
      });
      gsap.set(dialog, { background: "transparent" });

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      openTween.current = gsap.to(ghost, {
        top: 0,
        left: 0,
        width: vw,
        height: vh,
        duration: 0.5,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(ghost, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              gsap.set(ghost, { display: "none" });
              gsap.set(dialog, { background: "" });
              gsap.set(content, { display: "" });
              gsap.to(content, { opacity: 1, duration: 0.25 });
            },
          });
        },
      });
    } else {
      gsap.set(dialog, { opacity: 0 });
      gsap.to(dialog, { opacity: 1, duration: 0.3 });
    }

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
    const content = contentRef.current;
    const ghost = ghostRef.current;
    if (!dialog) return;

    openTween.current?.kill();
    closeTween.current?.kill();

    if (originRect && ghost && images[0]) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      gsap.to(content, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          gsap.set(content, { display: "none" });
          gsap.set(dialog, { background: "transparent" });

          gsap.set(ghost, {
            display: "block",
            opacity: 1,
            top: 0,
            left: 0,
            width: vw,
            height: vh,
            position: "fixed",
            overflow: "hidden",
            zIndex: 1,
          });

          closeTween.current = gsap.to(ghost, {
            top: originRect.top,
            left: originRect.left,
            width: originRect.width,
            height: originRect.height,
            duration: 0.4,
            ease: "power3.in",
            onComplete: () => {
              onCloseRef.current();
            },
          });
        },
      });
    } else {
      gsap.to(dialog, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          onCloseRef.current();
        },
      });
    }
  };

  if (!show) return null;

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={handleClose}
    >
      <div
        ref={ghostRef}
        className="modal-ghost"
        style={{ display: "none" }}
      >
        <img
          src={images[0]}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <section
        ref={contentRef}
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

export { Modal, Carousel };
