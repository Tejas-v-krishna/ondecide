import type { HistoricalPattern } from "@/types";

interface HistoricalPatternProps {
  data: HistoricalPattern;
}

const CONFIDENCE_CONFIG = {
  High: { color: "text-brand-700", bg: "bg-brand-50 border-brand-200" },
  Medium: { color: "text-hold", bg: "bg-hold/10 border-hold/20" },
  Low: { color: "text-ink-600", bg: "bg-surface-subtle border-line" },
};

export function HistoricalPatternSection({ data }: HistoricalPatternProps) {
  const confConfig = CONFIDENCE_CONFIG[data.confidence];

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="mb-4 border-b border-line pb-4">
        <h2 className="text-lg font-medium text-ink">Historical Pattern Context</h2>
        <p className="mt-0.5 text-sm text-ink-500">
          AI-identified historical parallel — patterns inform, not guarantee
        </p>
      </div>

      <div className="py-5">
        {/* Pattern header */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="text-2xl">📜</span>
              <h3 className="text-lg font-medium text-ink">{data.scenario}</h3>
            </div>
            <span className="text-sm text-ink-500">{data.year}</span>
          </div>
          <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${confConfig.color} ${confConfig.bg}`}>
            {data.confidence} confidence
          </span>
        </div>

        {/* What happened then */}
        <div className="mb-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">What Happened Then</h4>
          <p className="leading-relaxed text-ink-600">{data.outcome}</p>
        </div>

        {/* Current parallels */}
        <div className="mb-4 rounded-xl border border-line bg-surface-subtle p-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-700">Current Parallels</h4>
          <p className="whitespace-pre-wrap leading-relaxed text-ink-600">{data.parallels}</p>
        </div>

        {/* Caveat */}
        <div className="flex items-start gap-2 text-sm">
          <span className="mt-0.5 flex-shrink-0 text-ink-400">⚠</span>
          <p className="italic text-ink-400">{data.caveat}</p>
        </div>
      </div>
    </div>
  );
}
