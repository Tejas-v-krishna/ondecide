import { ResearchStateType } from "../state";
import { geminiModel } from "@/lib/gemini";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function qualitativeNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const { companyName, ticker, assetType, profile, etfProfile, metrics, newsResults, analystCommentaryResults, recommendations, priceTarget } = state;

  const newsContext = newsResults?.results
    .slice(0, 6)
    .map((r) => `- ${r.title}: ${r.content.slice(0, 300)}`)
    .join("\n") || "No recent news available";

  const analystContext = analystCommentaryResults?.results
    .slice(0, 4)
    .map((r) => `- ${r.title}: ${r.content.slice(0, 200)}`)
    .join("\n") || "No analyst commentary available";

  const metricsContext = metrics?.metric
    ? `P/E: ${metrics.metric.peTTM || "N/A"}, ROE: ${metrics.metric.roeTTM || "N/A"}%, Net Margin: ${metrics.metric.netMarginTTM || "N/A"}%, Revenue Growth: ${metrics.metric.revenueGrowthTTM || "N/A"}%, Debt/Equity: ${metrics.metric.totalDebtToTotalEquity || "N/A"}`
    : "Financial metrics not available";

  const recsContext = recommendations && recommendations.length > 0
    ? `Latest consensus: ${recommendations[0].strongBuy} Strong Buy, ${recommendations[0].buy} Buy, ${recommendations[0].hold} Hold, ${recommendations[0].sell} Sell, ${recommendations[0].strongSell} Strong Sell`
    : "No analyst recommendations available";

  const priceTargetContext = priceTarget
    ? `Price targets: Mean $${priceTarget.targetMean}, High $${priceTarget.targetHigh}, Low $${priceTarget.targetLow}`
    : "No price target data";

  const isFund = assetType === "etf" || assetType === "mutual_fund";
  const isBond = assetType === "bond";
  const isRealEstate = profile?.finnhubIndustry?.toLowerCase().includes("real estate") || profile?.finnhubIndustry?.toLowerCase().includes("reit");

  const etfContext = isFund && etfProfile
    ? etfProfile.results.map((r) => `- ${r.title}: ${r.content.slice(0, 300)}`).join("\n")
    : "";
  
  const bondContext = isBond && etfProfile
    ? etfProfile.results.map((r) => `- ${r.title}: ${r.content.slice(0, 300)}`).join("\n")
    : "";

  let entityContext = "";
  if (isFund) {
    entityContext = `This is a ${assetType === "etf" ? "ETF" : "Mutual Fund"}. Here is some web context about its objective, holdings, and expense ratio:\n${etfContext}\n`;
  } else if (isBond) {
    entityContext = `This is a Government Bond or Yield metric. Here is some web context about its current yield, maturity, and sovereign rating:\n${bondContext}\n`;
  } else {
    entityContext = `Company sector: ${profile?.finnhubIndustry || "Unknown"}\nFinancial metrics: ${metricsContext}\nAnalyst recommendations: ${recsContext}\n${priceTargetContext}`;
  }

  const prompt = `You are a senior investment analyst writing a qualitative assessment for ${companyName} (${ticker}).

${entityContext}

Recent news:
${newsContext}

Analyst/brokerage commentary:
${analystContext}

Write a structured qualitative analysis with these EXACT sections (use these exact headers):

MANAGEMENT_ASSESSMENT:
[2-3 sentences about ${
  isFund ? "the fund issuer (e.g., Vanguard, iShares), expense ratio cost-efficiency, and tracking error" 
  : isBond ? "the issuing government's fiscal policy, central bank credibility, and debt sustainability" 
  : "management quality, recent leadership changes, execution track record"
} based on available information]

COMPETITIVE_POSITIONING:
[2-3 sentences about the ${
  isFund ? "fund's specific strategy/index, diversification, and how it compares to other funds in its category" 
  : isBond ? "country's macroeconomic positioning, inflation outlook, and yield attractiveness relative to peers" 
  : isRealEstate ? "company's property portfolio quality, occupancy rates, dividend yield stability, and tenant diversification"
  : "company's competitive advantages/disadvantages, market position, and moat"
}]

MOAT_STRENGTH:
[Single word only: Strong, Moderate, Weak, or None]

ANALYST_SENTIMENT_SUMMARY:
[2-3 sentences synthesizing the analyst commentary into a plain-language summary of prevailing sentiment. IMPORTANT: Label this clearly as an AI synthesis of publicly available commentary, not a live brokerage feed]

LONG_TERM_INVESTOR_LENS:
[2-3 sentences reasoning through whether this is a ${isBond ? "stable income-generating asset" : "business/asset with durable long-term advantages"} or primarily a short-term trade opportunity. Think like a value investor]

Be specific, evidence-based, and write in plain language that a first-time investor can understand.`;

  const response = await geminiModel.invoke([
    new SystemMessage("You are an expert investment analyst providing qualitative assessments."),
    new HumanMessage(prompt),
  ]);

  return {
    qualitativeAnalysis: response.content as string,
  };
}
