import type { FinancialHealth } from "@/types";
import { GlossaryTooltip } from "@/components/ui/GlossaryTooltip";

interface FinancialHealthProps {
  data: FinancialHealth;
}

const VERDICT_CONFIG = {
  positive: {
    color: "text-emerald-400",
    bg: "bg-emerald-400/5",
    dot: "bg-emerald-400",
    icon: "↑",
  },
  negative: {
    color: "text-rose-400",
    bg: "bg-rose-400/5",
    dot: "bg-rose-400",
    icon: "↓",
  },
  warning: {
    color: "text-amber-400",
    bg: "bg-amber-400/5",
    dot: "bg-amber-400",
    icon: "⚠",
  },
  neutral: {
    color: "text-zinc-400",
    bg: "bg-transparent",
    dot: "bg-zinc-700",
    icon: "–",
  },
};

export function FinancialHealthSection({ data }: FinancialHealthProps) {
  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-800/60">
        <h2 className="font-serif text-lg font-semibold text-white">Financial Health</h2>
        <p className="text-sm text-zinc-500 mt-0.5">Numbers with plain-language interpretation</p>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800/60">
        <p className="text-sm text-zinc-300 leading-relaxed">{data.summary}</p>
      </div>

      {/* Metrics table */}
      <div className="divide-y divide-zinc-800/60">
        {data.metrics.map((metric, i) => {
          const config = VERDICT_CONFIG[metric.verdictType];
          return (
            <div key={i} className={`flex items-start gap-4 px-6 py-4 ${config.bg} transition-colors hover:bg-zinc-900`}>
              {/* Indicator dot */}
              <div className="flex-shrink-0 mt-1.5">
                <div className={`w-2 h-2 rounded-full ${config.dot}`} />
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-sm font-medium text-zinc-300">
                    {metric.glossaryTerm ? (
                      <GlossaryTooltip term={metric.glossaryTerm}>{metric.label}</GlossaryTooltip>
                    ) : metric.label}
                  </span>
                  <span className="font-sans text-sm font-semibold text-white flex-shrink-0">
                    {metric.value}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${config.color}`}>
                  {config.icon} {metric.verdict}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
