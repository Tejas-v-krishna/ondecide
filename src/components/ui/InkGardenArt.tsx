"use client";

import { useEffect, useRef } from "react";

/**
 * "Ink Garden" ASCII-art effect (21st.dev-style pipeline, reimplemented in Canvas2D).
 * 1. Paint a procedural ink-garden source into an offscreen canvas (botanical ink on
 *    transparent). No external photo needed.
 * 2. Sample the source into a grid of cellSize px cells (luminance per cell).
 * 3. renderMode "dither": draw a dot per cell, radius/alpha scaled by luminance.
 * 4. Color adjustments: brightness -> contrast -> saturation -> grayscale -> tint overlay.
 * 5. Post-FX (pfx): all gated by `enabled`; in the given params everything is off.
 * 6. Animated "pulse": breathing dot scale/alpha.
 * Source is sampled ONCE (not per frame) -> cheap. Respects prefers-reduced-motion.
 */

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ── seeded RNG (mulberry32) ────────────────────────────────
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── procedural Ink Garden source ───────────────────────────
// Light blue/white ink botanical on transparent, so it reads as glowing ink on a dark page.
function paintInkGarden(
  g: CanvasRenderingContext2D,
  w: number,
  h: number,
  seed: number
) {
  const rand = rng(seed);
  g.clearRect(0, 0, w, h);
  g.lineCap = "round";
  g.lineJoin = "round";

  const ink = (a: number) =>
    `rgba(${190 + Math.floor(rand() * 40)},${215 + Math.floor(rand() * 35)},255,${a})`;

  const stems = 3 + Math.floor(rand() * 3);
  for (let s = 0; s < stems; s++) {
    const baseX = w * (0.15 + 0.7 * ((s + 0.5) / stems)) + (rand() - 0.5) * w * 0.1;
    const sway = (rand() - 0.5) * w * 0.4;
    const topX = baseX + sway;
    const topY = h * (0.05 + rand() * 0.2);
    const cpx = baseX + (rand() - 0.5) * w * 0.3;
    const cpy = h * (0.4 + rand() * 0.2);

    // stem
    g.beginPath();
    g.moveTo(baseX, h);
    g.quadraticCurveTo(cpx, cpy, topX, topY);
    g.strokeStyle = ink(0.55);
    g.lineWidth = Math.max(1.5, w * 0.004);
    g.stroke();

    // leaves along the stem
    const leaves = 4 + Math.floor(rand() * 5);
    for (let l = 0; l < leaves; l++) {
      const t = (l + 1) / (leaves + 1);
      const x = lerp(baseX, topX, t) + (1 - t) * (cpx - baseX) * 0.0;
      const y = lerp(h, topY, t);
      const size = (0.04 + rand() * 0.05) * h * (1 - t * 0.5);
      const ang = (rand() - 0.5) * Math.PI;
      g.save();
      g.translate(x, y);
      g.rotate(ang);
      g.beginPath();
      g.moveTo(0, 0);
      g.quadraticCurveTo(size * 0.6, -size * 0.5, size, 0);
      g.quadraticCurveTo(size * 0.6, size * 0.5, 0, 0);
      g.closePath();
      g.fillStyle = ink(0.4 + rand() * 0.3);
      g.fill();
      g.restore();
    }

    // bud at tip
    g.beginPath();
    g.arc(topX, topY, Math.max(2, w * 0.006), 0, Math.PI * 2);
    g.fillStyle = ink(0.6);
    g.fill();
  }

  // ink splatter / spores
  const splats = 30 + Math.floor(rand() * 30);
  for (let i = 0; i < splats; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = Math.max(0.6, w * 0.002 + rand() * w * 0.004);
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fillStyle = ink(0.2 + rand() * 0.4);
    g.fill();
  }
}

interface Props {
  opacity?: number;
  fixed?: boolean;
  cellSize?: number;
}

