import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";

export const metadata: Metadata = {
  title: "OnDecide — Research-Grade Investment Analysis in Plain English",
  description:
    "AI-powered investment research covering stocks and crypto. Get analyst-quality reports in plain language — financial health, news analysis, historical patterns, and a clear Invest/Hold/Avoid verdict.",
};

const FEATURES = [
  {
    icon: "🔬",
    title: "Analyst-Grade Research",
    desc: "Seven-section reports mirroring what professional analysts actually deliver — not a news feed with a sentiment score.",
  },
  {
    icon: "💬",
    title: "Plain Language",
    desc: "Every number has a one-line interpretation. Every jargon term is tappable for a clear definition. No finance degree required.",
  },
  {
    icon: "⚡",
    title: "Transparent Process",
    desc: "Watch the AI pipeline work in real time — 'Reading news', 'Pulling financials', 'Cross-checking history'. You see how the analysis is built.",
  },
  {
    icon: "📊",
    title: "Full Scorecard",
    desc: "Valuation, Profitability, Growth, Red Flags — four axes computed from real Finnhub data, not hand-waved ratings.",
  },
  {
    icon: "📜",
    title: "Historical Context",
    desc: "AI finds the closest historical parallel to the current situation and states the comparison plainly — with caveats.",
  },
  {
    icon: "⚖️",
    title: "Reasoned Verdict",
    desc: "Invest / Hold / Avoid with a confidence breakdown showing exactly how much weight went to each factor. No black box.",
  },
];

const COMING_SOON = [
  { label: "ETFs", note: "Coming soon" },
  { label: "Mutual Funds", note: "Coming soon" },
  { label: "Government Bonds", note: "Coming soon" },
  { label: "Real Estate", note: "Coming soon" },
];

const POPULAR = [
  { ticker: "AAPL", name: "Apple" },
  { ticker: "MSFT", name: "Microsoft" },
  { ticker: "NVDA", name: "Nvidia" },
  { ticker: "TSLA", name: "Tesla" },
  { ticker: "BTC", name: "Bitcoin" },
  { ticker: "ETH", name: "Ethereum" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-emerald-900/20 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 text-sm text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Powered by Gemini 2.0 Flash · LangGraph · Real market data
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 leading-tight">
            Research-grade analysis.{" "}
            <span className="text-emerald-400">Plain language.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            OnDecide replicates the daily workflow of a professional investment analyst — news synthesis, financial modeling, historical pattern-matching, and a reasoned verdict — and delivers it so a first-time investor understands <em>why</em>, not just <em>what</em>.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-6">
            <SearchBar large />
          </div>

          {/* Popular tickers */}
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR.map((p) => (
              <Link
                key={p.ticker}
                href={`/research/${p.ticker}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-navy-800 hover:border-slate-500 hover:bg-navy-750 transition-all text-sm text-slate-400 hover:text-slate-200"
              >
                <span className="font-mono font-semibold text-slate-300">{p.ticker}</span>
                <span className="text-slate-600">{p.name}</span>
              </Link>
            ))}
          </div>

          {/* Coming soon tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {COMING_SOON.map((cs) => (
              <span key={cs.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-600">
                {cs.label} <span className="text-slate-700">— {cs.note}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-800 bg-navy-800 p-5 hover:border-slate-700 transition-colors"
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-base font-semibold text-slate-100 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-800 bg-navy-850">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold text-slate-100 text-center mb-10">How a report is built</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Search", desc: "Enter any stock ticker (AAPL, RELIANCE.NS) or crypto name (BTC, ETH). OnDecide resolves and validates it." },
              { step: "2", title: "Research", desc: "Seven AI agents run — pulling Finnhub market data, Tavily news, Gemini qualitative analysis — in parallel where possible." },
              { step: "3", title: "Read", desc: "A full analyst report with all sections. Every jargon term is tappable. Save to your watchlist for later." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-400 font-bold">{item.step}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
