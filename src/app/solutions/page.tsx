"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/PageHeader";
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

const USE_CASES = [
  {
    title: "Equity Screening",
    desc: "Scan across standard US stocks, indices, and crypto markets to discover undervalued assets with solid technical metrics.",
  },
  {
    title: "Portfolio Modeling",
    desc: "Track holdings average buy prices and total invested capital dynamically with custom-tailored financial dashboards.",
  },
  {
    title: "Macro Analysis",
    desc: "Measure portfolio exposure against major central bank assets, interest rates, and global treasury yields.",
  },
];

export default function SolutionsPage() {
  const [activeAudience, setActiveAudience] = useState(AUDIENCES[0]);

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      <PageHeader
        eyebrow="Solutions"
        title="Investment Solutions"
        description="OnDecide scales to meet the demands of any investor, from active retail day traders to quantitative capital allocators."
      />

      {/* Selector Grid */}
      <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4">
        {AUDIENCES.map((aud) => (
          <button
            key={aud.id}
            onClick={() => setActiveAudience(aud)}
            className={`rounded-xl border p-4 text-left transition-all ${
              activeAudience.id === aud.id
                ? "border-brand-200 bg-brand-50 text-ink"
                : "border-line bg-surface text-ink-500 hover:border-line-strong hover:text-ink"
            }`}
          >
            <span className="mb-1 block text-xs tracking-wide">For</span>
            <span className="text-sm font-medium">{aud.name}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Panel */}
      <div className="card-surface mb-16 grid animate-fade-in items-center gap-8 p-8 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="block text-xs uppercase tracking-wider text-ink-400">Audience Focus</span>
            <h2 className="text-3xl font-medium text-ink">{activeAudience.title}</h2>
          </div>
          <p className="text-sm leading-relaxed text-ink-500">{activeAudience.desc}</p>

          <ul className="space-y-3">
            {activeAudience.features.map((feat, idx) => (
              <li key={idx} className="flex gap-3 text-xs text-ink-600">
                <span className="text-brand-600">0{idx + 1}</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-h-[220px] flex-col items-center justify-center space-y-4 rounded-2xl border border-line bg-surface-subtle p-8 text-center">
          <activeAudience.icon className="h-10 w-10 text-brand-600" strokeWidth={1.5} />
          <h3 className="text-lg font-medium text-ink">{activeAudience.name} Suite</h3>
          <p className="max-w-[180px] text-xs text-ink-500">
            Ready to explore? Create an account to unlock advanced trackers.
          </p>
          <Button size="sm" className="h-auto px-4 py-1.5 text-xs">
            Create Free Account
          </Button>
        </div>
      </div>

      {/* Use Cases Section */}
      <div id="use-cases" className="border-t border-line pt-16">
        <h2 className="mb-8 text-3xl font-medium text-ink">Core Use Cases</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {USE_CASES.map((uc) => (
            <div key={uc.title} className="card-surface space-y-3 p-6">
              <h3 className="text-lg font-medium text-ink">{uc.title}</h3>
              <p className="text-xs leading-relaxed text-ink-500">{uc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
