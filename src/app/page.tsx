import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { FileText, Cpu, Clock, Link2, Download, Filter } from "lucide-react";

export const metadata: Metadata = {
  title: "OnDecide — Understand any investment",
  description:
    "OnDecide reads the news, the numbers, and the history — then explains what they mean, in plain English, before you decide.",
};

// ─── Data ──────────────────────────────────────────────────

const POPULAR = [
  { ticker: "AAPL", name: "Apple" },
  { ticker: "NVDA", name: "Nvidia" },
  { ticker: "BTC", name: "Bitcoin" },
  { ticker: "RELIANCE.NS", name: "Reliance" },
  { ticker: "ETH", name: "Ethereum" },
];

const ASSET_CLASSES = [
  { 
    icon: "📈", 
    name: "Stocks", 
    tag: "live",
    desc: "Full financials, live price data, recent news synthesized into plain language, qualitative read on management and competitive position, and a reasoned Invest/Hold/Avoid call.", 
    example: "AAPL · TSLA · RELIANCE.NS" 
  },
  { 
    icon: "₿", 
    name: "Crypto", 
    tag: "live",
    desc: "Same depth of research, adapted for on-chain and market metrics where traditional financials don't apply.", 
    example: "BTC · ETH · SOL" 
  },
  { 
    icon: "🧭", 
    name: "Explore: ETFs, Mutual Funds, Bonds", 
    tag: "guided",
    desc: "Not ready to research these directly yet — so instead of a broken half-feature, we'll teach you what they are and point you to the best free tools that already do this well.", 
    example: "Curated directory, updated regularly" 
  },
];

