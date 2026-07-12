import type { CompanySnapshot } from "@/types";
import Image from "next/image";

function formatMarketCap(cap: number, currency: string) {
  if (cap >= 1000) return `${currency} ${(cap / 1000).toFixed(2)}T`;
  if (cap >= 1) return `${currency} ${cap.toFixed(2)}B`;
  return `${currency} ${(cap * 1000).toFixed(0)}M`;
}

interface CompanySnapshotProps {
  data: CompanySnapshot;
}

export function CompanySnapshotSection({ data }: CompanySnapshotProps) {
  const isPositive = data.dayChange >= 0;
  const changeColor = isPositive ? "text-emerald-400" : "text-rose-400";
  const changeBg = isPositive ? "bg-emerald-400/10 border-emerald-400/20" : "bg-rose-400/10 border-rose-400/20";

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 p-6">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Logo */}
        {data.logo ? (
          <div className="w-14 h-14 rounded-xl border border-zinc-800 bg-white overflow-hidden flex-shrink-0">
            <Image src={data.logo} alt={data.name} width={56} height={56} className="w-full h-full object-contain p-1" />
          </div>
        ) : (
          <div className="w-14 h-14 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center flex-shrink-0">
            <span className="text-xl font-bold text-emerald-400">{data.ticker.slice(0, 2)}</span>
          </div>
        )}

        {/* Name, ticker, sector */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-white">{data.name}</h1>
            <span className="font-sans text-sm text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">{data.ticker}</span>
            {data.assetType === "crypto" && (
              <span className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">Crypto</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-sm text-zinc-400">
            <span>{data.sector}</span>
            <span>·</span>
            <span>{data.exchange}</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-right flex-shrink-0">
          <div className="text-3xl font-bold font-sans text-white">
            {data.currency} {data.currentPrice.toFixed(2)}
          </div>
          <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full border text-sm font-medium ${changeBg} ${changeColor}`}>
            <span>{isPositive ? "▲" : "▼"}</span>
            <span>{Math.abs(data.dayChangePercent).toFixed(2)}%</span>
            <span className="text-xs opacity-70">({isPositive ? "+" : ""}{data.dayChange.toFixed(2)})</span>
          </div>
        </div>
      </div>

      {/* Market cap */}
      {data.marketCap > 0 && (
        <div className="mt-3 pt-3 border-t border-zinc-800/60">
          <span className="text-sm text-zinc-500">Market Cap: </span>
          <span className="text-sm font-medium text-zinc-300">{formatMarketCap(data.marketCap, data.currency)}</span>
        </div>
      )}

      {/* Description */}
      <p className="mt-4 text-zinc-300 leading-relaxed text-sm sm:text-base">{data.description}</p>

      {data.website && (
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-3 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {data.website.replace(/^https?:\/\//, "")}
        </a>
      )}
    </div>
  );
}
