import type { Decision } from "@/types";

interface DecisionProps {
  data: Decision;
}

const VERDICT_CONFIG = {
  Invest: {
    color: "text-emerald-400",
    bg: "bg-emerald-950/20 border-emerald-900/30",
    icon: "📈",
    desc: "Conditions appear favourable for this investment",
  },
  Hold: {
    color: "text-zinc-300",
    bg: "bg-zinc-900/30 border-zinc-800",
    icon: "⏸",
    desc: "Mixed signals — monitor and revisit",
  },
  Avoid: {
    color: "text-rose-400",
    bg: "bg-rose-950/20 border-rose-900/30",
    icon: "⛔",
    desc: "Risk outweighs potential reward at this time",
  },
};

export function DecisionSection({ data }: DecisionProps) {
  const config = VERDICT_CONFIG[data.recommendation];

  // We map colors to Tailwind zinc utility classes instead of bright hexes
  const factors = [
    { label: "Financials", value: data.confidenceBreakdown.financials, colorClass: "bg-zinc-400" },
    { label: "News Sentiment", value: data.confidenceBreakdown.newsSentiment, colorClass: "bg-zinc-500" },
    { label: "Historical Pattern", value: data.confidenceBreakdown.historicalPattern, colorClass: "bg-zinc-600" },
    { label: "Qualitative", value: data.confidenceBreakdown.qualitative, colorClass: "bg-zinc-700" },
  ];

  return (
    <div className="flex flex-col">
      {/* Verdict header */}
      <div className="pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Verdict badge */}
          <div className={`inline-flex flex-col items-center justify-center w-24 h-24 rounded-2xl border ${config.bg} flex-shrink-0`}>
            <span className="text-3xl mb-1">{config.icon}</span>
            <span className={`text-lg font-bold ${config.color}`}>{data.recommendation}</span>
          </div>

          {/* Reasoning */}
          <div>
            <h2 className="font-serif text-xl font-bold text-white mb-1">The Decision</h2>
            <p className="text-sm text-zinc-500 mb-3">{config.desc}</p>
            <p className="text-zinc-100 leading-relaxed whitespace-pre-wrap">{data.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Confidence breakdown */}
      <div className="py-6 border-t border-zinc-800/40">
        <h3 className="font-serif text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">How this call was weighted</h3>
        <div className="space-y-4">
          {factors.map((factor) => (
            <div key={factor.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-zinc-400">{factor.label}</span>
                <span className="text-sm font-sans text-zinc-300">{factor.value}%</span>
              </div>
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${factor.colorClass}`}
                  style={{ width: `${factor.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bull & Bear Case */}
      {(data.keyTailwinds.length > 0 || data.keyRisks.length > 0) && (
        <div className="py-6 border-t border-zinc-800/40 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.keyTailwinds.length > 0 && (
           <div>
              <h3 className="font-serif text-sm font-semibold text-emerald-400/80 uppercase tracking-wider mb-3">The Bull Case</h3>
              <ul className="space-y-2.5">
                {data.keyTailwinds.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="text-emerald-500 font-bold flex-shrink-0 mt-0.5">+</span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.keyRisks.length > 0 && (
            <div>
              <h3 className="font-serif text-sm font-semibold text-rose-400/80 uppercase tracking-wider mb-3">The Bear Case</h3>
              <ul className="space-y-2.5">
                {data.keyRisks.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                    <span className="text-rose-500 font-bold flex-shrink-0 mt-0.5">—</span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="pt-4 mt-2 border-t border-zinc-800/40">
        <div className="flex items-start gap-2">
          <span className="text-zinc-600 flex-shrink-0 mt-0.5">ℹ</span>
          <p className="text-xs text-zinc-500 leading-relaxed">{data.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
