import type { CompanySnapshot } from "@/types";
import Image from "next/image";

interface CompanySnapshotProps {
  data: CompanySnapshot;
}

export function CompanySnapshotSection({ data }: CompanySnapshotProps) {
  const isPositive = data.dayChange >= 0;
  const changeColor = isPositive ? "text-emerald-400" : "text-zinc-400";
  const changeBg = isPositive ? "bg-zinc-900/50 border-zinc-800" : "bg-zinc-900/50 border-zinc-800";

  // Format market cap
  const formatMarketCap = (num: number) => {
    if (!num) return "N/A";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div className="flex items-start gap-4 min-w-0">
          {/* Logo */}
          {data.logo ? (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-zinc-800 bg-white overflow-hidden flex-shrink-0 mt-1">
              <Image src={data.logo} alt={data.name} width={56} height={56} className="w-full h-full object-contain p-1" />
            </div>
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-xl font-bold text-emerald-400">{data.ticker.slice(0, 2)}</span>
            </div>
          )}

          {/* Name, ticker, sector */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-none tracking-tight">{data.name}</h1>
              <span className="font-sans text-xs text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">{data.ticker}</span>
              {data.assetType === "crypto" && (
                <span className="text-[10px] text-zinc-400 bg-zinc-900/50 border border-zinc-800 px-1.5 py-0.5 rounded-full">Crypto</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
              <span>{data.sector}</span>
              <span className="text-zinc-600">·</span>
              <span>{data.exchange}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-left sm:text-right flex-shrink-0 mt-2 sm:mt-0">
          <div className="text-3xl sm:text-4xl font-bold font-sans text-white leading-none tracking-tight">
            <span className="text-lg text-zinc-500 font-medium mr-1.5">{data.currency}</span>
            {data.currentPrice.toFixed(2)}
          </div>
          <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full border text-xs font-semibold ${changeBg} ${changeColor}`}>
            <span>{isPositive ? "▲" : "▼"}</span>
            <span>{Math.abs(data.dayChangePercent).toFixed(2)}%</span>
            <span className="text-[10px] opacity-70">({isPositive ? "+" : ""}{data.dayChange.toFixed(2)})</span>
          </div>
        </div>
      </div>

      {/* Description and Metadata */}
      <div className="mt-8 pt-6 border-t border-zinc-800/40">
        <h3 className="font-serif text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">About {data.name}</h3>
        <p className="text-zinc-300 leading-relaxed text-sm whitespace-pre-wrap max-w-3xl">
          {data.description || "No company description available at this time."}
        </p>
        
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="block text-zinc-500 text-xs uppercase tracking-wider mb-1">Market Cap</span>
            <span className="text-zinc-200 font-medium">{formatMarketCap(data.marketCap)}</span>
          </div>
          {data.website && (
            <div>
              <span className="block text-zinc-500 text-xs uppercase tracking-wider mb-1">Website</span>
              <a href={data.website.startsWith('http') ? data.website : `https://${data.website}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium">
                {data.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')} ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
