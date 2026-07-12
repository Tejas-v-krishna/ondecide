"use client";

import React from "react";
import { useEffect, useState, useRef } from "react";
import { AgentProgress } from "@/components/ui/AgentProgress";
import { SaveToWatchlist } from "@/components/ui/SaveToWatchlist";
import { AddToPortfolio } from "@/components/ui/AddToPortfolio";
import { ReportNav } from "@/components/report/ReportNav";
import { CompanySnapshotSection } from "@/components/report/CompanySnapshot";
import { LiveMarketDataSection } from "@/components/report/LiveMarketData";
import { ScorecardSection } from "@/components/report/Scorecard";
import { TechnicalSignalSection } from "@/components/report/TechnicalSignal";
import { NewsAnalysisSection } from "@/components/report/NewsAnalysis";
import { FinancialHealthSection } from "@/components/report/FinancialHealth";
import { QualitativeReadSection } from "@/components/report/QualitativeRead";
import { HistoricalPatternSection } from "@/components/report/HistoricalPattern";
import { DecisionSection } from "@/components/report/Decision";
import { CompetitorMatrixSection } from "@/components/report/CompetitorMatrix";
import { InsiderSentimentSection } from "@/components/report/InsiderSentiment";
import { EarningsCallAnalysisSection } from "@/components/report/EarningsCallAnalysis";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import type { ResearchReport } from "@/types";

interface ResearchPageClientProps {
  ticker: string;
}

type Phase = "loading" | "complete" | "error";

