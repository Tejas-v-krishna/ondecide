import type { QualitativeRead } from "@/types";

interface QualitativeReadProps {
  data: QualitativeRead;
}

const MOAT_CONFIG = {
  Strong: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", bars: 4 },
  Moderate: { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", bars: 3 },
  Weak: { color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20", bars: 2 },
  None: { color: "text-slate-500", bg: "bg-slate-500/10 border-slate-500/20", bars: 1 },
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
    <div className="rounded-xl border border-slate-800 bg-navy-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100">Qualitative Read</h2>
        <p className="text-sm text-slate-500 mt-0.5">Management, competitive position & long-term view</p>
      </div>

      <div className="divide-y divide-slate-800">
        {/* Management */}
        <div className="px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Management Quality</h3>
          <p className="text-slate-200 leading-relaxed">{data.managementAssessment}</p>
        </div>

        {/* Competitive positioning + moat */}
        <div className="px-6 py-5">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Competitive Positioning</h3>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${moatConfig.color} ${moatConfig.bg}`}>
              Moat: {data.moatStrength}
            </span>
          </div>
          <p className="text-slate-200 leading-relaxed">{data.competitivePositioning}</p>
        </div>

        {/* Analyst sentiment */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">What Analysts Are Saying</h3>
            <span className="text-xs text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              AI-synthesized · not a live brokerage feed
            </span>
          </div>

          {/* Consensus bar */}
          {totalAnalysts > 0 && (
            <div className="mb-4">
              <div className="flex h-3 rounded-full overflow-hidden mb-2">
                <div className="bg-emerald-500 transition-all" style={{ width: `${bullPct}%` }} />
                <div className="bg-amber-500 transition-all" style={{ width: `${holdPct}%` }} />
                <div className="bg-rose-500 transition-all" style={{ width: `${bearPct}%` }} />
              </div>
              <div className="flex gap-4 text-xs text-slate-500">
                <span><span className="text-emerald-400 font-medium">{bullishCount}</span> Buy</span>
                <span><span className="text-amber-400 font-medium">{data.analystSentiment.hold}</span> Hold</span>
                <span><span className="text-rose-400 font-medium">{bearishCount}</span> Sell</span>
                {data.analystSentiment.priceTargetMean && (
                  <span className="ml-auto">
                    Target: <span className="text-slate-300 font-mono">${data.analystSentiment.priceTargetMean.toFixed(2)}</span>
                    {" "}(${data.analystSentiment.priceTargetLow?.toFixed(2)} – ${data.analystSentiment.priceTargetHigh?.toFixed(2)})
                  </span>
                )}
              </div>
            </div>
          )}

          <p className="text-slate-200 leading-relaxed">{data.analystSentiment.synthesizedSummary}</p>
        </div>

        {/* Long-term investor lens */}
        <div className="px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Long-Term Investor Lens
          </h3>
          <p className="text-slate-200 leading-relaxed">{data.longTermInvestorLens}</p>
        </div>
      </div>
    </div>
  );
}
