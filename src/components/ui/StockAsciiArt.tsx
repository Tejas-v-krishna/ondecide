"use client";

import { useEffect, useRef } from "react";

/**
 * Stock-market "mine" ASCII-art effect (21st.dev-style pipeline, reimplemented in Canvas2D).
 * 1. Procedural "silk" shader -> background (sampled source)
 * 2. Grid cells -> per-cell ASCII/render-mode primitive (stock candlesticks by default)
 * 3. Color adjustments (contrast / tint overlay)
 * 4. Post-FX (vignette / scanlines / filmGrain / chromatic / glitch) done as GPU-composited
 *    CSS overlays in the wrapper -> zero per-pixel JS, no getImageData readback.
 * 5. Flicker animation (canvas brightness jitter) + 30fps throttle.
 * Respects prefers-reduced-motion.
 */

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function hexToRgb(h: string): [number, number, number] {
  h = h.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
type Rgb = [number, number, number];

// ── value-noise fbm (cheap, no deps) ───────────────────────────
function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}
function vnoise(x: number, y: number) {
  const xi = Math.floor(x),
    yi = Math.floor(y);
  const xf = x - xi,
    yf = y - yi;
  const tl = hash(xi, yi),
    tr = hash(xi + 1, yi),
    bl = hash(xi, yi + 1),
    br = hash(xi + 1, yi + 1);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  return lerp(lerp(tl, tr, u), lerp(bl, br, u), v);
}
function fbm(x: number, y: number) {
  let val = 0,
    amp = 0.5,
    f = 1;
  for (let i = 0; i < 4; i++) {
    val += amp * vnoise(x * f, y * f);
    f *= 2;
    amp *= 0.5;
  }
  return val;
}

const STOPS = ["#000000", "#050505", "#0A0A0A", "#0F0F0F"].map(hexToRgb);
function palette(t: number): Rgb {
  t = clamp(t, 0, 1);
  const s = t * 3;
  const i = Math.min(2, Math.floor(s));
  const f = s - i;
  return [
    lerp(STOPS[i][0], STOPS[i + 1][0], f),
    lerp(STOPS[i][1], STOPS[i + 1][1], f),
    lerp(STOPS[i][2], STOPS[i + 1][2], f),
  ];
}

interface Props {
  opacity?: number;
  fixed?: boolean;
  renderMode?: "stock" | "contour" | "characters" | "matrix" | "dots" | "halfblocks";
  cellSize?: number;
}

