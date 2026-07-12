import type { QualitativeRead } from "@/types";

interface QualitativeReadProps {
  data: QualitativeRead;
}

const MOAT_CONFIG = {
  Strong: { color: "text-emerald-400", bg: "bg-zinc-900/50 border-zinc-800", bars: 4 },
  Moderate: { color: "text-zinc-400", bg: "bg-zinc-900/50 border-zinc-800", bars: 3 },
  Weak: { color: "text-zinc-400", bg: "bg-zinc-900/50 border-zinc-800", bars: 2 },
  None: { color: "text-zinc-500", bg: "bg-zinc-600/10 border-zinc-600/20", bars: 1 },
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
      <div className="pb-4 mb-4 border-b border-zinc-800/40">
        <h2 className="font-serif text-lg font-semibold text-white">Qualitative Read</h2>
        <p className="text-sm text-zinc-500 mt-0.5">Management, competitive position & long-term view</p>
      </div>

      <div className="divide-y divide-zinc-800">
        {/* Management */}
        <div className="py-5">
          <h3 className="font-serif text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">Management Quality</h3>
          <p className="text-zinc-100 leading-relaxed whitespace-pre-wrap">{data.managementAssessment}</p>
        </div>

        {/* Competitive positioning + moat */}
        <div className="py-5">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-serif text-sm font-semibold text-zinc-400 uppercase tracking-wider">Competitive Positioning</h3>
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${moatConfig.color} ${moatConfig.bg}`}>
              Moat: {data.moatStrength}
            </span>
          </div>
          <p className="text-zinc-100 leading-relaxed whitespace-pre-wrap">{data.competitivePositioning}</p>
        </div>

        {/* Analyst sentiment */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-sm font-semibold text-zinc-400 uppercase tracking-wider">What Analysts Are Saying</h3>
            <span className="text-xs text-zinc-500 bg-zinc-900/50 border border-zinc-800 px-2 py-0.5 rounded-full">
              AI-synthesized · not a live brokerage feed
            </span>
          </div>

          {/* Consensus bar */}
          {totalAnalysts > 0 && (
            <div className="mb-4">
              <div className="flex h-3 rounded-full overflow-hidden mb-2">
                <div className="bg-emerald-500 transition-all" style={{ width: `${bullPct}%` }} />
                <div className="bg-zinc-500 transition-all" style={{ width: `${holdPct}%` }} />
                <div className="bg-zinc-500 transition-all" style={{ width: `${bearPct}%` }} />
              </div>
              <div className="flex gap-4 text-xs text-zinc-500">
                <span><span className="text-emerald-400 font-medium">{bullishCount}</span> Buy</span>
                <span><span className="text-zinc-400 font-medium">{data.analystSentiment.hold}</span> Hold</span>
                <span><span className="text-zinc-400 font-medium">{bearishCount}</span> Sell</span>
                {data.analystSentiment.priceTargetMean && (
                  <span className="ml-auto">
                    Target: <span className="text-zinc-300 font-sans">${data.analystSentiment.priceTargetMean.toFixed(2)}</span>
                    {" "}(${data.analystSentiment.priceTargetLow?.toFixed(2)} – ${data.analystSentiment.priceTargetHigh?.toFixed(2)})
                  </span>
                )}
              </div>
            </div>
          )}

          <p className="text-zinc-100 leading-relaxed whitespace-pre-wrap">{data.analystSentiment.synthesizedSummary}</p>
        </div>

        {/* Long-term investor lens */}
        <div className="py-5">
          <h3 className="font-serif text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Long-Term Investor Lens
          </h3>
          <p className="text-zinc-100 leading-relaxed whitespace-pre-wrap">{data.longTermInvestorLens}</p>
        </div>
      </div>
    </div>
  );
}
