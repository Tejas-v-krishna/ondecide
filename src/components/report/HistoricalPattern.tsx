import type { HistoricalPattern } from "@/types";

interface HistoricalPatternProps {
  data: HistoricalPattern;
}

const CONFIDENCE_CONFIG = {
  High: { color: "text-emerald-400", bg: "bg-zinc-900/50 border-zinc-800" },
  Medium: { color: "text-zinc-400", bg: "bg-zinc-900/50 border-zinc-800" },
  Low: { color: "text-zinc-400", bg: "bg-zinc-500/10 border-zinc-500/20" },
};

export function HistoricalPatternSection({ data }: HistoricalPatternProps) {
  const confConfig = CONFIDENCE_CONFIG[data.confidence];

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="pb-4 mb-4 border-b border-zinc-800/40">
        <h2 className="font-serif text-lg font-semibold text-white">Historical Pattern Context</h2>
        <p className="text-sm text-zinc-500 mt-0.5">AI-identified historical parallel — patterns inform, not guarantee</p>
      </div>

      <div className="py-5">
        {/* Pattern header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">📜</span>
              <h3 className="font-serif text-lg font-semibold text-white">{data.scenario}</h3>
            </div>
            <span className="text-sm text-zinc-500">{data.year}</span>
          </div>
          <span className={`flex-shrink-0 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${confConfig.color} ${confConfig.bg}`}>
            {data.confidence} confidence
          </span>
        </div>

        {/* What happened then */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">What Happened Then</h4>
          <p className="text-zinc-300 leading-relaxed">{data.outcome}</p>
        </div>

        {/* Current parallels */}
        <div className="mb-4 bg-black rounded-lg p-4 border border-zinc-800/60">
          <h4 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Current Parallels</h4>
          <p className="text-zinc-100 leading-relaxed whitespace-pre-wrap">{data.parallels}</p>
        </div>

        {/* Caveat */}
        <div className="flex items-start gap-2 text-sm">
          <span className="text-zinc-500 flex-shrink-0 mt-0.5">⚠</span>
          <p className="text-zinc-500 italic">{data.caveat}</p>
        </div>
      </div>
    </div>
  );
}
