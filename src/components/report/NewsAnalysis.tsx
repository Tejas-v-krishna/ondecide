import type { NewsAnalysis } from "@/types";

interface NewsAnalysisProps {
  data: NewsAnalysis;
}

const SENTIMENT_CONFIG = {
  positive: { label: "Positive", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  negative: { label: "Negative", color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20" },
  neutral: { label: "Neutral", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
};

export function NewsAnalysisSection({ data }: NewsAnalysisProps) {
  const overallConfig = SENTIMENT_CONFIG[data.overallSentiment];

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-800/60 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-lg font-semibold text-white">Recent News & Why It Matters</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Via Tavily · Last 7 days</p>
        </div>
        <span className={`px-3 py-1 rounded-full border text-sm font-medium ${overallConfig.color} ${overallConfig.bg}`}>
          {overallConfig.label} Sentiment
        </span>
      </div>

      {/* Sentiment summary */}
      <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800/60">
        <p className="text-sm text-zinc-300 leading-relaxed">{data.sentimentSummary}</p>
      </div>

      {/* News items */}
      <div className="divide-y divide-zinc-800">
        {data.items.length === 0 ? (
          <div className="px-6 py-8 text-center text-zinc-500">No significant news found for this period.</div>
        ) : (
          data.items.map((item, i) => {
            const sentConfig = SENTIMENT_CONFIG[item.sentiment];
            return (
              <div key={i} className="px-6 py-5 hover:bg-zinc-900 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Headline + badges */}
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      {item.isEarningsRelated && (
                        <span className="flex-shrink-0 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full font-medium">
                          📊 Earnings
                        </span>
                      )}
                      <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border ${sentConfig.color} ${sentConfig.bg}`}>
                        {sentConfig.label}
                      </span>
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-white hover:text-emerald-400 transition-colors leading-snug block mb-2"
                    >
                      {item.headline}
                    </a>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">{item.plainSummary}</p>
                    {/* Why it matters */}
                    <div className="flex items-start gap-2 bg-black rounded-lg px-3 py-2">
                      <span className="text-emerald-500 text-xs font-semibold flex-shrink-0 mt-0.5">WHY IT MATTERS</span>
                      <p className="text-sm text-zinc-300">{item.whyItMatters}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs text-zinc-600">{item.source}</span>
                  <span className="text-zinc-700">·</span>
                  <span className="text-xs text-zinc-600">{item.publishedDate}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
