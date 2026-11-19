import type { NewsAnalysis } from "@/types";

interface NewsAnalysisProps {
  data: NewsAnalysis;
}

const SENTIMENT_CONFIG = {
  positive: { label: "Positive", color: "text-brand-700", bg: "bg-brand-50 border-brand-200" },
  negative: { label: "Negative", color: "text-avoid", bg: "bg-avoid/10 border-avoid/20" },
  neutral: { label: "Neutral", color: "text-ink-600", bg: "bg-surface-subtle border-line" },
};

export function NewsAnalysisSection({ data }: NewsAnalysisProps) {
  const overallConfig = SENTIMENT_CONFIG[data.overallSentiment];

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="mb-4 flex items-center justify-between border-b border-line pb-4">
        <div>
          <h2 className="text-lg font-medium text-ink">Recent News &amp; Why It Matters</h2>
          <p className="mt-0.5 text-sm text-ink-500">Via Tavily · Last 7 days</p>
        </div>
        <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${overallConfig.color} ${overallConfig.bg}`}>
          {overallConfig.label} Sentiment
        </span>
      </div>

      {/* Sentiment summary */}
      <div className="mb-4 rounded-xl border border-line bg-surface-subtle p-4">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink-600">{data.sentimentSummary}</p>
      </div>

      {/* News items */}
      <div className="divide-y divide-line">
        {data.items.length === 0 ? (
          <div className="py-8 text-center text-ink-500">No significant news found for this period.</div>
        ) : (
          data.items.map((item, i) => {
            const sentConfig = SENTIMENT_CONFIG[item.sentiment];
            return (
              <div key={i} className="py-5 transition-colors hover:bg-surface-subtle/60">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    {/* Headline + badges */}
                    <div className="mb-2 flex flex-wrap items-start gap-2">
                      {item.isEarningsRelated && (
                        <span className="flex-shrink-0 rounded-full border border-line bg-surface-subtle px-2 py-0.5 text-xs font-medium text-ink-500">
                          📊 Earnings
                        </span>
                      )}
                      <span className={`flex-shrink-0 rounded-full border px-2 py-0.5 text-xs ${sentConfig.color} ${sentConfig.bg}`}>
                        {sentConfig.label}
                      </span>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-2 block text-base font-medium leading-snug text-ink transition-colors hover:text-brand-700"
                    >
                      {item.headline}
                    </a>
                    <p className="mb-3 text-sm leading-relaxed text-ink-500">{item.plainSummary}</p>
                    {/* Why it matters */}
                    <div className="flex items-start gap-2 rounded-xl bg-surface-subtle px-3 py-2">
                      <span className="mt-0.5 flex-shrink-0 text-xs font-semibold text-brand-700">WHY IT MATTERS</span>
                      <p className="text-sm text-ink-600">{item.whyItMatters}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-xs text-ink-400">{item.source}</span>
                  <span className="text-ink-300">·</span>
                  <span className="text-xs text-ink-400">{item.publishedDate}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
