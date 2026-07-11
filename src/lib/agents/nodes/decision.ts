import { ResearchStateType } from "../state";
import { geminiModel } from "@/lib/gemini";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import type { ResearchReport } from "@/types";

export async function decisionNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const report = state.report;
  if (!report) {
    throw new Error("Cannot generate decision: report is not available from synthesis");
  }

  const { companySnapshot, scorecard, newsAnalysis, technicalSignal, qualitativeRead, historicalPattern, financialHealth } = report;

  const prompt = `You are a senior portfolio analyst making an investment thesis for ${companySnapshot.name} (${companySnapshot.ticker}).

COMPANY OVERVIEW:
${companySnapshot.description}
Sector: ${companySnapshot.sector}
Current Price: ${companySnapshot.currency} ${companySnapshot.currentPrice}

SCORECARD:
${scorecard.axes.map(a => `- ${a.label}: ${a.score}/10 — ${a.verdict}`).join("\n")}
Overall Score: ${scorecard.overallScore}/10

FINANCIAL HEALTH SUMMARY:
${financialHealth.summary}

NEWS SENTIMENT:
${newsAnalysis.overallSentiment} — ${newsAnalysis.sentimentSummary}

TECHNICAL SIGNALS:
${technicalSignal.summary}

QUALITATIVE FACTORS:
Management: ${qualitativeRead.managementAssessment}
Competitive Position: ${qualitativeRead.competitivePositioning}
Moat: ${qualitativeRead.moatStrength}

HISTORICAL PARALLEL:
${historicalPattern.scenario} (${historicalPattern.year}): ${historicalPattern.outcome}
Current parallels: ${historicalPattern.parallels}

ANALYST SENTIMENT:
Buy: ${qualitativeRead.analystSentiment.buy + qualitativeRead.analystSentiment.strongBuy}, Hold: ${qualitativeRead.analystSentiment.hold}, Sell: ${qualitativeRead.analystSentiment.sell + qualitativeRead.analystSentiment.strongSell}

Based on ALL of the above, produce a final investment thesis as valid JSON (no markdown, no code fences):
{
  "recommendation": "Invest" or "Hold" or "Avoid",
  "confidenceBreakdown": {
    "financials": (0-100, how much weight financials drove this call),
    "newsSentiment": (0-100, how much weight news drove this call),
    "historicalPattern": (0-100, how much weight historical pattern drove this call),
    "qualitative": (0-100, how much weight qualitative factors drove this call)
  },
  "reasoning": "2-3 sentence plain-English explanation of the recommendation that a total beginner can understand. Be specific — mention the actual company name and the key factors.",
  "keyRisks": ["3-4 specific risks as short bullet strings"],
  "keyTailwinds": ["3-4 specific positive factors as short bullet strings"],
  "disclaimer": "This research synthesis is for informational and educational purposes only. It does not constitute personalized financial advice or a recommendation to buy or sell any security. Past performance and historical patterns do not guarantee future results. Always conduct your own research and consider consulting a qualified financial advisor before making investment decisions."
}

IMPORTANT RULES:
- The confidenceBreakdown values must sum to 100
- Use "Invest" (not "Buy") and "Avoid" (not "Sell") to frame this as research, not brokerage advice
- The reasoning must be in plain language — no jargon
- Be honest — if signals are mixed, say so in the reasoning`;

  const response = await geminiModel.invoke([
    new SystemMessage("You are a senior portfolio analyst producing investment research. You are objective, evidence-based, and write in plain language."),
    new HumanMessage(prompt),
  ]);

  try {
    const text = (response.content as string).replace(/```json\n?|\n?```/g, "").trim();
    const decision = JSON.parse(text);

    // Merge decision into existing report
    const updatedReport: ResearchReport = {
      ...report,
      decision,
    };

    return { report: updatedReport };
  } catch (err) {
    console.error("Decision parsing error:", err);
    // Return report with default decision
    return {
      report: {
        ...report,
        decision: {
          recommendation: "Hold",
          confidenceBreakdown: { financials: 40, newsSentiment: 25, historicalPattern: 15, qualitative: 20 },
          reasoning: "The analysis presents a mixed picture. Given the available data, a cautious approach is warranted while monitoring key metrics.",
          keyRisks: ["Data limitations prevent full risk assessment"],
          keyTailwinds: ["Continued business operations"],
          disclaimer: "This research synthesis is for informational and educational purposes only and does not constitute personalized financial advice.",
        },
      },
    };
  }
}
