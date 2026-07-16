import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { Database, BrainCircuit, Activity } from "lucide-react";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { FadeIn, StaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductDemo from "@/components/demo/ProductDemo";
import { StockAsciiArt } from "@/components/ui/StockAsciiArt";
import { InkGardenArt } from "@/components/ui/InkGardenArt";

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

const FAQS = [
  {
    question: "Is this financial advice?",
    answer: "No, OnDecide provides independent, AI-driven investment research and analysis to help you make your own decisions. We synthesize public data, news, and history into plain language, but we are not financial advisors.",
  },
  {
    question: "How fresh is the data?",
    answer: "We pull live pricing and real-time news the moment you request a report. Our agents synthesize the absolute latest information alongside 10+ years of historical SEC filings.",
  },
  {
    question: "Can I use this for Day Trading?",
    answer: "OnDecide is built for fundamental investors, swing traders, and value seekers. While we process live data, our insights focus on macro trends, company health, and longer-term thesis building rather than minute-by-minute scalping.",
  },
  {
    question: "Which markets do you cover?",
    answer: "We currently cover all major US equities (NYSE, NASDAQ), top Indian equities (NSE), and top cryptocurrencies by market cap.",
  },
];

// ─── Main Component ────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden dot-grid min-h-screen flex items-center justify-center">
        {/* Stock-market ASCII art + Ink Garden — hero feature background */}
        <div className="absolute inset-0 pointer-events-none">
          <StockAsciiArt opacity={0.10} fixed={false} />
          <InkGardenArt opacity={0.10} fixed={false} />
        </div>
        
        {/* Cinematic Background Lighting */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen animate-orb pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-navy-500/20 rounded-full blur-[120px] mix-blend-screen animate-orb pointer-events-none" style={{ animationDelay: "2s" }} />

        <StaggerContainer className="relative max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center z-10" delayChildren={0.1} staggerChildren={0.15}>
          
          {/* Badge */}
          <FadeInStaggerItem direction="up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-8 text-xs font-sans text-zinc-400 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              AI RESEARCH, NOT A SCREENER
            </div>
          </FadeInStaggerItem>

          {/* Headline */}
          <FadeInStaggerItem direction="up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight tracking-tight">
              <span className="text-gradient-premium">Understand any investment.</span><br className="hidden sm:block" />
              <span className="text-zinc-400">Not just its score.</span>
            </h1>
          </FadeInStaggerItem>

          {/* Sub-headline */}
          <FadeInStaggerItem direction="up">
            <p className="text-lg sm:text-xl text-zinc-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              OnDecide reads the news, the numbers, and the history — then explains what they mean, in plain English, before you decide.
            </p>
          </FadeInStaggerItem>

          {/* Search & CTA */}
          <FadeInStaggerItem direction="up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto mb-8">
              <div className="w-full sm:flex-1 relative z-20 shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] rounded-full">
                <SearchBar large />
              </div>
            </div>
          </FadeInStaggerItem>

          {/* Popular tickers */}
          <FadeInStaggerItem direction="up">
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR.map((p) => (
                <Link
                  key={p.ticker}
                  href={`/research/${p.ticker}`}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/[0.06] bg-[linear-gradient(137deg,rgba(17,18,20,0.75)_4.87%,rgba(12,13,15,0.9)_75.88%)] backdrop-blur-[5px] shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.15)] hover:border-white/10 transition-all text-xs group"
                >
                  <span className="font-sans text-zinc-300 group-hover:text-white transition-colors">{p.ticker}</span>
                </Link>
              ))}
            </div>
          </FadeInStaggerItem>
        </StaggerContainer>
      </section>

      {/* ── 2. UNIFIED BENTO GRID (The Pipeline, Stats, Comparisons) ──────────────── */}
      <section className="bg-black py-16 lg:py-24 border-t border-zinc-800/60 relative no-gsap">
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
          <BentoGrid />
        </div>
      </section>

      {/* ── 3. ASSET CLASS GRID ───────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-32 border-t border-zinc-800/60 no-gsap">
        <FadeIn direction="up" className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
            Two asset classes, done properly.<br className="hidden sm:block" /> Everything else, pointed in the right direction.
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg">
            We&apos;d rather give you a real analyst&apos;s depth on stocks and crypto than a shallow score on everything.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800/50 p-px" staggerChildren={0.15}>
          {ASSET_CLASSES.map((asset) => (
            <FadeInStaggerItem
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
            </FadeInStaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── 4. HOW IT WORKS ────────────────────────────────────── */}
      <section className="bg-[#111] py-24 border-t border-zinc-800/60 relative overflow-hidden no-gsap">
        <div className="absolute inset-0 dot-grid opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <FadeIn direction="up" className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-serif text-white mb-4">
              How OnDecide works
            </h2>
            <p className="text-zinc-500 max-w-xl mx-auto text-lg">
              A transparent, repeatable methodology for generating high-conviction research.
            </p>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerChildren={0.15}>
            <FadeInStaggerItem className="bg-black border border-zinc-800/60 p-8 rounded-lg relative">
              <div className="w-12 h-12 bg-zinc-900 rounded flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">1. Deep Ingestion</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We ingest 10+ years of SEC filings, earnings call transcripts, and live market data. No metric is left unchecked.
              </p>
            </FadeInStaggerItem>
            <FadeInStaggerItem className="bg-black border border-zinc-800/60 p-8 rounded-lg relative">
              <div className="w-12 h-12 bg-zinc-900 rounded flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">2. Context Synthesis</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Our agents read today&apos;s news and macro sentiment, giving qualitative context to the raw quantitative data.
              </p>
            </FadeInStaggerItem>
            <FadeInStaggerItem className="bg-black border border-zinc-800/60 p-8 rounded-lg relative">
              <div className="w-12 h-12 bg-zinc-900 rounded flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6 text-zinc-300" />
              </div>
              <h3 className="text-xl font-serif text-white mb-3">3. Thesis Generation</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                We compare the current setup to historical patterns to generate a final Invest, Hold, or Avoid thesis.
              </p>
            </FadeInStaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── 5. ANATOMY OF A REPORT ─────────────────────────────── */}
      <section className="py-24 border-t border-zinc-800/60 bg-black no-gsap">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text, Links, Chips */}
            <FadeIn direction="left" className="lg:order-1">
              <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6 leading-[1.15]">
                Synthesize complex data into a clear investment thesis
              </h2>
              <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
                Automate document-heavy financial research with unmatched precision. Cut down manual reading workloads, identify valuation risks, and unlock faster reviews with plain-English insights.
              </p>
              
              <div className="mb-10">
                <Link href="/auth/signup" className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-zinc-300 transition-colors">
                  Explore the analyst pipeline <span className="text-xs">↗</span>
                </Link>
              </div>

              <div>
                <div className="text-[11px] font-mono text-zinc-600 uppercase tracking-widest mb-4">
                  Active analyst agents
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Company Resolution Agent
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    Financial Ingestion Agent
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-violet-500" />
                    Real-Time News Agent
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Qualitative Factors Agent
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    Pattern Matching Agent
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                    Report Synthesis Agent
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-300">
                    <span className="h-2 w-2 rounded-full bg-fuchsia-500" />
                    Thesis Formulation Agent
                  </span>
                  <span className="text-xs text-zinc-600 self-center pl-1 font-medium">+12 more</span>
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Dynamic Animation */}
            <FadeIn direction="right" className="lg:order-2">
              <div className="relative overflow-hidden h-[500px] sm:h-[550px] w-full">
                <ProductDemo className="h-full w-full" />
              </div>
            </FadeIn>
          </div>

          {/* Bottom Statistics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-zinc-800/60 mt-20">
            <div>
              <div className="text-4xl font-serif text-white mb-2">10x</div>
              <div className="text-sm text-zinc-500 leading-relaxed">
                Faster due diligence reviews compared to manual parsing.
              </div>
            </div>
            <div>
              <div className="text-4xl font-serif text-white mb-2">99%</div>
              <div className="text-sm text-zinc-500 leading-relaxed">
                Coverage across global listed equities and major digital assets.
              </div>
            </div>
            <div>
              <div className="text-4xl font-serif text-white mb-2">100%</div>
              <div className="text-sm text-zinc-500 leading-relaxed">
                Jargon-free qualitative synthesis written in plain English.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────── */}
      <section className="py-24 border-t border-zinc-800/60 bg-black no-gsap">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn direction="up" className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-serif text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-500 text-lg">
              Everything you need to know about how OnDecide operates.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-zinc-800">
                  <AccordionTrigger className="text-left font-serif text-lg text-zinc-200 hover:text-white py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-500 text-base leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ── 4. FINAL CTA ─────────────────────────────────────── */}
      <section className="border-t border-zinc-800/60 bg-[#111] no-gsap">
        <FadeIn direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 py-32 text-center">
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
        </FadeIn>
      </section>
    </div>
  );
}
