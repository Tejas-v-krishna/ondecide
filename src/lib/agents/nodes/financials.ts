import { ResearchStateType } from "../state";
import {
  getProfile,
  getQuote,
  getMetrics,
  getRecommendations,
  getPriceTarget,
  getEarnings,
  getPeers,
  getYearCandles,
  getYearCryptoCandles,
} from "@/lib/finnhub";

export async function financialsNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const { ticker, assetType } = state;

  if (assetType === "crypto") {
    // For crypto: only candle data is available
    try {
      const candles = await getYearCryptoCandles(ticker);
      return {
        candles,
        profile: null,
        quote: null,
        metrics: null,
        recommendations: [],
        priceTarget: null,
        earnings: [],
        peers: [],
      };
    } catch (err) {
      console.error("Crypto candles fetch error:", err);
      return {
        candles: null,
        profile: null,
        quote: null,
        metrics: null,
        recommendations: [],
        priceTarget: null,
        earnings: [],
        peers: [],
      };
    }
  }

  // For stocks: fetch all available data in parallel
  const [
    profileResult,
    quoteResult,
    candlesResult,
    metricsResult,
    recommendationsResult,
    priceTargetResult,
    earningsResult,
    peersResult,
  ] = await Promise.allSettled([
    getProfile(ticker),
    getQuote(ticker),
    getYearCandles(ticker),
    getMetrics(ticker),
    getRecommendations(ticker),
    getPriceTarget(ticker),
    getEarnings(ticker),
    getPeers(ticker),
  ]);

  return {
    profile: profileResult.status === "fulfilled" ? profileResult.value : null,
    quote: quoteResult.status === "fulfilled" ? quoteResult.value : null,
    candles: candlesResult.status === "fulfilled" ? candlesResult.value : null,
    metrics: metricsResult.status === "fulfilled" ? metricsResult.value : null,
    recommendations:
      recommendationsResult.status === "fulfilled"
        ? recommendationsResult.value
        : [],
    priceTarget:
      priceTargetResult.status === "fulfilled" ? priceTargetResult.value : null,
    earnings:
      earningsResult.status === "fulfilled" ? earningsResult.value : [],
    peers: peersResult.status === "fulfilled" ? peersResult.value : [],
  };
}