// ─── Main Component ────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden dot-grid min-h-[85vh] flex items-center justify-center">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8 text-xs font-sans text-zinc-400 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            AI RESEARCH, NOT A SCREENER
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight tracking-tight">
            Understand any investment.<br className="hidden sm:block" />
            <span className="text-zinc-400">Not just its score.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            OnDecide reads the news, the numbers, and the history — then explains what they mean, in plain English, before you decide.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-8">
            <SearchBar large />
          </div>

          {/* Popular tickers */}
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR.map((p) => (
              <Link
                key={p.ticker}
                href={`/research/${p.ticker}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-zinc-800 bg-black hover:bg-zinc-900 hover:border-zinc-700 transition-all text-xs group"
              >
                <span className="font-sans text-zinc-300 group-hover:text-white transition-colors">{p.ticker}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. UNIFIED BENTO GRID (The Pipeline, Stats, Comparisons) ──────────────── */}
      <section className="bg-black py-16 lg:py-24 border-t border-zinc-800/60 relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-4">
              Seven agents. One coherent report.
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-base sm:text-lg">
              Most tools give you a number. OnDecide shows its reasoning — because a decision you don&apos;t understand isn&apos;t really your decision.
            </p>
          </div>

          {/* Bento Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-800/60 p-px rounded-sm overflow-hidden">
            
            {/* ── ROW 1: Pipeline (4 columns of 3) ── */}
            <div className="md:col-span-3 bg-[#131313] hover:bg-[#181818] transition-colors flex flex-col justify-between p-6 lg:p-8 min-h-[300px] lg:min-h-[320px] group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Filter className="w-16 h-16 lg:w-20 lg:h-20 text-white" strokeWidth={1} />
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-zinc-500 text-xs font-sans tracking-widest uppercase">Data Ingestion</p>
              </div>
              <div className="relative z-10 pt-10">
                <h3 className="text-xl lg:text-2xl font-serif text-white mb-2 lg:mb-3 leading-tight">Live Market<br/>Resolution</h3>
                <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">Resolves partial names or tickers, fetching live pricing and deep fundamentals from institutional-grade APIs instantly.</p>
              </div>
            </div>

            <div className="md:col-span-3 bg-[#131313] hover:bg-[#181818] transition-colors flex flex-col justify-between p-6 lg:p-8 min-h-[300px] lg:min-h-[320px] group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText className="w-16 h-16 lg:w-20 lg:h-20 text-white" strokeWidth={1} />
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-zinc-500 text-xs font-sans tracking-widest uppercase">Market Context</p>
              </div>
              <div className="relative z-10 pt-10">
                <h3 className="text-xl lg:text-2xl font-serif text-white mb-2 lg:mb-3 leading-tight">News & Sentiment<br/>Synthesis</h3>
                <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">Reads the latest coverage and distills market consensus, telling you not just what happened, but why it matters.</p>
              </div>
            </div>

            <div className="md:col-span-3 bg-[#131313] hover:bg-[#181818] transition-colors flex flex-col justify-between p-6 lg:p-8 min-h-[300px] lg:min-h-[320px] group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu className="w-16 h-16 lg:w-20 lg:h-20 text-white" strokeWidth={1} />
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-zinc-500 text-xs font-sans tracking-widest uppercase">Deep Reasoning</p>
              </div>
              <div className="relative z-10 pt-10">
                <h3 className="text-xl lg:text-2xl font-serif text-white mb-2 lg:mb-3 leading-tight">Historical<br/>Pattern Matching</h3>
                <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">Finds the closest parallel from market history and reasons through management quality and competitive moats.</p>
              </div>
            </div>

            <div className="md:col-span-3 bg-[#131313] hover:bg-[#181818] transition-colors flex flex-col justify-between p-6 lg:p-8 min-h-[300px] lg:min-h-[320px] group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Link2 className="w-16 h-16 lg:w-20 lg:h-20 text-white" strokeWidth={1} />
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-zinc-500 text-xs font-sans tracking-widest uppercase">The Output</p>
              </div>
              <div className="relative z-10 pt-10">
                <h3 className="text-xl lg:text-2xl font-serif text-white mb-2 lg:mb-3 leading-tight">The Final<br/>Decision</h3>
                <p className="text-xs lg:text-sm text-zinc-400 leading-relaxed">Synthesizes all 7 nodes into a single, reasoned Invest, Hold, or Avoid call—backed by a transparent breakdown.</p>
              </div>
            </div>

            {/* ── ROW 2: Stats (3 columns of 4) ── */}
            <div className="md:col-span-4 bg-[#111111] p-6 lg:p-8 flex flex-col justify-end min-h-[220px] border-t border-zinc-800/20">
              <div className="text-5xl lg:text-[4rem] leading-none font-serif text-white tracking-tight mb-3 lg:mb-4">7</div>
              <div className="text-xs lg:text-sm font-sans text-zinc-500 tracking-wide">Parallel AI Agents running per report</div>
            </div>

            <div className="md:col-span-4 bg-[#111111] p-6 lg:p-8 flex flex-col justify-end min-h-[220px] border-t border-zinc-800/20">
              <div className="text-5xl lg:text-[4rem] leading-none font-serif text-white tracking-tight mb-3 lg:mb-4">2</div>
              <div className="text-xs lg:text-sm font-sans text-zinc-500 tracking-wide">Asset classes (Stocks & Crypto) supported</div>
            </div>

            <div className="md:col-span-4 bg-[#111111] p-6 lg:p-8 flex flex-col justify-end min-h-[220px] border-t border-zinc-800/20">
              <div className="text-5xl lg:text-[4rem] leading-none font-serif text-white tracking-tight mb-3 lg:mb-4">&lt;60<span className="text-4xl text-zinc-600">s</span></div>
              <div className="text-xs lg:text-sm font-sans text-zinc-500 tracking-wide">Time from your prompt to a final decision</div>
            </div>

            {/* ── ROW 3: Comparisons (3 columns of 4) ── */}
            <div className="md:col-span-4 bg-[#131313] p-6 lg:p-8 flex flex-col min-h-[200px]">
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
            </div>

            <div className="md:col-span-4 bg-[#131313] p-6 lg:p-8 flex flex-col min-h-[200px]">
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
            </div>

            <div className="md:col-span-4 bg-[#131313] p-6 lg:p-8 flex flex-col min-h-[200px]">
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
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. ASSET CLASS GRID ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-32 border-t border-zinc-800/60">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
            Two asset classes, done properly.<br className="hidden sm:block" /> Everything else, pointed in the right direction.
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg">
            We&apos;d rather give you a real analyst&apos;s depth on stocks and crypto than a shallow score on everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800/50 p-px">
          {ASSET_CLASSES.map((asset) => (
            <div
              key={asset.name}
              className="bg-black p-10 hover:bg-[#111] transition-colors group relative"
            >
              <div className="absolute top-8 right-8 text-2xs font-sans uppercase tracking-widest text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-full">
                {asset.tag}
              </div>
              <div className="text-2xl mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{asset.icon}</div>
              <h3 className="text-xl font-serif text-white mb-3">{asset.name}</h3>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{asset.desc}</p>
              <p className="text-zinc-700 text-xs font-sans">{asset.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FINAL CTA ─────────────────────────────────────── */}
      <section className="border-t border-zinc-800/60 bg-[#111]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-32 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
            Stop guessing what the numbers mean.
          </h2>
          <p className="text-zinc-500 text-lg mb-12 max-w-xl mx-auto">
            Free to start. No card required. Your first report is under a minute away.
          </p>
          <div className="max-w-md mx-auto mb-6">
            <SearchBar large />
          </div>
          <p className="text-xs text-zinc-600 font-sans">
            Research your first stock today.
          </p>
        </div>
      </section>
    </div>
  );
}
