import { ResearchStateType } from "../state";
import { searchCompanyNews, searchAnalystCommentary } from "@/lib/tavily";

export async function newsNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const { companyName, ticker } = state;

  const [newsResult, analystResult] = await Promise.allSettled([
    searchCompanyNews(companyName, ticker, 7),
    searchAnalystCommentary(companyName, ticker),
  ]);

  return {
    newsResults: newsResult.status === "fulfilled" ? newsResult.value : null,
    analystCommentaryResults:
      analystResult.status === "fulfilled" ? analystResult.value : null,
  };
}
