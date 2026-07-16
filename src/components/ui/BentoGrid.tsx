"use client";

import React, { useRef, useState } from "react";
import { Filter, FileText, Cpu, Link2 } from "lucide-react";
import { StaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn";

function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
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
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}

export function BentoGrid() {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/[0.06] p-px rounded-3xl overflow-hidden shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)] border border-white/[0.06]">
      {/* ── ROW 1: Pipeline (4 columns of 3) ── */}
      <FadeInStaggerItem className="md:col-span-3 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] transition-colors p-6 lg:p-8 min-h-[300px] lg:min-h-[320px] group border-gradient-fade">
        <SpotlightCard className="h-full flex flex-col justify-between -m-6 p-6 lg:-m-8 lg:p-8">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Filter className="w-16 h-16 lg:w-20 lg:h-20 text-white" strokeWidth={1} />
          </div>
          <div className="space-y-4 relative z-10">
            <p className="text-zinc-500 text-xs font-sans tracking-widest uppercase">Data Ingestion</p>
          </div>
          <div className="relative z-10 pt-10">
            <h3 className="text-xl lg:text-2xl font-serif text-white mb-2 lg:mb-3 leading-tight">
              Live Market<br />Resolution
            </h3>
            <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">
              Resolves partial names or tickers, fetching live pricing and deep fundamentals from institutional-grade APIs instantly.
            </p>
          </div>
        </SpotlightCard>
      </FadeInStaggerItem>

      <FadeInStaggerItem className="md:col-span-3 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] transition-colors p-6 lg:p-8 min-h-[300px] lg:min-h-[320px] group border-gradient-fade">
        <SpotlightCard className="h-full flex flex-col justify-between -m-6 p-6 lg:-m-8 lg:p-8">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileText className="w-16 h-16 lg:w-20 lg:h-20 text-white" strokeWidth={1} />
          </div>
          <div className="space-y-4 relative z-10">
            <p className="text-zinc-500 text-xs font-sans tracking-widest uppercase">Market Context</p>
          </div>
          <div className="relative z-10 pt-10">
            <h3 className="text-xl lg:text-2xl font-serif text-white mb-2 lg:mb-3 leading-tight">
              News & Sentiment<br />Synthesis
            </h3>
            <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">
              Reads the latest coverage and distills market consensus, telling you not just what happened, but why it matters.
            </p>
          </div>
        </SpotlightCard>
      </FadeInStaggerItem>

      <FadeInStaggerItem className="md:col-span-3 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] transition-colors p-6 lg:p-8 min-h-[300px] lg:min-h-[320px] group border-gradient-fade">
        <SpotlightCard className="h-full flex flex-col justify-between -m-6 p-6 lg:-m-8 lg:p-8">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Cpu className="w-16 h-16 lg:w-20 lg:h-20 text-white" strokeWidth={1} />
          </div>
          <div className="space-y-4 relative z-10">
            <p className="text-zinc-500 text-xs font-sans tracking-widest uppercase">Deep Reasoning</p>
          </div>
          <div className="relative z-10 pt-10">
            <h3 className="text-xl lg:text-2xl font-serif text-white mb-2 lg:mb-3 leading-tight">
              Historical<br />Pattern Matching
            </h3>
            <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">
              Finds the closest parallel from market history and reasons through management quality and competitive moats.
            </p>
          </div>
        </SpotlightCard>
      </FadeInStaggerItem>

      <FadeInStaggerItem className="md:col-span-3 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] transition-colors p-6 lg:p-8 min-h-[300px] lg:min-h-[320px] group border-gradient-fade">
        <SpotlightCard className="h-full flex flex-col justify-between -m-6 p-6 lg:-m-8 lg:p-8">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Link2 className="w-16 h-16 lg:w-20 lg:h-20 text-white" strokeWidth={1} />
          </div>
          <div className="space-y-4 relative z-10">
            <p className="text-zinc-500 text-xs font-sans tracking-widest uppercase">The Output</p>
          </div>
          <div className="relative z-10 pt-10">
            <h3 className="text-xl lg:text-2xl font-serif text-white mb-2 lg:mb-3 leading-tight">
              The Final<br />Decision
            </h3>
            <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">
              Synthesizes all 7 nodes into a single, reasoned Invest, Hold, or Avoid call—backed by a transparent breakdown.
            </p>
          </div>
        </SpotlightCard>
      </FadeInStaggerItem>

      {/* ── ROW 2: Stats (3 columns of 4) ── */}
      <FadeInStaggerItem className="md:col-span-4 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] p-6 lg:p-8 flex flex-col justify-end min-h-[220px] border-t border-zinc-800/20">
        <div className="text-5xl lg:text-[4rem] leading-none font-serif text-white tracking-tight mb-3 lg:mb-4">7</div>
        <div className="text-xs lg:text-sm font-sans text-zinc-500 tracking-wide">Parallel AI Agents running per report</div>
      </FadeInStaggerItem>

      <FadeInStaggerItem className="md:col-span-4 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] p-6 lg:p-8 flex flex-col justify-end min-h-[220px] border-t border-zinc-800/20">
        <div className="text-5xl lg:text-[4rem] leading-none font-serif text-white tracking-tight mb-3 lg:mb-4">2</div>
        <div className="text-xs lg:text-sm font-sans text-zinc-500 tracking-wide">Asset classes (Stocks & Crypto) supported</div>
      </FadeInStaggerItem>

      <FadeInStaggerItem className="md:col-span-4 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] p-6 lg:p-8 flex flex-col justify-end min-h-[220px] border-t border-zinc-800/20">
        <div className="text-5xl lg:text-[4rem] leading-none font-serif text-white tracking-tight mb-3 lg:mb-4">
          &lt;60<span className="text-4xl text-zinc-600">s</span>
        </div>
        <div className="text-xs lg:text-sm font-sans text-zinc-500 tracking-wide">Time from your prompt to a final decision</div>
      </FadeInStaggerItem>

      {/* ── ROW 3: Comparisons (3 columns of 4) ── */}
      <FadeInStaggerItem className="md:col-span-4 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] p-6 lg:p-8 flex flex-col min-h-[200px]">
        <h4 className="text-xl lg:text-2xl font-serif text-white mb-auto">Research Time</h4>
        <div className="space-y-3 lg:space-y-4 font-sans text-xs lg:text-sm mt-6 lg:mt-8 w-full">
          <div className="flex justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-zinc-600">Before</span>
            <span className="text-zinc-400">2+ Hours</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-zinc-500">with OnDecide</span>
            <span className="text-white font-medium">&lt; 1 Minute</span>
          </div>
        </div>
      </FadeInStaggerItem>

      <FadeInStaggerItem className="md:col-span-4 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] p-6 lg:p-8 flex flex-col min-h-[200px]">
        <h4 className="text-xl lg:text-2xl font-serif text-white mb-auto">Data Sources</h4>
        <div className="space-y-3 lg:space-y-4 font-sans text-xs lg:text-sm mt-6 lg:mt-8 w-full">
          <div className="flex justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-zinc-600">Before</span>
            <span className="text-zinc-400">Fragmented Tools</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-zinc-500">with OnDecide</span>
            <span className="text-white font-medium">Unified & Traceable</span>
          </div>
        </div>
      </FadeInStaggerItem>

      <FadeInStaggerItem className="md:col-span-4 bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] p-6 lg:p-8 flex flex-col min-h-[200px]">
        <h4 className="text-xl lg:text-2xl font-serif text-white mb-auto">The Output</h4>
        <div className="space-y-3 lg:space-y-4 font-sans text-xs lg:text-sm mt-6 lg:mt-8 w-full">
          <div className="flex justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-zinc-600">Before</span>
            <span className="text-zinc-400">A numeric score</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-zinc-500">with OnDecide</span>
            <span className="text-white font-medium">Reasoned Decision</span>
          </div>
        </div>
      </FadeInStaggerItem>
    </StaggerContainer>
  );
}
