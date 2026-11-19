"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PageHeader } from "@/components/ui/PageHeader";

const FAQS = [
  {
    q: "Where does OnDecide retrieve its financial data?",
    a: "We hit real-time data feeds powered by Finnhub and Tavily Search endpoints. All historical filings (form 10-K, 10-Q) are retrieved directly from the SEC's EDGAR database to ensure absolute accuracy.",
  },
  {
    q: "Are the AI investment reports financial advice?",
    a: "Absolutely not. OnDecide is an educational and analytical research tool. All generated ratings (Invest, Hold, Avoid) are automated syntheses based on mathematical models and news sentiment. Consult a licensed financial advisor before allocating capital.",
  },
  {
    q: "How fast does the research pipeline compile?",
    a: "Because our data collection nodes execute in parallel (technicals, filings, and news parse concurrently), the entire LangGraph pipeline generates a comprehensive research report in under 60 seconds.",
  },
  {
    q: "Is there a limit on research queries?",
    a: "We utilize IP-based rate limiting (10 requests per 10 seconds) on our API serverless endpoints to protect database stability and prevent scraping. Free tier users get full access to all research pages.",
  },
];

const RELEASES = [
  { version: "v1.2.0", date: "July 2026", desc: "Integrated Upstash IP rate limiting, custom Modal Escape-to-close features, React Error Boundaries for individual report cards, and a refined light-theme typography system." },
  { version: "v1.1.0", date: "June 2026", desc: "Wired up Supabase real-time watchlists, portfolio trackers, and added support for cryptocurrency tokens (BTC, ETH, SOL)." },
  { version: "v1.0.0", date: "May 2026", desc: "Official launch of OnDecide with core Finnhub stock feeds and Gemini AI report synthesis pipelines." },
];

const GUIDE_STEPS = [
  { label: "Step 01 / Search", text: "Type any ticker symbol (e.g. `AAPL`, `BTC`, or `US 10 Year`) into the global search bar on the homepage." },
  { label: "Step 02 / Track", text: "Save tickers to your Watchlist to monitor news sentiment shifts, or log transaction prices to your Portfolio." },
  { label: "Step 03 / Analyze", text: "Read the modular financial reports covering Technical breakouts, SEC balances, and Insider sentiments." },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"faq" | "updates" | "guide">("faq");

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      <PageHeader
        eyebrow="Resources"
        title="Resources & Support"
        description="Get help using the platform, explore our changelog releases, or read our quantitative research methodology."
      />

      {/* Tabs */}
      <div className="mb-12 flex gap-2 overflow-x-auto border-b border-line pb-4">
        {(["faq", "updates", "guide"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors ${
              activeTab === tab
                ? "bg-ink text-white"
                : "text-ink-500 hover:bg-surface-subtle hover:text-ink"
            }`}
          >
            {tab === "faq"
              ? "Frequently Asked Questions"
              : tab === "updates"
                ? "Changelog & Updates"
                : "Platform Guide"}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "faq" && (
        <div className="max-w-3xl animate-fade-in space-y-6">
          <h2 className="mb-6 text-3xl font-medium text-ink">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="py-4 text-sm font-medium text-ink hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-xs leading-relaxed text-ink-500">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {activeTab === "updates" && (
        <div className="max-w-3xl animate-fade-in space-y-8">
          <h2 className="mb-6 text-3xl font-medium text-ink">Product Updates</h2>
          <div className="space-y-6">
            {RELEASES.map((rel) => (
              <div key={rel.version} className="relative space-y-2 border-l border-line pl-6">
                <div className="absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full bg-brand-600" />
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-ink">{rel.version}</span>
                  <span className="text-2xs text-ink-400">{rel.date}</span>
                </div>
                <p className="text-xs leading-relaxed text-ink-500">{rel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "guide" && (
        <div className="animate-fade-in space-y-8">
          <h2 className="mb-4 text-3xl font-medium text-ink">Quick Start Guide</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {GUIDE_STEPS.map((s) => (
              <div key={s.label} className="card-surface space-y-4 p-6">
                <span className="text-xs uppercase tracking-wide text-brand-700">{s.label}</span>
                <p className="text-xs leading-relaxed text-ink-500">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
