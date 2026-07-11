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
    color: "text-slate-400",
    bg: "bg-transparent",
    dot: "bg-slate-600",
    icon: "–",
  },
};

export function FinancialHealthSection({ data }: FinancialHealthProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-navy-800 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-slate-100">Financial Health</h2>
        <p className="text-sm text-slate-500 mt-0.5">Numbers with plain-language interpretation</p>
      </div>

      {/* Summary */}
      <div className="px-6 py-4 bg-navy-850 border-b border-slate-800">
        <p className="text-sm text-slate-300 leading-relaxed">{data.summary}</p>
      </div>

      {/* Metrics table */}
      <div className="divide-y divide-slate-800/50">
        {data.metrics.map((metric, i) => {
          const config = VERDICT_CONFIG[metric.verdictType];
          return (
            <div key={i} className={`flex items-start gap-4 px-6 py-4 ${config.bg} transition-colors hover:bg-navy-750`}>
              {/* Indicator dot */}
              <div className="flex-shrink-0 mt-1.5">
                <div className={`w-2 h-2 rounded-full ${config.dot}`} />
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-sm font-medium text-slate-300">
                    {metric.glossaryTerm ? (
                      <GlossaryTooltip term={metric.glossaryTerm}>{metric.label}</GlossaryTooltip>
                    ) : metric.label}
                  </span>
                  <span className="font-mono text-sm font-semibold text-slate-100 flex-shrink-0">
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
