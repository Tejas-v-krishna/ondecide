// ============================================================
// OnDecide — TypeScript type definitions
// ============================================================

export type AssetType = "stock" | "crypto";

export type Recommendation = "Invest" | "Hold" | "Avoid";

// ─── Finnhub raw types ─────────────────────────────────────

export interface FinnhubQuote {
  c: number;   // current price
  d: number;   // change
  dp: number;  // percent change
  h: number;   // high
  l: number;   // low
  o: number;   // open
  pc: number;  // previous close
  t: number;   // timestamp
}

export interface FinnhubProfile {
  country: string;
  currency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string;
  logo: string;
  marketCapitalization: number;
  name: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
}

export interface FinnhubCandle {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  v: number[];
  s: "ok" | "no_data";
}

export interface FinnhubMetrics {
  metric: {
    "52WeekHigh"?: number;
    "52WeekLow"?: number;
    "52WeekHighDate"?: string;
    "52WeekLowDate"?: string;
    peAnnual?: number;
    peTTM?: number;
    pbAnnual?: number;
    psTTM?: number;
    grossMarginTTM?: number;
    netMarginTTM?: number;
    operatingMarginTTM?: number;
    roeTTM?: number;
    roaTTM?: number;
    revenueGrowthTTM?: number;
    revenueGrowth3Y?: number;
    revenueGrowth5Y?: number;
    epsGrowthTTM?: number;
    totalDebtToTotalEquity?: number;
    currentRatio?: number;
    dividendYieldAnnual?: number;
    beta?: number;
    "10DayAverageTradingVolume"?: number;
    "3MonthAverageTradingVolume"?: number;
    marketCapitalization?: number;
    [key: string]: number | string | undefined;
  };
}

export interface FinnhubRecommendation {
  buy: number;
  hold: number;
  period: string;
  sell: number;
  strongBuy: number;
  strongSell: number;
  symbol: string;
}

export interface FinnhubPriceTarget {
  lastUpdated: string;
  symbol: string;
  targetHigh: number;
  targetLow: number;
  targetMean: number;
  targetMedian: number;
}

export interface FinnhubEarnings {
  actual: number;
  estimate: number;
  period: string;
  quarter: number;
  surprise: number;
  surprisePercent: number;
  symbol: string;
  year: number;
}

export interface FinnhubNews {
  category: string;
  datetime: number;
  headline: string;
  id: number;
  image: string;
  related: string;
  source: string;
  summary: string;
  url: string;
}

// ─── Tavily types ───────────────────────────────────────────

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
  publishedDate?: string;
}

export interface TavilySearchResponse {
  query: string;
  answer?: string;
  results: TavilyResult[];
}

// ─── Report section types ───────────────────────────────────

export interface CompanySnapshot {
  ticker: string;
  name: string;
  sector: string;
  exchange: string;
  currentPrice: number;
  dayChange: number;
  dayChangePercent: number;
  marketCap: number;
  currency: string;
  logo?: string;
  website?: string;
  description: string; // AI plain-language rewrite
  assetType: AssetType;
}

export interface CandleDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface KeyStat {
  label: string;
  value: string;
  plainMeaning: string; // one-line plain-language explanation
  glossaryTerm?: string;
}

export interface LiveMarketData {
  candles: CandleDataPoint[];
  keyStats: KeyStat[];
}

export interface ScorecardAxis {
  label: "Valuation" | "Profitability" | "Growth" | "Red Flags";
  score: number; // 1–10
  verdict: string; // plain language verdict
  isWarning?: boolean;
}

export interface Scorecard {
  axes: ScorecardAxis[];
  overallScore: number;
}

export interface TechnicalSignal {
  trend: "Uptrend" | "Downtrend" | "Sideways";
  momentum: "Overbought" | "Oversold" | "Neutral";
  rsi: number;
  sma50: number;
  sma200: number;
  currentPrice: number;
  goldenCross: boolean; // SMA50 > SMA200
  supportLevel: number;
  resistanceLevel: number;
  summary: string;
}

export interface NewsItem {
  headline: string;
  source: string;
  url: string;
  publishedDate: string;
  plainSummary: string;
  whyItMatters: string;
  isEarningsRelated: boolean;
  sentiment: "positive" | "negative" | "neutral";
}

export interface NewsAnalysis {
  items: NewsItem[];
  overallSentiment: "positive" | "negative" | "neutral";
  sentimentSummary: string;
}

export interface FinancialMetric {
  label: string;
  value: string;
  rawValue?: number;
  verdict: string; // e.g. "Revenue is growing steadily"
  verdictType: "positive" | "negative" | "neutral" | "warning";
  glossaryTerm?: string;
}

export interface FinancialHealth {
  metrics: FinancialMetric[];
  summary: string;
}

export interface SegmentData {
  segment: string;
  percentage: number;
  amount?: number;
}

export interface SegmentBreakdown {
  segments: SegmentData[];
  currency: string;
  period: string;
}

export interface AnalystSentiment {
  buy: number;
  hold: number;
  sell: number;
  strongBuy: number;
  strongSell: number;
  priceTargetMean?: number;
  priceTargetHigh?: number;
  priceTargetLow?: number;
  synthesizedSummary: string; // AI-synthesized, clearly labeled
}

export interface QualitativeRead {
  managementAssessment: string;
  competitivePositioning: string;
  moatStrength: "Strong" | "Moderate" | "Weak" | "None";
  analystSentiment: AnalystSentiment;
  longTermInvestorLens: string;
}

export interface HistoricalPattern {
  scenario: string;
  year: string;
  outcome: string;
  parallels: string;
  caveat: string;
  confidence: "High" | "Medium" | "Low";
}

export interface ConfidenceBreakdown {
  financials: number;      // 0–100 percentage weight
  newsSentiment: number;
  historicalPattern: number;
  qualitative: number;
}

export interface Decision {
  recommendation: Recommendation;
  confidenceBreakdown: ConfidenceBreakdown;
  reasoning: string;
  keyRisks: string[];
  keyTailwinds: string[];
  disclaimer: string;
}

// ─── Full Research Report ───────────────────────────────────

export interface ResearchReport {
  ticker: string;
  assetType: AssetType;
  generatedAt: string;
  companySnapshot: CompanySnapshot;
  liveMarketData: LiveMarketData;
  scorecard: Scorecard;
  technicalSignal: TechnicalSignal;
  newsAnalysis: NewsAnalysis;
  financialHealth: FinancialHealth;
  segmentBreakdown?: SegmentBreakdown;
  qualitativeRead: QualitativeRead;
  historicalPattern: HistoricalPattern;
  decision: Decision;
}

// ─── Agent pipeline types ───────────────────────────────────

export type AgentNodeName =
  | "resolve"
  | "financials"
  | "news"
  | "qualitative"
  | "historicalPattern"
  | "synthesis"
  | "decision";

export interface AgentStatusEvent {
  node: AgentNodeName;
  status: "started" | "completed" | "error";
  message: string;
  timestamp: string;
}

export interface SSEEvent {
  type: "status" | "complete" | "error";
  data: AgentStatusEvent | ResearchReport | { message: string };
}

// ─── Watchlist types ────────────────────────────────────────

export interface WatchlistItem {
  id: string;
  ticker: string;
  assetType: AssetType;
  companyName?: string;
  sector?: string;
  currentPrice?: number;
  reportData?: ResearchReport;
  createdAt: string;
  updatedAt: string;
}

// ─── Glossary types ─────────────────────────────────────────

export interface GlossaryEntry {
  term: string;
  definition: string;
  example?: string;
}