export function InkGardenArt({
  opacity = 0.15,
  fixed = true,
  cellSize = 9,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // offscreen source canvas (sampled once)
    const src = document.createElement("canvas");
    const sctx = src.getContext("2d", { willReadFrequently: true });
    if (!sctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const RES = 0.55;
    let W = 0,
      H = 0,
      cols = 0,
      rows = 0,
      cpx = cellSize;
    let srcData: Uint8ClampedArray | null = null;
    const tint: [number, number, number] = [60, 166, 255]; // #3ca6ff (unused, opacity 0)

    // params from the prompt
    const P = {
      brightness: 0,
      contrast: 158,
      saturation: 100,
      grayscale: 0,
      tintOpacity: 0,
      coverage: 100,
      density: 20,
    };

    const buildSource = () => {
      src.width = W;
      src.height = H;
      paintInkGarden(sctx!, W, H, 20240716);
      try {
        srcData = sctx!.getImageData(0, 0, W, H).data;
      } catch {
        srcData = null;
      }
    };

    const resize = () => {
      const cw = canvas.clientWidth || window.innerWidth;
      const ch = canvas.clientHeight || window.innerHeight;
      W = Math.max(1, Math.floor(cw * RES));
      H = Math.max(1, Math.floor(ch * RES));
      canvas.width = W;
      canvas.height = H;
      cpx = Math.max(4, cellSize * RES);
      cols = Math.ceil(W / cpx);
      rows = Math.ceil(H / cpx);
      buildSource();
    };
    resize();
    window.addEventListener("resize", resize);

    const sampleL = (cx: number, cy: number): number => {
      if (!srcData) return 0;
      // average a small block in the cell
      let sum = 0,
        n = 0;
      const x0 = Math.floor(cx * cpx),
        y0 = Math.floor(cy * cpx);
      const x1 = Math.min(W, x0 + Math.ceil(cpx));
      const y1 = Math.min(H, y0 + Math.ceil(cpx));
      for (let y = y0; y < y1; y += 2) {
        for (let x = x0; x < x1; x += 2) {
          const i = (y * W + x) * 4;
          const r = srcData[i],
            g = srcData[i + 1],
            b = srcData[i + 2],
            a = srcData[i + 3];
          // luminance weighted by alpha (transparent -> dark)
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          sum += lum * (a / 255);
          n++;
        }
      }
      return n ? sum / n : 0;
    };

    const render = (pulse: number) => {
      ctx.clearRect(0, 0, W, H);
      const cov = P.coverage / 100;
      const dens = P.density / 100;
      const maxR = (cpx / 2) * (0.5 + dens * 0.5);

      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          let L = sampleL(cx, cy);
          if (L <= 0) continue;
          // brightness
          L += P.brightness / 255;
          // contrast (neutral 100 -> factor 158/100)
          L = (L - 0.5) * (P.contrast / 100) + 0.5;
          L = clamp(L, 0, 1);
          if (L < 1 - cov) continue; // coverage gate (dither: skip faint cells)
          const r = maxR * Math.pow(L, 0.7) * pulse;
          if (r <= 0.2) continue;
          const a = clamp(0.25 + L * 0.6, 0, 1) * cov;
          const px = cx * cpx + cpx / 2;
          const py = cy * cpx + cpx / 2;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${200 + (tint[0] - 200) * 0},${220},${
            255
          },${a})`;
          ctx.fill();
        }
      }
    };

    let t = 0;
    let last = 0;
    let raf = 0;
    const FRAME = 33; // ~30fps

    const loop = (now: number) => {
      if (now - last >= FRAME) {
        last = now;
        t += 0.018;
        // pulse: 1 +/- intensity
        const pulse =
          1 + Math.sin(t * (1 + P.density / 100)) * 0.18 * (60 / 100);
        render(pulse);
      }
      raf = requestAnimationFrame(loop);
    };

    if (reduce || !srcData) {
      render(1);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [cellSize]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${
        fixed ? "fixed inset-0 -z-10" : "absolute inset-0 -z-0"
      }`}
      style={{ opacity }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
