"use client";

import { useEffect, useState, useRef } from "react";
import { Download, Search as SearchIcon, AlertTriangle } from "lucide-react";
import { AgentProgress } from "@/components/ui/AgentProgress";
import { SaveToWatchlist } from "@/components/ui/SaveToWatchlist";
import { AddToPortfolio } from "@/components/ui/AddToPortfolio";
import { ReportNav } from "@/components/report/ReportNav";
import { CompanySnapshotSection } from "@/components/report/CompanySnapshot";
import { LiveMarketDataSection } from "@/components/report/LiveMarketData";
import { ScorecardSection } from "@/components/report/Scorecard";
import { TechnicalSignalSection } from "@/components/report/TechnicalSignal";
import { NewsAnalysisSection } from "@/components/report/NewsAnalysis";
import { QualitativeReadSection } from "@/components/report/QualitativeRead";
import { HistoricalPatternSection } from "@/components/report/HistoricalPattern";
import { DecisionSection } from "@/components/report/Decision";
import { CompetitorMatrixSection } from "@/components/report/CompetitorMatrix";
import { InsiderSentimentSection } from "@/components/report/InsiderSentiment";
import { EarningsCallAnalysisSection } from "@/components/report/EarningsCallAnalysis";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { GlossaryTooltip } from "@/components/ui/GlossaryTooltip";
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
      <div className="shell max-w-2xl py-20 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-avoid/20 bg-avoid/10">
            <AlertTriangle className="h-6 w-6 text-avoid" />
          </div>
        </div>
        <h2 className="mb-2 text-xl font-medium text-ink">Research failed</h2>
        <p className="mb-6 text-ink-500">{errorMsg}</p>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
        >
          <SearchIcon className="h-4 w-4" /> Search again
        </a>
      </div>
    );
  }

  if (phase === "loading") {
    return (
      <div className="shell max-w-2xl py-20">
        <AgentProgress
          completedNodes={completedNodes}
          currentMessage={currentMessage}
          ticker={decodeURIComponent(ticker).toUpperCase()}
        />
      </div>
    );
  }

  if (!report) return null;

  return (
    <div className="bg-paper text-ink">
      {/* Top Action Bar */}
      <div className="sticky top-16 z-40 border-b border-line bg-paper/80 backdrop-blur-xl print:hidden">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center">
          <ReportNav />
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink-600 transition-colors hover:border-line-strong hover:text-ink"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
            <SaveToWatchlist report={report} />
            <AddToPortfolio
              ticker={report.ticker}
              assetType={report.assetType}
              companyName={report.companySnapshot.name}
              currentPrice={report.companySnapshot.currentPrice}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Row 1: Snapshot (4) & Decision (8) */}
          <div id="snapshot" className="report-section card-surface col-span-1 p-6 md:p-8 lg:col-span-4">
            <ErrorBoundary sectionName="Company Overview">
              <CompanySnapshotSection data={report.companySnapshot} />
            </ErrorBoundary>
          </div>
          <div id="decision" className="report-section card-surface col-span-1 p-6 md:p-8 lg:col-span-8">
            <ErrorBoundary sectionName="Investment Thesis">
              <DecisionSection data={report.decision} />
            </ErrorBoundary>
          </div>

          {/* Row 2: Live Data (8) & Scorecard/Stats (4) */}
          <div id="market" className="report-section card-surface col-span-1 p-6 md:p-8 lg:col-span-8">
            <ErrorBoundary sectionName="Price Chart">
              <LiveMarketDataSection
                data={report.liveMarketData}
                ticker={report.ticker}
                currency={report.companySnapshot.currency}
              />
            </ErrorBoundary>
          </div>
          <div
            id="scorecard"
            className="report-section card-surface col-span-1 flex flex-col gap-10 p-6 md:p-8 lg:col-span-4"
          >
            <ErrorBoundary sectionName="Fundamental Scorecard">
              <ScorecardSection data={report.scorecard} />
            </ErrorBoundary>

            {/* Market Statistics Card */}
            <div>
              <h3 className="mb-6 text-xl font-medium text-ink">Market Statistics</h3>
              <div className="divide-y divide-line">
                {report.liveMarketData.keyStats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span className="shrink-0 text-xs uppercase tracking-widest text-ink-400">
                      {stat.glossaryTerm ? (
                        <GlossaryTooltip term={stat.glossaryTerm}>{stat.label}</GlossaryTooltip>
                      ) : (
                        stat.label
                      )}
                    </span>
                    <span className="text-right font-mono font-medium text-ink-600">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Insights (4, 4, 4) */}
          <div id="qualitative" className="report-section card-surface col-span-1 space-y-10 p-6 md:p-8 lg:col-span-4">
            <ErrorBoundary sectionName="Moat & Management">
              <QualitativeReadSection data={report.qualitativeRead} />
            </ErrorBoundary>
            <hr className="border-line" />
            <ErrorBoundary sectionName="Historical Parallels">
              <HistoricalPatternSection data={report.historicalPattern} />
            </ErrorBoundary>
          </div>

          <div id="news" className="report-section card-surface col-span-1 space-y-10 p-6 md:p-8 lg:col-span-4">
            <ErrorBoundary sectionName="News Analysis">
              <NewsAnalysisSection data={report.newsAnalysis} />
            </ErrorBoundary>
            <hr className="border-line" />
            <ErrorBoundary sectionName="Earnings NLP">
              <EarningsCallAnalysisSection
                data={
                  report.earningsCallAnalysis || {
                    managementTone: "No Data",
                    keyRisks: [],
                    forwardGuidance: "No forward guidance available.",
                    summary: "Earnings call transcript not available.",
                  }
                }
              />
            </ErrorBoundary>
          </div>

          <div id="technical" className="report-section card-surface col-span-1 space-y-10 p-6 md:p-8 lg:col-span-4">
            <ErrorBoundary sectionName="Technical Analysis">
              <TechnicalSignalSection data={report.technicalSignal} />
            </ErrorBoundary>
            <hr className="border-line" />
            <ErrorBoundary sectionName="Competitor Matrix">
              {report.competitorMatrix ? (
                <CompetitorMatrixSection matrix={report.competitorMatrix} />
              ) : (
                <div className="rounded-xl border border-dashed border-line p-4 text-center text-xs uppercase tracking-wider text-ink-400">
                  No competitor comparison available for this asset class.
                </div>
              )}
            </ErrorBoundary>
            <hr className="border-line" />
            <ErrorBoundary sectionName="Insider Sentiment">
              <InsiderSentimentSection
                data={report.insiderSentiment || { trend: "No Data", netBuyingScore: 0, summary: "No data available." }}
              />
            </ErrorBoundary>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mb-8 mt-16 text-center text-xs uppercase tracking-widest text-ink-400">
          Report generated {new Date(report.generatedAt).toLocaleString()} · OnDecide uses Finnhub,
          Tavily, and AI analysis
        </p>
      </div>
    </div>
  );
}
