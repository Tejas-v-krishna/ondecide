import { ResearchStateType } from "../state";
import { getProfile } from "@/lib/finnhub";

// Known crypto mappings
const CRYPTO_MAP: Record<string, string> = {
  BTC: "BINANCE:BTCUSDT",
  ETH: "BINANCE:ETHUSDT",
  SOL: "BINANCE:SOLUSDT",
  BNB: "BINANCE:BNBUSDT",
  ADA: "BINANCE:ADAUSDT",
  XRP: "BINANCE:XRPUSDT",
  DOGE: "BINANCE:DOGEUSDT",
  DOT: "BINANCE:DOTUSDT",
  AVAX: "BINANCE:AVAXUSDT",
  MATIC: "BINANCE:MATICUSDT",
  LINK: "BINANCE:LINKUSDT",
  LTC: "BINANCE:LTCUSDT",
  UNI: "BINANCE:UNIUSDT",
  ATOM: "BINANCE:ATOMUSDT",
  BITCOIN: "BINANCE:BTCUSDT",
  ETHEREUM: "BINANCE:ETHUSDT",
  SOLANA: "BINANCE:SOLUSDT",
};

const CRYPTO_NAMES: Record<string, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  SOL: "Solana",
  BNB: "BNB",
  ADA: "Cardano",
  XRP: "XRP",
  DOGE: "Dogecoin",
  DOT: "Polkadot",
  AVAX: "Avalanche",
  MATIC: "Polygon",
  LINK: "Chainlink",
  LTC: "Litecoin",
  UNI: "Uniswap",
  ATOM: "Cosmos",
};

export async function resolveNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const raw = state.query.trim().toUpperCase();

  // Check if it's a known crypto
  if (CRYPTO_MAP[raw]) {
    return {
      ticker: CRYPTO_MAP[raw],
      assetType: "crypto",
      companyName: CRYPTO_NAMES[raw] || raw,
    };
  }

  // Check if input is something like "BINANCE:BTCUSDT"
  if (raw.includes(":")) {
    const parts = raw.split(":");
    const base = parts[1].replace("USDT", "").replace("BTC", "");
    return {
      ticker: raw,
      assetType: "crypto",
      companyName: CRYPTO_NAMES[base] || base,
    };
  }

  // Try as stock ticker — validate via Finnhub profile
  try {
    const profile = await getProfile(raw);
    if (profile && profile.name) {
      return {
        ticker: raw,
        assetType: "stock",
        companyName: profile.name,
      };
    }
  } catch {
    // Profile fetch failed — try as name search
  }

  // Try Finnhub symbol search
  try {
    const searchRes = await fetch(
      `https://finnhub.io/api/v1/search?q=${encodeURIComponent(state.query)}&token=${process.env.FINNHUB_API_KEY}`
    );
    const data = await searchRes.json();
    if (data.result && data.result.length > 0) {
      // Find best match — prefer exact ticker or common stock type
      const match =
        data.result.find(
          (r: { type: string; symbol: string }) => r.type === "Common Stock" && r.symbol === raw
        ) ||
        data.result.find((r: { type: string }) => r.type === "Common Stock") ||
        data.result[0];

      if (match) {
        return {
          ticker: match.symbol,
          assetType: "stock",
          companyName: match.description,
        };
      }
    }
  } catch {
    // Fall through to error
  }

  // Could not resolve
  throw new Error(
    `Could not resolve "${state.query}" to a valid ticker. Please try with the exact stock symbol (e.g., AAPL, RELIANCE.NS).`
  );
}