export function StockAsciiArt({
  opacity = 0.15,
  fixed = true,
  renderMode = "stock",
  cellSize = 12,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const RES = 0.6; // internal render scale (caps draw cost)
    let W = 0,
      H = 0;
    let cols = 0,
      rows = 0,
      cpx = cellSize;

    // price series for stock mode (normalized 0..1)
    const HISTORY = 400;
    const series: { o: number; h: number; l: number; c: number }[] = [];
    let price = 0.5;
    const newCandle = () => {
      const isVolatile = Math.random() > 0.85;
      const volatility = isVolatile ? 0.25 : 0.12;
      const drift = (Math.random() - 0.5) * volatility;
      const o = price;
      const c = clamp(o + drift, 0.06, 0.94);
      const wick = isVolatile ? 0.15 : 0.08;
      const h = clamp(Math.max(o, c) + Math.random() * wick, 0, 1);
      const l = clamp(Math.min(o, c) - Math.random() * wick, 0, 1);
      price = c;
      return { o, h, l, c };
    };
    for (let i = 0; i < HISTORY; i++) series.push(newCandle());

    const rowOf = (p: number) => Math.round((1 - p) * (rows - 1));

    const P = {
      contrast: 1.15,
      tintOpacity: 0.45,
      bgOpacity: 0.73,
    };

    // silk field sampler
    const silk = (nx: number, ny: number, t: number) => {
      const sc = 3.0;
      const q1 = fbm(nx * sc + t * 0.05, ny * sc);
      const q2 = fbm(nx * sc + 5.2 + q1 * 1.5, ny * sc + 1.3 + q1 * 1.5 + t * 0.04);
      const r = fbm(nx * sc + q2 * 2.0, ny * sc + q2 * 2.0 + t * 0.03);
      return clamp(r, 0, 1);
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
    };
    resize();
    window.addEventListener("resize", resize);

    const GREEN: Rgb = [255, 255, 255]; // White for up candles
    const RED: Rgb = [150, 150, 150]; // Grey for down candles

    const tinted = (base: Rgb, flick: number, tint: Rgb): Rgb => {
      const r = clamp((base[0] * flick - 128) * P.contrast + 128, 0, 255);
      const g = clamp((base[1] * flick - 128) * P.contrast + 128, 0, 255);
      const b = clamp((base[2] * flick - 128) * P.contrast + 128, 0, 255);
      const tr = tint[0] / 255,
        tg = tint[1] / 255,
        tb = tint[2] / 255;
      const or = tr < 0.5 ? 2 * tr * (r / 255) : 1 - 2 * (1 - tr) * (1 - r / 255);
      const og = tg < 0.5 ? 2 * tg * (g / 255) : 1 - 2 * (1 - tg) * (1 - g / 255);
      const ob = tb < 0.5 ? 2 * tb * (b / 255) : 1 - 2 * (1 - tb) * (1 - b / 255);
      const to = P.tintOpacity;
      return [lerp(r, or * 255, to), lerp(g, og * 255, to), lerp(b, ob * 255, to)];
    };

    const TINT_GREEN: Rgb = [255, 255, 255];
    const TINT_RED: Rgb = [100, 100, 100];

    const render = (flick: number, t: number) => {
      ctx.clearRect(0, 0, W, H);
      ctx.textBaseline = "middle";
      ctx.font = `${Math.round(cpx * 1.05)}px ui-monospace, Menlo, Consolas, monospace`;

      // ── PASS 1: procedural background fill (sampled source) ──
      for (let cx = 0; cx < cols; cx++) {
        for (let cy = 0; cy < rows; cy++) {
          const nx = (cx + 0.5) / cols;
          const ny = (cy + 0.5) / rows;
          const bg = palette(silk(nx, ny, t));
          ctx.fillStyle = `rgba(${bg[0] | 0},${bg[1] | 0},${bg[2] | 0},${P.bgOpacity})`;
          ctx.fillRect(cx * cpx, cy * cpx, cpx + 1, cpx + 1);
        }
      }

      // ── PASS 2: ASCII / render-mode overlay ──
      if (renderMode === "stock") {
        const visible = Math.min(cols, series.length);
        const start = series.length - visible;
        for (let i = 0; i < visible; i++) {
          const cnd = series[start + i];
          const x = i * cpx;
          const top = rowOf(cnd.h);
          const bot = rowOf(cnd.l);
          const bodyTop = Math.min(rowOf(cnd.o), rowOf(cnd.c));
          const bodyBot = Math.max(rowOf(cnd.o), rowOf(cnd.c));
          const up = cnd.c >= cnd.o;
          const col = tinted(up ? GREEN : RED, flick, up ? TINT_GREEN : TINT_RED);
          ctx.fillStyle = `rgb(${col[0] | 0},${col[1] | 0},${col[2] | 0})`;
          const cxk = x + cpx / 2;
          for (let r = top; r <= bot; r++) ctx.fillText("│", cxk - 3, r * cpx + cpx / 2);
          for (let r = bodyTop; r <= bodyBot; r++) {
            ctx.fillText("█", cxk - 3, r * cpx + cpx / 2);
            ctx.fillText("█", cxk + 1, r * cpx + cpx / 2);
          }
        }
      } else if (renderMode === "contour") {
        const levels = 8;
        for (let cx = 0; cx < cols; cx++) {
          for (let cy = 0; cy < rows; cy++) {
            const f = silk((cx + 0.5) / cols, (cy + 0.5) / rows, t) * levels;
            if (Math.floor(f) % 2 !== 0) continue;
            const bg = palette(silk((cx + 0.5) / cols, (cy + 0.5) / rows, t));
            const col = tinted(bg, flick, bg);
            ctx.fillStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},0.5)`;
            ctx.fillText("░", cx * cpx + cpx / 2 - 3, cy * cpx + cpx / 2);
          }
        }
      } else if (renderMode === "matrix") {
        for (let cx = 0; cx < cols; cx++) {
          const head = (Math.sin(t * 2 + cx * 0.7) * 0.5 + 0.5) * rows;
          for (let cy = 0; cy < rows; cy++) {
            const d = head - cy;
            if (d < 0 || d > 6) continue;
            ctx.fillStyle = `rgba(0,255,102,${(1 - d / 6) * 0.6})`;
            ctx.fillText(Math.random() > 0.5 ? "1" : "0", cx * cpx + cpx / 2 - 3, cy * cpx + cpx / 2);
          }
        }
      } else if (renderMode === "dots") {
        for (let cx = 0; cx < cols; cx++)
          for (let cy = 0; cy < rows; cy++) {
            const f = silk((cx + 0.5) / cols, (cy + 0.5) / rows, t);
            ctx.fillStyle = `rgba(0,255,102,${0.15 + f * 0.4})`;
            ctx.beginPath();
            ctx.arc(cx * cpx + cpx / 2, cy * cpx + cpx / 2, Math.max(1, f * cpx * 0.4), 0, Math.PI * 2);
            ctx.fill();
          }
      } else if (renderMode === "halfblocks") {
        for (let cx = 0; cx < cols; cx++)
          for (let cy = 0; cy < rows; cy++) {
            const f = silk((cx + 0.5) / cols, (cy + 0.5) / rows, t);
            ctx.fillStyle = `rgba(0,255,102,${0.2 + f * 0.5})`;
            ctx.fillText(f > 0.5 ? "▀" : "▄", cx * cpx + cpx / 2 - 3, cy * cpx + cpx / 2);
          }
      } else {
        const chars = "01░▒▓█";
        for (let cx = 0; cx < cols; cx++)
          for (let cy = 0; cy < rows; cy++) {
            const f = silk((cx + 0.5) / cols, (cy + 0.5) / rows, t);
            ctx.fillStyle = `rgba(0,255,102,${0.12 + f * 0.5})`;
            ctx.fillText(chars[Math.floor(f * (chars.length - 1))] || " ", cx * cpx + cpx / 2 - 3, cy * cpx + cpx / 2);
          }
      }
    };

    let t = 0;
    let last = 0;
    let raf = 0;
    const FRAME = 500; // ~2fps throttle

    const loop = (now: number) => {
      if (now - last >= FRAME) {
        last = now;
        t += 0.02;
        // flicker
        const flick = 1 + (Math.random() - 0.5) * 0.35 * 0.6;
        series.push(newCandle());
        if (series.length > HISTORY) series.shift();
        render(flick, t);
      }
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      render(1, 0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [renderMode, cellSize]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? "fixed inset-0 -z-10" : "absolute inset-0 -z-0"}`}
      style={{ opacity }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 52%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* scanlines */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}
