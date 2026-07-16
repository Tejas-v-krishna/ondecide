"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient ASCII candlestick market background.
 * A faux live tape scrolls right-to-left behind page content.
 * Pure canvas, no deps. Respects prefers-reduced-motion.
 */

const UP = "#34d399";
const DOWN = "#f87171";
const GRID = "rgba(255,255,255,0.07)";
const AXIS = "rgba(255,255,255,0.16)";

interface Candle {
  o: number;
  h: number;
  l: number;
  c: number;
}

export function AsciiMarketBackground({
  opacity = 0.5,
  fixed = true,
}: {
  opacity?: number;
  fixed?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- config
    const FONT = "14px ui-monospace, Menlo, Consolas, monospace";
    const ROWS = 26; // vertical ASCII resolution (cells)
    const COL_W = 9; // px per ascii column
    let cellH = 14;
    let cols = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // price series (normalized 0..1), start flat
    const candles: Candle[] = [];
    const HISTORY = 400;
    let price = 0.5;
    const trendBias = 0.0;

    const newCandle = (): Candle => {
      const drift = (Math.random() - 0.5) * 0.06 + trendBias;
      const o = price;
      let c = o + drift;
      c = Math.max(0.06, Math.min(0.94, c));
      const h = Math.max(o, c) + Math.random() * 0.05;
      const l = Math.min(o, c) - Math.random() * 0.05;
      price = c;
      return {
        o: Math.max(0.04, Math.min(0.96, o)),
        h: Math.max(0.04, Math.min(0.98, h)),
        l: Math.max(0.02, Math.min(0.98, l)),
        c: Math.max(0.04, Math.min(0.96, c)),
      };
    };

    for (let i = 0; i < HISTORY; i++) candles.push(newCandle());

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FONT;
      cellH = height / ROWS;
      cols = Math.ceil(width / COL_W) + 2;
    };

    resize();
    window.addEventListener("resize", resize);

    // map a normalized price to a row index (0 = top)
    const rowOf = (p: number) => Math.round((1 - p) * (ROWS - 1));

    // draw a single candlestick within a column of `colW` px at x
    const drawCandle = (
      x: number,
      cnd: Candle,
      bodyChar: string,
      wickChar: string,
      color: string
    ) => {
      const top = rowOf(cnd.h);
      const bot = rowOf(cnd.l);
      const openR = rowOf(cnd.o);
      const closeR = rowOf(cnd.c);
      const bodyTop = Math.min(openR, closeR);
      const bodyBot = Math.max(openR, closeR);

      ctx.fillStyle = color;
      // wick
      for (let r = top; r <= bot; r++) {
        const y = r * cellH + cellH / 2;
        ctx.fillText(wickChar, x + COL_W / 2 - 3, y + 4);
      }
      // body
      for (let r = bodyTop; r <= bodyBot; r++) {
        const y = r * cellH + cellH / 2;
        ctx.fillText(bodyChar, x + COL_W / 2 - 3, y + 4);
        ctx.fillText(bodyChar, x + COL_W / 2 + 2, y + 4);
      }
    };

    let offset = 0; // sub-column scroll offset (px)
    let raf = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // faint grid lines
      ctx.fillStyle = GRID;
      for (let r = 0; r < ROWS; r += 2) {
        const y = r * cellH + cellH / 2;
        ctx.fillText(".".repeat(cols + 4), 0, y + 4);
      }

      // how many candles fit on screen
      const perCol = COL_W;
      const visible = Math.ceil(width / perCol) + 2;
      const start = candles.length - visible;

      for (let i = 0; i < visible; i++) {
        const idx = start + i;
        if (idx < 0) continue;
        const cnd = candles[idx];
        const x = i * COL_W - offset;
        const up = cnd.c >= cnd.o;
        drawCandle(x, cnd, up ? "█" : "█", "│", up ? UP : DOWN);
      }

      // price axis ticks on right edge
      ctx.fillStyle = AXIS;
      for (let r = 2; r < ROWS; r += 6) {
        const y = r * cellH + cellH / 2;
        ctx.fillText("┤", width - 12, y + 4);
      }
    };

    const tick = () => {
      offset += 1.1; // scroll speed (px/frame)
      if (offset >= COL_W) {
        offset -= COL_W;
        candles.push(newCandle());
        if (candles.length > HISTORY) candles.shift();
      }
      render();
      raf = requestAnimationFrame(tick);
    };

    if (reduce) {
      // static frame, no animation loop
      render();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${fixed ? "fixed inset-0 -z-10" : "absolute inset-0 -z-0"}`}
      style={{ opacity }}
    />
  );
}
