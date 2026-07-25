import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Anime() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { yPercent: 100, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-me",
        start: "top 80%",
        toggleActions: "restart resume none none",
      },
    });

    tl.to(el, { yPercent: 0, duration: 0.6, ease: "power3.out" })
      .to({}, { duration: 5 })
      .to(el, { yPercent: 100, duration: 0.6, ease: "power3.in" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return <img ref={ref} className="anime" alt="anime" src="/02.png" />;
}

export default Anime;
