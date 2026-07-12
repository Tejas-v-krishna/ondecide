"use client";

import React, { useState } from "react";
import { Play, ShieldCheck, Cpu, Database, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-5xl font-serif text-white mb-4">Agent Synthesizer</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          OnDecide utilizes parallelized LangGraph chains to query APIs, extract filings, analyze sentiment, and compile research reports.
        </p>
      </div>

      {/* Simulator Box */}
      <div className="border border-zinc-800 bg-zinc-950 rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-xl font-serif text-white">Pipeline Execution Simulator</h2>
            <p className="text-zinc-500 text-xs mt-1">Visualize how data propagates through our parallel agent graph.</p>
          </div>
          <Button
            onClick={startMockPipeline}
            disabled={running}
            className="bg-white hover:bg-zinc-200 text-black text-xs font-semibold py-2 px-4 rounded inline-flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            {running ? "Executing..." : "Run Simulator"}
          </Button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-zinc-900 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Pipeline Visual Tree */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {NODES.map((node, idx) => {
            const isDone = progress >= (idx + 1) * 25;
            const isActive = running && progress === idx * 25;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`border p-5 rounded cursor-pointer transition-all ${
                  activeNode.id === node.id
                    ? "bg-zinc-900 border-zinc-700"
                    : "bg-black border-zinc-900 hover:border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <node.icon className={`w-5 h-5 ${isDone ? "text-white" : isActive ? "text-zinc-400 animate-pulse" : "text-zinc-600"}`} />
                  <span className={`text-2xs font-sans uppercase ${isDone ? "text-zinc-400" : "text-zinc-600"}`}>
                    Node 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-sans font-semibold text-white mb-1">{node.label}</h3>
                <span className={`text-2xs font-sans ${isDone ? "text-zinc-500" : isActive ? "text-white font-medium" : "text-zinc-700"}`}>
                  {isDone ? "Done" : isActive ? "Active..." : "Pending"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details */}
      <div className="grid md:grid-cols-[1.5fr_1fr] gap-8 border border-zinc-800 bg-zinc-950/40 rounded-lg p-8 animate-fade-in">
        <div className="space-y-6">
          <div>
            <span className="text-2xs text-zinc-500 font-sans tracking-wider uppercase block mb-1">Node Context</span>
            <h2 className="text-2xl font-serif text-white">{activeNode.label}</h2>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">{activeNode.desc}</p>
          <div className="flex gap-4">
            <ShieldCheck className="w-5 h-5 text-white flex-shrink-0" />
            <p className="text-zinc-500 text-xs">
              Every node executes in an isolated serverless sandbox environment to protect security bounds.
            </p>
          </div>
        </div>

        <div className="space-y-4 border-l border-zinc-900 pl-8">
          <div>
            <span className="text-2xs text-zinc-600 font-sans tracking-wider uppercase block mb-1">Expected Inputs</span>
            <code className="text-2xs text-zinc-400 font-sans bg-zinc-950 p-2 border border-zinc-900 rounded block">
              {activeNode.input}
            </code>
          </div>
          <div>
            <span className="text-2xs text-zinc-600 font-sans tracking-wider uppercase block mb-1">Expected Outputs</span>
            <code className="text-2xs text-zinc-400 font-sans bg-zinc-950 p-2 border border-zinc-900 rounded block">
              {activeNode.output}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
