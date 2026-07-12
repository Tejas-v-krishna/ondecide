"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, HelpCircle, Key, Layers, HelpCircle as Video } from "lucide-react";

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
      "v1.2.0: Integrated V7 aesthetic, Hedvig font, and page integrations.",
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
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back Link */}
      <Link href="/resources" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors mb-8 font-sans">
        <ArrowRight className="w-3 h-3 rotate-180" /> Back to Resources Hub
      </Link>

      {/* Main Grid */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-12 items-start">
        {/* Left Informational Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="text-2xs text-zinc-500 font-sans tracking-wider uppercase block">{resource.tag}</span>
            <h1 className="text-4xl sm:text-5xl font-serif text-white">{resource.title}</h1>
            <p className="text-zinc-400 text-lg leading-relaxed">{resource.tagline}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-serif text-white">Overview</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{resource.description}</p>
          </div>

          <div className="border border-zinc-800 bg-zinc-950/40 rounded p-6 space-y-4">
            <h3 className="text-sm font-sans font-semibold text-white">Platform Details</h3>
            <ul className="space-y-4">
              {resource.stepsOrDetails.map((step, idx) => (
                <li key={idx} className="space-y-1">
                  <span className="text-2xs text-zinc-500 font-sans tracking-wide uppercase block">{step.label}</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">{step.text}</p>
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
            <h3 className="text-lg font-serif text-white">{resource.title}</h3>
            <p className="text-xs text-zinc-500 max-w-[200px]">
              Ready to learn more? Visit the main resources portal.
            </p>
            <Link href={resource.ctaHref} className="w-full">
              <Button className="w-full bg-zinc-100 hover:bg-white text-black text-xs font-semibold py-2.5 rounded transition-colors">
                {resource.ctaText}
              </Button>
            </Link>
          </div>

          <div className="border border-zinc-850 p-6 rounded space-y-4">
            <h4 className="text-xs text-zinc-500 font-sans tracking-wider uppercase">Key Highlights</h4>
            <ul className="space-y-2">
              {resource.highlights.map((h) => (
                <li key={h} className="text-xs text-zinc-300 font-sans flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
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
