import React from "react";

/* ══════════════════════════════════════════════════════════════
   Dot-art illustrations.
   Deterministic seeded point fields — no bitmaps, no randomness
   across renders, so SSR and hydration agree.
   ══════════════════════════════════════════════════════════════ */

const INK = "#1F47AB";
const MID = "#4A6BD0";
const LIGHT = "#7C99FF";

type Dot = readonly [number, number, number, number]; // x, y, radius, opacity

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Dots({ dots, color = INK }: { dots: Dot[]; color?: string }) {
  return (
    <g fill={color}>
      {dots.map(([x, y, r, o], i) => (
        <circle key={i} cx={x} cy={y} r={r} opacity={o} />
      ))}
    </g>
  );
}

/** Points distributed inside a quad given by its four corners (bilinear). */
function quadField(
  a: [number, number],
  b: [number, number],
  c: [number, number],
  d: [number, number],
  count: number,
  seed: number,
  minR = 0.3,
  maxR = 1.1
): Dot[] {
  const r = rng(seed);
  const out: Dot[] = [];
  for (let i = 0; i < count; i++) {
    const u = r();
    const v = r();
    const x = (1 - u) * (1 - v) * a[0] + u * (1 - v) * b[0] + u * v * c[0] + (1 - u) * v * d[0];
    const y = (1 - u) * (1 - v) * a[1] + u * (1 - v) * b[1] + u * v * c[1] + (1 - u) * v * d[1];
    out.push([x, y, minR + r() * (maxR - minR), 0.18 + r() * 0.62]);
  }
  return out;
}

/** Dots along a straight or curved path. */
function lineField(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  count: number,
  seed: number,
  spread = 2
): Dot[] {
  const r = rng(seed);
  const out: Dot[] = [];
  for (let i = 0; i < count; i++) {
    const t = r();
    const jx = (r() - 0.5) * spread;
    const jy = (r() - 0.5) * spread;
    out.push([x0 + (x1 - x0) * t + jx, y0 + (y1 - y0) * t + jy, 0.35 + r() * 0.75, 0.2 + r() * 0.6]);
  }
  return out;
}

function ringField(cx: number, cy: number, rad: number, count: number, seed: number, spread = 1.6): Dot[] {
  const r = rng(seed);
  const out: Dot[] = [];
  for (let i = 0; i < count; i++) {
    const a = r() * Math.PI * 2;
    const rr = rad + (r() - 0.5) * spread;
    out.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 0.35 + r() * 0.8, 0.2 + r() * 0.65]);
  }
  return out;
}

/* ── 1. Particle portrait ─────────────────────────────────── */

/**
 * Pixel-dithered head: grid-snapped squares with density driven by a seeded
 * hash, a sparkline band across the eyes, and a faint globe behind.
 */
