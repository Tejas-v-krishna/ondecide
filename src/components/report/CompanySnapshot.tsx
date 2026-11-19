import type { CompanySnapshot } from "@/types";
import Image from "next/image";

interface CompanySnapshotProps {
  data: CompanySnapshot;
}

export function CompanySnapshotSection({ data }: CompanySnapshotProps) {
  const isPositive = data.dayChange >= 0;
  const changeColor = isPositive ? "text-brand-700" : "text-avoid";
  const changeBg = isPositive ? "bg-brand-50 border-brand-200" : "bg-avoid/10 border-avoid/20";

  const formatMarketCap = (num: number) => {
    if (!num) return "N/A";
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
        <div className="flex min-w-0 items-start gap-4">
          {/* Logo */}
          {data.logo ? (
            <div className="mt-1 h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-line bg-white sm:h-14 sm:w-14">
              <Image src={data.logo} alt={data.name} width={56} height={56} className="h-full w-full object-contain p-1" />
            </div>
          ) : (
            <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-line bg-surface-subtle sm:h-14 sm:w-14">
              <span className="text-xl font-semibold text-brand-700">{data.ticker.slice(0, 2)}</span>
            </div>
          )}

          {/* Name, ticker, sector */}
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-medium leading-none tracking-tight text-ink sm:text-3xl">{data.name}</h1>
              <span className="rounded-md bg-surface-subtle px-2 py-0.5 font-mono text-xs text-ink-500">{data.ticker}</span>
              {data.assetType === "crypto" && (
                <span className="rounded-full border border-line bg-surface-subtle px-1.5 py-0.5 text-[10px] text-ink-500">Crypto</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-ink-500">
              <span>{data.sector}</span>
              <span className="text-ink-300">·</span>
              <span>{data.exchange}</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-2 flex-shrink-0 text-left sm:mt-0 sm:text-right">
          <div className="font-mono text-3xl font-semibold leading-none tracking-tight text-ink sm:text-4xl">
            <span className="mr-1.5 text-lg font-medium text-ink-400">{data.currency}</span>
            {data.currentPrice.toFixed(2)}
          </div>
          <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${changeBg} ${changeColor}`}>
            <span>{isPositive ? "▲" : "▼"}</span>
            <span>{Math.abs(data.dayChangePercent).toFixed(2)}%</span>
            <span className="text-[10px] opacity-70">
              ({isPositive ? "+" : ""}
              {data.dayChange.toFixed(2)})
            </span>
          </div>
        </div>
      </div>

      {/* Description and Metadata */}
      <div className="mt-8 border-t border-line pt-6">
        <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-ink-400">About {data.name}</h3>
        <p className="max-w-3xl whitespace-pre-wrap text-sm leading-relaxed text-ink-600">
          {data.description || "No company description available at this time."}
        </p>

        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <div>
            <span className="mb-1 block text-xs uppercase tracking-wider text-ink-400">Market Cap</span>
            <span className="font-medium text-ink">{formatMarketCap(data.marketCap)}</span>
          </div>
          {data.website && (
            <div>
              <span className="mb-1 block text-xs uppercase tracking-wider text-ink-400">Website</span>
              <a
                href={data.website.startsWith("http") ? data.website : `https://${data.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-700 transition-colors hover:text-brand-800"
              >
                {data.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
