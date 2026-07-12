import type { TechnicalSignal } from "@/types";
import { GlossaryTooltip } from "@/components/ui/GlossaryTooltip";

interface TechnicalSignalProps {
  data: TechnicalSignal;
}

const TREND_CONFIG = {
  Uptrend: { color: "text-emerald-400", bg: "bg-zinc-900/50 border-zinc-800", icon: "↗" },
  Downtrend: { color: "text-zinc-400", bg: "bg-zinc-900/50 border-zinc-800", icon: "↘" },
  Sideways: { color: "text-zinc-400", bg: "bg-zinc-900/50 border-zinc-800", icon: "→" },
};

const MOMENTUM_CONFIG = {
  Overbought: { color: "text-zinc-400", bg: "bg-zinc-900/50 border-zinc-800" },
  Oversold: { color: "text-emerald-400", bg: "bg-zinc-900/50 border-zinc-800" },
  Neutral: { color: "text-zinc-400", bg: "bg-zinc-500/10 border-zinc-500/20" },
};

export function TechnicalSignalSection({ data }: TechnicalSignalProps) {
  const trendConfig = TREND_CONFIG[data.trend];
  const momentumConfig = MOMENTUM_CONFIG[data.momentum];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-base font-semibold text-white">Technical Signal</h2>
        <span className="text-xs text-zinc-500 italic">Supporting context — reasoning is our differentiator</span>
      </div>

      {/* Compact badge strip */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${trendConfig.color} ${trendConfig.bg}`}>
          <GlossaryTooltip term="Moving Average">
            {trendConfig.icon} {data.trend}
          </GlossaryTooltip>
        </span>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${momentumConfig.color} ${momentumConfig.bg}`}>
          <GlossaryTooltip term="RSI">
            RSI {data.rsi} — {data.momentum}
          </GlossaryTooltip>
        </span>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-semibold ${data.goldenCross ? "text-emerald-400 bg-zinc-900/50 border-zinc-800" : "text-zinc-400 bg-zinc-900/50 border-zinc-800"}`}>
          <GlossaryTooltip term={data.goldenCross ? "Golden Cross" : "Death Cross"}>
            {data.goldenCross ? "✦ Golden Cross" : "✦ Death Cross"}
          </GlossaryTooltip>
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="bg-black rounded-lg p-2.5">
          <div className="text-xs text-zinc-500 mb-0.5">
            <GlossaryTooltip term="Moving Average">50-day MA</GlossaryTooltip>
          </div>
          <div className="font-sans text-sm text-zinc-100">{data.sma50.toFixed(2)}</div>
        </div>
        <div className="bg-black rounded-lg p-2.5">
          <div className="text-xs text-zinc-500 mb-0.5">
            <GlossaryTooltip term="Moving Average">200-day MA</GlossaryTooltip>
          </div>
          <div className="font-sans text-sm text-zinc-100">{data.sma200.toFixed(2)}</div>
        </div>
        <div className="bg-black rounded-lg p-2.5">
          <div className="text-xs text-zinc-500 mb-0.5">
            <GlossaryTooltip term="Support Level">Support</GlossaryTooltip>
          </div>
          <div className="font-sans text-sm text-emerald-400">{data.supportLevel.toFixed(2)}</div>
        </div>
        <div className="bg-black rounded-lg p-2.5">
          <div className="text-xs text-zinc-500 mb-0.5">
            <GlossaryTooltip term="Resistance Level">Resistance</GlossaryTooltip>
          </div>
          <div className="font-sans text-sm text-zinc-400">{data.resistanceLevel.toFixed(2)}</div>
        </div>
      </div>

      <p className="text-sm text-zinc-400 leading-relaxed">{data.summary}</p>
    </div>
  );
}
