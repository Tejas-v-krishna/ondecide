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

/**
 * Search for ETF profile data (AUM, expense ratio, top holdings)
 */
export async function searchETFProfile(
  ticker: string,
  companyName: string
): Promise<TavilySearchResponse> {
  const tvly = await getTavilyClient();
  const query = `${ticker} ${companyName} ETF expense ratio top 10 holdings sector allocation AUM objective`;
  const result = await tvly.search(query, {
    searchDepth: "advanced",
    maxResults: 6,
    includeAnswer: true,
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
 * Search for Mutual Fund profile data (NAV, expense ratio, top holdings, AUM, manager)
 */
export async function searchMutualFundProfile(
  ticker: string,
  companyName: string
): Promise<TavilySearchResponse> {
  const tvly = await getTavilyClient();
  const query = `${ticker} ${companyName} mutual fund expense ratio NAV AUM top holdings fund manager`;
  const result = await tvly.search(query, {
    searchDepth: "advanced",
    maxResults: 6,
    includeAnswer: true,
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
 * Search for Government Bond profile data (yield, maturity, coupon, credit rating)
 */
export async function searchBondProfile(
  queryParam: string
): Promise<TavilySearchResponse> {
  const tvly = await getTavilyClient();
  const query = `${queryParam} current yield price maturity date coupon rate sovereign credit rating`;
  const result = await tvly.search(query, {
    searchDepth: "advanced",
    maxResults: 6,
    includeAnswer: true,
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
 * Search for Earnings Call Transcript summaries and forward guidance
 */
export async function searchEarningsCallTranscript(
  ticker: string,
  companyName: string
): Promise<TavilySearchResponse> {
  const tvly = await getTavilyClient();
  const query = `${ticker} ${companyName} latest earnings call transcript summary forward guidance management tone risks`;
  const result = await tvly.search(query, {
    searchDepth: "advanced",
    maxResults: 5,
    includeAnswer: true,
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

