import { ResearchStateType } from "../state";
import { searchCompanyNews, searchAnalystCommentary, searchEarningsCallTranscript } from "@/lib/tavily";
import { TavilySearchResponse } from "@/types";

export async function newsNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const { companyName, ticker, assetType } = state;

  const promises: Promise<TavilySearchResponse | null>[] = [
    searchCompanyNews(companyName, ticker, 7),
    searchAnalystCommentary(companyName, ticker),
  ];

  if (assetType === "stock") {
    promises.push(searchEarningsCallTranscript(ticker, companyName));
  } else {
    promises.push(Promise.resolve(null));
  }

  const [newsResult, analystResult, earningsResult] = await Promise.allSettled(promises);

  return {
    newsResults: newsResult.status === "fulfilled" ? newsResult.value : null,
    analystCommentaryResults:
      analystResult.status === "fulfilled" ? analystResult.value : null,
    earningsCallResults: 
      earningsResult.status === "fulfilled" ? earningsResult.value : null,
  };
}
