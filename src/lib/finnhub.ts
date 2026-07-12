import {
  FinnhubQuote,
  FinnhubProfile,
  FinnhubCandle,
  FinnhubMetrics,
  FinnhubRecommendation,
  FinnhubPriceTarget,
  FinnhubEarnings,
  FinnhubNews,
} from "@/types";

const BASE = "https://finnhub.io/api/v1";
const API_KEY = process.env.FINNHUB_API_KEY;

if (typeof window === "undefined" && !API_KEY) {
  console.warn("FINNHUB_API_KEY is missing. API calls will fail.");
}

// Simple in-memory cache with TTL
const cache = new Map<string, { data: unknown; expiresAt: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const entry = cache.get(key);
  if (entry && entry.expiresAt > now) {
    return Promise.resolve(entry.data as T);
  }
  return fetcher().then((data) => {
    cache.set(key, { data, expiresAt: now + CACHE_TTL_MS });
    return data;
  });
}

async function finnhubFetch<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set("token", API_KEY || "");
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }
  const res = await fetch(url.toString(), { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`Finnhub ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as T;
}

export async function getQuote(symbol: string): Promise<FinnhubQuote> {
  return cached(`quote:${symbol}`, () =>
    finnhubFetch<FinnhubQuote>("/quote", { symbol })
  );
}

export async function getProfile(symbol: string): Promise<FinnhubProfile> {
  return cached(`profile:${symbol}`, () =>
    finnhubFetch<FinnhubProfile>("/stock/profile2", { symbol })
  );
}

export async function getCandles(
  symbol: string,
  resolution: string,
  from: number,
  to: number
): Promise<FinnhubCandle> {
  return cached(`candles:${symbol}:${resolution}:${from}:${to}`, () =>
    finnhubFetch<FinnhubCandle>("/stock/candle", { symbol, resolution, from, to })
  );
}

export async function getCryptoCandles(
  symbol: string,
  resolution: string,
  from: number,
  to: number
): Promise<FinnhubCandle> {
  return cached(`crypto-candles:${symbol}:${resolution}:${from}:${to}`, () =>
    finnhubFetch<FinnhubCandle>("/crypto/candle", { symbol, resolution, from, to })
  );
}

export async function getMetrics(symbol: string): Promise<FinnhubMetrics> {
  return cached(`metrics:${symbol}`, () =>
    finnhubFetch<FinnhubMetrics>("/stock/metric", { symbol, metric: "all" })
  );
}

export async function getRecommendations(symbol: string): Promise<FinnhubRecommendation[]> {
  return cached(`recs:${symbol}`, () =>
    finnhubFetch<FinnhubRecommendation[]>("/stock/recommendation", { symbol })
  );
}

export async function getPriceTarget(symbol: string): Promise<FinnhubPriceTarget> {
  return cached(`target:${symbol}`, () =>
    finnhubFetch<FinnhubPriceTarget>("/stock/price-target", { symbol })
  );
}

export async function getEarnings(symbol: string): Promise<FinnhubEarnings[]> {
  return cached(`earnings:${symbol}`, () =>
    finnhubFetch<FinnhubEarnings[]>("/stock/earnings", { symbol })
  );
}

export async function getPeers(symbol: string): Promise<string[]> {
  return cached(`peers:${symbol}`, () =>
    finnhubFetch<string[]>("/stock/peers", { symbol })
  );
}

export async function getCompanyNews(
  symbol: string,
  from: string,
  to: string
): Promise<FinnhubNews[]> {
  return cached(`news:${symbol}:${from}:${to}`, () =>
    finnhubFetch<FinnhubNews[]>("/company-news", { symbol, from, to })
  );
}

export async function searchSymbol(
  query: string
): Promise<{ count: number; result: { description: string; displaySymbol: string; symbol: string; type: string }[] }> {
  return finnhubFetch("/search", { q: query });
}

export interface FinnhubInsiderSentiment {
  data: {
    symbol: string;
    year: number;
    month: number;
    change: number; // Share change
    mspr: number; // Monthly share purchase ratio
  }[];
  symbol: string;
}

export async function getInsiderSentiment(symbol: string): Promise<FinnhubInsiderSentiment> {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setMonth(toDate.getMonth() - 6); // Look back 6 months

  return cached(`insider:${symbol}`, () =>
    finnhubFetch<FinnhubInsiderSentiment>("/stock/insider-sentiment", {
      symbol,
      from: fromDate.toISOString().split("T")[0],
      to: toDate.toISOString().split("T")[0],
    })
  );
}

export async function getPeerMetricsSafe(symbol: string): Promise<FinnhubMetrics | null> {
  // Gracefully fetch metrics for a peer, returning null on error
  try {
    const res = await finnhubFetch<FinnhubMetrics>("/stock/metric", { symbol, metric: "all" });
    return res;
  } catch {
    return null;
  }
}

/** Helper: format Unix timestamp to YYYY-MM-DD */
export function unixToDateStr(ts: number): string {
  return new Date(ts * 1000).toISOString().split("T")[0];
}

/** Get 1-year candle data for a stock */
export async function getYearCandles(symbol: string): Promise<FinnhubCandle> {
  const to = Math.floor(Date.now() / 1000);
  const from = to - 365 * 24 * 3600;
  return getCandles(symbol, "D", from, to);
}

/** Get 1-year candle data for crypto.
 *  Finnhub's free tier blocks /crypto/candle (403), so we fall back to
 *  CoinGecko's public market_chart endpoint (no API key required). */
export async function getYearCryptoCandles(symbol: string): Promise<FinnhubCandle> {
  const to = Math.floor(Date.now() / 1000);
  const from = to - 365 * 24 * 3600;
  try {
    return await getCryptoCandles(symbol, "D", from, to);
  } catch {
    return getYearCryptoCandlesFromCoinGecko(symbol, from, to);
  }
}

// Map Finnhub crypto symbols (e.g. BINANCE:BTCUSDT) or bare tickers (BTC)
// to CoinGecko coin ids. Keyed by the base asset symbol.
const COINGECKO_IDS: Record<string, string> = {
  BTC: "bitcoin",
  ETH: "ethereum",
  SOL: "solana",
  BNB: "binancecoin",
  ADA: "cardano",
  XRP: "ripple",
  DOGE: "dogecoin",
  DOT: "polkadot",
  AVAX: "avalanche-2",
  MATIC: "matic-network",
  LINK: "chainlink",
  LTC: "litecoin",
  UNI: "uniswap",
  ATOM: "cosmos",
};

function coingeckoIdFor(symbol: string): string | null {
  const base = symbol.split(":").pop()?.replace(/USDT$/, "") || symbol;
  return COINGECKO_IDS[base.toUpperCase()] || null;
}

async function getYearCryptoCandlesFromCoinGecko(
  symbol: string,
  from: number,
  to: number
): Promise<FinnhubCandle> {
  const id = coingeckoIdFor(symbol);
  if (!id) {
    throw new Error(`No CoinGecko mapping for crypto symbol ${symbol}`);
  }
  const days = Math.ceil((to - from) / (24 * 3600));
  const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`;
  const res = await fetch(url, { next: { revalidate: 0 } });
  if (!res.ok) {
    throw new Error(`CoinGecko market_chart failed: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as {
    prices?: [number, number][];
    market_caps?: [number, number][];
    total_volumes?: [number, number][];
  };

  const prices = data.prices || [];
  if (prices.length === 0) {
    return { c: [], h: [], l: [], o: [], t: [], v: [], s: "no_data" };
  }

  // CoinGecko returns daily-ish points; resample to one point per UTC day
  // to mimic Finnhub's daily candles and keep arrays aligned.
  const byDay = new Map<string, { t: number; c: number; h: number; l: number; v: number }>();
  const volumes = data.total_volumes || [];
  const volByTs = new Map<number, number>(volumes.map(([ts, v]) => [ts, v]));
  for (const [ms, price] of prices) {
    const dayKey = new Date(ms).toISOString().slice(0, 10);
    const ts = Math.floor(ms / 1000);
    const prev = byDay.get(dayKey);
    if (!prev) {
      byDay.set(dayKey, { t: ts, c: price, h: price, l: price, v: volByTs.get(ms) || 0 });
    } else {
      prev.c = price; // close = last seen price of the day
      prev.h = Math.max(prev.h, price);
      prev.l = Math.min(prev.l, price);
      prev.v += volByTs.get(ms) || 0;
    }
  }

  const ordered = [...byDay.values()].sort((a, b) => a.t - b.t);
  return {
    t: ordered.map((d) => d.t),
    c: ordered.map((d) => d.c),
    h: ordered.map((d) => d.h),
    l: ordered.map((d) => d.l),
    o: ordered.map((d) => d.c), // CoinGecko has no OHLC; approximate open = close
    v: ordered.map((d) => d.v),
    s: "ok",
  };
}

/**
 * Compute RSI (14-period) from close prices
 */
export function computeRSI(closes: number[], period = 14): number {
  if (closes.length < period + 1) return 50;
  const deltas = closes.slice(1).map((c, i) => c - closes[i]);
  const gains = deltas.map((d) => (d > 0 ? d : 0));
  const losses = deltas.map((d) => (d < 0 ? -d : 0));
  let avgGain = gains.slice(0, period).reduce((a, b) => a + b, 0) / period;
  let avgLoss = losses.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < deltas.length; i++) {
    avgGain = (avgGain * (period - 1) + gains[i]) / period;
    avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
  }
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return Math.round(100 - 100 / (1 + rs));
}

/**
 * Compute Simple Moving Average
 */
export function computeSMA(closes: number[], period: number): number {
  if (closes.length < period) return closes[closes.length - 1];
  const slice = closes.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

/**
 * Find support (recent low) and resistance (recent high) from last 90 days
 */
export function findSupportResistance(
  highs: number[],
  lows: number[]
): { support: number; resistance: number } {
  const last90Lows = lows.slice(-90);
  const last90Highs = highs.slice(-90);
  return {
    support: Math.min(...last90Lows),
    resistance: Math.max(...last90Highs),
  };
}
