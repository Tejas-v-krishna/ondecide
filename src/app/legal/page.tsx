"use client";

import React, { useState } from "react";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "disclaimer">("terms");

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-5xl font-serif text-white mb-4">Trust & Legal</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Review our terms of service, privacy guidelines, and financial regulatory disclaimers.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-4 mb-12 overflow-x-auto">
        {(["terms", "privacy", "disclaimer"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-sm capitalize transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-zinc-900 text-white border border-zinc-800"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab === "terms" ? "Terms of Service" : tab === "privacy" ? "Privacy Policy" : "Disclaimers"}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="max-w-3xl border border-zinc-800 bg-zinc-950/40 rounded p-8 space-y-6 text-sm text-zinc-400 leading-relaxed animate-fade-in">
        {activeTab === "terms" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-white mb-2">Terms of Service</h2>
            <p>
              By accessing or using OnDecide, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            <p>
              Our platform provides automated financial data retrieval and AI-orchestrated report synthesis. The contents of these reports do not constitute financial advice, and you bear sole responsibility for your investment decisions.
            </p>
            <p>
              We reserve the right to limit, restrict, or suspend your access to our endpoints if you engage in web scraping, coordinate denial-of-service queries, or exceed our rate limits (10 requests per 10 seconds).
            </p>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-white mb-2">Privacy Policy</h2>
            <p>
              At OnDecide, your privacy is paramount. We do not sell, trade, or distribute your personal information or research history to third-party data aggregators or market makers.
            </p>
            <p>
              We use Clerk to securely manage authentication credentials. Supabase databases store your watchlist symbols and portfolio transactions locally.
            </p>
            <p>
              We collect anonymous traffic telemetry to monitor platform stability and prevent endpoint abuse. Your search history is encrypted and visible only to your authenticated session.
            </p>
          </div>
        )}

        {activeTab === "disclaimer" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-white mb-2">Financial Disclaimers</h2>
            <p>
              OnDecide is not a registered investment advisor, broker, or dealer. We do not recommend the purchase or sale of any specific asset.
            </p>
            <p>
              All quantitative metrics, valuations, and technical charts are retrieved from public filings and third-party data APIs. While we make every effort to verify data pipelines, we cannot guarantee the accuracy, completeness, or timeliness of the feeds.
            </p>
            <p>
              Capital allocation involves extreme risk. Past performance is not indicative of future results. You should perform your own due diligence or consult a certified professional before investing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
