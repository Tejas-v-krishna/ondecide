import type { HistoricalPattern } from "@/types";

interface HistoricalPatternProps {
  data: HistoricalPattern;
}

const CONFIDENCE_CONFIG = {
  High: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  Medium: { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  Low: { color: "text-slate-400", bg: "bg-slate-400/10 border-slate-400/20" },
};

export function HistoricalPatternSection({ data }: HistoricalPatternProps) {
  const confConfig = CONFIDENCE_CONFIG[data.confidence];

  return (
    <div className="rounded-xl border border-slate-800 bg-navy-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100">Historical Pattern Context</h2>
        <p className="text-sm text-slate-500 mt-0.5">AI-identified historical parallel — patterns inform, not guarantee</p>
      </div>

      <div className="px-6 py-5">
        {/* Pattern header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">📜</span>
              <h3 className="text-lg font-semibold text-slate-100">{data.scenario}</h3>
            </div>
            <span className="text-sm text-slate-500">{data.year}</span>
          </div>
          <span className={`flex-shrink-0 px-3 py-1 rounded-full border text-sm font-medium ${confConfig.color} ${confConfig.bg}`}>
            {data.confidence} confidence
          </span>
        </div>

        {/* What happened then */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">What Happened Then</h4>
          <p className="text-slate-300 leading-relaxed">{data.outcome}</p>
        </div>

        {/* Current parallels */}
        <div className="mb-4 bg-navy-900 rounded-lg p-4 border border-slate-800">
          <h4 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Current Parallels</h4>
          <p className="text-slate-200 leading-relaxed">{data.parallels}</p>
        </div>

        {/* Caveat */}
        <div className="flex items-start gap-2 text-sm">
          <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠</span>
          <p className="text-slate-500 italic">{data.caveat}</p>
        </div>
      </div>
    </div>
  );
}
