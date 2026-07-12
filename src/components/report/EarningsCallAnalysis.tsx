import { EarningsCallAnalysis } from "@/types";
import { Info, Mic, AlertTriangle } from "lucide-react";

export function EarningsCallAnalysisSection({ data }: { data: EarningsCallAnalysis }) {
  if (!data || data.managementTone === "No Data" || data.managementTone === undefined) {
    return (
      <div className="flex flex-col relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 opacity-50">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Mic className="w-5 h-5 text-indigo-400" />
            Earnings Call Analysis
          </h3>
        </div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
          <div className="px-4 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-emerald-400 text-sm font-medium">
            Coming Soon
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
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
          ${data.managementTone === 'Optimistic' ? 'bg-zinc-900/50 text-emerald-400 border border-zinc-800' : ''}
          ${data.managementTone === 'Defensive' ? 'bg-zinc-900/50 text-zinc-400 border border-zinc-800' : ''}
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
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3">
          <strong className="text-zinc-400 block mb-2 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Key Risks Mentioned:
          </strong>
          <ul className="list-disc pl-5 text-300/80 text-sm space-y-1">
            {data.keyRisks.map((risk, idx) => (
              <li key={idx}>{risk}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
