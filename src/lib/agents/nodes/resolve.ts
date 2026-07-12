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

const CRYPTO_SYNONYMS: Record<string, string> = {
  BITCOIN: "BTC",
  ETHEREUM: "ETH",
  ETHER: "ETH",
  SOLANA: "SOL",
  BINANCE: "BNB",
  BINANCECOIN: "BNB",
  CARDANO: "ADA",
  RIPPLE: "XRP",
  DOGECOIN: "DOGE",
  POLKADOT: "DOT",
  AVALANCHE: "AVAX",
  POLYGON: "MATIC",
  CHAINLINK: "LINK",
  LITECOIN: "LTC",
  UNISWAP: "UNI",
  COSMOS: "ATOM",
};

export async function resolveNode(
  state: ResearchStateType
): Promise<Partial<ResearchStateType>> {
  const raw = state.query.trim().toUpperCase();
  const cleanRaw = raw.replace(/[^A-Z0-9]/g, "");

  // 1. Direct match on symbols (e.g. BTC)
  let resolvedSymbol = CRYPTO_MAP[cleanRaw] ? cleanRaw : null;

  // 2. Direct match on synonyms (e.g. BITCOIN)
  if (!resolvedSymbol) {
    resolvedSymbol = CRYPTO_SYNONYMS[cleanRaw] || null;
  }

  // 3. Fuzzy search for prefix matching (e.g. "bitco" -> "BITCOIN" -> "BTC")
  if (!resolvedSymbol && cleanRaw.length >= 3) {
    // Check if cleanRaw is a prefix of any synonym/symbol, or vice-versa
    const foundSynonym = Object.keys(CRYPTO_SYNONYMS).find(
      (key) => key.startsWith(cleanRaw) || cleanRaw.startsWith(key)
    );
    if (foundSynonym) {
      resolvedSymbol = CRYPTO_SYNONYMS[foundSynonym];
    } else {
      const foundSymbol = Object.keys(CRYPTO_MAP).find(
        (key) => key.startsWith(cleanRaw) || cleanRaw.startsWith(key)
      );
      if (foundSymbol) {
        resolvedSymbol = foundSymbol;
      }
    }
  }

  // If resolved to a known crypto ticker
  if (resolvedSymbol && CRYPTO_MAP[resolvedSymbol]) {
    return {
      ticker: CRYPTO_MAP[resolvedSymbol],
      assetType: "crypto",
      companyName: CRYPTO_NAMES[resolvedSymbol] || resolvedSymbol,
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

  // Check if it's a government bond search
  const rawLower = state.query.toLowerCase();
  if (
    rawLower.includes("bond") || 
    rawLower.includes("yield") || 
    rawLower.includes("treasury") || 
    rawLower.includes("g-sec") ||
    rawLower.includes("gsec")
  ) {
    return {
      ticker: raw,
      assetType: "bond",
      companyName: state.query,
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
      const exactMatch = data.result.find((r: { symbol?: string }) => r.symbol === raw);
      const stockMatch = data.result.find((r: { type?: string; symbol?: string }) => r.type === "Common Stock" && r.symbol === raw);
      const etpMatch = data.result.find((r: { type?: string; symbol?: string }) => (r.type === "ETP" || r.type === "ETF") && r.symbol === raw);
      
      const match = stockMatch || etpMatch || exactMatch || data.result[0];

      if (match) {
        const isETF = match.type === "ETP" || match.type === "ETF" || match.description.toUpperCase().includes(" ETF");
        const isMutualFund = match.type === "Mutual Fund" || match.symbol.endsWith("X");

        return {
          ticker: match.symbol,
          assetType: isETF ? "etf" : isMutualFund ? "mutual_fund" : "stock",
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
