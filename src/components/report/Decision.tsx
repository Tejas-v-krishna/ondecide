import type { Decision } from "@/types";

interface DecisionProps {
  data: Decision;
}

const VERDICT_CONFIG = {
  Invest: {
    color: "text-brand-700",
    bg: "bg-brand-50 border-brand-200",
    bar: "bg-brand-600",
    icon: "📈",
    desc: "Conditions appear favourable for this investment",
  },
  Hold: {
    color: "text-hold",
    bg: "bg-hold/10 border-hold/20",
    bar: "bg-hold",
    icon: "⏸",
    desc: "Mixed signals — monitor and revisit",
  },
  Avoid: {
    color: "text-avoid",
    bg: "bg-avoid/10 border-avoid/20",
    bar: "bg-avoid",
    icon: "⛔",
    desc: "Risk outweighs potential reward at this time",
  },
};

export function DecisionSection({ data }: DecisionProps) {
  const config = VERDICT_CONFIG[data.recommendation];

  const factors = [
    { label: "Financials", value: data.confidenceBreakdown.financials },
    { label: "News Sentiment", value: data.confidenceBreakdown.newsSentiment },
    { label: "Historical Pattern", value: data.confidenceBreakdown.historicalPattern },
    { label: "Qualitative", value: data.confidenceBreakdown.qualitative },
  ];

  return (
    <div className="flex flex-col">
      {/* Verdict header */}
      <div className="pb-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          {/* Verdict badge */}
          <div className={`inline-flex h-24 w-24 flex-shrink-0 flex-col items-center justify-center rounded-2xl border ${config.bg}`}>
            <span className="mb-1 text-3xl">{config.icon}</span>
            <span className={`text-lg font-semibold ${config.color}`}>{data.recommendation}</span>
          </div>

          {/* Reasoning */}
          <div>
            <h2 className="mb-1 text-xl font-medium text-ink">The Decision</h2>
            <p className="mb-3 text-sm text-ink-500">{config.desc}</p>
            <p className="whitespace-pre-wrap leading-relaxed text-ink-600">{data.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Confidence breakdown */}
      <div className="border-t border-line py-6">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-ink-400">How this call was weighted</h3>
        <div className="space-y-4">
          {factors.map((factor) => (
            <div key={factor.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm text-ink-500">{factor.label}</span>
                <span className="font-mono text-sm text-ink-600">{factor.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${config.bar}`}
                  style={{ width: `${factor.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bull & Bear Case */}
      {(data.keyTailwinds.length > 0 || data.keyRisks.length > 0) && (
        <div className="grid grid-cols-1 gap-6 border-t border-line py-6 sm:grid-cols-2">
          {data.keyTailwinds.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-brand-700">The Bull Case</h3>
              <ul className="space-y-2.5">
                {data.keyTailwinds.map((t, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
                    <span className="mt-0.5 flex-shrink-0 font-bold text-brand-600">+</span>
                    <span className="leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {data.keyRisks.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-avoid">The Bear Case</h3>
              <ul className="space-y-2.5">
                {data.keyRisks.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink-600">
                    <span className="mt-0.5 flex-shrink-0 font-bold text-avoid">—</span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-2 border-t border-line pt-4">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex-shrink-0 text-ink-400">ℹ</span>
          <p className="text-xs leading-relaxed text-ink-400">{data.disclaimer}</p>
        </div>
      </div>
    </div>
  );
}
