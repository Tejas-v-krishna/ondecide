import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";

export const metadata: Metadata = {
  title: "OnDecide — The AI Research Analyst",
  description:
    "Institutional-grade investment research on any stock, ETF, crypto, mutual fund, or bond — delivered in under 60 seconds.",
};

// ─── Data ──────────────────────────────────────────────────

const POPULAR = [
  { ticker: "AAPL", name: "Apple" },
  { ticker: "NVDA", name: "Nvidia" },
  { ticker: "MSFT", name: "Microsoft" },
  { ticker: "SPY", name: "S&P 500 ETF" },
  { ticker: "BTC", name: "Bitcoin" },
  { ticker: "US 10 Year", name: "US Bond" },
];

const STATS = [
  { value: "8", label: "Asset Classes", suffix: "" },
  { value: "7", label: "AI Agents", suffix: "" },
  { value: "60", label: "Second Reports", suffix: "s" },
  { value: "100", label: "Free to Start", suffix: "%" },
];

const ASSET_CLASSES = [
  { icon: "📈", name: "Stocks", desc: "P/E, margins, earnings, analyst targets, peer comps.", example: "AAPL · TSLA · RELIANCE.NS" },
  { icon: "🏦", name: "ETFs", desc: "Holdings, expense ratio, sector weights, AUM, benchmark.", example: "SPY · QQQ · VTI" },
  { icon: "₿", name: "Crypto", desc: "Price action, market cap, dominance, on-chain sentiment.", example: "BTC · ETH · SOL" },
  { icon: "📊", name: "Mutual Funds", desc: "NAV, top holdings, fund manager, performance.", example: "VFIAX · FXAIX" },
  { icon: "🏛️", name: "Bonds", desc: "Yield, maturity, coupon, credit rating, duration.", example: "US 10 Year · Gilts" },
  { icon: "🏢", name: "REITs", desc: "FFO, dividend yield, occupancy, geography.", example: "O · VNQ · AMT" },
];

const FEATURES = [
  {
    title: "Full Analyst Scorecard",
    sub: "Four axes computed from real data",
    desc: "Valuation, Profitability, Growth, and Red Flags — scored 1–10. Computed from actual Finnhub fundamentals.",
  },
  {
    title: "News Synthesis Engine",
    sub: "Seven sources, one coherent narrative",
    desc: "Our news agent pulls the latest coverage, synthesizes the key themes, and tells you why each story matters.",
  },
  {
    title: "Historical Pattern Matching",
    sub: "Context from market history",
    desc: "The AI finds the closest historical parallel to today's situation — citing specific years and outcomes.",
  },
  {
    title: "Peer Comps Analysis",
    sub: "Benchmark against direct competitors",
    desc: "Automatically fetches up to 3 direct competitors, pulls their P/E, margins, and revenue growth.",
  },
  {
    title: "Smart Money Tracker",
    sub: "Follow the informed capital",
    desc: "Uses the Insider Sentiment API to compute whether corporate insiders have been buying or selling.",
  },
  {
    title: "Earnings Call NLP",
    sub: "Management tone decoded",
    desc: "Extracts management tone, forward guidance language, and key risk statements from the latest transcripts.",
  },
];

const COMPARISON = [
  { feature: "Plain language explanations", ondecide: true, generic: false, terminal: false },
  { feature: "AI verdict generated", ondecide: true, generic: false, terminal: false },
  { feature: "Historical context", ondecide: true, generic: false, terminal: false },
  { feature: "Earnings call NLP", ondecide: true, generic: false, terminal: true },
  { feature: "Peer comps analysis", ondecide: true, generic: false, terminal: true },
  { feature: "Insider sentiment", ondecide: true, generic: false, terminal: true },
  { feature: "8 asset classes", ondecide: true, generic: true, terminal: true },
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
            Institutional Research
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight tracking-tight">
            Everything your firm needs.<br className="hidden sm:block" />
            <span className="text-zinc-400">The instant you need it.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            AI-powered investment research on any stock, ETF, crypto, or bond —
            delivered in plain English in under 60 seconds.
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
            Research anything.
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg">
            One platform. Every major asset class. Institutional depth without the institutional bloat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/50 p-px">
          {ASSET_CLASSES.map((asset) => (
            <div
              key={asset.name}
              className="bg-black p-10 hover:bg-zinc-950 transition-colors group"
            >
              <div className="text-2xl mb-6 opacity-60 group-hover:opacity-100 transition-opacity">{asset.icon}</div>
              <h3 className="text-xl font-serif text-white mb-3">{asset.name}</h3>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{asset.desc}</p>
              <p className="text-zinc-700 text-xs font-sans">{asset.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. FEATURES ──────────────────────────────────── */}
      <section className="border-t border-zinc-800/60 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-32">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
              The workflow firms operationalize first.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800/50 p-px">
            {FEATURES.map((feature, i) => (
              <div key={i} className="bg-black p-10">
                <div className="mb-2 text-xs font-sans text-zinc-500">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="text-lg font-serif text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-xs mb-4">{feature.sub}</p>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COMPARISON TABLE ──────────────────────────────── */}
      <section className="border-t border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
              Intelligence at capital scale.
            </h2>
          </div>

          <div className="border border-zinc-800/60">
            {/* Header */}
            <div className="grid grid-cols-4 bg-zinc-950 border-b border-zinc-800/60">
              <div className="p-5 text-xs font-sans text-zinc-500 uppercase tracking-widest">Capabilities</div>
              <div className="p-5 text-center text-sm font-serif text-white">OnDecide</div>
              <div className="p-5 text-center text-sm font-serif text-zinc-500">News Sites</div>
              <div className="p-5 text-center text-sm font-serif text-zinc-500">Terminals</div>
            </div>

            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 border-b border-zinc-800/40 ${i % 2 === 0 ? "bg-black" : "bg-zinc-950/30"}`}
              >
                <div className="p-5 text-sm text-zinc-400 flex items-center">{row.feature}</div>
                <div className="p-5 flex items-center justify-center">
                  {row.ondecide ? (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  ) : (
                    <div className="w-4 h-px bg-zinc-700" />
                  )}
                </div>
                <div className="p-5 flex items-center justify-center">
                  {row.generic ? (
                    <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  ) : (
                    <div className="w-4 h-px bg-zinc-800" />
                  )}
                </div>
                <div className="p-5 flex items-center justify-center">
                  {row.terminal ? (
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

      {/* ── 6. FINAL CTA ─────────────────────────────────────── */}
      <section className="border-t border-zinc-800/60 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-32 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
            Build models.<br/>Deploy across teams.
          </h2>
          <p className="text-zinc-500 text-lg mb-12 max-w-xl mx-auto">
            Experience institutional research instantly. No credit card required.
          </p>
          <div className="max-w-md mx-auto mb-6">
            <SearchBar large />
          </div>
          <p className="text-xs text-zinc-600 font-sans">
            For informational purposes only.
          </p>
        </div>
      </section>
    </div>
  );
}
