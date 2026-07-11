import type { Metadata } from "next";
import Link from "next/link";

interface Platform {
  name: string;
  url: string;
  note: string;
  isInternal?: boolean;
}

export const metadata: Metadata = {
  title: "Explore Investment Options — OnDecide",
  description:
    "Explore different asset classes — stocks, ETFs, mutual funds, government bonds, and real estate. Educational guides and links to trusted platforms.",
};

const ASSET_CATEGORIES = [
  {
    id: "stocks",
    emoji: "📈",
    label: "Stocks",
    status: "live" as const,
    tagline: "Own a piece of a company",
    description:
      "When you buy a stock, you become a part-owner of a business. If the business grows and earns more money, your share becomes more valuable. Stocks offer the highest long-term returns of any major asset class, but also the most day-to-day volatility.",
    highlights: ["High growth potential", "Ownership in real businesses", "Can be volatile short-term", "Fully liquid — sell any trading day"],
    platforms: [
      { name: "OnDecide Research", url: "/", note: "Full AI research reports", isInternal: true },
      { name: "Screener.in", url: "https://screener.in", note: "Deep fundamental screening" },
      { name: "Tickertape", url: "https://tickertape.in", note: "Scorecard & portfolio tools" },
      { name: "Trendlyne", url: "https://trendlyne.com", note: "Analyst & institutional data" },
    ],
  },
  {
    id: "etfs",
    emoji: "🧺",
    label: "ETFs",
    status: "coming-soon" as const,
    tagline: "Instant diversification, one trade",
    description:
      "An ETF (Exchange-Traded Fund) is a basket of stocks or bonds bundled together and traded on an exchange like a single share. Buying one ETF can give you exposure to hundreds of companies — like buying a slice of the entire Nifty 50 with a single click.",
    highlights: ["Low cost, diversified", "Trades like a stock", "Transparent holdings", "No fund manager risk"],
    platforms: [
      { name: "Morningstar India", url: "https://morningstar.in", note: "ETF ratings & research" },
      { name: "NSE India ETFs", url: "https://nseindia.com/products/content/equities/etfs/etfs.htm", note: "Exchange-listed ETFs" },
      { name: "Zerodha Varsity", url: "https://zerodha.com/varsity/module/markets-and-taxation/chapter/etf-basics/", note: "ETF education" },
    ],
  },
  {
    id: "mutual-funds",
    emoji: "🏦",
    label: "Mutual Funds",
    status: "coming-soon" as const,
    tagline: "Professional management, pooled capital",
    description:
      "A mutual fund pools money from many investors and a professional fund manager invests it on their behalf — in stocks, bonds, or both. Unlike ETFs, mutual funds are priced once a day (at NAV) and actively managed, meaning you're paying for expertise.",
    highlights: ["Managed by professionals", "Choose by risk appetite", "Start with ₹500/month via SIP", "Regulated by SEBI"],
    platforms: [
      { name: "Value Research Online", url: "https://valueresearchonline.com", note: "Fund ratings & portfolio tools" },
      { name: "ET Money", url: "https://etmoney.com", note: "Direct plan investing" },
      { name: "Groww", url: "https://groww.in", note: "Beginner-friendly fund investing" },
      { name: "AMFI India", url: "https://amfiindia.com", note: "Official fund database" },
    ],
  },
  {
    id: "bonds",
    emoji: "🏛️",
    label: "Government Bonds",
    status: "coming-soon" as const,
    tagline: "Lend to the government, earn interest",
    description:
      "When you buy a government bond, you're lending money to the government (central or state) at a fixed interest rate for a set period. At the end, you get your money back plus interest. Bonds are among the safest investments — the Indian government has never defaulted on a rupee-denominated bond.",
    highlights: ["Sovereign guarantee", "Fixed, predictable returns", "Tax-free options available (54EC)", "Lower returns than stocks"],
    platforms: [
      { name: "RBI Retail Direct", url: "https://rbiretaildirect.org.in", note: "Buy G-Secs directly from RBI" },
      { name: "NSE goBID", url: "https://nseindia.com/invest/goBID", note: "Government bond platform" },
      { name: "CCIL India", url: "https://ccilindia.com", note: "Bond market data" },
    ],
  },
  {
    id: "real-estate",
    emoji: "🏢",
    label: "Real Estate",
    status: "coming-soon" as const,
    tagline: "Tangible assets, rental income, capital appreciation",
    description:
      "Real estate investing means owning property — physical (apartments, commercial space) or via REITs (Real Estate Investment Trusts, which trade on stock exchanges). Physical property requires large capital; REITs let you invest with as little as ₹300.",
    highlights: ["Tangible, physical asset", "Rental income + appreciation", "REITs offer stock-like liquidity", "High entry cost for direct property"],
    platforms: [
      { name: "CRE Matrix", url: "https://crematrix.com", note: "Commercial real estate data" },
      { name: "PropEquity", url: "https://propequity.in", note: "Property market analytics" },
      { name: "SEBI REITs", url: "https://sebi.gov.in/sebiweb/other/OtherAction.do?doReits=yes", note: "Listed REITs in India" },
      { name: "NoBroker", url: "https://nobroker.in", note: "Direct property search" },
    ],
  },
];

export default function ExplorePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Explore Investment Options</h1>
        <p className="text-slate-400 leading-relaxed max-w-2xl">
          OnDecide currently supports <strong className="text-slate-200">stocks and crypto</strong> with full AI research reports.
          For other asset classes, here&apos;s what each one is, why it matters, and where to go deeper.
        </p>
      </div>

      {/* Asset categories */}
      <div className="space-y-6">
        {ASSET_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={`rounded-xl border bg-navy-800 overflow-hidden ${
              cat.status === "live"
                ? "border-emerald-500/30"
                : "border-slate-800"
            }`}
          >
            <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-100">{cat.label}</h2>
                    {cat.status === "live" ? (
                      <span className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded-full font-medium">
                        ✓ Live on OnDecide
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">{cat.tagline}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Description + highlights */}
              <div className="lg:col-span-2 space-y-4">
                <p className="text-slate-300 leading-relaxed">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.highlights.map((h) => (
                    <span key={h} className="text-xs text-slate-400 bg-navy-900 border border-slate-800 px-2.5 py-1 rounded-full">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform links */}
              <div>
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  {cat.status === "live" ? "Research tools" : "Go deeper"}
                </h3>
                <div className="space-y-2">
                  {(cat.platforms as Platform[]).map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target={p.isInternal ? "_self" : "_blank"}
                      rel={p.isInternal ? undefined : "noopener noreferrer"}
                      className="flex items-center justify-between group px-3 py-2.5 rounded-lg border border-slate-800 hover:border-slate-600 bg-navy-900 hover:bg-navy-750 transition-all"
                    >
                      <div>
                        <div className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                          {p.name}
                        </div>
                        <div className="text-xs text-slate-500">{p.note}</div>
                      </div>
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>

                {cat.status === "live" && (
                  <Link
                    href="/"
                    className="mt-3 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
                  >
                    Search {cat.label} on OnDecide →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div className="mt-10 p-5 rounded-xl border border-slate-800 bg-navy-800 text-center">
        <p className="text-slate-400 text-sm">
          OnDecide is expanding to cover ETFs and mutual funds in a future release.{" "}
          <span className="text-slate-200">
            For now, no user leaves empty-handed — every asset class above has a clear explanation and trusted platform links.
          </span>
        </p>
      </div>
    </div>
  );
}
