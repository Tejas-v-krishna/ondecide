import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  GitFork,
  Layers,
  Search,
  User,
  Zap,
} from "lucide-react";

import { HeroSearch } from "@/components/home/HeroSearch";
import { CapabilityMarquee } from "@/components/home/CapabilityMarquee";
import { Testimonials } from "@/components/home/Testimonials";
import { StripeBand } from "@/components/home/StripeBand";
import {
  CompassArt,
  ConstellationArt,
  ContourArt,
  CycleArt,
  GlassStack,
  HubArt,
  OrbitalArt,
  ParticleHead,
  PrismArt,
  RadialArt,
} from "@/components/home/DotArt";
import { LogoMark } from "@/components/ui/LogoMark";

export const metadata: Metadata = {
  title: "OnDecide — From Ticker to Thesis in Seconds",
  description:
    "Pull technical ratios, read market sentiment, analyze patterns, and form theses in one platform. Powered by AI agents that do the synthesis research you'd do by hand.",
};

// ─── Data ──────────────────────────────────────────────────

const PROBLEMS = [
  {
    n: "01",
    icon: Layers,
    title: "Fragmented Data",
    body: "Bouncing between 5+ platforms for technical analysis, news, sentiment, and fundamentals",
  },
  {
    n: "02",
    icon: Clock,
    title: "Hours of Research",
    body: "A single stock analysis takes 30+ minutes manually, verdict never justifies the time spend",
  },
  {
    n: "03",
    icon: GitFork,
    title: "Conflicting Signals",
    body: "Different analysis methods gives contradictory signals, no clear conviction to act on.",
  },
  {
    n: "04",
    icon: User,
    title: "Expensive Expertise",
    body: "Institutional research costs $10K+/month, retail investors can't afford research-grade analysis",
  },
  {
    n: "05",
    icon: Search,
    title: "Missed Connections",
    body: "Hard to spot macro trends, sector correlations, and historical pattern repeats manually",
  },
  {
    n: "06",
    icon: Zap,
    title: "Slow to Act",
    body: "By the time you've manually synthesized research, the opportunity has moved or vanished.",
  },
];

const FEATURES = [
  {
    tab: "Automated Pipeline",
    n: "01",
    title: "7 Parallel AI Agents",
    body: "Prices, balance sheets, and news in seconds.",
    art: ConstellationArt,
  },
  {
    tab: "No Jargon",
    n: "02",
    title: "Plain-Language Breakdown",
    body: "Complex financial ratios, in clear insights.",
    art: ContourArt,
  },
  {
    tab: "Cycle Analog",
    n: "03",
    title: "Historical Pattern Match",
    body: "Current setups vs. past market cycles.",
    art: CycleArt,
  },
  {
    tab: "Decision Engine",
    n: "04",
    title: "Invest / Hold / Avoid",
    body: "Clear ratings with confidence scores.",
    art: RadialArt,
  },
];

const STEPS = [
  {
    title: "Search Any Asset",
    body: "Type any US stock, international ticker, or crypto.",
    side: "left" as const,
    art: OrbitalArt,
  },
  {
    title: "AI Nodes Launch",
    body: "Agents pull prices, filings, news, and market history.",
    side: "right" as const,
    art: HubArt,
  },
  {
    title: "Plain English Synthesis",
    body: "Complex metrics translate into clear, readable insights.",
    side: "left" as const,
    art: PrismArt,
  },
  {
    title: "Get Actionable Verdict",
    body: "Receive an Invest / Hold / Avoid rating with a conviction score.",
    side: "right" as const,
    art: CompassArt,
  },
];

const PLANS = [
  {
    name: "Basic",
    tagline: "Essential AI research for individual investors.",
    features: [
      "5 AI Research Reports / month",
      "Full US Stock coverage",
      "Fundamental Scorecards & Key Metrics",
      "News Sentiment Synthesis",
      "Watchlist Tracking (up to 10 assets)",
    ],
    price: "$0",
    priceNote: "Free forever. No card required.",
    priceExtra: "Annual option — $15 / month (billed annually)",
    cta: "Get Basic",
    href: "/sign-up",
    variant: "basic" as const,
  },
  {
    name: "Pro",
    tagline: "For analysts who want the full pipeline.",
    features: [
      "Unlimited AI Research Reports",
      "US + International Equities + Crypto",
      "7-Agent Parallel Analysis Pipeline",
      "Historical Pattern & Cycle Matching",
      "Export Publication-Ready PDF Reports",
      "Portfolio Tracker & Price Action Alerts",
    ],
    price: "$49",
    priceNote: "per month, billed monthly",
    priceExtra: "Annual option — $39 / month · $468 / year",
    save: "Save $120 / year",
    cta: "Get Pro",
    href: "/sign-up",
    variant: "pro" as const,
  },
];

