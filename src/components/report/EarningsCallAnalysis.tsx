import { EarningsCallAnalysis } from "@/types";
import { Info, Mic, AlertTriangle } from "lucide-react";

export function EarningsCallAnalysisSection({ data }: { data: EarningsCallAnalysis }) {
  if (!data || data.managementTone === "No Data") return null;

  return (
    <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800/60">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Mic className="w-5 h-5 text-indigo-400" />
          Earnings Call Analysis
          <div className="group relative">
            <Info className="w-4 h-4 text-zinc-500 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-zinc-900 text-xs text-zinc-300 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              AI synthesis of the latest quarterly earnings call transcript.
            </div>
          </div>
        </h3>
        
        <div className={`px-3 py-1 rounded-full text-sm font-semibold
          ${data.managementTone === 'Optimistic' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' : ''}
          ${data.managementTone === 'Defensive' ? 'bg-amber-950 text-amber-400 border border-amber-900' : ''}
          ${data.managementTone === 'Neutral' ? 'bg-zinc-900 text-zinc-300 border border-zinc-800' : ''}
        `}>
          Tone: {data.managementTone}
        </div>
      </div>
      
      <p className="text-zinc-300 leading-relaxed text-sm mb-4 pb-4 border-b border-zinc-800/60/50">
        <strong className="text-zinc-100 block mb-1">Key Takeaway:</strong>
        {data.summary}
      </p>

      <div className="mb-4">
        <strong className="text-zinc-100 block mb-1 text-sm">Forward Guidance:</strong>
        <p className="text-zinc-400 text-sm">{data.forwardGuidance}</p>
      </div>

      {data.keyRisks && data.keyRisks.length > 0 && (
        <div className="bg-rose-950/20 border border-rose-900/30 rounded-lg p-3">
          <strong className="text-rose-400 block mb-2 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Key Risks Mentioned:
          </strong>
          <ul className="list-disc pl-5 text-rose-300/80 text-sm space-y-1">
            {data.keyRisks.map((risk, idx) => (
              <li key={idx}>{risk}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
