"use client";

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
    const isActive = !isDone && completedNodes.length === PIPELINE_STEPS.findIndex(s => s.node === step.node);
    return {
      ...step,
      status: isDone ? "done" : isActive ? "active" : "pending",
    } as Step & typeof step;
  });

  const progress = (completedNodes.length / PIPELINE_STEPS.length) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm text-emerald-400 font-medium">Researching {ticker}</span>
        </div>
        <div className="text-slate-300 text-base min-h-[1.5rem] transition-all duration-300">
          {currentMessage || "Starting research pipeline..."}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step) => {
          const isParallel = ["financials", "news"].includes(step.node);
          return (
            <div
              key={step.node}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                step.status === "done"
                  ? "bg-emerald-500/5 border border-emerald-500/10"
                  : step.status === "active"
                  ? "bg-navy-800 border border-emerald-500/30"
                  : "opacity-40"
              }`}
            >
              {/* Step indicator */}
              <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center">
                {step.status === "done" ? (
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : step.status === "active" ? (
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-600" />
                )}
              </div>

              {/* Label */}
              <span className={`text-sm flex-1 ${step.status === "done" ? "text-slate-300" : step.status === "active" ? "text-slate-100 font-medium" : "text-slate-600"}`}>
                {step.label}
              </span>

              {/* Parallel badge */}
              {isParallel && (
                <span className="text-2xs text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
                  parallel
                </span>
              )}

              {/* Done tick */}
              {step.status === "done" && (
                <span className="text-xs text-emerald-600">done</span>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-600 mt-6">
        This transparency into our research process is intentional — you deserve to see how the analysis is built.
      </p>
    </div>
  );
}