export function ParticleHead({ className = "" }: { className?: string }) {
  const r = rng(5317);
  const cells: [number, number, number, number][] = []; // x, y, size, opacity
  const STEP = 4;

  const inside = (x: number, y: number) => {
    const nx = (x - 280) / 96;
    const ny = (y - 186) / 124;
    const head = nx * nx + ny * ny < 1;
    const jaw = y > 250 && y < 330 && Math.abs(x - 280) < 74 - (y - 250) * 0.35;
    const neck = y >= 300 && y < 360 && Math.abs(x - 280) < 42;
    const sx = (x - 280) / 200;
    const sy = (y - 402) / 74;
    const shoulders = y > 336 && sx * sx + sy * sy < 1;
    return head || jaw || neck || shoulders;
  };

  for (let y = 62; y < 470; y += STEP) {
    for (let x = 118; x < 448; x += STEP) {
      if (!inside(x, y)) continue;
      const n = r();
      // face contour: brighter at the silhouette edge, sparser in the middle
      const nx = (x - 280) / 96;
      const ny = (y - 186) / 124;
      const d = Math.min(1, Math.abs(Math.sqrt(nx * nx + ny * ny) - 0.82) * 2.4);
      const shade = 0.35 + d * 0.65;
      const keep = n < 0.42 + shade * 0.42;
      if (!keep) continue;
      const size = 1.8 + r() * 1.9;
      cells.push([x - size / 2, y - size / 2, size, 0.14 + r() * 0.72 * shade]);
    }
  }

  // Dissolving sparkle field around the head.
  const sparkles: [number, number, number, number][] = [];
  for (let i = 0; i < 620; i++) {
    const a = r() * Math.PI * 2;
    const rad = 96 + r() * 190;
    const x = 280 + Math.cos(a) * rad * 1.25;
    const y = 210 + Math.sin(a) * rad * 0.95;
    if (x < 4 || x > 556 || y < 4 || y > 436) continue;
    const size = 1 + r() * 3.2;
    sparkles.push([x, y, size, 0.08 + r() * 0.5]);
  }

  // Sparkline band across the eyes.
  const band = { x: 196, y: 198, w: 250, h: 40 };
  const bars = Array.from({ length: 74 }).map((_, i) => {
    const h = 3 + Math.abs(Math.sin(i * 0.7) * 14 + Math.sin(i * 0.23) * 9) + r() * 5;
    return { x: band.x + 6 + i * 3.2, h, y: band.y + band.h / 2 - h / 2 };
  });

  return (
    <svg viewBox="0 0 560 440" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ph2-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="52%" stopColor="#EAF0FF" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.96" />
        </linearGradient>
        <radialGradient id="ph2-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#7C99FF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#7C99FF" stopOpacity="0" />
        </radialGradient>
        <filter id="ph2-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect x="0" y="0" width="560" height="440" fill="url(#ph2-glow)" />

      {/* faint globe + orbit guides */}
      <g stroke={LIGHT} strokeWidth="0.7" opacity="0.35">
        <circle cx="182" cy="152" r="52" />
        <ellipse cx="182" cy="152" rx="52" ry="18" />
        <ellipse cx="182" cy="152" rx="18" ry="52" />
        <ellipse cx="300" cy="250" rx="228" ry="152" strokeDasharray="2 7" opacity="0.5" />
      </g>

      <g fill={INK}>
        {cells.map(([x, y, s, o], i) => (
          <rect key={`c${i}`} x={x} y={y} width={s} height={s} opacity={o} />
        ))}
      </g>
      <g fill={MID}>
        {sparkles.map(([x, y, s, o], i) => (
          <rect key={`s${i}`} x={x} y={y} width={s} height={s} opacity={o} />
        ))}
      </g>

      {/* sparkline band */}
      <g>
        <rect
          x={band.x}
          y={band.y}
          width={band.w}
          height={band.h}
          rx="2"
          fill="url(#ph2-band)"
          opacity="0.94"
          filter="url(#ph2-soft)"
        />
        <g stroke="#2F6BD8" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
          {bars.map((b, i) => (
            <line key={i} x1={b.x} y1={b.y} x2={b.x} y2={b.y + b.h} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ── 2. Constellation (automated pipeline) ────────────────── */

export function ConstellationArt({ className = "" }: { className?: string }) {
  const nodes: [number, number, number][] = [
    [200, 150, 26],
    [96, 84, 10],
    [318, 96, 13],
    [330, 216, 8],
    [124, 226, 11],
    [214, 62, 6],
  ];
  const r = rng(4211);
  const dots: Dot[] = [...ringField(200, 150, 26, 60, 11, 10), ...ringField(200, 150, 44, 40, 12, 14)];
  nodes.slice(1).forEach(([x, y, rad], i) => {
    dots.push(...ringField(x, y, rad, 22, 300 + i, rad * 0.9));
    dots.push(...lineField(200, 150, x, y, 40, 400 + i, 6));
  });
  for (let i = 0; i < 160; i++) {
    const a = r() * Math.PI * 2;
    const rr = 20 + r() * 80;
    dots.push([200 + Math.cos(a) * rr * 1.25, 150 + Math.sin(a) * rr * 0.9, 0.35 + r() * 0.8, 0.12 + r() * 0.4]);
  }

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden="true">
      <Dots dots={dots} />
      <g stroke={INK} strokeWidth="0.7" opacity="0.4">
        <circle cx="200" cy="150" r="26" strokeDasharray="2 5" />
        <circle cx="200" cy="150" r="44" strokeDasharray="1 7" />
        {nodes.slice(1).map(([x, y, rad], i) => (
          <circle key={i} cx={x} cy={y} r={rad} />
        ))}
      </g>
      <circle cx="200" cy="150" r="7" fill={INK} />
    </svg>
  );
}

/* ── 3. Contour waves (plain language) ────────────────────── */

export function ContourArt({ className = "" }: { className?: string }) {
  const dots: Dot[] = [];
  const r = rng(991);
  for (let k = 0; k < 13; k++) {
    const base = 34 + k * 19;
    const amp = 6 + Math.sin(k * 0.7) * 5;
    for (let x = 8; x < 396; x += 3.1) {
      const y =
        base +
        Math.sin(x / 46 + k * 0.55) * amp +
        Math.sin(x / 17 + k * 0.2) * amp * 0.35 +
        (x > 250 ? Math.sin((x - 250) / 60) * 9 : 0);
      dots.push([x, y, 0.3 + r() * 0.75, 0.16 + r() * 0.5]);
    }
  }
  dots.push(...ringField(268, 96, 20, 60, 55, 2));
  dots.push(...ringField(268, 96, 34, 50, 56, 3));

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden="true">
      <Dots dots={dots} />
    </svg>
  );
}

/* ── 4. Cycle cloud (historical patterns) ─────────────────── */

export function CycleArt({ className = "" }: { className?: string }) {
  const r = rng(3011);
  const dots: Dot[] = [];
  const clouds: [number, number, number, number][] = [
    [110, 128, 62, 44],
    [150, 196, 54, 34],
    [86, 176, 40, 30],
  ];
  clouds.forEach(([cx, cy, rx, ry], ci) => {
    for (let i = 0; i < 150; i++) {
      const a = r() * Math.PI * 2;
      const rad = Math.sqrt(r());
      dots.push([cx + Math.cos(a) * rad * rx, cy + Math.sin(a) * rad * ry, 0.3 + r() * 1.0, 0.12 + r() * 0.45]);
    }
    void ci;
  });
  dots.push(...ringField(288, 118, 30, 70, 71, 3));
  dots.push(...ringField(288, 118, 48, 55, 72, 4));
  dots.push(...ringField(300, 208, 18, 45, 73, 2.5));
  dots.push(...ringField(300, 208, 32, 40, 74, 3.5));

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden="true">
      <Dots dots={dots} />
      <g stroke={INK} strokeWidth="0.6" opacity="0.35">
        <circle cx="288" cy="118" r="30" />
        <circle cx="288" cy="118" r="48" strokeDasharray="2 6" />
        <circle cx="300" cy="208" r="18" strokeDasharray="3 4" />
      </g>
    </svg>
  );
}

/* ── 5. Radial fan (decision engine) ──────────────────────── */

export function RadialArt({ className = "" }: { className?: string }) {
  const dots: Dot[] = [];
  for (let k = 0; k < 26; k++) {
    const spread = (k - 13) / 13;
    dots.push(...lineField(30, 150 + spread * 4, 300, 150 + spread * 96, 34, 500 + k, 2.4));
  }
  dots.push(...ringField(300, 150, 16, 50, 81, 2));
  dots.push(...ringField(300, 150, 30, 45, 82, 3));
  dots.push(...ringField(300, 150, 46, 40, 83, 4));

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden="true">
      <Dots dots={dots} />
      <g stroke={INK} strokeWidth="0.6" opacity="0.4">
        <circle cx="300" cy="150" r="16" />
        <circle cx="300" cy="150" r="30" strokeDasharray="2 5" />
        <circle cx="300" cy="150" r="46" />
        <path d="M30 96v108" />
      </g>
    </svg>
  );
}

/* ── 6. Orbital sphere (search) ───────────────────────────── */

export function OrbitalArt({ className = "" }: { className?: string }) {
  const dots: Dot[] = [...ringField(200, 150, 62, 90, 111, 3)];
  const r = rng(2222);
  for (let i = 0; i < 420; i++) {
    const th = r() * Math.PI * 2;
    const ph = Math.acos(2 * r() - 1);
    const rad = 52 + r() * 6;
    dots.push([200 + rad * Math.sin(ph) * Math.cos(th), 150 + rad * Math.cos(ph) * 0.92, 0.3 + r() * 0.8, 0.14 + r() * 0.5]);
  }
  dots.push(...ringField(200, 150, 86, 60, 113, 5));
  for (let i = 0; i < 120; i++) {
    const a = r() * Math.PI * 2;
    dots.push([200 + Math.cos(a) * (95 + r() * 45), 150 + Math.sin(a) * (70 + r() * 35), 0.3 + r() * 0.7, 0.1 + r() * 0.3]);
  }

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden="true">
      <Dots dots={dots} />
      <g stroke={INK} strokeWidth="0.6" opacity="0.35">
        <circle cx="200" cy="150" r="62" />
        <ellipse cx="200" cy="150" rx="62" ry="22" />
        <ellipse cx="200" cy="150" rx="22" ry="62" />
        <ellipse cx="200" cy="150" rx="100" ry="42" strokeDasharray="2 6" transform="rotate(-18 200 150)" />
        <ellipse cx="200" cy="150" rx="100" ry="42" strokeDasharray="2 6" transform="rotate(24 200 150)" opacity="0.6" />
      </g>
      <circle cx="200" cy="150" r="5" fill={INK} />
    </svg>
  );
}

/* ── 7. Node hub (agents launch) ──────────────────────────── */

export function HubArt({ className = "" }: { className?: string }) {
  const spokes: [number, number][] = [
    [86, 74],
    [312, 78],
    [330, 196],
    [74, 214],
    [200, 250],
  ];
  const dots: Dot[] = [];
  spokes.forEach(([x, y], i) => dots.push(...lineField(200, 142, x, y, 46, 700 + i, 5)));
  dots.push(...ringField(200, 142, 16, 45, 121, 3));
  dots.push(...ringField(200, 142, 30, 36, 122, 4));
  const r = rng(717);
  for (let i = 0; i < 130; i++) {
    const a = r() * Math.PI * 2;
    dots.push([200 + Math.cos(a) * (40 + r() * 100), 142 + Math.sin(a) * (30 + r() * 80), 0.3 + r() * 0.8, 0.1 + r() * 0.32]);
  }

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden="true">
      <Dots dots={dots} />
      <g stroke={INK} strokeWidth="0.7" opacity="0.45">
        <rect x="46" y="58" width="34" height="26" rx="1" />
        <path d="M54 72h18M54 78h12" />
        <rect x="298" y="66" width="30" height="30" rx="1" />
        <path d="M304 88v-8M310 88v-14M316 88v-11M322 88v-6" />
        <rect x="316" y="180" width="30" height="34" rx="1" />
        <path d="M316 192h30M316 204h30" />
        <path d="M46 214l16-14 16 14v26H46z" />
        <circle cx="200" cy="250" r="12" />
      </g>
      <circle cx="200" cy="142" r="6" fill={INK} />
    </svg>
  );
}