export function ResearchPageClient({ ticker }: ResearchPageClientProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    abortRef.current = controller;

    const run = async () => {
      try {
        const res = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: decodeURIComponent(ticker) }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          setErrorMsg(`Research failed: ${res.statusText}`);
          setPhase("error");
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            try {
              const event = JSON.parse(line.slice(6));
              if (event.type === "status") {
                setCurrentMessage(event.message);
                setCompletedNodes((prev) =>
                  prev.includes(event.node) ? prev : [...prev, event.node]
                );
              } else if (event.type === "complete") {
                setReport(event.report);
                setPhase("complete");
              } else if (event.type === "error") {
                setErrorMsg(event.message);
                setPhase("error");
              }
            } catch {
              // Malformed SSE chunk — skip
            }
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setErrorMsg("Connection failed. Please try again.");
        setPhase("error");
      }
    };

    run();
    return () => controller.abort();
  }, [ticker]);

  if (phase === "error") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">Research failed</h2>
        <p className="text-zinc-400 mb-6">{errorMsg}</p>
        <a href="/" className="inline-flex px-4 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors">
          ← Search again
        </a>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20">
        <AgentProgress
          completedNodes={completedNodes}
          currentMessage={currentMessage}
          ticker={decodeURIComponent(ticker).toUpperCase()}
        />
      </div>
    );
  }

  if (!report) return null;

  const stats = report.liveMarketData?.keyStats ?? [];

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 pb-20"
      style={{ ["--nav-h" as string]: "64px" } as React.CSSProperties}
    >
      {/* Report nav + save — full width header strip */}
      <div className="flex items-center justify-between py-4">
        <ReportNav />
        <div className="flex items-center gap-3">
          <SaveToWatchlist report={report} />
          <AddToPortfolio
            ticker={report.ticker}
            assetType={report.assetType}
            companyName={report.companySnapshot.name}
            currentPrice={report.companySnapshot.currentPrice}
          />
        </div>
      </div>

      {/* 70 / 30 two-column layout */}
      <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8 items-start">
        {/* ── MAIN COLUMN ───────────────────────────── */}
        <div className="min-w-0 space-y-6 animate-slide-up">
          {/* Snapshot — full width */}
          <ErrorBoundary sectionName="Company Snapshot">
            <div id="snapshot" className="report-section">
              <CompanySnapshotSection data={report.companySnapshot} />
            </div>
          </ErrorBoundary>

          {/* Stat cards — 4-up on desktop, 2-up tablet, 1-up mobile */}
          {stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.slice(0, 4).map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-zinc-800/60 bg-zinc-950 p-4"
                >
                  <div className="text-xs text-zinc-500 mb-1">{s.label}</div>
                  <div className="text-base font-semibold text-white font-sans">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price chart — full width */}
          <ErrorBoundary sectionName="Live Market Data">
            <div id="market" className="report-section">
              <LiveMarketDataSection
                data={report.liveMarketData}
                ticker={report.ticker}
                currency={report.companySnapshot.currency}
              />
            </div>
          </ErrorBoundary>

          {/* Paired sub-grids — source order pairs sections 2-per-row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ErrorBoundary sectionName="Scorecard">
              <div id="scorecard" className="report-section">
                <ScorecardSection data={report.scorecard} />
              </div>
            </ErrorBoundary>

            <ErrorBoundary sectionName="Technical Signals">
              <div id="technical" className="report-section">
                <TechnicalSignalSection data={report.technicalSignal} />
              </div>
            </ErrorBoundary>

            <ErrorBoundary sectionName="News Analysis">
              <div id="news" className="report-section">
                <NewsAnalysisSection data={report.newsAnalysis} />
              </div>
            </ErrorBoundary>

            <ErrorBoundary sectionName="Qualitative Read">
              <div id="qualitative" className="report-section">
                <QualitativeReadSection data={report.qualitativeRead} />
              </div>
            </ErrorBoundary>

            {report.competitorMatrix && (
              <ErrorBoundary sectionName="Competitor Matrix">
                <div id="competitors" className="report-section">
                  <CompetitorMatrixSection matrix={report.competitorMatrix} />
                </div>
              </ErrorBoundary>
            )}

            <ErrorBoundary sectionName="Historical Pattern">
              <div id="history" className="report-section">
                <HistoricalPatternSection data={report.historicalPattern} />
              </div>
            </ErrorBoundary>

            <ErrorBoundary sectionName="Financial Health">
              <div id="financials" className="report-section">
                <FinancialHealthSection data={report.financialHealth} />
              </div>
            </ErrorBoundary>

            {report.insiderSentiment && (
              <ErrorBoundary sectionName="Insider Sentiment">
                <div id="insiders" className="report-section">
                  <InsiderSentimentSection data={report.insiderSentiment} />
                </div>
              </ErrorBoundary>
            )}

            {report.earningsCallAnalysis && (
              <ErrorBoundary sectionName="Earnings Call Analysis">
                <div id="earnings-call" className="report-section">
                  <EarningsCallAnalysisSection data={report.earningsCallAnalysis} />
                </div>
              </ErrorBoundary>
            )}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-zinc-600 pb-4">
            Report generated {new Date(report.generatedAt).toLocaleString()} · OnDecide uses Finnhub, Tavily, and AI analysis
          </p>
        </div>

        {/* ── SIDEBAR (sticky) ─────────────────────── */}
        <aside className="mt-6 lg:mt-0 lg:sticky lg:top-[calc(var(--nav-h)+16px)] lg:self-start space-y-6">
          {/* Decision card */}
          <ErrorBoundary sectionName="Decision">
            <div id="decision" className="report-section">
              <DecisionSection data={report.decision} />
            </div>
          </ErrorBoundary>

          {/* Compact key-stats mirror — price / market cap / P/E */}
          {(() => {
            const pe = stats.find((s) => /p[\/\s]?e/i.test(s.label));
            const cap = report.companySnapshot.marketCap;
            const capStr =
              cap >= 1000
                ? `$${(cap / 1000).toFixed(2)}T`
                : cap >= 1
                ? `$${(cap).toFixed(2)}B`
                : `$${(cap * 1000).toFixed(0)}M`;
            const rows = [
              { label: "Price", value: `${report.companySnapshot.currency} ${report.companySnapshot.currentPrice.toFixed(2)}` },
              { label: "Market Cap", value: capStr },
              ...(pe ? [{ label: "P/E", value: pe.value }] : []),
            ];
            return (
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 p-5">
                <h3 className="font-serif text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                  Key Stats
                </h3>
                <dl className="space-y-3">
                  {rows.map((r, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-3">
                      <dt className="text-sm text-zinc-400">{r.label}</dt>
                      <dd className="text-sm font-medium text-white font-sans text-right">
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })()}
        </aside>
      </div>
    </div>
  );
}
