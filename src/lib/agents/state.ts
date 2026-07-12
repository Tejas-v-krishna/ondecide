import { Annotation } from "@langchain/langgraph";
import { AssetType } from "@/types";
import type {
  FinnhubProfile,
  FinnhubQuote,
  FinnhubCandle,
  FinnhubMetrics,
  FinnhubRecommendation,
  FinnhubPriceTarget,
  FinnhubEarnings,
  TavilySearchResponse,
  ResearchReport,
  PeerMetrics,
} from "@/types";

// LangGraph state definition — carries all data through the pipeline
export const ResearchState = Annotation.Root({
  // Input
  query: Annotation<string>,

  // After resolve
  ticker: Annotation<string>,
  assetType: Annotation<AssetType>,
  companyName: Annotation<string>,

  // After financials (parallel)
  profile: Annotation<FinnhubProfile | null>,
  quote: Annotation<FinnhubQuote | null>,
  candles: Annotation<FinnhubCandle | null>,
  metrics: Annotation<FinnhubMetrics | null>,
  recommendations: Annotation<FinnhubRecommendation[]>,
  priceTarget: Annotation<FinnhubPriceTarget | null>,
  earnings: Annotation<FinnhubEarnings[]>,
  peers: Annotation<string[]>,
  peerMetrics: Annotation<PeerMetrics[]>,
  insiderSentimentData: Annotation<{ data: Array<{ mspr: number; change: number; }> } | null>,
  etfProfile: Annotation<TavilySearchResponse | null>,

  // After news (parallel)
  newsResults: Annotation<TavilySearchResponse | null>,
  analystCommentaryResults: Annotation<TavilySearchResponse | null>,
  earningsCallResults: Annotation<TavilySearchResponse | null>,

  // After qualitative
  qualitativeAnalysis: Annotation<string>,

  // After historical pattern
  historicalPatternAnalysis: Annotation<string>,

  // Final report
  report: Annotation<ResearchReport | null>,

  // Error tracking
  error: Annotation<string | null>,
});

export type ResearchStateType = typeof ResearchState.State;
