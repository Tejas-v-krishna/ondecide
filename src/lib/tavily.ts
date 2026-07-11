import { TavilySearchResponse } from "@/types";

// Lazy-import tavily to avoid server/client issues
async function getTavilyClient() {
  const { tavily } = await import("@tavily/core");
  return tavily({ apiKey: process.env.TAVILY_API_KEY! });
}

/**
 * Search recent company news
 */
export async function searchCompanyNews(
  companyName: string,
  ticker: string,
  daysBack = 7
): Promise<TavilySearchResponse> {
  const tvly = await getTavilyClient();
  const query = `${companyName} ${ticker} stock news earnings`;
  const result = await tvly.search(query, {
    topic: "news",
    searchDepth: "advanced",
    maxResults: 10,
    timeRange: daysBack <= 7 ? "week" : "month",
    includeAnswer: false,
  });
  return {
    query: result.query,
    answer: result.answer,
    results: result.results.map((r: { title: string; url: string; content: string; score: number; publishedDate?: string }) => ({
      title: r.title,
      url: r.url,
      content: r.content,
      score: r.score,
      publishedDate: r.publishedDate,
    })),
  };
}

/**
 * Search analyst commentary and price target mentions
 */
export async function searchAnalystCommentary(
  companyName: string,
  ticker: string
): Promise<TavilySearchResponse> {
  const tvly = await getTavilyClient();
  const query = `${companyName} ${ticker} analyst rating price target buy hold sell brokerage`;
  const result = await tvly.search(query, {
    searchDepth: "advanced",
    maxResults: 8,
    timeRange: "month",
    includeAnswer: false,
  });
  return {
    query: result.query,
    results: result.results.map((r: { title: string; url: string; content: string; score: number; publishedDate?: string }) => ({
      title: r.title,
      url: r.url,
      content: r.content,
      score: r.score,
      publishedDate: r.publishedDate,
    })),
  };
}

/**
 * Search for historical comparable situations
 */
export async function searchHistoricalContext(
  scenario: string
): Promise<TavilySearchResponse> {
  const tvly = await getTavilyClient();
  const result = await tvly.search(scenario, {
    searchDepth: "basic",
    maxResults: 5,
    includeAnswer: false,
  });
  return {
    query: result.query,
    results: result.results.map((r: { title: string; url: string; content: string; score: number; publishedDate?: string }) => ({
      title: r.title,
      url: r.url,
      content: r.content,
      score: r.score,
      publishedDate: r.publishedDate,
    })),
  };
}
