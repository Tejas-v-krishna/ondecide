import { ResearchStateType } from "../state";
import { FinnhubMetrics } from "@/types";
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
  getInsiderSentiment,
  getPeerMetricsSafe,
} from "@/lib/finnhub";
import { searchETFProfile, searchMutualFundProfile, searchBondProfile } from "@/lib/tavily";

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

  if (assetType === "etf") {
    // For ETFs: fetch quote/candles from Finnhub, profile/holdings from Tavily
    const [quoteResult, candlesResult, etfProfileResult] = await Promise.allSettled([
      getQuote(ticker),
      getYearCandles(ticker),
      searchETFProfile(ticker, state.companyName),
    ]);

    return {
      quote: quoteResult.status === "fulfilled" ? quoteResult.value : null,
      candles: candlesResult.status === "fulfilled" ? candlesResult.value : null,
      etfProfile: etfProfileResult.status === "fulfilled" ? etfProfileResult.value : null,
      profile: null,
      metrics: null,
      recommendations: [],
      priceTarget: null,
      earnings: [],
      peers: [],
    };
  }

  if (assetType === "mutual_fund") {
    // For Mutual Funds: fetch quote/candles from Finnhub, profile/holdings from Tavily
    const [quoteResult, candlesResult, etfProfileResult] = await Promise.allSettled([
      getQuote(ticker),
      getYearCandles(ticker),
      searchMutualFundProfile(ticker, state.companyName),
    ]);

    return {
      quote: quoteResult.status === "fulfilled" ? quoteResult.value : null,
      candles: candlesResult.status === "fulfilled" ? candlesResult.value : null,
      etfProfile: etfProfileResult.status === "fulfilled" ? etfProfileResult.value : null,
      profile: null,
      metrics: null,
      recommendations: [],
      priceTarget: null,
      earnings: [],
      peers: [],
    };
  }

  if (assetType === "bond") {
    // For Bonds: Only Tavily data
    const [etfProfileResult] = await Promise.allSettled([
      searchBondProfile(state.companyName),
    ]);

    return {
      quote: null,
      candles: null,
      etfProfile: etfProfileResult.status === "fulfilled" ? etfProfileResult.value : null,
      profile: null,
      metrics: null,
      recommendations: [],
      priceTarget: null,
      earnings: [],
      peers: [],
    };
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
    insiderResult,
    peersResult,
  ] = await Promise.allSettled([
    getProfile(ticker),
    getQuote(ticker),
    getYearCandles(ticker),
    getMetrics(ticker),
    getRecommendations(ticker),
    getPriceTarget(ticker),
    getEarnings(ticker),
    getInsiderSentiment(ticker).catch(() => null),
    getPeers(ticker),
  ]);

  // Fetch metrics for up to 3 peers in parallel
  const peers = (peersResult.status === "fulfilled" && peersResult.value) ? peersResult.value : [];
  const topPeers = peers.filter(p => p !== ticker).slice(0, 3);
  const peerMetricsResult = await Promise.allSettled(
    topPeers.map(p => getPeerMetricsSafe(p).then(res => ({ ticker: p, data: res })))
  );
  
  const peerMetrics = peerMetricsResult
    .filter((res): res is PromiseFulfilledResult<{ticker: string, data: FinnhubMetrics | null}> => res.status === "fulfilled")
    .map(res => ({
      ticker: res.value.ticker,
      peTTM: res.value.data?.metric?.peTTM,
      netMarginTTM: res.value.data?.metric?.netMarginTTM,
      revenueGrowthTTM: res.value.data?.metric?.revenueGrowthTTM,
      marketCap: res.value.data?.metric?.marketCapitalization,
    }));

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
    peers,
    peerMetrics,
    insiderSentimentData: insiderResult.status === "fulfilled" ? insiderResult.value : null,
    etfProfile: null,
  };
}
