import type { CompanySnapshot } from "@/types";
import Image from "next/image";

interface CompanySnapshotProps {
  data: CompanySnapshot;
}

export function CompanySnapshotSection({ data }: CompanySnapshotProps) {
  const isPositive = data.dayChange >= 0;
  const changeColor = isPositive ? "text-emerald-400" : "text-rose-400";
  const changeBg = isPositive ? "bg-emerald-400/10 border-emerald-400/20" : "bg-rose-400/10 border-rose-400/20";

  return (
    <div className="rounded-xl border border-zinc-800/60 bg-zinc-950 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {/* Logo */}
          {data.logo ? (
            <div className="w-12 h-12 rounded-xl border border-zinc-800 bg-white overflow-hidden flex-shrink-0">
              <Image src={data.logo} alt={data.name} width={48} height={48} className="w-full h-full object-contain p-1" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-xl border border-zinc-800 bg-zinc-900 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-emerald-400">{data.ticker.slice(0, 2)}</span>
            </div>
          )}

          {/* Name, ticker, sector */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white leading-none">{data.name}</h1>
              <span className="font-sans text-xs text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">{data.ticker}</span>
              {data.assetType === "crypto" && (
                <span className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-full">Crypto</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
              <span>{data.sector}</span>
              <span>·</span>
              <span>{data.exchange}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="text-left sm:text-right flex-shrink-0">
          <div className="text-2xl sm:text-3xl font-bold font-sans text-white leading-none">
            {data.currency} {data.currentPrice.toFixed(2)}
          </div>
          <div className={`inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full border text-xs font-medium ${changeBg} ${changeColor}`}>
            <span>{isPositive ? "▲" : "▼"}</span>
            <span>{Math.abs(data.dayChangePercent).toFixed(2)}%</span>
            <span className="text-[10px] opacity-70">({isPositive ? "+" : ""}{data.dayChange.toFixed(2)})</span>
          </div>
        </div>
      </div>
    </div>
  );
}