/* ── 8. Prism funnel (synthesis) ──────────────────────────── */

export function PrismArt({ className = "" }: { className?: string }) {
  const dots: Dot[] = [];
  const r = rng(8080);
  for (let k = 0; k < 26; k++) {
    const x = 30 + k * 5.2;
    for (let y = 60 + (k % 5) * 4; y < 240 - (k % 7) * 5; y += 4.5) {
      dots.push([x + (r() - 0.5) * 2, y, 0.3 + r() * 0.8, 0.12 + r() * 0.45]);
    }
  }
  const layers = [0, 1, 2, 3, 4];
  layers.forEach((i) => {
    const top = 92 + i * 24;
    for (let x = 236; x < 392; x += 4) {
      const y = top + Math.sin((x - 236) / 34 + i * 0.5) * 12;
      dots.push([x, y, 0.3 + r() * 0.7, 0.14 + r() * 0.45]);
    }
  });

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden="true">
      <Dots dots={dots} />
      <g stroke={INK} strokeWidth="0.8" opacity="0.5">
        <path d="M186 74L246 74 268 150 246 226 186 226 208 150Z" />
        <path d="M186 74L208 150 186 226M246 74L224 150 246 226M208 150h16" opacity="0.55" />
      </g>
      <g stroke={MID} strokeWidth="0.8" opacity="0.55">
        {layers.map((i) => (
          <path
            key={i}
            d={`M236 ${92 + i * 24} Q 314 ${80 + i * 24} 392 ${96 + i * 24}`}
            fill="none"
          />
        ))}
      </g>
    </svg>
  );
}

