"use client";

import React, { useRef, useState } from "react";
import { Filter, FileText, Cpu, Link2 } from "lucide-react";
import { StaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn";

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, rgba(11,143,96,0.07), transparent 42%)`,
        }}
      />
      {children}
    </div>
  );
}

const FEATURES = [
  {
    icon: Filter,
    label: "Data Ingestion",
    title: "Live Market Resolution",
    desc: "Resolves partial names or tickers, fetching live pricing and deep fundamentals from institutional-grade APIs instantly.",
  },
  {
    icon: FileText,
    label: "Market Context",
    title: "News & Sentiment Synthesis",
    desc: "Reads the latest coverage and distills market consensus, telling you not just what happened, but why it matters.",
  },
  {
    icon: Cpu,
    label: "Deep Reasoning",
    title: "Historical Pattern Matching",
    desc: "Finds the closest parallel from market history and reasons through management quality and competitive moats.",
  },
  {
    icon: Link2,
    label: "The Output",
    title: "The Final Decision",
    desc: "Synthesizes all 7 nodes into a single, reasoned Invest, Hold, or Avoid call — backed by a transparent breakdown.",
  },
];

const STATS = [
  { value: "7", label: "Parallel AI Agents running per report" },
  { value: "2", label: "Asset classes (Stocks & Crypto) supported" },
  { value: "<60s", label: "Time from your prompt to a final decision", suffix: "s" },
];

const COMPARISONS = [
  { title: "Research Time", before: "2+ Hours", after: "< 1 Minute" },
  { title: "Data Sources", before: "Fragmented Tools", after: "Unified & Traceable" },
  { title: "The Output", before: "A numeric score", after: "Reasoned Decision" },
];

export function BentoGrid() {
  return (
    <StaggerContainer className="grid grid-cols-1 gap-4 md:grid-cols-12">
      {/* ── ROW 1: Pipeline (4 columns of 3) ── */}
      {FEATURES.map((f) => (
        <FadeInStaggerItem
          key={f.title}
          className="card-surface card-hover group relative flex min-h-[300px] flex-col p-6 md:col-span-3 lg:min-h-[320px] lg:p-8"
        >
          <SpotlightCard className="flex h-full flex-col justify-between">
            <div className="absolute right-0 top-0 p-4 text-ink-200 transition-colors group-hover:text-brand-200">
              <f.icon className="h-16 w-16 lg:h-20 lg:w-20" strokeWidth={1} />
            </div>
            <div className="relative z-10 space-y-4">
              <p className="text-2xs font-medium uppercase tracking-widest text-ink-400">
                {f.label}
              </p>
            </div>
            <div className="relative z-10 pt-10">
              <h3 className="mb-2 text-xl leading-tight text-ink lg:mb-3 lg:text-2xl">
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed text-ink-500 lg:text-sm">{f.desc}</p>
            </div>
          </SpotlightCard>
        </FadeInStaggerItem>
      ))}

      {/* ── ROW 2: Stats (3 columns of 4) ── */}
      {STATS.map((s) => (
        <FadeInStaggerItem
          key={s.label}
          className="card-surface flex min-h-[200px] flex-col justify-end p-6 md:col-span-4 lg:p-8"
        >
          <div className="mb-3 font-display text-5xl leading-none tracking-tight text-ink lg:mb-4 lg:text-[4rem]">
            {s.value.includes("60s") ? (
              <>
                &lt;60<span className="text-4xl text-ink-300">{s.suffix}</span>
              </>
            ) : (
              s.value
            )}
          </div>
          <div className="text-xs tracking-wide text-ink-500 lg:text-sm">{s.label}</div>
        </FadeInStaggerItem>
      ))}

      {/* ── ROW 3: Comparisons (3 columns of 4) ── */}
      {COMPARISONS.map((c) => (
        <FadeInStaggerItem
          key={c.title}
          className="card-surface flex min-h-[200px] flex-col p-6 md:col-span-4 lg:p-8"
        >
          <h4 className="mb-auto text-xl text-ink lg:text-2xl">{c.title}</h4>
          <div className="mt-6 w-full space-y-3 text-xs lg:mt-8 lg:space-y-4 lg:text-sm">
            <div className="flex justify-between border-b border-line pb-3">
              <span className="text-ink-400">Before</span>
              <span className="text-ink-500">{c.before}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-ink-600">with OnDecide</span>
              <span className="font-medium text-brand-700">{c.after}</span>
            </div>
          </div>
        </FadeInStaggerItem>
      ))}
    </StaggerContainer>
  );
}
