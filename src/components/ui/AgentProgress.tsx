"use client";

import { Check } from "lucide-react";

interface Step {
  node: string;
  message: string;
  status: "pending" | "active" | "done";
}

const PIPELINE_STEPS = [
  { node: "resolve", label: "Resolving company" },
  { node: "financials", label: "Pulling financials" },
  { node: "news", label: "Reading news" },
  { node: "qualitative", label: "Qualitative analysis" },
  { node: "historicalPattern", label: "Historical patterns" },
  { node: "synthesis", label: "Synthesizing report" },
  { node: "decision", label: "Forming thesis" },
];

interface AgentProgressProps {
  completedNodes: string[];
  currentMessage: string;
  ticker: string;
}

export function AgentProgress({ completedNodes, currentMessage, ticker }: AgentProgressProps) {
  const steps = PIPELINE_STEPS.map((step) => {
    const isDone = completedNodes.includes(step.node);
    const isActive =
      !isDone && completedNodes.length === PIPELINE_STEPS.findIndex((s) => s.node === step.node);
    return {
      ...step,
      status: isDone ? "done" : isActive ? "active" : "pending",
    } as Step & typeof step;
  });

  const progress = (completedNodes.length / PIPELINE_STEPS.length) * 100;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 shadow-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
          <span className="text-sm font-medium text-ink-600">Researching {ticker}</span>
        </div>
        <div className="min-h-[1.75rem] text-xl text-ink transition-all duration-300">
          {currentMessage || "Starting research pipeline..."}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1 overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-brand-600 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-2.5">
        {steps.map((step) => {
          const isParallel = ["financials", "news"].includes(step.node);
          return (
            <div
              key={step.node}
              className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 ${
                step.status === "done"
                  ? "border-line bg-surface"
                  : step.status === "active"
                    ? "border-brand-200 bg-brand-50"
                    : "border-transparent opacity-50"
              }`}
            >
              {/* Step indicator */}
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
                {step.status === "done" ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100">
                    <Check className="h-3 w-3 text-brand-700" strokeWidth={3} />
                  </div>
                ) : step.status === "active" ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-ink-300" />
                )}
              </div>

              {/* Label */}
              <span
                className={`flex-1 text-sm ${
                  step.status === "done"
                    ? "text-ink-600"
                    : step.status === "active"
                      ? "font-medium text-ink"
                      : "text-ink-400"
                }`}
              >
                {step.label}
              </span>

              {isParallel && (
                <span className="rounded-md bg-surface-subtle px-1.5 py-0.5 text-2xs text-ink-500">
                  parallel
                </span>
              )}

              {step.status === "done" && (
                <span className="text-xs text-ink-400">done</span>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-6 text-center text-xs text-ink-400">
        This transparency into our research process is intentional — you deserve to see how the
        analysis is built.
      </p>
    </div>
  );
}
