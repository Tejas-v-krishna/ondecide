import { z } from "zod";

// ─── Primitive reusable schemas ──────────────────────────────

export const AssetTypeSchema = z.enum(["stock", "crypto"]);
export const RecommendationSchema = z.enum(["Invest", "Hold", "Avoid"]);

// ─── Section A: Company Snapshot ────────────────────────────

export const CompanySnapshotSchema = z.object({
  ticker: z.string(),
  name: z.string(),
  sector: z.string(),
  exchange: z.string(),
  currentPrice: z.number(),
  dayChange: z.number(),
  dayChangePercent: z.number(),
  marketCap: z.number(),
  currency: z.string(),
  logo: z.string().optional(),
  website: z.string().optional(),
  description: z.string(), // AI plain-language rewrite
  assetType: AssetTypeSchema,
});

// ─── Section B: Live Market Data ────────────────────────────

export const CandleDataPointSchema = z.object({
  time: z.number(),
  open: z.number(),
  high: z.number(),
  low: z.number(),
  close: z.number(),
  volume: z.number(),
});

export const KeyStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  plainMeaning: z.string(),
  glossaryTerm: z.string().optional(),
});

export const LiveMarketDataSchema = z.object({
  candles: z.array(CandleDataPointSchema),
  keyStats: z.array(KeyStatSchema),
});

// ─── Scorecard ───────────────────────────────────────────────

export const ScorecardAxisSchema = z.object({
  label: z.enum(["Valuation", "Profitability", "Growth", "Red Flags"]),
  score: z.number().min(1).max(10),
  verdict: z.string(),
  isWarning: z.boolean().optional(),
});

export const ScorecardSchema = z.object({
  axes: z.array(ScorecardAxisSchema).length(4),
  overallScore: z.number().min(1).max(10),
});

// ─── Technical Signal ────────────────────────────────────────

export const TechnicalSignalSchema = z.object({
  trend: z.enum(["Uptrend", "Downtrend", "Sideways"]),
  momentum: z.enum(["Overbought", "Oversold", "Neutral"]),
  rsi: z.number(),
  sma50: z.number(),
  sma200: z.number(),
  currentPrice: z.number(),
  goldenCross: z.boolean(),
  supportLevel: z.number(),
  resistanceLevel: z.number(),
  summary: z.string(),
});

// ─── Section C: News Analysis ────────────────────────────────

export const NewsItemSchema = z.object({
  headline: z.string(),
  source: z.string(),
  url: z.string(),
  publishedDate: z.string(),
  plainSummary: z.string(),
  whyItMatters: z.string(),
  isEarningsRelated: z.boolean(),
  sentiment: z.enum(["positive", "negative", "neutral"]),
});

export const NewsAnalysisSchema = z.object({
  items: z.array(NewsItemSchema),
  overallSentiment: z.enum(["positive", "negative", "neutral"]),
  sentimentSummary: z.string(),
});

// ─── Section D: Financial Health ────────────────────────────

export const FinancialMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
  rawValue: z.number().optional(),
  verdict: z.string(),
  verdictType: z.enum(["positive", "negative", "neutral", "warning"]),
  glossaryTerm: z.string().optional(),
});

export const FinancialHealthSchema = z.object({
  metrics: z.array(FinancialMetricSchema),
  summary: z.string(),
});

// ─── Segment Breakdown (optional) ───────────────────────────

export const SegmentDataSchema = z.object({
  segment: z.string(),
  percentage: z.number(),
  amount: z.number().optional(),
});

export const SegmentBreakdownSchema = z.object({
  segments: z.array(SegmentDataSchema),
  currency: z.string(),
  period: z.string(),
});

// ─── Section E: Qualitative Read ────────────────────────────

export const AnalystSentimentSchema = z.object({
  buy: z.number(),
  hold: z.number(),
  sell: z.number(),
  strongBuy: z.number(),
  strongSell: z.number(),
  priceTargetMean: z.number().optional(),
  priceTargetHigh: z.number().optional(),
  priceTargetLow: z.number().optional(),
  synthesizedSummary: z.string(),
});

export const QualitativeReadSchema = z.object({
  managementAssessment: z.string(),
  competitivePositioning: z.string(),
  moatStrength: z.enum(["Strong", "Moderate", "Weak", "None"]),
  analystSentiment: AnalystSentimentSchema,
  longTermInvestorLens: z.string(),
});

// ─── Section F: Historical Pattern ───────────────────────────

export const HistoricalPatternSchema = z.object({
  scenario: z.string(),
  year: z.string(),
  outcome: z.string(),
  parallels: z.string(),
  caveat: z.string(),
  confidence: z.enum(["High", "Medium", "Low"]),
});

// ─── Section G: Decision ─────────────────────────────────────

export const ConfidenceBreakdownSchema = z.object({
  financials: z.number().min(0).max(100),
  newsSentiment: z.number().min(0).max(100),
  historicalPattern: z.number().min(0).max(100),
  qualitative: z.number().min(0).max(100),
});

export const DecisionSchema = z.object({
  recommendation: RecommendationSchema,
  confidenceBreakdown: ConfidenceBreakdownSchema,
  reasoning: z.string(),
  keyRisks: z.array(z.string()),
  keyTailwinds: z.array(z.string()),
  disclaimer: z.string(),
});

// ─── Full Research Report Schema ─────────────────────────────

export const ResearchReportSchema = z.object({
  ticker: z.string(),
  assetType: AssetTypeSchema,
  generatedAt: z.string(),
  companySnapshot: CompanySnapshotSchema,
  liveMarketData: LiveMarketDataSchema,
  scorecard: ScorecardSchema,
  technicalSignal: TechnicalSignalSchema,
  newsAnalysis: NewsAnalysisSchema,
  financialHealth: FinancialHealthSchema,
  segmentBreakdown: SegmentBreakdownSchema.optional(),
  qualitativeRead: QualitativeReadSchema,
  historicalPattern: HistoricalPatternSchema,
  decision: DecisionSchema,
});

export type ResearchReportZod = z.infer<typeof ResearchReportSchema>;

// ─── Agent pipeline input schema ─────────────────────────────

export const ResearchInputSchema = z.object({
  query: z.string().min(1).max(20),
});

export type ResearchInput = z.infer<typeof ResearchInputSchema>;
