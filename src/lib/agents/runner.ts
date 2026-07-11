import { buildResearchGraph } from "./graph";
import type { ResearchReport } from "@/types";

// Human-readable status messages per node
const NODE_MESSAGES: Record<string, string> = {
  resolve: "Resolving company identifier...",
  financials: "Pulling financial data & market metrics...",
  news: "Reading recent news & analyst commentary...",
  qualitative: "Assessing management & competitive position...",
  historicalPattern: "Cross-checking historical patterns...",
  synthesis: "Synthesizing research report...",
  decision: "Forming investment thesis...",
};

export type ProgressEvent = {
  type: "status";
  node: string;
  message: string;
  timestamp: string;
};

export type CompleteEvent = {
  type: "complete";
  report: ResearchReport;
};

export type ErrorEvent = {
  type: "error";
  message: string;
};

export type PipelineEvent = ProgressEvent | CompleteEvent | ErrorEvent;

/**
 * Run the research pipeline with streaming progress callbacks.
 * sendEvent is called for each node as it completes.
 */
export async function runResearchPipeline(
  query: string,
  sendEvent: (event: PipelineEvent) => void
): Promise<ResearchReport> {
  const graph = buildResearchGraph();

  const stream = await graph.stream(
    {
      query,
      ticker: "",
      assetType: "stock",
      companyName: "",
      profile: null,
      quote: null,
      candles: null,
      metrics: null,
      recommendations: [],
      priceTarget: null,
      earnings: [],
      peers: [],
      newsResults: null,
      analystCommentaryResults: null,
      qualitativeAnalysis: "",
      historicalPatternAnalysis: "",
      report: null,
      error: null,
    },
    { streamMode: "updates" }
  );

  let finalReport: ResearchReport | null = null;

  for await (const chunk of stream) {
    // chunk is { nodeName: stateUpdate }
    const nodeNames = Object.keys(chunk);

    for (const nodeName of nodeNames) {
      const message = NODE_MESSAGES[nodeName] || `Processing ${nodeName}...`;

      sendEvent({
        type: "status",
        node: nodeName,
        message,
        timestamp: new Date().toISOString(),
      });

      // Check if this chunk contains the final report
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const update = (chunk as Record<string, any>)[nodeName];
      if (update?.report) {
        finalReport = update.report;
      }
    }
  }

  if (!finalReport) {
    throw new Error("Pipeline completed but no report was generated");
  }

  sendEvent({ type: "complete", report: finalReport });
  return finalReport;
}
