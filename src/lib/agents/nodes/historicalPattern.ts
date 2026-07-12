import { ResearchStateType } from "../state";
import { geminiModel } from "@/lib/gemini";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function historicalPatternNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const { companyName, ticker, profile, metrics, newsResults, qualitativeAnalysis, earnings } = state;

  const metricsContext = metrics?.metric
    ? `Revenue growth TTM: ${metrics.metric.revenueGrowthTTM || "N/A"}%, Net margin: ${metrics.metric.netMarginTTM || "N/A"}%, P/E: ${metrics.metric.peTTM || "N/A"}, Debt/Equity: ${metrics.metric.totalDebtToTotalEquity || "N/A"}`
    : "Financial data unavailable";

  const earningsContext = earnings && earnings.length > 0
    ? earnings.slice(0, 4).map(e =>
        `Q${e.quarter} ${e.year}: Actual ${e.actual}, Estimate ${e.estimate}, Surprise ${e.surprisePercent?.toFixed(1)}%`
      ).join("; ")
    : "No earnings history available";

  const newsHeadlines = newsResults?.results
    .slice(0, 4)
    .map(r => r.title)
    .join("; ") || "No recent news";

  const prompt = `You are a senior investment analyst with deep knowledge of financial market history.

Company: ${companyName} (${ticker})
Sector: ${profile?.finnhubIndustry || "Unknown"}
Current financial metrics: ${metricsContext}
Recent earnings history: ${earningsContext}
Recent news themes: ${newsHeadlines}
Qualitative context: ${qualitativeAnalysis.slice(0, 500)}

Your task: Identify the most relevant historical parallel for this company's current situation. Look for comparisons such as:
- Similar earnings patterns (consistent beats/misses, earnings surprise patterns)
- Similar sector dynamics (sector rotation, industry disruption, regulatory changes)
- Similar business lifecycle stage (high-growth phase, maturity, turnaround)
- Similar macroeconomic conditions affecting this type of company

Respond with these EXACT sections:

HISTORICAL_SCENARIO:
[Brief name/description of the historical situation, e.g. "Microsoft's cloud transition 2014-2016" or "Retail sector disruption during Amazon's rise 2012-2015"]

YEAR:
[Year or year range, e.g. "2014-2016"]

HISTORICAL_OUTCOME:
[What happened in that historical situation — price performance, business evolution, key events]

CURRENT_PARALLELS:
[2-3 specific, concrete parallels between the historical situation and today's ${companyName} situation]

CAVEAT:
[1-2 sentences noting key differences that may make this comparison imperfect, and acknowledging that history does not guarantee future outcomes]

CONFIDENCE:
[Single word: High, Medium, or Low — how confident you are in this parallel's relevance]`;

  try {
    const response = await geminiModel.invoke([
      new SystemMessage("You are a veteran investment analyst and market historian with expertise in pattern recognition."),
      new HumanMessage(prompt),
    ]);

    return {
      historicalPatternAnalysis: response.content as string,
    };
  } catch {
    // LLM unavailable (e.g. API quota exhausted). Degrade gracefully.
    console.warn("Historical pattern LLM unavailable (quota/network); using rules-based fallback.");
    const fallback = [
      `HISTORICAL_SCENARIO:`,
      `Historical pattern analysis is temporarily unavailable (AI service rate-limited).`,
      ``,
      `YEAR:`,
      `N/A`,
      ``,
      `HISTORICAL_OUTCOME:`,
      `No historical parallel could be generated right now.`,
      ``,
      `CURRENT_PARALLELS:`,
      `Review the technical signal and financial health sections, which are based on real market data, to form your own view.`,
      ``,
      `CAVEAT:`,
      `Historical patterns are illustrative only and do not guarantee future results.`,
      ``,
      `CONFIDENCE:`,
      `Low`,
    ].join("\n");
    return { historicalPatternAnalysis: fallback };
  }
}
