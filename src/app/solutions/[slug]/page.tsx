"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Users, Landmark, ShieldCheck, TrendingUp, Search } from "lucide-react";

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
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back Link */}
      <Link href="/solutions" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors mb-8 font-sans">
        <ArrowRight className="w-3 h-3 rotate-180" /> Back to Solutions Hub
      </Link>

      {/* Main Grid */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-start">
        {/* Left Informational Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-2xs text-zinc-500 font-sans tracking-wider uppercase block">{solution.tag}</span>
            <h1 className="text-4xl sm:text-5xl font-serif text-white">{solution.title}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">{solution.tagline}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-serif text-white">Target Overview</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{solution.description}</p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950/40 rounded p-6 space-y-4">
            <h3 className="text-sm font-sans font-semibold text-white">How OnDecide Solves This</h3>
            <ul className="space-y-3">
              {solution.features.map((feat, idx) => (
                <li key={idx} className="flex gap-3 text-xs text-zinc-400">
                  <span className="text-zinc-600 font-sans">0{idx + 1}</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar Details */}
        <div className="space-y-6">
          <div className="border border-zinc-800 bg-zinc-950 rounded-lg p-6 flex flex-col items-center text-center space-y-4 min-h-[220px]">
            <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white stroke-1" />
            </div>
            <h3 className="text-lg font-serif text-white">{solution.title}</h3>
            <p className="text-xs text-zinc-500 max-w-[200px]">
              Unlock the features designed for {solution.title.toLowerCase()}.
            </p>
            <Link href={solution.ctaHref} className="w-full">
              <Button className="w-full bg-zinc-100 hover:bg-white text-black text-xs font-semibold py-2.5 rounded transition-colors">
                {solution.ctaText}
              </Button>
            </Link>
          </div>

          <div className="border border-zinc-850 p-6 rounded space-y-4">
            <h4 className="text-xs text-zinc-500 font-sans tracking-wider uppercase">Case Study</h4>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-zinc-500 font-sans block mb-1">Scenario</span>
                <p className="text-zinc-300 leading-normal">{solution.caseStudy.problem}</p>
              </div>
              <div className="pt-3 border-t border-zinc-900">
                <span className="text-zinc-500 font-sans block mb-1">OnDecide Impact</span>
                <p className="text-zinc-300 leading-normal">{solution.caseStudy.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
