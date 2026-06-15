import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeProps {
  text: string;
  speed?: number;
}

function Marquee({ text, speed = 300 }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const item = track.querySelector<HTMLElement>(".marquee-item");
    if (!item) return;

    const itemWidth = item.offsetWidth;

    gsap.to(track, {
      x: -itemWidth,
      duration: itemWidth / speed,
      ease: "none",
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf(track);
      gsap.set(track, { x: 0 });
    };
  }, [text, speed]);

  return (
    <div className="marquee">
      <div ref={trackRef} className="marquee-track">
        <span className="marquee-item">{text}</span>
        <span className="marquee-item">{text}</span>
      </div>
    </div>
  );
}

export default Marquee;
