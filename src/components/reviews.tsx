import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslate } from "../context/I18nContext";
import ReviewCard from "./review_card";

const slideVariants = {
  enter: (d: number) => ({
    x: d > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({
    x: d > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

function Reviews() {
  const { t, tt } = useTranslate();
  const items = tt("reviews.items") as Array<{ name: string; text: string }>;
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage((prev) => {
        const nextIdx = prev[0] + newDirection;
        if (nextIdx < 0) return [items.length - 1, -1];
        if (nextIdx >= items.length) return [0, 1];
        return [nextIdx, newDirection];
      });
    },
    [items.length],
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paginate]);

  const stopAutoplay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      paginate(1);
    }, 4000);
  }, [paginate, stopAutoplay]);

  const goTo = (i: number) => {
    setPage((prev) => [i, i > prev[0] ? 1 : -1]);
    startAutoplay();
  };

  return (
    <div
      id="reviews"
      className="reviews-page-wrapper"
      onMouseEnter={stopAutoplay}
      onMouseLeave={startAutoplay}
    >
      <div className="content-block reviews-block">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {t("reviews.title_prefix")} <span className="hw">{t("reviews.title_suffix")}</span>
        </motion.h2>
        <div className="reviews-carousel">
          <AnimatePresence custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="reviews-slide"
            >
              <ReviewCard
                name={items[currentIndex]?.name ?? ""}
                text={items[currentIndex]?.text ?? ""}
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="reviews-controls">
          <button
            className="reviews-arrow reviews-arrow-prev"
            onClick={() => paginate(-1)}
            aria-label={t("reviews.prev")}
          >
            ‹
          </button>
          <div className="reviews-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`reviews-dot${i === currentIndex ? " active" : ""}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            className="reviews-arrow reviews-arrow-next"
            onClick={() => paginate(1)}
            aria-label={t("reviews.next")}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
