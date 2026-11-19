import { InsiderSentiment } from "@/types";
import { Info, TrendingUp, TrendingDown, Minus } from "lucide-react";

export function InsiderSentimentSection({ data }: { data: InsiderSentiment }) {
  if (!data || data.trend === "No Data") {
    return (
      <div className="relative flex flex-col overflow-hidden">
        <div className="mb-4 flex items-center justify-between opacity-50">
          <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
            &quot;Smart Money&quot; Insider Tracker
          </h3>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-sm">
          <div className="rounded-full border border-line bg-surface-subtle px-4 py-2 text-sm font-medium text-brand-700">
            Coming Soon
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-medium text-ink">
          &quot;Smart Money&quot; Insider Tracker
          <div className="group relative">
            <Info className="h-4 w-4 cursor-help text-ink-400" />
            <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-xl border border-line bg-surface p-2 text-xs text-ink-600 opacity-0 shadow-xl transition-opacity group-hover:opacity-100">
              Tracks whether corporate executives are buying or selling their own stock.
            </div>
          </div>
        </h3>

        <div
          className={`flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-semibold
          ${data.trend === "Buying" ? "border-brand-200 bg-brand-50 text-brand-700" : ""}
          ${data.trend === "Selling" ? "border-avoid/20 bg-avoid/10 text-avoid" : ""}
          ${data.trend === "Neutral" ? "border-line bg-surface-subtle text-ink-600" : ""}
        `}
        >
          {data.trend === "Buying" && <TrendingUp className="h-4 w-4" />}
          {data.trend === "Selling" && <TrendingDown className="h-4 w-4" />}
          {data.trend === "Neutral" && <Minus className="h-4 w-4" />}
          Net {data.trend}
        </div>
      </div>

      <p className="text-sm leading-relaxed text-ink-600">{data.summary}</p>
    </div>
  );
}
