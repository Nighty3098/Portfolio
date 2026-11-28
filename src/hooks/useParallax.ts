import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scrolls an oversized element inside its clipping container.
 * The container keeps its place in the layout while the element travels
 * from its top edge to its bottom edge as the container crosses the viewport.
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>,
) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const container = containerRef.current;
    if (!el || !container) return;

    if (reduce) {
      gsap.set(el, { clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: () => Math.min(0, container.clientHeight - el.offsetHeight),
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [ref, containerRef, reduce]);
}
