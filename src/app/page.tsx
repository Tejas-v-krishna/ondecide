import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/ui/SearchBar";
import { Database, BrainCircuit, Activity, ArrowUpRight } from "lucide-react";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { FadeIn, StaggerContainer, FadeInStaggerItem } from "@/components/ui/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductDemo from "@/components/demo/ProductDemo";

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
    example: "AAPL · TSLA · RELIANCE.NS",
  },
  {
    icon: "₿",
    name: "Crypto",
    tag: "live",
    desc: "Same depth of research, adapted for on-chain and market metrics where traditional financials don't apply.",
    example: "BTC · ETH · SOL",
  },
  {
    icon: "🧭",
    name: "Explore: ETFs, Mutual Funds, Bonds",
    tag: "guided",
    desc: "Not ready to research these directly yet — so instead of a broken half-feature, we'll teach you what they are and point you to the best free tools that already do this well.",
    example: "Curated directory, updated regularly",
  },
];

const STEPS = [
  {
    icon: Database,
    title: "1. Deep Ingestion",
    desc: "We ingest 10+ years of SEC filings, earnings call transcripts, and live market data. No metric is left unchecked.",
  },
  {
    icon: Activity,
    title: "2. Context Synthesis",
    desc: "Our agents read today's news and macro sentiment, giving qualitative context to the raw quantitative data.",
  },
  {
    icon: BrainCircuit,
    title: "3. Thesis Generation",
    desc: "We compare the current setup to historical patterns to generate a final Invest, Hold, or Avoid thesis.",
  },
];

const AGENTS = [
  { name: "Company Resolution Agent", dot: "bg-brand-500" },
  { name: "Financial Ingestion Agent", dot: "bg-blue-500" },
  { name: "Real-Time News Agent", dot: "bg-violet-500" },
  { name: "Qualitative Factors Agent", dot: "bg-amber-500" },
  { name: "Pattern Matching Agent", dot: "bg-rose-400" },
  { name: "Report Synthesis Agent", dot: "bg-cyan-500" },
  { name: "Thesis Formulation Agent", dot: "bg-fuchsia-500" },
];

const FAQS = [
  {
    question: "Is this financial advice?",
    answer:
      "No, OnDecide provides independent, AI-driven investment research and analysis to help you make your own decisions. We synthesize public data, news, and history into plain language, but we are not financial advisors.",
  },
  {
    question: "How fresh is the data?",
    answer:
      "We pull live pricing and real-time news the moment you request a report. Our agents synthesize the absolute latest information alongside 10+ years of historical SEC filings.",
  },
  {
    question: "Can I use this for Day Trading?",
    answer:
      "OnDecide is built for fundamental investors, swing traders, and value seekers. While we process live data, our insights focus on macro trends, company health, and longer-term thesis building rather than minute-by-minute scalping.",
  },
  {
    question: "Which markets do you cover?",
    answer:
      "We currently cover all major US equities (NYSE, NASDAQ), top Indian equities (NSE), and top cryptocurrencies by market cap.",
  },
];

