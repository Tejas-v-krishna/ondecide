import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

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
    status: "live" as const,
    tagline: "Instant diversification, one trade",
    description:
      "An ETF (Exchange-Traded Fund) is a basket of stocks or bonds bundled together and traded on an exchange like a single share. Buying one ETF can give you exposure to hundreds of companies — like buying a slice of the entire Nifty 50 with a single click.",
    highlights: ["Low cost, diversified", "Trades like a stock", "Transparent holdings", "No fund manager risk"],
    platforms: [
      { name: "OnDecide Research", url: "/", note: "Full AI research reports", isInternal: true },
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
    <div className="shell max-w-5xl py-16 lg:py-20">
      <PageHeader
        eyebrow="Platform"
        title="Explore Investment Options"
        description={
          <>
            OnDecide currently supports{" "}
            <strong className="font-medium text-ink">stocks, ETFs, and crypto</strong> with full AI
            research reports. For other asset classes, here&apos;s what each one is, why it matters,
            and where to go deeper.
          </>
        }
      />

      {/* Asset categories */}
      <div className="space-y-6">
        {ASSET_CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            className={`overflow-hidden rounded-2xl border bg-surface ${
              cat.status === "live" ? "border-brand-200" : "border-line"
            }`}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cat.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-medium text-ink">{cat.label}</h2>
                    {cat.status === "live" ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                        <Check className="h-3 w-3" /> Live on OnDecide
                      </span>
                    ) : (
                      <span className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-ink-500">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-ink-500">{cat.tagline}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 px-6 py-5 lg:grid-cols-3">
              {/* Description + highlights */}
              <div className="space-y-4 lg:col-span-2">
                <p className="leading-relaxed text-ink-600">{cat.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs text-ink-500"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Platform links */}
              <div>
                <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-ink-400">
                  {cat.status === "live" ? "Research tools" : "Go deeper"}
                </h3>
                <div className="space-y-2">
                  {(cat.platforms as Platform[]).map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target={p.isInternal ? "_self" : "_blank"}
                      rel={p.isInternal ? undefined : "noopener noreferrer"}
                      className="group flex items-center justify-between rounded-xl border border-line bg-paper px-3 py-2.5 transition-all hover:border-line-strong hover:bg-surface-subtle"
                    >
                      <div>
                        <div className="text-sm font-medium text-ink transition-colors">
                          {p.name}
                        </div>
                        <div className="text-xs text-ink-500">{p.note}</div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-ink-400 transition-colors group-hover:text-brand-600" />
                    </a>
                  ))}
                </div>

                {cat.status === "live" && (
                  <Link
                    href="/"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
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
      <div className="mt-10 rounded-2xl border border-line bg-surface-subtle p-5 text-center">
        <p className="text-sm text-ink-500">
          OnDecide is actively expanding to cover mutual funds, bonds, and real estate in a future
          release.{" "}
          <span className="font-medium text-ink">
            For now, no user leaves empty-handed — every asset class above has a clear explanation and
            trusted platform links.
          </span>
        </p>
      </div>
    </div>
  );
}
