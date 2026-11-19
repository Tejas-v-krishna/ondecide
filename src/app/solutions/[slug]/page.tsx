"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Users, Landmark, ShieldCheck, TrendingUp, Search } from "lucide-react";

interface SolutionData {
  title: string;
  tag: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tagline: string;
  description: string;
  features: string[];
  caseStudy: {
    problem: string;
    solution: string;
  };
  ctaText: string;
  ctaHref: string;
}

const SOLUTIONS_MAP: Record<string, SolutionData> = {
  "retail-traders": {
    title: "Retail Traders",
    tag: "Audience Focus",
    icon: User,
    tagline: "Leveling the playing field for self-directed investors.",
    description: "Retail traders are systematically disadvantaged by high-frequency trading firms and cost-prohibitive terminal packages. OnDecide bridges this gap by delivering the same real-time SEC filing crawls and sentiment signals, packaged in a clean plain English research workspace completely free.",
    features: [
      "Access comprehensive AI report chains for any ticker symbol.",
      "Track technical momentum indicators like RSI and MACD.",
      "Monitor news sentiment indices updated in real time.",
    ],
    caseStudy: {
      problem: "A retail investor wanted to understand a sudden micro-cap volume spike, but couldn't parse the 100-page SEC filing quickly enough.",
      solution: "Using OnDecide, the user ran an on-demand Agent report, which summarized the filing risk disclosures and flag triggers in 45 seconds.",
    },
    ctaText: "Explore Assets Now",
    ctaHref: "/explore",
  },
  "family-offices": {
    title: "Family Offices",
    tag: "Wealth Allocation",
    icon: Landmark,
    tagline: "Protect and grow generational capital with automated diligence sheets.",
    description: "Make capital decisions with absolute conviction. Our agent-orchestrated deep reads allow family offices to run exhaustive diligence sweeps on any micro-cap, index ETF, or crypto token without the overhead of maintaining an internal quantitative analysis team.",
    features: [
      "Download clean PDF executive summaries for portfolio companies.",
      "Audit qualitative management statements against historical records.",
      "Verify macro treasury yields and interest rate trends.",
    ],
    caseStudy: {
      problem: "A multi-family office needed to review credit exposure across 40 disparate portfolio equities.",
      solution: "They loaded the assets into OnDecide Portfolio and monitored relative debt-to-equity leverage metrics in a unified dashboard.",
    },
    ctaText: "Launch Portfolio Tracker",
    ctaHref: "/portfolio",
  },
  "wealth-advisors": {
    title: "Wealth Advisors",
    tag: "Client Conviction",
    icon: Users,
    tagline: "Build trust with research-grade client materials.",
    description: "Client reviews demand total clarity. Instead of relying on generic templated broker sheets, leverage OnDecide to generate clean, on-demand AI research explanations regarding the precise balance sheet health and risk thesis for any ticker.",
    features: [
      "Generate qualitative research reports on demand during sessions.",
      "Translate complex financial ratios into clear plain English summaries.",
      "Expose historical pattern matches to support long-term investment models.",
    ],
    caseStudy: {
      problem: "An advisor needed to explain a high-debt tech allocation to a risk-averse client during a quarterly review.",
      solution: "They opened the OnDecide report for the ticker, instantly showing the offset of high cash flows and negative net debt.",
    },
    ctaText: "Launch Explore Hub",
    ctaHref: "/explore",
  },
  "hedge-funds": {
    title: "Hedge Funds",
    tag: "Institutional Scaling",
    icon: ShieldCheck,
    tagline: "Primary research pipelines scaled to the API level.",
    description: "Automate your primary analysis layer. Our agent nodes can easily be triggered programmatically to run pre-scans on thousands of equities, filter out low-interest targets, and summarize earnings call transcripts before human analysts step in.",
    features: [
      "Run concurrent research loops for thousands of tickers.",
      "Integrate our LangGraph pipeline into your local data repositories.",
      "Access clean quantitative and qualitative JSON outputs.",
    ],
    caseStudy: {
      problem: "A fund needed to summarize transcripts for 200 concurrent earnings calls over a single corporate week.",
      solution: "By utilizing the Agent Synthesizer pipeline, they extracted core tailwind topics and risk disclosures automatically.",
    },
    ctaText: "Access Agent Workspace",
    ctaHref: "/agents",
  },
  "quant-analysts": {
    title: "Quantitative Analysts",
    tag: "Data Modeling",
    icon: TrendingUp,
    tagline: "Bridging the gap between raw numbers and actionable insight.",
    description: "Scale your backtesting. Access raw sentiment counts, historical pricing candles, and calculated volatility distributions directly to support your algorithmic trading models.",
    features: [
      "Monitor volatility and pricing distributions over earnings cycles.",
      "Leverage clean datasets compiled from Tavily and Finnhub.",
      "Export structured metadata fields.",
    ],
    caseStudy: {
      problem: "An analyst needed historical post-earnings drift metrics to configure an options volatility strategy.",
      solution: "They used the historical pattern agent to map distribution statistics and average price drifts over a 2-year cycle.",
    },
    ctaText: "Start Screening Assets",
    ctaHref: "/explore",
  },
  "due-diligence": {
    title: "Due Diligence",
    tag: "Risk Assessment",
    icon: Search,
    tagline: "Exposing hidden risks before you allocate capital.",
    description: "Every investment has risks. OnDecide runs complete filings crawls, analyzes insider buying trends, parses litigation disclosures, and indexes management sentiment to build a thorough corporate risk model.",
    features: [
      "Expose negative net debt, low current ratios, and excessive leverage.",
      "Audit insider transaction filings (SEC Form 4) for buy/sell clusters.",
      "Correlate management call sentiments against actual price developments.",
    ],
    caseStudy: {
      problem: "A venture fund needed a quick risk audit on a target company's debt covenant before seed financing.",
      solution: "They ran OnDecide's Financial Health node, which highlighted a current ratio under 1.2 and flagged short-term maturities.",
    },
    ctaText: "Launch Screener",
    ctaHref: "/explore",
  },
};

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = SOLUTIONS_MAP[params.slug];

  if (!solution) {
    notFound();
  }

  const IconComponent = solution.icon;

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      {/* Back Link */}
      <Link
        href="/solutions"
        className="mb-8 inline-flex items-center gap-1.5 text-xs text-ink-500 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3 w-3" /> Back to Solutions Hub
      </Link>

      {/* Main Grid */}
      <div className="grid items-start gap-12 md:grid-cols-[1.5fr_1fr]">
        {/* Left Informational Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="block text-2xs uppercase tracking-wider text-brand-700">{solution.tag}</span>
            <h1 className="text-display-sm font-medium text-ink">{solution.title}</h1>
            <p className="text-lg leading-relaxed text-ink-500">{solution.tagline}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-ink">Target Overview</h2>
            <p className="text-sm leading-relaxed text-ink-500">{solution.description}</p>
          </div>

          <div className="card-surface space-y-4 p-6">
            <h3 className="text-sm font-medium text-ink">How OnDecide Solves This</h3>
            <ul className="space-y-3">
              {solution.features.map((feat, idx) => (
                <li key={idx} className="flex gap-3 text-xs text-ink-500">
                  <span className="text-brand-600">0{idx + 1}</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar Details */}
        <div className="space-y-6">
          <div className="card-surface flex min-h-[220px] flex-col items-center space-y-4 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface-subtle">
              <IconComponent className="h-6 w-6 text-brand-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-ink">{solution.title}</h3>
            <p className="max-w-[200px] text-xs text-ink-500">
              Unlock the features designed for {solution.title.toLowerCase()}.
            </p>
            <Link href={solution.ctaHref} className="w-full">
              <Button className="w-full py-2.5 text-xs font-medium">
                {solution.ctaText}
              </Button>
            </Link>
          </div>

          <div className="card-surface space-y-4 p-6">
            <h4 className="text-xs uppercase tracking-wider text-ink-400">Case Study</h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="mb-1 block text-ink-400">Scenario</span>
                <p className="leading-normal text-ink-600">{solution.caseStudy.problem}</p>
              </div>
              <div className="border-t border-line pt-3">
                <span className="mb-1 block text-ink-400">OnDecide Impact</span>
                <p className="leading-normal text-ink-600">{solution.caseStudy.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
