"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import type { WatchlistItem } from "@/types";

function PriceChange({ price }: { price?: number }) {
  // Fix: use explicit null/undefined check so price=0 renders correctly
  if (price === undefined || price === null) return <span className="text-zinc-600 font-sans text-sm">—</span>;
  return <span className="font-sans text-sm text-zinc-100">${price.toFixed(2)}</span>;
}

export default function WatchlistPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
    setDeleteError(null);
    try {
      const res = await fetch(`/api/watchlist?ticker=${encodeURIComponent(ticker)}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove from watchlist");
      // Only remove from UI state after confirmed success
      setItems((prev) => prev.filter((i) => i.ticker !== ticker));
    } catch {
      setDeleteError(`Failed to remove ${ticker}. Please try again.`);
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
        <h2 className="text-xl font-serif text-white mb-2">Sign in to view your watchlist</h2>
        <p className="text-zinc-400 mb-6">Save research reports and track companies you&apos;re watching.</p>
        <Link href="/sign-in" className="inline-flex px-5 py-2.5 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition-colors">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif text-white">Watchlist</h1>
          <p className="text-zinc-500 text-sm mt-1">{items.length} {items.length === 1 ? "company" : "companies"} saved</p>
        </div>
        <Link href="/" className="text-sm text-zinc-300 hover:text-white transition-colors">
          + Add research
        </Link>
      </div>

      {deleteError && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          {deleteError}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-zinc-800/60 rounded-xl">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-serif text-zinc-300 mb-2">No companies saved yet</h3>
          <p className="text-zinc-500 mb-6">Search for a stock or crypto and save it to your watchlist.</p>
          <Link href="/" className="inline-flex px-4 py-2 rounded-lg bg-zinc-100 border border-zinc-300 text-black text-sm hover:bg-white transition-colors">
            Start researching
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 px-5 py-4 rounded-xl border border-zinc-800/60 bg-zinc-950 hover:border-zinc-800 transition-all">
              {/* Ticker badge */}
              <div className="w-12 h-12 rounded border border-zinc-800 bg-black flex items-center justify-center flex-shrink-0">
                <span className="font-sans font-bold text-white text-sm">{item.ticker.slice(0, 3)}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-white">{item.companyName || item.ticker}</span>
                  <span className="font-sans text-xs text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded">{item.ticker}</span>
                  {item.assetType === "crypto" && (
                    <span className="text-xs text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Crypto</span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  {item.sector && <span className="text-xs text-zinc-500">{item.sector}</span>}
                  <span className="text-xs text-zinc-600">
                    Saved {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right flex-shrink-0">
                <PriceChange price={item.currentPrice} />
              </div>

              {/* Actions — always visible (was hover-only, broken on mobile) */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/research/${item.ticker}`}
                  className="px-3 py-1.5 rounded bg-zinc-100 border border-zinc-300 text-black text-xs hover:bg-white transition-colors whitespace-nowrap"
                >
                  View report
                </Link>
                <button
                  onClick={() => handleDelete(item.ticker)}
                  disabled={deleting === item.ticker}
                  className="px-2 py-1.5 rounded text-zinc-600 hover:text-white hover:bg-zinc-800 transition-colors text-xs disabled:opacity-50"
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
