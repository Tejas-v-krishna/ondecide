import type { QualitativeRead } from "@/types";

interface QualitativeReadProps {
  data: QualitativeRead;
}

const MOAT_CONFIG = {
  Strong: { color: "text-brand-700", bg: "bg-brand-50 border-brand-200" },
  Moderate: { color: "text-hold", bg: "bg-hold/10 border-hold/20" },
  Weak: { color: "text-ink-600", bg: "bg-surface-subtle border-line" },
  None: { color: "text-ink-500", bg: "bg-surface-subtle border-line" },
};

export function QualitativeReadSection({ data }: QualitativeReadProps) {
  const moatConfig = MOAT_CONFIG[data.moatStrength];
  const totalAnalysts =
    data.analystSentiment.buy +
    data.analystSentiment.strongBuy +
    data.analystSentiment.hold +
    data.analystSentiment.sell +
    data.analystSentiment.strongSell;
  const bullishCount = data.analystSentiment.buy + data.analystSentiment.strongBuy;
  const bearishCount = data.analystSentiment.sell + data.analystSentiment.strongSell;
  const bullPct = totalAnalysts > 0 ? (bullishCount / totalAnalysts) * 100 : 0;
  const holdPct = totalAnalysts > 0 ? (data.analystSentiment.hold / totalAnalysts) * 100 : 0;
  const bearPct = totalAnalysts > 0 ? (bearishCount / totalAnalysts) * 100 : 0;

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="mb-4 border-b border-line pb-4">
        <h2 className="text-lg font-medium text-ink">Qualitative Read</h2>
        <p className="mt-0.5 text-sm text-ink-500">Management, competitive position &amp; long-term view</p>
      </div>

      <div className="divide-y divide-line">
        {/* Management */}
        <div className="py-5">
          <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-ink-400">Management Quality</h3>
          <p className="whitespace-pre-wrap leading-relaxed text-ink-600">{data.managementAssessment}</p>
        </div>

        {/* Competitive positioning + moat */}
        <div className="py-5">
          <div className="mb-2 flex items-center gap-3">
            <h3 className="text-sm font-medium uppercase tracking-wider text-ink-400">Competitive Positioning</h3>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${moatConfig.color} ${moatConfig.bg}`}>
              Moat: {data.moatStrength}
            </span>
          </div>
          <p className="whitespace-pre-wrap leading-relaxed text-ink-600">{data.competitivePositioning}</p>
        </div>

        {/* Analyst sentiment */}
        <div className="py-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium uppercase tracking-wider text-ink-400">What Analysts Are Saying</h3>
            <span className="rounded-full border border-line bg-surface-subtle px-2 py-0.5 text-xs text-ink-500">
              AI-synthesized · not a live brokerage feed
            </span>
          </div>

          {/* Consensus bar */}
          {totalAnalysts > 0 && (
            <div className="mb-4">
              <div className="mb-2 flex h-3 overflow-hidden rounded-full">
                <div className="bg-brand-500 transition-all" style={{ width: `${bullPct}%` }} />
                <div className="bg-hold transition-all" style={{ width: `${holdPct}%` }} />
                <div className="bg-avoid transition-all" style={{ width: `${bearPct}%` }} />
              </div>
              <div className="flex gap-4 text-xs text-ink-500">
                <span>
                  <span className="font-medium text-brand-700">{bullishCount}</span> Buy
                </span>
                <span>
                  <span className="font-medium text-hold">{data.analystSentiment.hold}</span> Hold
                </span>
                <span>
                  <span className="font-medium text-avoid">{bearishCount}</span> Sell
                </span>
                {data.analystSentiment.priceTargetMean && (
                  <span className="ml-auto">
                    Target:{" "}
                    <span className="font-mono text-ink-600">
                      ${data.analystSentiment.priceTargetMean.toFixed(2)}
                    </span>{" "}
                    (${data.analystSentiment.priceTargetLow?.toFixed(2)} – $
                    {data.analystSentiment.priceTargetHigh?.toFixed(2)})
                  </span>
                )}
              </div>
            </div>
          )}

          <p className="whitespace-pre-wrap leading-relaxed text-ink-600">
            {data.analystSentiment.synthesizedSummary}
          </p>
        </div>

        {/* Long-term investor lens */}
        <div className="py-5">
          <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-ink-400">
            Long-Term Investor Lens
          </h3>
          <p className="whitespace-pre-wrap leading-relaxed text-ink-600">{data.longTermInvestorLens}</p>
        </div>
      </div>
    </div>
  );
}
