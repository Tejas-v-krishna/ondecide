"use client";

import React, { useState } from "react";
import { Play, ShieldCheck, Cpu, Database, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/PageHeader";

const NODES = [
  {
    id: "resolve",
    label: "Company Resolver",
    desc: "Translates query symbols, mappings, and asset types to official SEC identifiers.",
    input: "User text query (e.g. 'Apple')",
    output: "Valid Ticker Symbol (e.g. 'AAPL') and CIK mapping",
    icon: Search,
  },
  {
    id: "financials",
    label: "Financial Puller",
    desc: "Hits SEC API and Finnhub query nodes to retrieve historical balance sheets, cashflows, and margins.",
    input: "Ticker symbol",
    output: "Clean financial statement payload JSON",
    icon: Database,
  },
  {
    id: "news",
    label: "News & Sentiment",
    desc: "Uses Tavily Search engine to pull recent 30-day corporate news releases, classifying headline sentiments.",
    input: "Corporate context text",
    output: "Sentiment score index (-1.0 to 1.0)",
    icon: Search,
  },
  {
    id: "synthesis",
    label: "LLM Synthesizer",
    desc: "Combines technicals, filings, news, and competitor matrices using Google Gemini 2.0 Flash to synthesize the final thesis.",
    input: "Raw nodes data payloads",
    output: "Structured Markdown research report",
    icon: Cpu,
  },
];

export default function AgentsPage() {
  const [activeNode, setActiveNode] = useState(NODES[0]);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startMockPipeline = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setRunning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 800);
  };

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      <PageHeader
        eyebrow="Platform"
        title="Agent Synthesizer"
        description="OnDecide utilizes parallelized LangGraph chains to query APIs, extract filings, analyze sentiment, and compile research reports."
      />

      {/* Simulator Box */}
      <div className="card-surface mb-12 p-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-medium text-ink">Pipeline Execution Simulator</h2>
            <p className="mt-1 text-xs text-ink-500">
              Visualize how data propagates through our parallel agent graph.
            </p>
          </div>
          <Button onClick={startMockPipeline} disabled={running} size="sm" className="inline-flex items-center gap-2">
            <Play className="h-3.5 w-3.5 fill-current" />
            {running ? "Executing..." : "Run Simulator"}
          </Button>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-1 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full bg-brand-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pipeline Visual Tree */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {NODES.map((node, idx) => {
            const isDone = progress >= (idx + 1) * 25;
            const isActive = running && progress === idx * 25;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`cursor-pointer rounded-xl border p-5 transition-all ${
                  activeNode.id === node.id
                    ? "border-brand-200 bg-brand-50"
                    : "border-line bg-surface hover:border-line-strong"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <node.icon
                    className={`h-5 w-5 ${
                      isDone
                        ? "text-brand-600"
                        : isActive
                          ? "animate-pulse text-ink-500"
                          : "text-ink-300"
                    }`}
                  />
                  <span
                    className={`text-2xs uppercase ${
                      isDone ? "text-ink-500" : "text-ink-300"
                    }`}
                  >
                    Node 0{idx + 1}
                  </span>
                </div>
                <h3 className="mb-1 text-sm font-medium text-ink">{node.label}</h3>
                <span
                  className={`text-2xs ${
                    isDone
                      ? "text-ink-500"
                      : isActive
                        ? "font-medium text-brand-700"
                        : "text-ink-300"
                  }`}
                >
                  {isDone ? "Done" : isActive ? "Active..." : "Pending"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details */}
      <div className="card-surface grid animate-fade-in gap-8 p-8 md:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <div>
            <span className="mb-1 block text-2xs uppercase tracking-wider text-ink-400">
              Node Context
            </span>
            <h2 className="text-2xl font-medium text-ink">{activeNode.label}</h2>
          </div>
          <p className="text-sm leading-relaxed text-ink-500">{activeNode.desc}</p>
          <div className="flex gap-4">
            <ShieldCheck className="h-5 w-5 flex-shrink-0 text-brand-600" />
            <p className="text-xs text-ink-500">
              Every node executes in an isolated serverless sandbox environment to protect security
              bounds.
            </p>
          </div>
        </div>

        <div className="space-y-4 border-line md:border-l md:pl-8">
          <div>
            <span className="mb-1 block text-2xs uppercase tracking-wider text-ink-400">
              Expected Inputs
            </span>
            <code className="block rounded-lg border border-line bg-surface-subtle p-2 font-mono text-2xs text-ink-600">
              {activeNode.input}
            </code>
          </div>
          <div>
            <span className="mb-1 block text-2xs uppercase tracking-wider text-ink-400">
              Expected Outputs
            </span>
            <code className="block rounded-lg border border-line bg-surface-subtle p-2 font-mono text-2xs text-ink-600">
              {activeNode.output}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
