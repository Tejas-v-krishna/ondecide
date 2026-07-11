import { ResearchStateType } from "../state";
import { geminiModel } from "@/lib/gemini";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import {
  computeRSI,
  computeSMA,
  findSupportResistance,
} from "@/lib/finnhub";
import type {
  ResearchReport,
  CompanySnapshot,
  Scorecard,
  TechnicalSignal,
  NewsAnalysis,
  FinancialHealth,
  CandleDataPoint,
} from "@/types";

// ─── Parse qualitative analysis text ───────────────────────

function parseQualitative(text: string) {
  const extract = (key: string): string => {
    const pattern = new RegExp(`${key}:\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, "i");
    const match = text.match(pattern);
    return match ? match[1].trim() : "";
  };

  return {
    managementAssessment: extract("MANAGEMENT_ASSESSMENT"),
    competitivePositioning: extract("COMPETITIVE_POSITIONING"),
    moatStrength: (extract("MOAT_STRENGTH") as "Strong" | "Moderate" | "Weak" | "None") || "Moderate",
    analystSentimentSummary: extract("ANALYST_SENTIMENT_SUMMARY"),
    longTermInvestorLens: extract("LONG_TERM_INVESTOR_LENS"),
  };
}

function parseHistoricalPattern(text: string) {
  const extract = (key: string): string => {
    const pattern = new RegExp(`${key}:\\s*([\\s\\S]*?)(?=\\n[A-Z_]+:|$)`, "i");
    const match = text.match(pattern);
    return match ? match[1].trim() : "";
  };

  return {
    scenario: extract("HISTORICAL_SCENARIO"),
    year: extract("YEAR"),
    outcome: extract("HISTORICAL_OUTCOME"),
    parallels: extract("CURRENT_PARALLELS"),
    caveat: extract("CAVEAT"),
    confidence: (extract("CONFIDENCE") as "High" | "Medium" | "Low") || "Medium",
  };
}

// ─── Compute scorecard from metrics ────────────────────────

function computeScorecard(metrics: NonNullable<ResearchStateType["metrics"]>): Scorecard {
  const m = metrics.metric;

  // Valuation score (1=very expensive, 10=very cheap/fair)
  const pe = m.peTTM || 0;
  let valuationScore = 5;
  if (pe > 0) {
    if (pe < 15) valuationScore = 8;
    else if (pe < 25) valuationScore = 6;
    else if (pe < 40) valuationScore = 4;
    else valuationScore = 2;
  }

  // Profitability score
  const netMargin = m.netMarginTTM || 0;
  const roe = m.roeTTM || 0;
  let profitabilityScore = 5;
  if (netMargin > 20 && roe > 20) profitabilityScore = 9;
  else if (netMargin > 10 && roe > 15) profitabilityScore = 7;
  else if (netMargin > 5 && roe > 10) profitabilityScore = 6;
  else if (netMargin > 0) profitabilityScore = 4;
  else profitabilityScore = 2;

  // Growth score
  const revGrowth = m.revenueGrowthTTM || 0;
  const epsGrowth = m.epsGrowthTTM || 0;
  let growthScore = 5;
  if (revGrowth > 20 && epsGrowth > 20) growthScore = 9;
  else if (revGrowth > 10) growthScore = 7;
  else if (revGrowth > 5) growthScore = 6;
  else if (revGrowth > 0) growthScore = 4;
  else growthScore = 2;

  // Red flags score (10 = no red flags, 1 = major red flags)
  const debtEquity = m.totalDebtToTotalEquity || 0;
  const currentRatio = m.currentRatio || 1;
  let redFlagsScore = 7;
  if (debtEquity > 3 || currentRatio < 0.8) redFlagsScore = 2;
  else if (debtEquity > 2 || currentRatio < 1) redFlagsScore = 4;
  else if (debtEquity > 1) redFlagsScore = 6;
  else redFlagsScore = 9;

  const overallScore = Math.round(
    (valuationScore + profitabilityScore + growthScore + redFlagsScore) / 4
  );

  return {
    axes: [
      {
        label: "Valuation",
        score: valuationScore,
        verdict:
          valuationScore >= 7
            ? "Fairly valued or attractive"
            : valuationScore >= 5
            ? "Moderately priced"
            : "Expensive relative to earnings",
      },
      {
        label: "Profitability",
        score: profitabilityScore,
        verdict:
          profitabilityScore >= 7
            ? "Strong margins and returns"
            : profitabilityScore >= 5
            ? "Adequate profitability"
            : "Weak margins — needs improvement",
        isWarning: profitabilityScore < 4,
      },
      {
        label: "Growth",
        score: growthScore,
        verdict:
          growthScore >= 7
            ? "Strong revenue and earnings growth"
            : growthScore >= 5
            ? "Moderate growth trajectory"
            : "Growth is slowing or negative",
        isWarning: growthScore < 4,
      },
      {
        label: "Red Flags",
        score: redFlagsScore,
        verdict:
          redFlagsScore >= 7
            ? "Balance sheet looks healthy"
            : redFlagsScore >= 5
            ? "Some leverage worth monitoring"
            : "High debt levels — significant risk",
        isWarning: redFlagsScore < 4,
      },
    ],
    overallScore,
  };
}

// ─── Compute technical signals ──────────────────────────────

function computeTechnicalSignal(
  candles: NonNullable<ResearchStateType["candles"]>,
  currentPrice: number
): TechnicalSignal {
  const closes = candles.c;
  const highs = candles.h;
  const lows = candles.l;

  const rsi = computeRSI(closes);
  const sma50 = computeSMA(closes, 50);
  const sma200 = computeSMA(closes, 200);
  const { support, resistance } = findSupportResistance(highs, lows);

  const trend: TechnicalSignal["trend"] =
    currentPrice > sma50 && sma50 > sma200
      ? "Uptrend"
      : currentPrice < sma50 && sma50 < sma200
      ? "Downtrend"
      : "Sideways";

  const momentum: TechnicalSignal["momentum"] =
    rsi > 70 ? "Overbought" : rsi < 30 ? "Oversold" : "Neutral";

  const goldenCross = sma50 > sma200;

  let summary = `The stock is in a ${trend.toLowerCase()} with RSI at ${rsi}`;
  if (momentum !== "Neutral") summary += ` — currently ${momentum.toLowerCase()}`;
  if (goldenCross) summary += ". The 50-day MA is above the 200-day MA (Golden Cross), a bullish structural signal.";
  else summary += ". The 50-day MA is below the 200-day MA, suggesting longer-term weakness.";

  return {
    trend,
    momentum,
    rsi,
    sma50: Math.round(sma50 * 100) / 100,
    sma200: Math.round(sma200 * 100) / 100,
    currentPrice,
    goldenCross,
    supportLevel: Math.round(support * 100) / 100,
    resistanceLevel: Math.round(resistance * 100) / 100,
    summary,
  };
}

// ─── Generate plain-language company description via Gemini ─

async function generateDescription(
  companyName: string,
  sector: string,
  profile: NonNullable<ResearchStateType["profile"]>
): Promise<string> {
  const response = await geminiModel.invoke([
    new SystemMessage("You write clear, jargon-free company descriptions for first-time investors."),
    new HumanMessage(
      `Write a 2-3 sentence plain-language description of ${companyName} (sector: ${sector}). 
      Explain what the company actually does, how it makes money, and why people care about it.
      Avoid investor jargon, filing language, and corporate speak. 
      Write like you're explaining to a smart friend who knows nothing about finance.
      Website: ${profile.weburl || "N/A"}`
    ),
  ]);
  return response.content as string;
}

// ─── Generate news analysis via Gemini ─────────────────────

async function generateNewsAnalysis(
  companyName: string,
  newsResults: NonNullable<ResearchStateType["newsResults"]>,
  earnings: ResearchStateType["earnings"]
): Promise<NewsAnalysis> {
  const newsText = newsResults.results
    .slice(0, 8)
    .map((r, i) => `${i + 1}. ${r.title}\n   Source: ${r.url}\n   Date: ${r.publishedDate || "Recent"}\n   Content: ${r.content.slice(0, 400)}`)
    .join("\n\n");

  const response = await geminiModel.invoke([
    new SystemMessage("You are a financial analyst summarizing news for investors."),
    new HumanMessage(`Analyze these recent news items about ${companyName} and provide a JSON response.

News items:
${newsText}

Recent earnings context: ${earnings?.slice(0, 2).map(e => `Q${e.quarter} ${e.year}: ${e.surprisePercent > 0 ? "beat" : "missed"} by ${Math.abs(e.surprisePercent).toFixed(1)}%`).join(", ") || "No earnings data"}

Respond with a valid JSON object (no markdown, no code fences) with this exact structure:
{
  "items": [
    {
      "headline": "exact headline from the news",
      "source": "source domain",
      "url": "full url",
      "publishedDate": "date string",
      "plainSummary": "1-2 sentence plain-language summary anyone can understand",
      "whyItMatters": "1 sentence explaining the specific impact on the stock/company",
      "isEarningsRelated": true or false,
      "sentiment": "positive" or "negative" or "neutral"
    }
  ],
  "overallSentiment": "positive" or "negative" or "neutral",
  "sentimentSummary": "2-3 sentence plain-language summary of overall news sentiment"
}

Include 4-6 most significant news items. If an item mentions earnings, guidance, or quarterly results, set isEarningsRelated to true.`),
  ]);

  try {
    const text = (response.content as string).replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(text) as NewsAnalysis;
  } catch {
    // Fallback: create basic news items from raw results
    return {
      items: newsResults.results.slice(0, 5).map((r) => ({
        headline: r.title,
        source: new URL(r.url).hostname,
        url: r.url,
        publishedDate: r.publishedDate || "Recent",
        plainSummary: r.content.slice(0, 200),
        whyItMatters: "This development may affect investor sentiment and the company's near-term outlook.",
        isEarningsRelated: r.title.toLowerCase().includes("earn") || r.title.toLowerCase().includes("quarter"),
        sentiment: "neutral" as const,
      })),
      overallSentiment: "neutral",
      sentimentSummary: "Recent news coverage is mixed. Review individual items for specific developments.",
    };
  }
}

// ─── Generate financial health via Gemini ──────────────────

async function generateFinancialHealth(
  companyName: string,
  metrics: ResearchStateType["metrics"],
  assetType: string
): Promise<FinancialHealth> {
  if (assetType === "crypto" || !metrics?.metric) {
    return {
      metrics: [
        {
          label: "Asset Type",
          value: "Cryptocurrency",
          verdict: "Traditional financial metrics (P/E, margins) don't apply to crypto assets. Evaluation is based on market momentum and network metrics.",
          verdictType: "neutral",
        },
      ],
      summary: "As a cryptocurrency, this asset's health is assessed through market metrics and adoption trends rather than traditional financial statements.",
    };
  }

  const m = metrics.metric;

  const response = await geminiModel.invoke([
    new SystemMessage("You are a financial analyst translating raw financial metrics into plain-language verdicts."),
    new HumanMessage(`Generate a financial health analysis for ${companyName} based on these metrics. Respond with valid JSON only (no markdown).

Raw metrics:
- Revenue Growth TTM: ${m.revenueGrowthTTM || "N/A"}%
- Revenue Growth 3Y: ${m.revenueGrowth3Y || "N/A"}%
- Gross Margin TTM: ${m.grossMarginTTM || "N/A"}%
- Net Margin TTM: ${m.netMarginTTM || "N/A"}%
- Operating Margin TTM: ${m.operatingMarginTTM || "N/A"}%
- ROE TTM: ${m.roeTTM || "N/A"}%
- ROA TTM: ${m.roaTTM || "N/A"}%
- Debt/Equity: ${m.totalDebtToTotalEquity || "N/A"}
- Current Ratio: ${m.currentRatio || "N/A"}
- P/E TTM: ${m.peTTM || "N/A"}
- EPS Growth TTM: ${m.epsGrowthTTM || "N/A"}%
- Dividend Yield: ${m.dividendYieldAnnual || "0"}%
- Beta: ${m.beta || "N/A"}

JSON format:
{
  "metrics": [
    {
      "label": "Revenue Growth",
      "value": "format the actual value nicely",
      "rawValue": numeric value or null,
      "verdict": "plain-language 1-sentence interpretation",
      "verdictType": "positive" or "negative" or "neutral" or "warning",
      "glossaryTerm": "Revenue Growth"
    }
  ],
  "summary": "2-3 sentence overall financial health assessment in plain language"
}

Include metrics for: Revenue Growth, Profitability (margins), Return on Equity, Debt Level, Liquidity, Earnings Growth. Skip any metric where the value is N/A.`),
  ]);

  try {
    const text = (response.content as string).replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(text) as FinancialHealth;
  } catch {
    return {
      metrics: [
        {
          label: "Data Availability",
          value: "Limited",
          verdict: "Complete financial metrics are not available for this security at this time.",
          verdictType: "neutral",
        },
      ],
      summary: "Financial health data is limited for this security.",
    };
  }
}

// ─── Main synthesis node ───────────────────────────────────

export async function synthesisNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const {
    ticker,
    assetType,
    companyName,
    profile,
    quote,
    candles,
    metrics,
    recommendations,
    priceTarget,
    earnings,
    newsResults,
    qualitativeAnalysis,
    historicalPatternAnalysis,
  } = state;

  const currentPrice = quote?.c || (candles?.c ? candles.c[candles.c.length - 1] : 0);
  const currency = profile?.currency || (assetType === "crypto" ? "USD" : "USD");

  // Build candle data points
  const candlePoints: CandleDataPoint[] = candles && candles.s === "ok"
    ? candles.t.map((t, i) => ({
        time: t,
        open: candles.o[i],
        high: candles.h[i],
        low: candles.l[i],
        close: candles.c[i],
        volume: candles.v[i],
      }))
    : [];

  // Key stats for live market data
  const m = metrics?.metric;
  const high52 = m?.["52WeekHigh"] || 0;
  const low52 = m?.["52WeekLow"] || 0;
  const marketCap = (profile?.marketCapitalization || m?.marketCapitalization || 0);

  const keyStats = [
    {
      label: "52-Week Range",
      value: high52 && low52 ? `${currency} ${low52.toFixed(2)} – ${high52.toFixed(2)}` : "N/A",
      plainMeaning: "The highest and lowest prices this stock traded at over the past year.",
      glossaryTerm: "52-Week Range",
    },
    {
      label: "Market Cap",
      value: marketCap ? `${currency} ${(marketCap / 1000).toFixed(1)}B` : "N/A",
      plainMeaning: "Total value of all shares combined — tells you the size of the company.",
      glossaryTerm: "Market Cap",
    },
    {
      label: "P/E Ratio",
      value: m?.peTTM ? m.peTTM.toFixed(1) + "x" : "N/A",
      plainMeaning: "How much investors pay for every $1 of earnings. Higher = market expects strong growth.",
      glossaryTerm: "P/E Ratio",
    },
    {
      label: "Volume (10d avg)",
      value: m?.["10DayAverageTradingVolume"]
        ? `${(m["10DayAverageTradingVolume"] as number / 1_000_000).toFixed(2)}M`
        : "N/A",
      plainMeaning: "Average shares traded daily — indicates how liquid (easy to buy/sell) the stock is.",
      glossaryTerm: "Volume",
    },
    {
      label: "Beta",
      value: m?.beta ? m.beta.toFixed(2) : "N/A",
      plainMeaning: "How volatile this stock is vs. the overall market. >1 = more volatile than market.",
      glossaryTerm: "Beta",
    },
    {
      label: "Dividend Yield",
      value: m?.dividendYieldAnnual ? `${m.dividendYieldAnnual.toFixed(2)}%` : "None",
      plainMeaning: "Annual cash income paid per share as a % of the current price.",
      glossaryTerm: "Dividend Yield",
    },
  ].filter(s => s.value !== "N/A");

  // Compute technical signals
  const technicalSignal =
    candles && candles.s === "ok" && candles.c.length > 20
      ? computeTechnicalSignal(candles, currentPrice)
      : {
          trend: "Sideways" as const,
          momentum: "Neutral" as const,
          rsi: 50,
          sma50: currentPrice,
          sma200: currentPrice,
          currentPrice,
          goldenCross: false,
          supportLevel: currentPrice * 0.9,
          resistanceLevel: currentPrice * 1.1,
          summary: "Technical data unavailable. Using current price as reference.",
        };

  // Scorecard
  const scorecard = metrics ? computeScorecard(metrics) : {
    axes: [
      { label: "Valuation" as const, score: 5, verdict: "Data unavailable" },
      { label: "Profitability" as const, score: 5, verdict: "Data unavailable" },
      { label: "Growth" as const, score: 5, verdict: "Data unavailable" },
      { label: "Red Flags" as const, score: 5, verdict: "Data unavailable" },
    ],
    overallScore: 5,
  };

  // Parse qualitative analysis
  const qualParsed = parseQualitative(qualitativeAnalysis || "");
  const histParsed = parseHistoricalPattern(historicalPatternAnalysis || "");

  // Analyst sentiment
  const latestRec = recommendations && recommendations.length > 0 ? recommendations[0] : null;
  const analystSentiment = {
    buy: latestRec?.buy || 0,
    hold: latestRec?.hold || 0,
    sell: latestRec?.sell || 0,
    strongBuy: latestRec?.strongBuy || 0,
    strongSell: latestRec?.strongSell || 0,
    priceTargetMean: priceTarget?.targetMean,
    priceTargetHigh: priceTarget?.targetHigh,
    priceTargetLow: priceTarget?.targetLow,
    synthesizedSummary: qualParsed.analystSentimentSummary ||
      "Analyst commentary synthesized from publicly available sources. This is not a live brokerage feed.",
  };

  // Run AI-dependent steps in parallel
  const [description, newsAnalysis, financialHealth] = await Promise.all([
    profile
      ? generateDescription(companyName, profile.finnhubIndustry || "Unknown", profile)
      : Promise.resolve(`${companyName} is ${assetType === "crypto" ? "a cryptocurrency" : "a publicly traded company"}.`),
    newsResults
      ? generateNewsAnalysis(companyName, newsResults, earnings)
      : Promise.resolve({ items: [], overallSentiment: "neutral" as const, sentimentSummary: "No news available." }),
    generateFinancialHealth(companyName, metrics, assetType),
  ]);

  // Assemble the full report
  const companySnapshot: CompanySnapshot = {
    ticker: assetType === "crypto" ? ticker.split(":")[1]?.replace("USDT", "") || ticker : ticker,
    name: profile?.name || companyName,
    sector: profile?.finnhubIndustry || (assetType === "crypto" ? "Cryptocurrency" : "Unknown"),
    exchange: profile?.exchange || (assetType === "crypto" ? "Crypto" : "Unknown"),
    currentPrice,
    dayChange: quote?.d || 0,
    dayChangePercent: quote?.dp || 0,
    marketCap: profile?.marketCapitalization || 0,
    currency,
    logo: profile?.logo,
    website: profile?.weburl,
    description,
    assetType,
  };

  const report: ResearchReport = {
    ticker: companySnapshot.ticker,
    assetType,
    generatedAt: new Date().toISOString(),
    companySnapshot,
    liveMarketData: { candles: candlePoints, keyStats },
    scorecard,
    technicalSignal,
    newsAnalysis,
    financialHealth,
    qualitativeRead: {
      managementAssessment: qualParsed.managementAssessment || "Management assessment not available.",
      competitivePositioning: qualParsed.competitivePositioning || "Competitive positioning assessment not available.",
      moatStrength: qualParsed.moatStrength,
      analystSentiment,
      longTermInvestorLens: qualParsed.longTermInvestorLens || "Long-term investor analysis not available.",
    },
    historicalPattern: {
      scenario: histParsed.scenario || "No clear historical parallel identified",
      year: histParsed.year || "N/A",
      outcome: histParsed.outcome || "Historical outcome not determined",
      parallels: histParsed.parallels || "No specific parallels identified",
      caveat: histParsed.caveat || "History does not guarantee future outcomes.",
      confidence: histParsed.confidence,
    },
    decision: {
      recommendation: "Hold",
      confidenceBreakdown: { financials: 25, newsSentiment: 25, historicalPattern: 25, qualitative: 25 },
      reasoning: "Analysis in progress...",
      keyRisks: [],
      keyTailwinds: [],
      disclaimer: "This analysis is for informational purposes only and does not constitute personalized financial advice.",
    },
  };

  return { report };
}
