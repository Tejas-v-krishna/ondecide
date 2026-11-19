import { EarningsCallAnalysis } from "@/types";
import { Info, Mic, AlertTriangle } from "lucide-react";

export function EarningsCallAnalysisSection({ data }: { data: EarningsCallAnalysis }) {
  if (!data || data.managementTone === "No Data" || data.managementTone === undefined) {
    return (
      <div className="relative flex flex-col overflow-hidden">
        <div className="mb-4 flex items-center justify-between opacity-50">
          <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
            <Mic className="h-5 w-5 text-brand-600" />
            Earnings Call Analysis
          </h3>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-sm">
          <div className="rounded-full border border-line bg-surface-subtle px-4 py-2 text-sm font-medium text-brand-700">
            Coming Soon
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
          <Mic className="h-5 w-5 text-brand-600" />
          Earnings Call Analysis
          <div className="group relative">
            <Info className="h-4 w-4 cursor-help text-ink-400" />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-xl border border-line bg-surface p-2 text-xs text-ink-600 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
              AI synthesis of the latest quarterly earnings call transcript.
            </div>
          </div>
        </h3>

        <div
          className={`rounded-full border px-3 py-1 text-sm font-semibold
          ${data.managementTone === "Optimistic" ? "border-brand-200 bg-brand-50 text-brand-700" : ""}
          ${data.managementTone === "Defensive" ? "border-avoid/20 bg-avoid/10 text-avoid" : ""}
          ${data.managementTone === "Neutral" ? "border-line bg-surface-subtle text-ink-600" : ""}
        `}
        >
          Tone: {data.managementTone}
        </div>
      </div>

      <p className="mb-4 border-b border-line pb-4 text-sm leading-relaxed text-ink-600">
        <strong className="mb-1 block text-ink">Key Takeaway:</strong>
        {data.summary}
      </p>

      <div className="mb-4">
        <strong className="mb-1 block text-sm text-ink">Forward Guidance:</strong>
        <p className="text-sm text-ink-500">{data.forwardGuidance}</p>
      </div>

      {data.keyRisks && data.keyRisks.length > 0 && (
        <div className="rounded-xl border border-line bg-surface-subtle p-3">
          <strong className="mb-2 flex items-center gap-2 text-sm text-ink-500">
            <AlertTriangle className="h-4 w-4 text-hold" />
            Key Risks Mentioned:
          </strong>
          <ul className="list-disc space-y-1 pl-5 text-sm text-ink-600">
            {data.keyRisks.map((risk, idx) => (
              <li key={idx}>{risk}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
