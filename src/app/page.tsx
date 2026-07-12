import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";

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

const STATS = [
  { value: "2", label: "Asset Classes", suffix: "" },
  { value: "7", label: "Node Pipeline", suffix: "" },
  { value: "<60", label: "Seconds Per Report", suffix: "s" },
  { value: "100", label: "Free to Start", suffix: "%" },
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

const FEATURES = [
  {
    title: "Resolve",
    desc: "Understands what you're actually asking about, even from a partial name or ticker.",
  },
  {
    title: "Financials",
    desc: "Pulls live price, fundamentals, and a structured scorecard across Valuation, Profitability, Growth, and Red Flags — computed from real data, not guessed.",
  },
  {
    title: "News Synthesis",
    desc: "Reads recent coverage and tells you not just what happened, but why it matters for this specific investment.",
  },
  {
    title: "Qualitative Read",
    desc: "Reasons through management quality and competitive position — the part pure number-crunchers skip entirely.",
  },
  {
    title: "Historical Pattern Matching",
    desc: "Finds the closest parallel from market history and tells you what happened next, with the honest caveat that history doesn't repeat on command.",
  },
  {
    title: "Analyst Sentiment Synthesis",
    desc: "Summarizes the prevailing tone of publicly available commentary in plain language — clearly labeled as AI-synthesized, never presented as a live brokerage feed.",
  },
  {
    title: "The Decision",
    desc: "Invest, Hold, or Avoid — with a transparent breakdown of what drove the call, and a 3-sentence explanation anyone can follow.",
  },
];

const COMPARISON = [
  { feature: "Plain-language explanations", ondecide: true, news: false, screener: false },
  { feature: "Reasoned Invest/Hold/Avoid call", ondecide: true, news: false, screener: false },
  { feature: "Historical context", ondecide: true, news: false, screener: false },
  { feature: "Transparent reasoning breakdown", ondecide: true, news: false, screener: false },
  { feature: "Live price & fundamentals", ondecide: true, news: "partial", screener: true },
  { feature: "Takes under a minute", ondecide: true, news: false, screener: true },
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

      {/* ── 2. STATS BAR ─────────────────────────────────────── */}
      <section className="border-y border-zinc-800/60 bg-zinc-950/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center animate-stat" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl sm:text-4xl font-serif text-white mb-2">
                  {stat.value}<span className="text-zinc-500 text-2xl ml-1">{stat.suffix}</span>
                </div>
                <div className="text-zinc-500 text-xs tracking-wide uppercase font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. ASSET CLASS GRID ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-32">
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
              className="bg-black p-10 hover:bg-zinc-950 transition-colors group relative"
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

      {/* ── 4. HOW IT WORKS ──────────────────────────────────── */}
      <section className="border-t border-zinc-800/60 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
              Seven agents. One coherent report.
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-lg">
              Most tools give you a number. OnDecide shows its reasoning — because a decision you don&apos;t understand isn&apos;t really your decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/50 p-px">
            {FEATURES.map((feature, i) => (
              <div key={i} className="bg-black p-10">
                <div className="mb-2 text-xs font-sans text-zinc-500">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-serif text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY PLAIN LANGUAGE MATTERS ────────────────────── */}
      <section className="border-t border-zinc-800/60 bg-zinc-950/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
                Built for the person, not the jargon.
              </h2>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Every term in your report is explained the moment you need it — whether you&apos;re opening your first brokerage account or your fiftieth.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                <p className="text-zinc-300">No hidden vocabulary. Tap any term, get a plain answer.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                <p className="text-zinc-300">The same report for a beginner and a professional — just read as deep as you want.</p>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                <p className="text-zinc-300">Every &quot;why&quot; is spelled out. Nothing is a black box you have to trust blindly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. COMPARISON TABLE ──────────────────────────────── */}
      <section className="border-t border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
              What you&apos;d otherwise stitch together yourself
            </h2>
          </div>

          <div className="border border-zinc-800/60">
            {/* Header */}
            <div className="grid grid-cols-4 bg-zinc-950 border-b border-zinc-800/60">
              <div className="p-5 text-xs font-sans text-zinc-500 uppercase tracking-widest">Capabilities</div>
              <div className="p-5 text-center text-sm font-serif text-white">OnDecide</div>
              <div className="p-5 text-center text-sm font-serif text-zinc-500">Reading news sites solo</div>
              <div className="p-5 text-center text-sm font-serif text-zinc-500">Raw stock screeners</div>
            </div>

            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-b border-zinc-800/40 ${i % 2 === 0 ? "bg-black" : "bg-zinc-950/30"}`}
              >
                <div className="p-5 text-sm text-zinc-400 flex items-center">{row.feature}</div>
                
                {/* OnDecide */}
                <div className="p-5 flex items-center justify-center">
                  {row.ondecide ? <div className="w-2 h-2 rounded-full bg-white" /> : <div className="w-4 h-px bg-zinc-700" />}
                </div>

                {/* News Sites Solo */}
                <div className="p-5 flex items-center justify-center">
                  {row.news === true ? (
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  ) : row.news === "partial" ? (
                    <span className="text-xs text-zinc-500 font-sans">Partial</span>
                  ) : (
                    <div className="w-4 h-px bg-zinc-800" />
                  )}
                </div>

                {/* Raw Stock Screeners */}
                <div className="p-5 flex items-center justify-center">
                  {row.screener ? (
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  ) : (
                    <div className="w-4 h-px bg-zinc-800" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FINAL CTA ─────────────────────────────────────── */}
      <section className="border-t border-zinc-800/60 bg-zinc-950">
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

