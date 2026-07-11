import { StateGraph, START, END } from "@langchain/langgraph";
import { ResearchState } from "./state";
import { resolveNode } from "./nodes/resolve";
import { financialsNode } from "./nodes/financials";
import { newsNode } from "./nodes/news";
import { qualitativeNode } from "./nodes/qualitative";
import { historicalPatternNode } from "./nodes/historicalPattern";
import { synthesisNode } from "./nodes/synthesis";
import { decisionNode } from "./nodes/decision";

// Build the research pipeline graph
// Flow: resolve → [financials, news] (parallel) → qualitative → historicalPattern → synthesis → decision
export function buildResearchGraph() {
  const graph = new StateGraph(ResearchState)
    .addNode("resolve", resolveNode)
    .addNode("financials", financialsNode)
    .addNode("news", newsNode)
    .addNode("qualitative", qualitativeNode)
    .addNode("historicalPattern", historicalPatternNode)
    .addNode("synthesis", synthesisNode)
    .addNode("decision", decisionNode)
    // Edges
    .addEdge(START, "resolve")
    .addEdge("resolve", "financials")   // parallel fan-out
    .addEdge("resolve", "news")         // parallel fan-out
    .addEdge("financials", "qualitative")  // fan-in: both must complete
    .addEdge("news", "qualitative")        // fan-in: both must complete
    .addEdge("qualitative", "historicalPattern")
    .addEdge("historicalPattern", "synthesis")
    .addEdge("synthesis", "decision")
    .addEdge("decision", END);

  return graph.compile();
}
