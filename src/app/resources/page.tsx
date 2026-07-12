"use client";

import React, { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

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
  { version: "v1.2.0", date: "July 2026", desc: "Integrated Upstash IP rate limiting, custom Modal Escape-to-close features, React Error Boundaries for individual report cards, and a gorgeous true-black V7 Labs typography system." },
  { version: "v1.1.0", date: "June 2026", desc: "Wired up Supabase real-time watchlists, portfolio trackers, and added support for cryptocurrency tokens (BTC, ETH, SOL)." },
  { version: "v1.0.0", date: "May 2026", desc: "Official launch of OnDecide with core Finnhub stock feeds and Gemini AI report synthesis pipelines." },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"faq" | "updates" | "guide">("faq");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-5xl font-serif text-white mb-4">Resources & Support</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Get help using the platform, explore our changelog releases, or read our quantitative research methodology.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-4 mb-12 overflow-x-auto">
        {(["faq", "updates", "guide"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-sm capitalize transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-zinc-900 text-white border border-zinc-800"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab === "faq" ? "Frequently Asked Questions" : tab === "updates" ? "Changelog & Updates" : "Platform Guide"}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      {activeTab === "faq" && (
        <div className="space-y-6 max-w-3xl animate-fade-in">
          <h2 className="text-3xl font-serif text-white mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`} className="border-zinc-850">
                <AccordionTrigger className="text-sm font-medium text-white hover:no-underline py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 text-xs leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      {activeTab === "updates" && (
        <div className="space-y-8 max-w-3xl animate-fade-in">
          <h2 className="text-3xl font-serif text-white mb-6">Product Updates</h2>
          <div className="space-y-6">
            {RELEASES.map((rel) => (
              <div key={rel.version} className="border-l border-zinc-800 pl-6 space-y-2 relative">
                {/* Visual bullet marker */}
                <div className="absolute w-2 h-2 rounded-full bg-white -left-[4.5px] top-1.5" />
                <div className="flex items-center gap-3">
                  <span className="text-sm font-sans font-semibold text-white">{rel.version}</span>
                  <span className="text-2xs text-zinc-500 font-sans">{rel.date}</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {rel.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "guide" && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-3xl font-serif text-white mb-4">Quick Start Guide</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-zinc-800 bg-zinc-950 p-6 rounded space-y-4">
              <span className="text-xs text-zinc-500 font-sans tracking-wide uppercase">Step 01 / Search</span>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Type any ticker symbol (e.g. `AAPL`, `BTC`, or `US 10 Year`) into the global search bar on the homepage.
              </p>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6 rounded space-y-4">
              <span className="text-xs text-zinc-500 font-sans tracking-wide uppercase">Step 02 / Track</span>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Save tickers to your Watchlist to monitor news sentiment shifts, or log transaction prices to your Portfolio.
              </p>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-6 rounded space-y-4">
              <span className="text-xs text-zinc-500 font-sans tracking-wide uppercase">Step 03 / Analyze</span>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Read the modular financial reports covering Technical breakouts, SEC balances, and Insider sentiments.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
