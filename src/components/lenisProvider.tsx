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

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

function LenisProvider({ children }: Readonly<LenisProviderProps>) {
  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1.2,
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

    let refreshId: number | undefined;
    const observer = new ResizeObserver(() => {
      clearTimeout(refreshId);
      refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    });
    observer.observe(document.body);

    return () => {
      clearTimeout(refreshId);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      observer.disconnect();
    };
  }, []);

  return <>{children}</>;
}

export default LenisProvider;
