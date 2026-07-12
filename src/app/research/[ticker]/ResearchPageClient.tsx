"use client";

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Action Bar (matches home page style) */}
      <div className="border-b border-zinc-800/60 bg-black sticky top-0 z-50 print:hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <ReportNav />
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
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

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-zinc-800/50 p-px">
          
          {/* Row 1: Snapshot (4) & Decision (8) */}
          <div id="snapshot" className="col-span-1 lg:col-span-4 bg-black p-6 md:p-8 hover:bg-zinc-950/30 transition-colors scroll-mt-32">
            <ErrorBoundary sectionName="Company Overview">
              <CompanySnapshotSection data={report.companySnapshot} />
            </ErrorBoundary>
          </div>
          <div id="decision" className="col-span-1 lg:col-span-8 bg-black p-6 md:p-8 hover:bg-zinc-950/30 transition-colors scroll-mt-32">
            <ErrorBoundary sectionName="Investment Thesis">
              <DecisionSection data={report.decision} />
            </ErrorBoundary>
          </div>

          {/* Row 2: Live Data (8) & Scorecard/Stats (4) */}
          <div id="market" className="col-span-1 lg:col-span-8 bg-black p-6 md:p-8 hover:bg-zinc-950/30 transition-colors scroll-mt-32">
            <ErrorBoundary sectionName="Price Chart">
              <LiveMarketDataSection
                data={report.liveMarketData}
                ticker={report.ticker}
                currency={report.companySnapshot.currency}
              />
            </ErrorBoundary>
          </div>
          <div id="scorecard" className="col-span-1 lg:col-span-4 bg-black p-6 md:p-8 hover:bg-zinc-950/30 transition-colors flex flex-col gap-10 scroll-mt-32">
            <ErrorBoundary sectionName="Fundamental Scorecard">
              <ScorecardSection data={report.scorecard} />
            </ErrorBoundary>

            {/* Market Statistics Card */}
            <div>
              <h3 className="font-serif text-xl text-white mb-6">Market Statistics</h3>
              <div className="divide-y divide-zinc-800/40">
                {report.liveMarketData.keyStats.map((stat) => (
                  <div key={stat.label} className="py-3 flex justify-between items-center text-sm gap-4">
                    <span className="text-zinc-500 shrink-0 text-xs tracking-widest uppercase font-sans">
                      {stat.glossaryTerm ? (
                        <GlossaryTooltip term={stat.glossaryTerm}>{stat.label}</GlossaryTooltip>
                      ) : (
                        stat.label
                      )}
                    </span>
                    <span className="font-sans font-medium text-zinc-200 text-right">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 3: Insights (4, 4, 4) */}
          <div id="qualitative" className="col-span-1 lg:col-span-4 bg-black p-6 md:p-8 hover:bg-zinc-950/30 transition-colors space-y-10 scroll-mt-32">
            <ErrorBoundary sectionName="Moat & Management">
              <QualitativeReadSection data={report.qualitativeRead} />
            </ErrorBoundary>
            <hr className="border-zinc-800/40" />
            <ErrorBoundary sectionName="Historical Parallels">
              <HistoricalPatternSection data={report.historicalPattern} />
            </ErrorBoundary>
          </div>

          <div id="news" className="col-span-1 lg:col-span-4 bg-black p-6 md:p-8 hover:bg-zinc-950/30 transition-colors space-y-10 scroll-mt-32">
            <ErrorBoundary sectionName="News Analysis">
              <NewsAnalysisSection data={report.newsAnalysis} />
            </ErrorBoundary>
            <hr className="border-zinc-800/40" />
            <ErrorBoundary sectionName="Earnings NLP">
              <EarningsCallAnalysisSection data={report.earningsCallAnalysis || { managementTone: "No Data", keyRisks: [], forwardGuidance: "No forward guidance available.", summary: "Earnings call transcript not available." }} />
            </ErrorBoundary>
          </div>

          <div id="technical" className="col-span-1 lg:col-span-4 bg-black p-6 md:p-8 hover:bg-zinc-950/30 transition-colors space-y-10 scroll-mt-32">
            <ErrorBoundary sectionName="Technical Analysis">
              <TechnicalSignalSection data={report.technicalSignal} />
            </ErrorBoundary>
            <hr className="border-zinc-800/40" />
            <ErrorBoundary sectionName="Competitor Matrix">
              {report.competitorMatrix ? (
                <CompetitorMatrixSection matrix={report.competitorMatrix} />
              ) : (
                <div className="text-zinc-500 text-xs border border-dashed border-zinc-800 p-4 text-center uppercase tracking-wider font-sans">
                  No competitor comparison available for this asset class.
                </div>
              )}
            </ErrorBoundary>
            <hr className="border-zinc-800/40" />
            <ErrorBoundary sectionName="Insider Sentiment">
              <InsiderSentimentSection data={report.insiderSentiment || { trend: "No Data", netBuyingScore: 0, summary: "No data available." }} />
            </ErrorBoundary>
          </div>

        </div>

        {/* Footer Note */}
        <p className="text-center text-xs font-sans text-zinc-600 mt-16 mb-8 tracking-widest uppercase">
          REPORT GENERATED {new Date(report.generatedAt).toLocaleString()} · ONDECIDE USES FINNHUB, TAVILY, AND AI ANALYSIS
        </p>
      </div>
    </div>
  );
}
