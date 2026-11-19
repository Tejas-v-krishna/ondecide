"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Clock, HelpCircle, Key, Layers, HelpCircle as Video } from "lucide-react";

interface ResourceData {
  title: string;
  tag: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tagline: string;
  description: string;
  highlights: string[];
  stepsOrDetails: {
    label: string;
    text: string;
  }[];
  ctaText: string;
  ctaHref: string;
}

const RESOURCES_MAP: Record<string, ResourceData> = {
  "platform-guide": {
    title: "Platform Guide",
    tag: "Get Started",
    icon: BookOpen,
    tagline: "Navigate the OnDecide AI Investment Workspace.",
    description: "Learn how to use our modular analytical dashboard. From querying ticker symbols to understanding insider transactions, this guide walks you through every core feature of our web interface.",
    highlights: [
      "Understand the visual report nav layout.",
      "Save assets to watchlists with dynamic email alerts.",
      "Track your holdings in the live portfolio tracker."
    ],
    stepsOrDetails: [
      { label: "01 / Search", text: "Query any ticker (e.g. AAPL, BTC) using the home search bar." },
      { label: "02 / Audit", text: "Drill down into Scorecard, Financial Health, and Technical signals." },
      { label: "03 / Allocation", text: "Add the asset to your portfolio with average price mappings." }
    ],
    ctaText: "Launch Resources Hub",
    ctaHref: "/resources",
  },
  "methodology": {
    title: "Research Methodology",
    tag: "Platform Values",
    icon: Layers,
    tagline: "How we collect, verify, and compile financial reports.",
    description: "Data integrity is our primary core value. This resource outlines our API integrations (Finnhub, SEC EDGAR, and Tavily), our sentiment analysis parameters, and the LangGraph pipeline execution flow.",
    highlights: [
      "100% verifiable data sources directly from SEC filings.",
      "Strict data sanitization checks at each LangGraph node.",
      "Standard formulas for all parsed technical and fundamental signals."
    ],
    stepsOrDetails: [
      { label: "Data Sourcing", text: "Direct EDGAR filing scrapes, live Finnhub stock feeds, and Tavily search." },
      { label: "Analysis Chains", text: "Modular agent execution where technicals, financials, and news parse concurrently." },
      { label: "Thesis Output", text: "Gemini 2.0 Flash synthesizes the data points into an Invest/Hold/Avoid rating." }
    ],
    ctaText: "Read Platform FAQ",
    ctaHref: "/resources",
  },
  "faq": {
    title: "Platform FAQ",
    tag: "Support",
    icon: HelpCircle,
    tagline: "Answers to frequently asked questions about OnDecide.",
    description: "Got questions about data lags, subscription billing, API endpoints, or investment disclaimers? Review our comprehensive list of frequently asked questions.",
    highlights: [
      "OnDecide is 100% free and open-source.",
      "No credit card required to research symbols.",
      "IP-based rate limits protect serverless database stability."
    ],
    stepsOrDetails: [
      { label: "Data Lags", text: "Fundamental metrics are updated on SEC filing releases; market tickers update daily." },
      { label: "Is this Advice?", text: "No. OnDecide is purely educational. We do not provide licensed advice." },
      { label: "API Access", text: "Developers can fetch reports programmatically up to 10 requests per 10 seconds." }
    ],
    ctaText: "Back to Resources Hub",
    ctaHref: "/resources",
  },
  "tutorials": {
    title: "Video Tutorials",
    tag: "Learn",
    icon: Video,
    tagline: "Master the platform in under 5 minutes.",
    description: "Watch our step-by-step video guides covering stock screening, balance sheet auditing, and options volatility modeling.",
    highlights: [
      "Intro to LangGraph AI pipelines.",
      "How to track stock technical crossovers.",
      "Interpreting corporate news sentiment scores."
    ],
    stepsOrDetails: [
      { label: "Tutorial 01", text: "Searching and running your first AI report (1:30 min)." },
      { label: "Tutorial 02", text: "Setting up custom watchlists and portfolio tracking (2:15 min)." },
      { label: "Tutorial 03", text: "Understanding the competitor matrix and risk ratios (3:00 min)." }
    ],
    ctaText: "Open Resources Hub",
    ctaHref: "/resources",
  },
  "changelog": {
    title: "Changelog & Updates",
    tag: "Platform Updates",
    icon: Clock,
    tagline: "Track new features, optimizations, and hotfixes.",
    description: "We are actively developing OnDecide. Review our version history and feature announcements, updated bi-weekly.",
    highlights: [
      "v1.2.0: Refined light aesthetic, new type system, and page integrations.",
      "v1.1.0: Supabase watchlists and cryptocurrency support (BTC, ETH).",
      "v1.0.0: Core launch of OnDecide with Finnhub stock feeds."
    ],
    stepsOrDetails: [
      { label: "Latest Release", text: "v1.2.0 - Added new platform pages, rating boundaries, and speed optimizations." },
      { label: "Next Milestone", text: "Wired up Finnhub WebSockets for real-time portfolio pricing." },
      { label: "Data Quality", text: "Improved SEC parsing filters for micro-cap filings." }
    ],
    ctaText: "View FAQ",
    ctaHref: "/resources",
  },
  "partners": {
    title: "API Partners",
    tag: "Data Providers",
    icon: Key,
    tagline: "The core technology stack fueling OnDecide.",
    description: "We partner with leading financial data providers, search engines, and artificial intelligence laboratories to build our real-time research pipelines.",
    highlights: [
      "Finnhub Stock and ETF quantitative feeds.",
      "Tavily Search Engine for news crawling.",
      "Google Gemini 2.0 Flash LLM orchestration."
    ],
    stepsOrDetails: [
      { label: "SEC EDGAR", text: "Retrieves raw company filings and financial disclosures." },
      { label: "Supabase Database", text: "Stores secure watchlist assets and user transactions." },
      { label: "Clerk Auth", text: "Secure, credential-less authentication infrastructure." }
    ],
    ctaText: "About Our Company",
    ctaHref: "/about",
  },
};

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const resource = RESOURCES_MAP[params.slug];

  if (!resource) {
    notFound();
  }

  const IconComponent = resource.icon;

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      {/* Back Link */}
      <Link
        href="/resources"
        className="mb-8 inline-flex items-center gap-1.5 text-xs text-ink-500 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3 w-3" /> Back to Resources Hub
      </Link>

      {/* Main Grid */}
      <div className="grid items-start gap-12 md:grid-cols-[1.5fr_1fr]">
        {/* Left Informational Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="block text-2xs uppercase tracking-wider text-brand-700">{resource.tag}</span>
            <h1 className="text-display-sm font-medium text-ink">{resource.title}</h1>
            <p className="text-lg leading-relaxed text-ink-500">{resource.tagline}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-ink">Overview</h2>
            <p className="text-sm leading-relaxed text-ink-500">{resource.description}</p>
          </div>

          <div className="card-surface space-y-4 p-6">
            <h3 className="text-sm font-medium text-ink">Platform Details</h3>
            <ul className="space-y-4">
              {resource.stepsOrDetails.map((step, idx) => (
                <li key={idx} className="space-y-1">
                  <span className="block text-2xs uppercase tracking-wide text-ink-400">{step.label}</span>
                  <p className="text-xs leading-relaxed text-ink-500">{step.text}</p>
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
            <h3 className="text-lg font-medium text-ink">{resource.title}</h3>
            <p className="max-w-[200px] text-xs text-ink-500">
              Ready to learn more? Visit the main resources portal.
            </p>
            <Link href={resource.ctaHref} className="w-full">
              <Button className="w-full py-2.5 text-xs font-medium">
                {resource.ctaText}
              </Button>
            </Link>
          </div>

          <div className="card-surface space-y-4 p-6">
            <h4 className="text-xs uppercase tracking-wider text-ink-400">Key Highlights</h4>
            <ul className="space-y-2">
              {resource.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-xs text-ink-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
