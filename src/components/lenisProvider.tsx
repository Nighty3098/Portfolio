import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisProviderProps {
  children: ReactNode;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.045,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      syncTouch: true,
      touchMultiplier: 0.8,
      orientation: "vertical",
      gestureOrientation: "vertical",
      overscroll: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);

    const observer = new ResizeObserver(() => ScrollTrigger.refresh());
    observer.observe(document.body);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}

export default LenisProvider;
