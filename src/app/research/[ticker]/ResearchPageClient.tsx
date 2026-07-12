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
type AITab = "thesis" | "qualitative" | "news" | "history";
type ProTab = "peers" | "insiders" | "earnings";

export function ResearchPageClient({ ticker }: ResearchPageClientProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [aiTab, setAiTab] = useState<AITab>("thesis");
  const [proTab, setProTab] = useState<ProTab>("peers");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-zinc-800/50 gap-4 mb-6">
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

      {/* Ticker Banner */}
      <div className="mb-6">
        <ErrorBoundary sectionName="Company Overview">
          <CompanySnapshotSection data={report.companySnapshot} />
        </ErrorBoundary>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Card */}
          <ErrorBoundary sectionName="Price Chart">
            <LiveMarketDataSection
              data={report.liveMarketData}
              ticker={report.ticker}
              currency={report.companySnapshot.currency}
            />
          </ErrorBoundary>

          {/* AI Insights Terminal (Tabbed Card) */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-zinc-800/60 overflow-x-auto scrollbar-none bg-zinc-950/80 backdrop-blur">
              <button
                onClick={() => setAiTab("thesis")}
                className={`px-5 py-4 text-sm font-serif font-semibold border-b-2 whitespace-nowrap transition-all ${
                  aiTab === "thesis"
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Investment Thesis
              </button>
              <button
                onClick={() => setAiTab("qualitative")}
                className={`px-5 py-4 text-sm font-serif font-semibold border-b-2 whitespace-nowrap transition-all ${
                  aiTab === "qualitative"
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Moat & Management
              </button>
              <button
                onClick={() => setAiTab("news")}
                className={`px-5 py-4 text-sm font-serif font-semibold border-b-2 whitespace-nowrap transition-all ${
                  aiTab === "news"
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                News & Sentiment
              </button>
              <button
                onClick={() => setAiTab("history")}
                className={`px-5 py-4 text-sm font-serif font-semibold border-b-2 whitespace-nowrap transition-all ${
                  aiTab === "history"
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Historical Parallels
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6">
              {aiTab === "thesis" && (
                <ErrorBoundary sectionName="Investment Thesis">
                  <DecisionSection data={report.decision} />
                </ErrorBoundary>
              )}

              {aiTab === "qualitative" && (
                <div className="space-y-6">
                  {report.companySnapshot.description && (
                    <div className="p-5 rounded-xl border border-zinc-800/40 bg-zinc-950/40">
                      <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider mb-2">Company Overview</h4>
                      <p className="text-zinc-300 text-sm leading-relaxed">{report.companySnapshot.description}</p>
                      {report.companySnapshot.website && (
                        <a
                          href={report.companySnapshot.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Visit website
                        </a>
                      )}
                    </div>
                  )}
                  <ErrorBoundary sectionName="Moat & Management">
                    <QualitativeReadSection data={report.qualitativeRead} />
                  </ErrorBoundary>
                </div>
              )}

              {aiTab === "news" && (
                <ErrorBoundary sectionName="News Analysis">
                  <NewsAnalysisSection data={report.newsAnalysis} />
                </ErrorBoundary>
              )}

              {aiTab === "history" && (
                <ErrorBoundary sectionName="Historical Parallels">
                  <HistoricalPatternSection data={report.historicalPattern} />
                </ErrorBoundary>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width on desktop - Quant & Technical Sidebar) */}
        <div className="space-y-6">
          {/* Stock Scorecard */}
          <ErrorBoundary sectionName="Fundamental Scorecard">
            <ScorecardSection data={report.scorecard} />
          </ErrorBoundary>

          {/* Technical Indicators */}
          <ErrorBoundary sectionName="Technical Analysis">
            <TechnicalSignalSection data={report.technicalSignal} />
          </ErrorBoundary>

          {/* Market Statistics Card */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 p-6">
            <h3 className="font-serif text-lg font-bold text-white mb-4">Market Statistics</h3>
            <div className="divide-y divide-zinc-800/40">
              {report.liveMarketData.keyStats.map((stat) => (
                <div key={stat.label} className="py-3 flex justify-between items-center text-sm gap-4">
                  <span className="text-zinc-500 shrink-0">
                    {stat.glossaryTerm ? (
                      <GlossaryTooltip term={stat.glossaryTerm}>{stat.label}</GlossaryTooltip>
                    ) : (
                      stat.label
                    )}
                  </span>
                  <span className="font-sans font-semibold text-zinc-200 text-right">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Insights Terminal (Tabbed Card) */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 overflow-hidden">
            {/* Headers */}
            <div className="flex border-b border-zinc-800/60 bg-zinc-950/80">
              <button
                onClick={() => setProTab("peers")}
                className={`flex-1 py-3 text-xs font-serif font-semibold border-b-2 text-center transition-all ${
                  proTab === "peers"
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Peers
              </button>
              <button
                onClick={() => setProTab("insiders")}
                className={`flex-1 py-3 text-xs font-serif font-semibold border-b-2 text-center transition-all ${
                  proTab === "insiders"
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Smart Money
              </button>
              <button
                onClick={() => setProTab("earnings")}
                className={`flex-1 py-3 text-xs font-serif font-semibold border-b-2 text-center transition-all ${
                  proTab === "earnings"
                    ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Earnings NLP
              </button>
            </div>

            {/* Contents */}
            <div className="p-5">
              {proTab === "peers" && (
                <ErrorBoundary sectionName="Competitor Matrix">
                  {report.competitorMatrix ? (
                    <CompetitorMatrixSection matrix={report.competitorMatrix} />
                  ) : (
                    <div className="p-4 text-center text-zinc-500 text-xs border border-dashed border-zinc-800 rounded-lg">
                      No competitor comparison available for this asset class.
                    </div>
                  )}
                </ErrorBoundary>
              )}

              {proTab === "insiders" && (
                <ErrorBoundary sectionName="Insider Sentiment">
                  <InsiderSentimentSection data={report.insiderSentiment || { trend: "No Data", netBuyingScore: 0, summary: "No data available." }} />
                </ErrorBoundary>
              )}

              {proTab === "earnings" && (
                <ErrorBoundary sectionName="Earnings NLP">
                  <EarningsCallAnalysisSection data={report.earningsCallAnalysis || { managementTone: "No Data", keyRisks: [], forwardGuidance: "No forward guidance available.", summary: "Earnings call transcript not available." }} />
                </ErrorBoundary>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-xs text-zinc-600 mt-12">
        Report generated {new Date(report.generatedAt).toLocaleString()} · OnDecide uses Finnhub, Tavily, and AI analysis
      </p>
    </div>
  );
}
