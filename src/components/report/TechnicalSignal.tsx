import type { TechnicalSignal } from "@/types";
import { GlossaryTooltip } from "@/components/ui/GlossaryTooltip";

interface TechnicalSignalProps {
  data: TechnicalSignal;
}

const TREND_CONFIG = {
  Uptrend: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", icon: "↗" },
  Downtrend: { color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20", icon: "↘" },
  Sideways: { color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20", icon: "→" },
};

const MOMENTUM_CONFIG = {
  Overbought: { color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20" },
  Oversold: { color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  Neutral: { color: "text-slate-400", bg: "bg-slate-400/10 border-slate-400/20" },
};

export function TechnicalSignalSection({ data }: TechnicalSignalProps) {
  const trendConfig = TREND_CONFIG[data.trend];
  const momentumConfig = MOMENTUM_CONFIG[data.momentum];

  return (
    <div className="rounded-xl border border-slate-800 bg-navy-800 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-slate-100">Technical Signal</h2>
        <span className="text-xs text-slate-500 italic">Supporting context — reasoning is our differentiator</span>
      </div>

      {/* Compact badge strip */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${trendConfig.color} ${trendConfig.bg}`}>
          <GlossaryTooltip term="Moving Average">
            {trendConfig.icon} {data.trend}
          </GlossaryTooltip>
        </span>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${momentumConfig.color} ${momentumConfig.bg}`}>
          <GlossaryTooltip term="RSI">
            RSI {data.rsi} — {data.momentum}
          </GlossaryTooltip>
        </span>
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${data.goldenCross ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-rose-400 bg-rose-400/10 border-rose-400/20"}`}>
          <GlossaryTooltip term={data.goldenCross ? "Golden Cross" : "Death Cross"}>
            {data.goldenCross ? "✦ Golden Cross" : "✦ Death Cross"}
          </GlossaryTooltip>
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-navy-900 rounded-lg p-2.5">
          <div className="text-xs text-slate-500 mb-0.5">
            <GlossaryTooltip term="Moving Average">50-day MA</GlossaryTooltip>
          </div>
          <div className="font-mono text-sm text-slate-200">{data.sma50.toFixed(2)}</div>
        </div>
        <div className="bg-navy-900 rounded-lg p-2.5">
          <div className="text-xs text-slate-500 mb-0.5">
            <GlossaryTooltip term="Moving Average">200-day MA</GlossaryTooltip>
          </div>
          <div className="font-mono text-sm text-slate-200">{data.sma200.toFixed(2)}</div>
        </div>
        <div className="bg-navy-900 rounded-lg p-2.5">
          <div className="text-xs text-slate-500 mb-0.5">
            <GlossaryTooltip term="Support Level">Support</GlossaryTooltip>
          </div>
          <div className="font-mono text-sm text-emerald-400">{data.supportLevel.toFixed(2)}</div>
        </div>
        <div className="bg-navy-900 rounded-lg p-2.5">
          <div className="text-xs text-slate-500 mb-0.5">
            <GlossaryTooltip term="Resistance Level">Resistance</GlossaryTooltip>
          </div>
          <div className="font-mono text-sm text-rose-400">{data.resistanceLevel.toFixed(2)}</div>
        </div>
      </div>

      <p className="text-sm text-slate-400 leading-relaxed">{data.summary}</p>
    </div>
  );
}
