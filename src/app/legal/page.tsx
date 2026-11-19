"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "disclaimer">("terms");

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      <PageHeader
        eyebrow="Trust"
        title="Trust & Legal"
        description="Review our terms of service, privacy guidelines, and financial regulatory disclaimers."
      />

      {/* Tabs */}
      <div className="mb-12 flex gap-2 overflow-x-auto border-b border-line pb-4">
        {(["terms", "privacy", "disclaimer"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm capitalize transition-colors ${
              activeTab === tab
                ? "bg-ink text-white"
                : "text-ink-500 hover:bg-surface-subtle hover:text-ink"
            }`}
          >
            {tab === "terms" ? "Terms of Service" : tab === "privacy" ? "Privacy Policy" : "Disclaimers"}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="card-surface max-w-3xl animate-fade-in space-y-6 p-8 text-sm leading-relaxed text-ink-500">
        {activeTab === "terms" && (
          <div className="space-y-4">
            <h2 className="mb-2 text-xl font-medium text-ink">Terms of Service</h2>
            <p>
              By accessing or using OnDecide, you agree to comply with and be bound by these Terms of
              Service. If you do not agree to these terms, please do not use our services.
            </p>
            <p>
              Our platform provides automated financial data retrieval and AI-orchestrated report
              synthesis. The contents of these reports do not constitute financial advice, and you
              bear sole responsibility for your investment decisions.
            </p>
            <p>
              We reserve the right to limit, restrict, or suspend your access to our endpoints if you
              engage in web scraping, coordinate denial-of-service queries, or exceed our rate limits
              (10 requests per 10 seconds).
            </p>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-4">
            <h2 className="mb-2 text-xl font-medium text-ink">Privacy Policy</h2>
            <p>
              At OnDecide, your privacy is paramount. We do not sell, trade, or distribute your
              personal information or research history to third-party data aggregators or market
              makers.
            </p>
            <p>
              We use Clerk to securely manage authentication credentials. Supabase databases store
              your watchlist symbols and portfolio transactions locally.
            </p>
            <p>
              We collect anonymous traffic telemetry to monitor platform stability and prevent
              endpoint abuse. Your search history is encrypted and visible only to your authenticated
              session.
            </p>
          </div>
        )}

        {activeTab === "disclaimer" && (
          <div className="space-y-4">
            <h2 className="mb-2 text-xl font-medium text-ink">Financial Disclaimers</h2>
            <p>
              OnDecide is not a registered investment advisor, broker, or dealer. We do not recommend
              the purchase or sale of any specific asset.
            </p>
            <p>
              All quantitative metrics, valuations, and technical charts are retrieved from public
              filings and third-party data APIs. While we make every effort to verify data pipelines,
              we cannot guarantee the accuracy, completeness, or timeliness of the feeds.
            </p>
            <p>
              Capital allocation involves extreme risk. Past performance is not indicative of future
              results. You should perform your own due diligence or consult a certified professional
              before investing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
