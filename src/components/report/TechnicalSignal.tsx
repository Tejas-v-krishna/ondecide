import type { TechnicalSignal } from "@/types";
import { GlossaryTooltip } from "@/components/ui/GlossaryTooltip";

interface TechnicalSignalProps {
  data: TechnicalSignal;
}

const TREND_CONFIG = {
  Uptrend: { color: "text-brand-700", bg: "bg-brand-50 border-brand-200", icon: "↗" },
  Downtrend: { color: "text-avoid", bg: "bg-avoid/10 border-avoid/20", icon: "↘" },
  Sideways: { color: "text-ink-600", bg: "bg-surface-subtle border-line", icon: "→" },
};

const MOMENTUM_CONFIG = {
  Overbought: { color: "text-hold", bg: "bg-hold/10 border-hold/20" },
  Oversold: { color: "text-brand-700", bg: "bg-brand-50 border-brand-200" },
  Neutral: { color: "text-ink-600", bg: "bg-surface-subtle border-line" },
};

export function TechnicalSignalSection({ data }: TechnicalSignalProps) {
  const trendConfig = TREND_CONFIG[data.trend];
  const momentumConfig = MOMENTUM_CONFIG[data.momentum];

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-medium text-ink">Technical Signal</h2>
        <span className="text-xs italic text-ink-400">Supporting context — reasoning is our differentiator</span>
      </div>

      {/* Compact badge strip */}
      <div className="mb-4 flex flex-wrap gap-2">
        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${trendConfig.color} ${trendConfig.bg}`}>
          <GlossaryTooltip term="Moving Average">
            {trendConfig.icon} {data.trend}
          </GlossaryTooltip>
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${momentumConfig.color} ${momentumConfig.bg}`}>
          <GlossaryTooltip term="RSI">
            RSI {data.rsi} — {data.momentum}
          </GlossaryTooltip>
        </span>
        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${data.goldenCross ? "border-brand-200 bg-brand-50 text-brand-700" : "border-avoid/20 bg-avoid/10 text-avoid"}`}>
          <GlossaryTooltip term={data.goldenCross ? "Golden Cross" : "Death Cross"}>
            {data.goldenCross ? "✦ Golden Cross" : "✦ Death Cross"}
          </GlossaryTooltip>
        </span>
      </div>

      {/* Stats grid */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-surface-subtle p-2.5">
          <div className="mb-0.5 text-xs text-ink-400">
            <GlossaryTooltip term="Moving Average">50-day MA</GlossaryTooltip>
          </div>
          <div className="font-mono text-sm text-ink-600">{data.sma50.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-surface-subtle p-2.5">
          <div className="mb-0.5 text-xs text-ink-400">
            <GlossaryTooltip term="Moving Average">200-day MA</GlossaryTooltip>
          </div>
          <div className="font-mono text-sm text-ink-600">{data.sma200.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-surface-subtle p-2.5">
          <div className="mb-0.5 text-xs text-ink-400">
            <GlossaryTooltip term="Support Level">Support</GlossaryTooltip>
          </div>
          <div className="font-mono text-sm text-brand-700">{data.supportLevel.toFixed(2)}</div>
        </div>
        <div className="rounded-lg bg-surface-subtle p-2.5">
          <div className="mb-0.5 text-xs text-ink-400">
            <GlossaryTooltip term="Resistance Level">Resistance</GlossaryTooltip>
          </div>
          <div className="font-mono text-sm text-ink-600">{data.resistanceLevel.toFixed(2)}</div>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink-500">{data.summary}</p>
    </div>
  );
}
