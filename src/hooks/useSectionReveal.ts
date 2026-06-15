import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimation {
  el: HTMLElement;
  split: SplitType;
  tl: gsap.core.Timeline;
  type: string;
}

const active = new Map<HTMLElement, ScrollAnimation>();

function initElement(el: HTMLElement): ScrollAnimation | null {
  const type = el.getAttribute('data-reveal') || 'letters';
  const config = type === 'letters' || type === 'letters-random'
    ? { types: 'chars' as const }
    : { types: 'words' as const };

  let split: SplitType;
  try {
    split = new SplitType(el, { types: config.types });
  } catch {
    return null;
  }

  const targets = config.types === 'chars' ? split.chars : split.words;
  if (!targets || targets.length === 0) {
    try { split.revert(); } catch {}
    return null;
  }

  const vars: gsap.TweenVars = {};

  switch (type) {
    case 'letters':
      Object.assign(vars, { yPercent: 100, duration: 0.8, ease: 'power3.out', stagger: { amount: 0.2 } });
      break;
    case 'words':
      Object.assign(vars, { yPercent: 100, duration: 0.8, ease: 'power3.out', stagger: { amount: 0.5 } });
      break;
    case 'words-right':
      Object.assign(vars, { x: '1em', duration: 0.6, ease: 'power2.out', stagger: { amount: 0.2 } });
      break;
    case 'letters-random':
      Object.assign(vars, { duration: 0.01, ease: 'power1.out', stagger: { amount: 0.4, from: 'random' } });
      break;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });

  tl.from(targets, { opacity: 0, ...vars });

  const anim: ScrollAnimation = { el, split, tl, type };
  active.set(el, anim);
  return anim;
}

function cleanupElement(el: HTMLElement) {
  const anim = active.get(el);
  if (!anim) return;
  if (anim.tl.scrollTrigger) anim.tl.scrollTrigger.kill();
  anim.tl.kill();
  try { anim.split.revert(); } catch {}
  active.delete(el);
}

export function useSectionReveal(
  containerRef: { current: HTMLElement | null },
  deps: React.DependencyList = [],
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>('[data-reveal]');

    const anims: ScrollAnimation[] = [];
    elements.forEach(el => {
      const anim = initElement(el);
      if (anim) anims.push(anim);
    });

    return () => {
      elements.forEach(el => cleanupElement(el));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
