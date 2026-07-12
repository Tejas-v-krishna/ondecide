"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GlobeIcon, BarChart, ShieldAlert, Award } from "lucide-react";

const AUDIENCES = [
  {
    id: "retail",
    name: "Retail Traders",
    title: "Level the playing field.",
    desc: "Retail traders are consistently disadvantaged by high-frequency firms and expensive market software. OnDecide provides the same analytical capabilities and SEC filing parses instantly, completely free.",
    features: [
      "Access comprehensive AI report chains for any ticker symbol.",
      "Track technical breakout signals across your favorite equities.",
      "Monitor social and news sentiment indexes updated in real-time.",
    ],
    icon: Award,
  },
  {
    id: "family",
    name: "Family Offices",
    title: "Protect and grow generational wealth.",
    desc: "Make decisions with absolute clarity. Our agent-orchestrated deep reads allow family offices to run complete due diligence sweeps on any micro-cap, ETF, or crypto token without hiring full-time quant squads.",
    features: [
      "Download clean PDF executive summaries for portfolio companies.",
      "Audit qualitative management statements against historical records.",
      "Assess macro interest rate risk against holdings allocations.",
    ],
    icon: BarChart,
  },
  {
    id: "advisors",
    name: "Wealth Advisors",
    title: "Build client conviction instantly.",
    desc: "Client review meetings demand clarity. Instead of reading standard templated broker notes, showcase customized AI-generated research reports explaining the precise financial health and thesis for every holding.",
    features: [
      "Generate qualitative research reports on demand during client sessions.",
      "Explain complex balance sheet valuations in plain English.",
      "Verify insider buying metrics to back up growth models.",
    ],
    icon: GlobeIcon,
  },
  {
    id: "funds",
    name: "Hedge Funds",
    title: "Rapid research pipeline scaling.",
    desc: "Automate your primary analysis layer. Our endpoints can easily be triggered programmatically to pre-scan stocks, summarize earnings calls, and filter out low-quality opportunities before human analysts step in.",
    features: [
      "Run concurrent research loops for thousands of tickers.",
      "Leverage clean JSON outputs from Tavily and Finnhub query nodes.",
      "Integrate our LangGraph pipeline into your local data lakes.",
    ],
    icon: ShieldAlert,
  },
];

export default function SolutionsPage() {
  const [activeAudience, setActiveAudience] = useState(AUDIENCES[0]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-5xl font-serif text-white mb-4">Investment Solutions</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          OnDecide scales to meet the demands of any investor, from active retail day traders to quantitative capital allocators.
        </p>
      </div>

      {/* Selector Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {AUDIENCES.map((aud) => (
          <button
            key={aud.id}
            onClick={() => setActiveAudience(aud)}
            className={`p-4 rounded border text-left transition-all ${
              activeAudience.id === aud.id
                ? "bg-zinc-900 border-zinc-700 text-white"
                : "bg-zinc-950/40 border-zinc-800/60 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200"
            }`}
          >
            <span className="text-xs font-sans tracking-wide block mb-1">For</span>
            <span className="text-sm font-serif font-medium">{aud.name}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Panel */}
      <div className="border border-zinc-800 bg-zinc-950 rounded-lg p-8 grid md:grid-cols-[1.5fr_1fr] gap-8 items-center mb-16 animate-fade-in">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-zinc-500 font-sans tracking-wider uppercase block">Audience Focus</span>
            <h2 className="text-3xl font-serif text-white">{activeAudience.title}</h2>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">{activeAudience.desc}</p>
          
          <ul className="space-y-3">
            {activeAudience.features.map((feat, idx) => (
              <li key={idx} className="flex gap-3 text-xs text-zinc-300">
                <span className="text-zinc-600 font-sans">0{idx + 1}</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-zinc-800 bg-black rounded p-8 flex flex-col justify-center items-center text-center space-y-4 min-h-[220px]">
          <activeAudience.icon className="w-10 h-10 text-white stroke-1" />
          <h3 className="text-lg font-serif text-white">{activeAudience.name} Suite</h3>
          <p className="text-xs text-zinc-500 max-w-[180px]">
            Ready to explore? Create an account to unlock advanced trackers.
          </p>
          <Button variant="default" className="bg-zinc-100 hover:bg-white text-black text-xs font-medium py-1.5 px-4 h-auto rounded">
            Create Free Account
          </Button>
        </div>
      </div>

      {/* Use Cases Section */}
      <div id="use-cases" className="border-t border-zinc-800 pt-16">
        <h2 className="text-3xl font-serif text-white mb-8">Core Use Cases</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-zinc-800/60 bg-zinc-950/40 p-6 rounded space-y-3">
            <h3 className="text-lg font-serif text-white">Equity Screening</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Scan across standard US stocks, indices, and crypto markets to discover undervalued assets with solid technical metrics.
            </p>
          </div>
          <div className="border border-zinc-800/60 bg-zinc-950/40 p-6 rounded space-y-3">
            <h3 className="text-lg font-serif text-white">Portfolio Modeling</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Track holdings average buy prices and total invested capital dynamically with custom-tailored financial dashboards.
            </p>
          </div>
          <div className="border border-zinc-800/60 bg-zinc-950/40 p-6 rounded space-y-3">
            <h3 className="text-lg font-serif text-white">Macro Analysis</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Measure portfolio exposure against major central bank assets, interest rates, and global treasury yields.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
