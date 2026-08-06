import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useTheme } from "../context/ThemeContext";

const BAYER: number[][] = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

const FALLBACK_BASE: [number, number, number] = [228, 226, 220];

const ALPHA = 6;
const BETA_1 = 0.08;
const BETA_2 = 0.09;
const OMEGA_1 = 0.6;
const OMEGA_2 = 0.5;

const K1_X = 0.09;
const K1_Y = 0;
const K2_X = 0;
const K2_Y = 0.11;
const K3_X = 0.06;
const K3_Y = 0.06;
const PHI_1 = 0.9;
const PHI_2 = -0.7;
const PHI_3 = 0.5;

const J_R = 0.7885;
const J_OMEGA = 0.15;
const J_SPAN = 3.4;
const J_ZOOM_AMPL = 0.12;
const J_ZOOM_FREQ = 0.3;
const J_MAX_ITER = 96;
const J_GAMMA = 0.6;
const J_BRIGHT = 0.88;

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function cssVarToRgb(name: string): [number, number, number] | null {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) return null;
  if (value.startsWith("#")) return hexToRgb(value);
  const m = value.match(/^rgb\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function hashNoise(x: number, y: number): number {
  let r = (x * 374761393 + y * 668265263) | 0;
  r = (r ^ (r >> 13)) * 1274126177;
  return ((r ^ (r >> 16)) >>> 0) / 4294967295;
}

interface HeroCanvasProps {
  scale?: number;
  className?: string;
  julia?: boolean;
}

function HeroCanvas({
  scale = 4,
  className = "",
  julia = false,
}: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const { theme } = useTheme();

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const canvas = c;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    let running = false;
    let started = false;
    let inView = true;
    let width = 0;
    let height = 0;
    let imageData: ImageData | null = null;
    let juliaVal: Float32Array | null = null;
    let rafId = 0;

    const baseVar = theme === "light" ? "--bg-4" : "--fg";
    const base = cssVarToRgb(baseVar) ?? FALLBACK_BASE;
    const bgColor = cssVarToRgb("--bg") ?? [14, 14, 14];
    const tones = [0.12, 0.26, 0.44, 0.66].map((j) => [
      Math.round(base[0] * j),
      Math.round(base[1] * j),
      Math.round(base[2] * j),
    ]);

    const pointer = { x: -1e4, y: -1e4 };

    function computeJulia(t: number) {
      if (!juliaVal || !width) return;
      const w = width;
      const h = height;
      const theta = t * J_OMEGA;
      const cr = J_R * Math.cos(theta);
      const ci = J_R * Math.sin(theta);
      const zoom = 1 + J_ZOOM_AMPL * Math.sin(t * J_ZOOM_FREQ);
      const spanX = J_SPAN / zoom;
      const spanY = (spanX * h) / w;
      const focusX = w / 2;
      const focusY = h / 2;
      const v = juliaVal;

      for (let y = 0; y < h; y++) {
        const fy = ((y - focusY) / h) * spanY;
        for (let x = 0; x < w; x++) {
          const fx = ((x - focusX) / w) * spanX;
          let zx = fx;
          let zy = fy;
          let zsq = zx * zx + zy * zy;
          let iter = 0;
          while (zsq <= 4 && iter < J_MAX_ITER) {
            const ny = 2 * zx * zy + ci;
            zx = zx * zx - zy * zy + cr;
            zy = ny;
            zsq = zx * zx + zy * zy;
            iter++;
          }
          let mu: number;
          if (iter === J_MAX_ITER) {
            mu = 1;
          } else {
            mu = (iter + 1 - Math.log(0.5 * Math.log(zsq)) / Math.LN2) / J_MAX_ITER;
          }
          v[y * w + x] = Math.pow(Math.min(1, mu), J_GAMMA) * J_BRIGHT + 0.12;
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width / scale));
      height = Math.max(1, Math.round(rect.height / scale));
      canvas.width = width;
      canvas.height = height;
      imageData = context.createImageData(width, height);
      const data = imageData.data;
      for (let i = 3; i < data.length; i += 4) data[i] = 255;
      if (julia) juliaVal = new Float32Array(width * height);
    }

    function render(time: number) {
      if (!imageData) return;
      const data = imageData.data;
      const t = time * 1e-3;
      const px = pointer.x / scale;
      const py = pointer.y / scale;

      if (julia && juliaVal) computeJulia(t);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const j = y * width + x;
          const o = j * 4;

          let base: number;
          if (julia && juliaVal) {
            base = juliaVal[j];
          } else {
            const sx = x + ALPHA * Math.sin(BETA_1 * y + OMEGA_1 * t);
            const sy = y + ALPHA * Math.cos(BETA_2 * x - OMEGA_2 * t);

            const f0 =
              (1 / 6) *
                (Math.sin(K1_X * sx + K1_Y * sy + PHI_1 * t) +
                  Math.sin(K2_X * sx + K2_Y * sy + PHI_2 * t) +
                  Math.sin(K3_X * sx + K3_Y * sy + PHI_3 * t)) +
              0.12;

            const dx = x - px;
            const dy = y - py;
            const dist = dx * dx + dy * dy;
            const pi = dist < 1100 ? (1 - dist / 1100) * 0.4 : 0;

            base = f0 + pi;
          }

          const epsilon = (hashNoise(x, y) - 0.5) * 0.15;
          const c = epsilon + base;

          const dither = BAYER[y & 7][x & 7] / 64 - 0.5;
          const v = c + dither * 0.31;

          if (v > 0.82) {
            data[o] = tones[3][0];
            data[o + 1] = tones[3][1];
            data[o + 2] = tones[3][2];
          } else if (v > 0.52) {
            data[o] = tones[2][0];
            data[o + 1] = tones[2][1];
            data[o + 2] = tones[2][2];
          } else if (v > 0.36) {
            data[o] = tones[1][0];
            data[o + 1] = tones[1][1];
            data[o + 2] = tones[1][2];
          } else if (v > 0.2) {
            data[o] = tones[0][0];
            data[o + 1] = tones[0][1];
            data[o + 2] = tones[0][2];
          } else {
            data[o] = bgColor[0];
            data[o + 1] = bgColor[1];
            data[o + 2] = bgColor[2];
            continue;
          }
        }
      }

      context.putImageData(imageData, 0, 0);
    }

    const frame = (time: number) => {
      if (running || !inView) {
        started = false;
        return;
      }
      render(time);
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (started || running || reduce) return;
      started = true;
      rafId = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      pointer.x = -1e4;
      pointer.y = -1e4;
    };

    resize();
    if (reduce) {
      render(0);
    } else {
      start();
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas.addEventListener("pointerleave", onPointerLeave);
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
    });
    io.observe(c);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) render(0);
    });
    ro.observe(c);

    return () => {
      running = true;
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [scale, reduce, theme, julia]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`hero-canvas ${className}`}
    />
  );
}

export default HeroCanvas;
