"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import type { WatchlistItem } from "@/types";

function PriceChange({ price }: { price?: number }) {
  if (!price) return <span className="text-slate-600 font-mono text-sm">—</span>;
  return <span className="font-mono text-sm text-slate-200">${price.toFixed(2)}</span>;
}

export default function WatchlistPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    fetch("/api/watchlist")
      .then((r) => r.json())
      .then((data) => setItems(data.watchlist || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [isSignedIn, isLoaded]);

  const handleDelete = async (ticker: string) => {
    setDeleting(ticker);
    try {
      await fetch(`/api/watchlist?ticker=${ticker}`, { method: "DELETE" });
      setItems((prev) => prev.filter((i) => i.ticker !== ticker));
    } finally {
      setDeleting(null);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="h-8 w-48 skeleton mb-8" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 skeleton rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-xl font-bold text-slate-100 mb-2">Sign in to view your watchlist</h2>
        <p className="text-slate-400 mb-6">Save research reports and track companies you&apos;re watching.</p>
        <Link href="/sign-in" className="inline-flex px-5 py-2.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Watchlist</h1>
          <p className="text-slate-500 text-sm mt-1">{items.length} {items.length === 1 ? "company" : "companies"} saved</p>
        </div>
        <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
          + Add research
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No companies saved yet</h3>
          <p className="text-slate-500 mb-6">Search for a stock or crypto and save it to your watchlist.</p>
          <Link href="/" className="inline-flex px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm hover:bg-emerald-500/20 transition-colors">
            Start researching
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-4 rounded-xl border border-slate-800 bg-navy-800 hover:border-slate-700 transition-all group">
              {/* Ticker badge */}
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                <span className="font-mono font-bold text-emerald-400 text-sm">{item.ticker.slice(0, 3)}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-100">{item.companyName || item.ticker}</span>
                  <span className="font-mono text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{item.ticker}</span>
                  {item.assetType === "crypto" && (
                    <span className="text-xs text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Crypto</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  {item.sector && <span className="text-xs text-slate-500">{item.sector}</span>}
                  <span className="text-xs text-slate-600">
                    Saved {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <PriceChange price={item.currentPrice} />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href={`/research/${item.ticker}`}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs hover:bg-emerald-500/20 transition-colors"
                >
                  View report
                </Link>
                <button
                  onClick={() => handleDelete(item.ticker)}
                  disabled={deleting === item.ticker}
                  className="px-2 py-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 transition-colors text-xs"
                >
                  {deleting === item.ticker ? "..." : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