// ─── Main Component ────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="bg-paper text-ink">

      {/* ── 1. HERO ──────────────────────────────────────────── */}
      <section className="hero-wash relative overflow-hidden border-b border-line">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />

        <StaggerContainer
          className="shell relative z-10 flex min-h-[88vh] flex-col items-center justify-center py-24 text-center"
          delayChildren={0.05}
          staggerChildren={0.12}
        >
          {/* Badge */}
          <FadeInStaggerItem direction="up">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-ink-500 shadow-sm backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
              AI research, not a screener
            </div>
          </FadeInStaggerItem>

          {/* Headline */}
          <FadeInStaggerItem direction="up">
            <h1 className="text-display mx-auto max-w-4xl text-balance font-medium text-ink">
              Understand any investment.
              <br />
              <span className="display-serif italic text-ink-400">Not just its score.</span>
            </h1>
          </FadeInStaggerItem>

          {/* Sub-headline */}
          <FadeInStaggerItem direction="up">
            <p className="mx-auto mb-12 mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-ink-500 sm:text-xl">
              OnDecide reads the news, the numbers, and the history — then explains what they mean,
              in plain English, before you decide.
            </p>
          </FadeInStaggerItem>

          {/* Search */}
          <FadeInStaggerItem direction="up" className="w-full">
            <div className="mx-auto mb-8 flex max-w-2xl flex-col items-center justify-center gap-4">
              <div className="relative z-20 w-full">
                <SearchBar large />
              </div>
            </div>
          </FadeInStaggerItem>

          {/* Popular tickers */}
          <FadeInStaggerItem direction="up">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 text-xs text-ink-400">Try</span>
              {POPULAR.map((p) => (
                <Link
                  key={p.ticker}
                  href={`/research/${p.ticker}`}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-1.5 text-xs text-ink-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-line-strong hover:text-ink"
                >
                  <span className="font-medium">{p.ticker}</span>
                  <span className="text-ink-400">{p.name}</span>
                </Link>
              ))}
            </div>
          </FadeInStaggerItem>
        </StaggerContainer>
      </section>

      {/* ── 2. BENTO GRID ──────────────── */}
      <section className="border-b border-line bg-paper py-20 lg:py-28">
        <div className="shell relative z-10">
          <div className="mb-14 text-center">
            <FadeIn direction="up">
              <span className="mb-4 inline-block text-2xs font-medium uppercase tracking-widest text-brand-700">
                The pipeline
              </span>
              <h2 className="text-display-sm mx-auto max-w-2xl font-medium text-ink">
                Seven agents. One coherent report.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-ink-500 sm:text-lg">
                Most tools give you a number. OnDecide shows its reasoning — because a decision you
                don&apos;t understand isn&apos;t really your decision.
              </p>
            </FadeIn>
          </div>

          <BentoGrid />
        </div>
      </section>

      {/* ── 3. ASSET CLASS GRID ───────────────────────────────── */}
      <section className="border-b border-line bg-surface py-20 lg:py-28">
        <div className="shell">
          <FadeIn direction="up" className="mb-16 text-center">
            <h2 className="text-display-sm mx-auto max-w-3xl font-medium text-balance text-ink">
              Two asset classes, done properly.
              <br className="hidden sm:block" /> Everything else, pointed in the right direction.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500">
              We&apos;d rather give you a real analyst&apos;s depth on stocks and crypto than a
              shallow score on everything.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3" staggerChildren={0.12}>
            {ASSET_CLASSES.map((asset) => (
              <FadeInStaggerItem
                key={asset.name}
                className="group relative flex flex-col rounded-2xl border border-line bg-paper p-8 transition-colors hover:border-line-strong"
              >
                <div className="absolute right-6 top-6 rounded-full border border-line bg-surface px-2.5 py-0.5 text-2xs font-medium uppercase tracking-widest text-ink-400">
                  {asset.tag}
                </div>
                <div className="mb-6 text-2xl opacity-70 transition-opacity group-hover:opacity-100">
                  {asset.icon}
                </div>
                <h3 className="mb-3 text-xl font-medium text-ink">{asset.name}</h3>
                <p className="mb-6 text-sm leading-relaxed text-ink-500">{asset.desc}</p>
                <p className="mt-auto text-xs text-ink-400">{asset.example}</p>
              </FadeInStaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-line bg-paper py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
        <div className="shell relative z-10">
          <FadeIn direction="up" className="mb-16 text-center">
            <h2 className="text-display-sm font-medium text-ink">How OnDecide works</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-500">
              A transparent, repeatable methodology for generating high-conviction research.
            </p>
          </FadeIn>

          <StaggerContainer className="grid gap-6 md:grid-cols-3" staggerChildren={0.12}>
            {STEPS.map((step) => (
              <FadeInStaggerItem
                key={step.title}
                className="card-surface p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface-subtle">
                  <step.icon className="h-6 w-6 text-ink-600" />
                </div>
                <h3 className="mb-3 text-xl font-medium text-ink">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-500">{step.desc}</p>
              </FadeInStaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── 5. ANATOMY OF A REPORT ─────────────────────────────── */}
      <section className="border-b border-line bg-surface py-20 lg:py-28">
        <div className="shell">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left Column */}
            <FadeIn direction="left" className="lg:order-1">
              <span className="mb-4 inline-block text-2xs font-medium uppercase tracking-widest text-brand-700">
                Anatomy of a report
              </span>
              <h2 className="text-display-sm mb-6 font-medium leading-[1.1] text-ink">
                Synthesize complex data into a clear investment thesis
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-ink-500">
                Automate document-heavy financial research with unmatched precision. Cut down manual
                reading workloads, identify valuation risks, and unlock faster reviews with
                plain-English insights.
              </p>

              <div className="mb-10">
                <Link
                  href="/sign-up"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 transition-colors hover:text-brand-800"
                >
                  Explore the analyst pipeline
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div>
                <div className="mb-4 text-[11px] font-medium uppercase tracking-widest text-ink-400">
                  Active analyst agents
                </div>
                <div className="flex flex-wrap gap-2">
                  {AGENTS.map((a) => (
                    <span
                      key={a.name}
                      className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-subtle px-3 py-1.5 text-xs text-ink-600"
                    >
                      <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                      {a.name}
                    </span>
                  ))}
                  <span className="self-center pl-1 text-xs font-medium text-ink-400">
                    +12 more
                  </span>
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Dynamic Animation */}
            <FadeIn direction="right" className="lg:order-2">
              <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-line bg-surface-subtle shadow-lg sm:h-[550px]">
                <ProductDemo className="h-full w-full" />
              </div>
            </FadeIn>
          </div>

          {/* Bottom Statistics Row */}
          <div className="mt-20 grid grid-cols-1 gap-8 border-t border-line pt-16 md:grid-cols-3">
            {[
              { value: "10x", label: "Faster due diligence reviews compared to manual parsing." },
              { value: "99%", label: "Coverage across global listed equities and major digital assets." },
              { value: "100%", label: "Jargon-free qualitative synthesis written in plain English." },
            ].map((s) => (
              <div key={s.value}>
                <div className="mb-2 font-display text-4xl text-ink">{s.value}</div>
                <div className="text-sm leading-relaxed text-ink-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ───────────────────────────────────────────── */}
      <section className="border-b border-line bg-paper py-20 lg:py-28">
        <div className="shell max-w-3xl">
          <FadeIn direction="up" className="mb-12 text-center">
            <h2 className="text-display-sm mb-4 font-medium text-ink">Frequently asked questions</h2>
            <p className="text-lg text-ink-500">
              Everything you need to know about how OnDecide operates.
            </p>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="py-4 text-left text-lg text-ink">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-base leading-relaxed text-ink-500">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* ── 7. FINAL CTA ─────────────────────────────────────── */}
      <section className="hero-wash border-b border-line bg-surface">
        <FadeIn direction="up" className="shell max-w-3xl py-28 text-center">
          <h2 className="text-display-sm mb-6 font-medium text-balance text-ink">
            Stop guessing what the numbers mean.
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-ink-500">
            Free to start. No card required. Your first report is under a minute away.
          </p>
          <div className="mx-auto mb-6 max-w-md">
            <SearchBar large />
          </div>
          <p className="text-xs text-ink-400">Research your first stock today.</p>
        </FadeIn>
      </section>
    </div>
  );
}