/* ── 9. Compass star (verdict) ────────────────────────────── */

export function CompassArt({ className = "" }: { className?: string }) {
  const cx = 200;
  const cy = 148;
  const dots: Dot[] = [...ringField(cx, cy, 76, 90, 131, 4), ...ringField(cx, cy, 104, 70, 132, 6)];
  const r = rng(1414);
  for (let i = 0; i < 260; i++) {
    const a = r() * Math.PI * 2;
    const rad = 40 + r() * 110;
    dots.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad * 0.82, 0.3 + r() * 0.8, 0.1 + r() * 0.4]);
  }
  const star = [0, 1, 2, 3, 4, 5, 6, 7]
    .map((i) => {
      const a = (i * Math.PI) / 4 - Math.PI / 2;
      const rad = i % 2 === 0 ? 62 : 22;
      return `${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 400 300" className={className} fill="none" aria-hidden="true">
      <Dots dots={dots} />
      <g stroke={INK} strokeWidth="0.8" opacity="0.55">
        <polygon points={star} />
        <circle cx={cx} cy={cy} r="76" strokeDasharray="2 6" />
      </g>
      <circle cx={cx} cy={cy} r="4" fill={INK} />
    </svg>
  );
}

/* ── 10. Layered glass stack (agent intro) ────────────────── */

export function GlassStack({ className = "" }: { className?: string }) {
  const quads: [number, number][][] = [
    [[176, 44], [356, 26], [438, 118], [258, 138]],
    [[132, 116], [318, 96], [404, 208], [214, 232]],
    [[92, 190], [286, 168], [372, 286], [176, 310]],
  ];
  return (
    <svg viewBox="0 0 480 380" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gs-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#DCE5FF" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#9BB3F7" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="gs-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1F47AB" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#1F47AB" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {quads.map((q, i) => {
        const dots = quadField(q[0], q[1], q[2], q[3], 190 - i * 18, 910 + i, 0.4, 1.25);
        return (
          <g key={i}>
            <polygon
              points={q.map((p) => p.join(",")).join(" ")}
              fill="url(#gs-fill)"
              stroke="url(#gs-edge)"
              strokeWidth="1"
              opacity={0.92 - i * 0.04}
            />
            <Dots dots={dots} color={i === 0 ? "#8AA5F5" : INK} />
          </g>
        );
      })}

      {/* pixel block at the rear */}
      <g fill={INK} opacity="0.75">
        {Array.from({ length: 36 }).map((_, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          const on = (i * 7) % 5 !== 0;
          return on ? (
            <rect key={i} x={360 + col * 8} y={60 + row * 8} width={6} height={6} opacity={0.25 + ((i * 13) % 7) / 10} />
          ) : null;
        })}
      </g>

      <ellipse cx="250" cy="336" rx="150" ry="16" fill={INK} opacity="0.07" />
    </svg>
  );
}
