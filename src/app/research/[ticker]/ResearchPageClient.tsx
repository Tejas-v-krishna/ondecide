"use client";

import { useEffect, useState, useRef } from "react";
import { AgentProgress } from "@/components/ui/AgentProgress";
import { SaveToWatchlist } from "@/components/ui/SaveToWatchlist";
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
        <h2 className="text-xl font-bold text-slate-100 mb-2">Research failed</h2>
        <p className="text-slate-400 mb-6">{errorMsg}</p>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
      {/* Report nav + save */}
      <div className="flex items-center justify-between py-4">
        <ReportNav />
        <SaveToWatchlist report={report} />
      </div>

      {/* All report sections */}
      <div className="space-y-6 animate-slide-up">
        <div id="snapshot" className="report-section">
          <CompanySnapshotSection data={report.companySnapshot} />
        </div>

        <div id="market" className="report-section">
          <LiveMarketDataSection
            data={report.liveMarketData}
            ticker={report.ticker}
            currency={report.companySnapshot.currency}
          />
        </div>

        <div id="scorecard" className="report-section">
          <ScorecardSection data={report.scorecard} />
        </div>

        <TechnicalSignalSection data={report.technicalSignal} />

        <div id="news" className="report-section">
          <NewsAnalysisSection data={report.newsAnalysis} />
        </div>

        <div id="financials" className="report-section">
          <FinancialHealthSection data={report.financialHealth} />
        </div>

        <div id="qualitative" className="report-section">
          <QualitativeReadSection data={report.qualitativeRead} />
        </div>

        <div id="history" className="report-section">
          <HistoricalPatternSection data={report.historicalPattern} />
        </div>

        <div id="decision" className="report-section">
          <DecisionSection data={report.decision} />
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-slate-600 pb-4">
          Report generated {new Date(report.generatedAt).toLocaleString()} · OnDecide uses Finnhub, Tavily, and Gemini 2.0 Flash
        </p>
      </div>
    </div>
  );
}
