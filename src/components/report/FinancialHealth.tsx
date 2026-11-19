import type { FinancialHealth } from "@/types";
import { GlossaryTooltip } from "@/components/ui/GlossaryTooltip";

interface FinancialHealthProps {
  data: FinancialHealth;
}

const VERDICT_CONFIG = {
  positive: {
    color: "text-brand-700",
    bg: "bg-brand-50/60",
    dot: "bg-brand-500",
    icon: "↑",
  },
  negative: {
    color: "text-avoid",
    bg: "bg-avoid/5",
    dot: "bg-avoid",
    icon: "↓",
  },
  warning: {
    color: "text-hold",
    bg: "bg-hold/5",
    dot: "bg-hold",
    icon: "⚠",
  },
  neutral: {
    color: "text-ink-500",
    bg: "bg-transparent",
    dot: "bg-ink-300",
    icon: "–",
  },
};

export function FinancialHealthSection({ data }: FinancialHealthProps) {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="mb-4 border-b border-line pb-4">
        <h2 className="text-lg font-medium text-ink">Financial Health</h2>
        <p className="mt-0.5 text-sm text-ink-500">Numbers with plain-language interpretation</p>
      </div>

      {/* Summary */}
      <div className="mb-4 rounded-xl border border-line bg-surface-subtle p-4">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-600">{data.summary}</p>
      </div>

      {/* Metrics table */}
      <div className="divide-y divide-line">
        {data.metrics.map((metric, i) => {
          const config = VERDICT_CONFIG[metric.verdictType];
          return (
            <div
              key={i}
              className={`flex items-start gap-4 px-6 py-4 ${config.bg} transition-colors hover:bg-surface-subtle`}
            >
              {/* Indicator dot */}
              <div className="mt-1.5 flex-shrink-0">
                <div className={`h-2 w-2 rounded-full ${config.dot}`} />
              </div>

              {/* Label */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="text-sm font-medium text-ink-600">
                    {metric.glossaryTerm ? (
                      <GlossaryTooltip term={metric.glossaryTerm}>{metric.label}</GlossaryTooltip>
                    ) : (
                      metric.label
                    )}
                  </span>
                  <span className="flex-shrink-0 font-mono text-sm font-semibold text-ink">
                    {metric.value}
                  </span>
                </div>
                <p className={`mt-1 text-sm ${config.color}`}>
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