// ─── Page ──────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="bg-paper text-ink">
      {/* ── 1. Hero ─────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="grid lg:grid-cols-[57.5%_42.5%]">
          <div className="relative min-h-[240px] overflow-hidden bg-[#1b44a6] lg:min-h-[292px]">
            <div className="pointer-events-none absolute inset-0 facet-panel" />
            <div className="pointer-events-none absolute inset-0 facet-haze" />
            <div className="relative flex h-full flex-col justify-center px-6 py-12 sm:px-10 lg:px-14">
              <h1 className="text-[clamp(2.3rem,4.6vw,4.2rem)] font-normal leading-[1.07] tracking-[-0.025em] text-white">
                From Ticker to Thesis
                <br />
                in Seconds
              </h1>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[#F8F8F9] px-6 py-12 sm:px-10 lg:pl-16 lg:pr-14">
            <p className="max-w-[24rem] text-[17px] leading-[1.5] text-ink-500">
              Pull technical ratios, read market sentiment, analyze patterns, and form theses, all in
              one platform. Powered by AI agents that synthesize research so you don&apos;t have to.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href="/sign-up" className="btn-cobalt">
                Start Researching
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/demo"
                className="text-[13.5px] text-ink-700 underline-offset-4 transition-colors hover:text-brand-700 hover:underline"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Search + portrait ────────────────────────── */}
      <section className="border-b border-line bg-white">
        <div className="page-shell grid items-center gap-8 py-10 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-12 lg:py-8">
          <div className="lg:py-10">
            <HeroSearch />
          </div>
          <div className="relative h-[320px] w-full lg:h-[470px]">
            <ParticleHead className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </section>

      {/* ── 3. Capability strip ─────────────────────────── */}
      <CapabilityMarquee />

      {/* ── 4. The problem ─────────────────────────────── */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="page-shell">
          <h2 className="h-section">
            The <span className="text-brand-600">Investment</span>
            <br />
            <span className="text-brand-600">Research</span> Problem
          </h2>
          <p className="mt-8 max-w-[42rem] text-[18px] leading-[1.55] text-ink-500">
            Investors waste hours pulling data from multiple sources, cross-referencing metrics, and
            synthesizing insights manually.{" "}
            <span className="text-brand-600">OnDecide</span> solves this instantly
          </p>

          {/* Mobile hub */}
          <div className="relative mx-auto mt-14 flex h-[220px] w-[220px] items-center justify-center lg:hidden">
            <div className="halo-blue absolute inset-0 rounded-full opacity-90" />
            <div className="absolute inset-[26px] rounded-full border border-[#A4B7F5]" />
            <LogoMark className="relative h-12 w-auto" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-y-10 lg:mt-[88px] lg:grid-cols-[minmax(0,1fr)_468px_minmax(0,1fr)] lg:grid-rows-[117px_117px_117px] lg:gap-x-0 lg:gap-y-[25px]">
            {/* Hub + connectors (desktop only) */}
            <div className="pointer-events-none relative hidden lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:block">
              <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,153,255,0.85)_0%,rgba(150,175,255,0.55)_34%,rgba(196,210,255,0.3)_56%,rgba(226,233,255,0.1)_70%,transparent_76%)] blur-[2px]" />
              <div className="absolute left-1/2 top-1/2 h-[274px] w-[274px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A4B7F5]" />
              <LogoMark className="absolute left-1/2 top-1/2 h-[88px] w-auto -translate-x-1/2 -translate-y-1/2" />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 468 401"
                preserveAspectRatio="none"
                aria-hidden="true"
                fill="none"
                stroke="#A9B4CC"
                strokeWidth="1"
              >
                <path d="M0 58C90 58 112 94 138 105" />
                <path d="M0 200.5H97" />
                <path d="M0 343C90 343 112 307 138 296" />
                <path d="M468 58C378 58 356 94 330 105" />
                <path d="M468 200.5H371" />
                <path d="M468 343C378 343 356 307 330 296" />
              </svg>
            </div>

            {PROBLEMS.map((problem, i) => (
              <ProblemCard
                key={problem.n}
                problem={problem}
                align={i > 2 ? "right" : "left"}
                row={i > 2 ? i - 2 : i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. The agent ───────────────────────────────── */}
      <section className="border-y border-line bg-white py-20 lg:py-28">
        <div className="page-shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="h-section">
              The <span className="text-brand-600">AI Investment Agent</span>
              <br />
              for Research
            </h2>
            <p className="mt-5 max-w-[26rem] text-[14.5px] leading-relaxed text-ink-500">
              Delegate research to an AI agent. Get institutional-grade analysis in seconds.
            </p>
            <Link href="/agents" className="btn-cobalt mt-7">
              See Analyst in Action
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                {
                  t: "Verdicts in Seconds",
                  d: "AI synthesizes research instantly.",
                },
                {
                  t: "Research-Grade Analysis",
                  d: "Technical, sentiment, and pattern data.",
                },
                {
                  t: "Clear Thesis",
                  d: "Every verdict is backed by reasoning.",
                },
              ].map((b) => (
                <div key={b.t}>
                  <h3 className="text-[13px] font-medium text-ink">{b.t}</h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">{b.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[320px] w-full lg:h-[420px]">
            <GlassStack className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </section>

      {/* ── 6. Four feature cards ──────────────────────── */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="page-shell">
          <h2 className="h-section max-w-[20ch]">
            Everything a Wall Street Analyst Does. Delivered in{" "}
            <span className="text-brand-600">60 Seconds.</span>
          </h2>
          <p className="mt-5 max-w-[38rem] text-[14px] leading-relaxed text-ink-500">
            OnDecide runs 7 parallel AI agents to analyze fundamentals, market cycles, news, and
            moats, explained in plain English.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {FEATURES.map((f) => {
              const Art = f.art;
              return (
                <article key={f.title} className="flex flex-col bg-brand-600 text-white">
                  <div className="relative m-2 mb-0 border border-brand-700/40 bg-[#FBFBFD]">
                    <div className="relative h-[168px] overflow-hidden">
                      <Art className="absolute inset-0 h-full w-full" />
                    </div>
                    <span className="absolute bottom-0 right-0 border-l border-t border-brand-700/40 bg-brand-600 px-2.5 py-1.5 text-[9.5px] font-medium leading-none tracking-wide text-white">
                      {f.tab}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4 pt-5">
                    <span className="text-[10px] tracking-widest text-brand-100/70">{f.n}</span>
                    <h3 className="mt-1.5 text-[15px] font-medium leading-tight">{f.title}</h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-brand-100/85">{f.body}</p>
                    <div className="hairline mt-auto pt-5" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. How it works ────────────────────────────── */}
      <section className="border-y border-line bg-white py-20 lg:py-28">
        <div className="page-shell">
          <h2 className="h-section">How OnDecide Works</h2>
        </div>

        <div className="mx-auto mt-14 w-full max-w-[1320px] px-4 lg:px-8">
          <div className="border-t border-line">
            {STEPS.map((step, i) => {
              const Art = step.art;
              return (
                <div key={step.title} className="grid border-b border-line md:grid-cols-3">
                  <div
                    className={`order-2 px-7 py-8 md:order-none ${
                      step.side === "left"
                        ? "md:border-r md:border-line md:bg-gradient-to-br md:from-white md:to-[#E9EEFF]"
                        : "hidden md:block md:border-r md:border-line"
                    }`}
                  >
                    {step.side === "left" && <StepCopy step={step} index={i} />}
                  </div>

                  <div className="relative order-1 h-[180px] border-b border-line md:order-none md:h-[220px] md:border-b-0 md:border-r">
                    <Art className="absolute inset-0 h-full w-full" />
                  </div>

                  <div
                    className={`order-3 px-7 py-8 ${
                      step.side === "right"
                        ? "md:bg-gradient-to-bl md:from-white md:to-[#E9EEFF]"
                        : "hidden md:block"
                    }`}
                  >
                    {step.side === "right" && <StepCopy step={step} index={i} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 8. Testimonials ────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="page-shell">
          <h2 className="h-section">
            <span className="text-brand-600">Build</span> for Retail &amp;
            <br />
            Pro Analysts
          </h2>
          <div className="mt-12">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* ── 9. Pricing ─────────────────────────────────── */}
      <section id="pricing" className="bg-paper py-20 lg:py-28">
        <div className="page-shell">
          <h2 className="h-section">
            Simple Plans.
            <br />
            No <span className="text-brand-600">Hidden Fees</span>
          </h2>
          <p className="mt-5 max-w-[30rem] text-[14px] leading-relaxed text-ink-500">
            Institutional-grade investment research, priced for every investor.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col p-7 sm:p-9 ${
                  plan.variant === "pro"
                    ? "bg-gradient-to-br from-[#DCE3F7] via-[#C6D1EE] to-[#A9B8E4]"
                    : "bg-[#F1F1F2]"
                }`}
              >
                <h3 className="text-[17px] font-medium text-ink">{plan.name}</h3>
                <p className="mt-1.5 text-[12.5px] text-ink-600">{plan.tagline}</p>

                <ul className="mt-7 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[13px] leading-snug text-ink-700">
                      <span aria-hidden="true" className="text-brand-700">
                        •
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-end justify-between gap-6 pt-12">
                  <div>
                    <div className="text-[44px] font-medium leading-none tracking-tight text-ink">
                      {plan.price}
                    </div>
                    <p className="mt-2 text-[11.5px] text-ink-600">{plan.priceNote}</p>
                    <p className="mt-1 text-[11.5px] text-brand-700">{plan.priceExtra}</p>
                    {plan.save && (
                      <p className="mt-1 text-[11.5px] font-medium text-brand-700">{plan.save}</p>
                    )}
                  </div>
                  <Link
                    href={plan.href}
                    className={`inline-flex flex-none items-center gap-2 rounded-[2px] px-4 py-2.5 text-[12.5px] font-medium transition-colors ${
                      plan.variant === "pro"
                        ? "bg-white/80 text-brand-800 hover:bg-white"
                        : "bg-[#D6DFFA] text-brand-800 hover:bg-[#C8D4F8]"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Closing CTA ────────────────────────────── */}
      <section className="relative overflow-hidden bg-paper py-8">
        <StripeBand className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(78%_140%_at_6%_50%,rgba(255,255,255,0.94),rgba(255,255,255,0.4)_56%,transparent_80%)]" />
        <div className="page-shell relative py-20 lg:py-24">
          <h2 className="h-section max-w-[16ch]">
            Make smarter Decisions
            <br />
            in 60 Seconds.
          </h2>
          <p className="mt-5 max-w-[26rem] text-[13.5px] font-medium leading-relaxed text-ink-800">
            7 AI agents ready to analyze your next stock or crypto ticker.
          </p>
          <Link href="/sign-up" className="btn-light mt-8">
            Start Researching Free
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────

const CARD_ROWS = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3"];
const CARD_COLS = { left: "lg:col-start-1", right: "lg:col-start-3" } as const;

function ProblemCard({
  problem,
  align,
  row,
}: {
  problem: (typeof PROBLEMS)[number];
  align: "left" | "right";
  row: number;
}) {
  const Icon = problem.icon;
  return (
    <div className={`relative ${CARD_COLS[align]} ${CARD_ROWS[row - 1]}`}>
      <div        className="relative flex h-full min-h-[104px] items-center gap-5 bg-gradient-to-br from-[#C8D4FF] to-[#CFDAFF] px-6 py-5 lg:min-h-[117px]">
        <span
          className={`absolute -top-[19px] text-[12px] tracking-[0.02em] text-brand-500 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {problem.n}
        </span>

        <Icon className="h-12 w-12 flex-none text-brand-700" strokeWidth={1.25} />

        <div className="min-w-0">
          <h3 className="text-[20px] font-normal leading-tight text-ink">{problem.title}</h3>
          <p className="mt-1.5 max-w-[33ch] text-[13px] leading-[1.45] text-[#5A688C]">{problem.body}</p>
        </div>

        <span
          className={`absolute top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-brand-500 ${
            align === "right" ? "-left-[3px]" : "-right-[3px]"
          }`}
        />
      </div>
    </div>
  );
}

function StepCopy({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  return (
    <div className="max-w-[24ch]">
      <span className="text-[10px] tracking-widest text-brand-600/60">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-[19px] font-medium leading-tight text-ink">{step.title}</h3>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ink-600">{step.body}</p>
      {index === 0 && (
        <Link
          href="/explore"
          className="mt-4 inline-flex items-center gap-1 text-[12px] text-brand-700 transition-colors hover:text-brand-800"
        >
          Try a ticker
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
