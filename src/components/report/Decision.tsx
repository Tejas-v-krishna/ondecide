import type { Decision } from "@/types";

interface DecisionProps {
  data: Decision;
}

const VERDICT_CONFIG = {
  Invest: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-500",
    glow: "shadow-glow",
    icon: "📈",
    desc: "Conditions appear favourable for this investment",
  },
  Hold: {
    color: "text-amber-400",
    bg: "bg-amber-400/10 border-amber-500",
    glow: "shadow-glow-amber",
    icon: "⏸",
    desc: "Mixed signals — monitor and revisit",
  },
  Avoid: {
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-500",
    glow: "shadow-glow-rose",
    icon: "⛔",
    desc: "Risk outweighs potential reward at this time",
  },
};

export function DecisionSection({ data }: DecisionProps) {
  const config = VERDICT_CONFIG[data.recommendation];

  const factors = [
    { label: "Financials", value: data.confidenceBreakdown.financials, color: "#10b981" },
    { label: "News Sentiment", value: data.confidenceBreakdown.newsSentiment, color: "#3b82f6" },
    { label: "Historical Pattern", value: data.confidenceBreakdown.historicalPattern, color: "#a855f7" },
    { label: "Qualitative", value: data.confidenceBreakdown.qualitative, color: "#f59e0b" },
  ];

  return (
    <div className={`rounded-xl border-2 ${config.bg} overflow-hidden`}>
      {/* Verdict header */}
      <div className="px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Verdict badge */}
          <div className={`inline-flex flex-col items-center justify-center w-28 h-28 rounded-2xl border-2 ${config.bg} ${config.glow} flex-shrink-0`}>
            <span className="text-3xl mb-1">{config.icon}</span>
            <span className={`text-xl font-bold ${config.color}`}>{data.recommendation}</span>
          </div>

          {/* Reasoning */}
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-1">The Decision</h2>
            <p className="text-sm text-slate-500 mb-3">{config.desc}</p>
            <p className="text-slate-200 leading-relaxed">{data.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Confidence breakdown */}
      <div className="px-6 py-5 border-t border-slate-800/50">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">How this call was weighted</h3>
        <div className="space-y-3">
          {factors.map((factor) => (
            <div key={factor.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-300">{factor.label}</span>
                <span className="text-sm font-mono text-slate-300">{factor.value}%</span>
              </div>
              <div className="h-2 bg-navy-900 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${factor.value}%`, backgroundColor: factor.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key tailwinds & risks */}
      {(data.keyTailwinds.length > 0 || data.keyRisks.length > 0) && (
        <div className="px-6 py-5 border-t border-slate-800/50 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {data.keyTailwinds.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider mb-3">Tailwinds</h3>
              <ul className="space-y-2">
                {data.keyTailwinds.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-500 flex-shrink-0 mt-0.5">+</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.keyRisks.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-3">Key Risks</h3>
              <ul className="space-y-2">
                {data.keyRisks.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-rose-500 flex-shrink-0 mt-0.5">—</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="px-6 py-4 border-t border-slate-800/50 bg-navy-900/50">
        <div className="flex items-start gap-2">
          <span className="text-slate-600 flex-shrink-0 mt-0.5">ℹ</span>
          <p className="text-xs text-slate-500 leading-relaxed">{data.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
