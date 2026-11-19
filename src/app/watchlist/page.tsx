"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Lock, ClipboardList } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import type { WatchlistItem } from "@/types";

function PriceChange({ price }: { price?: number }) {
  if (price === undefined || price === null)
    return <span className="font-mono text-sm text-ink-400">—</span>;
  return <span className="font-mono text-sm text-ink">{price.toFixed(2)}</span>;
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
      const res = await fetch(`/api/watchlist?ticker=${encodeURIComponent(ticker)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove from watchlist");
      setItems((prev) => prev.filter((i) => i.ticker !== ticker));
    } catch {
      setDeleteError(`Failed to remove ${ticker}. Please try again.`);
    } finally {
      setDeleting(null);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="shell max-w-4xl py-12">
        <div className="skeleton mb-8 h-8 w-48" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton h-20 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="shell max-w-xl py-20 text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface-subtle">
            <Lock className="h-6 w-6 text-ink-500" />
          </div>
        </div>
        <h2 className="mb-2 text-xl font-medium text-ink">Sign in to view your watchlist</h2>
        <p className="mb-6 text-ink-500">Save research reports and track companies you&apos;re watching.</p>
        <Link
          href="/sign-in"
          className="inline-flex rounded-full bg-ink px-5 py-2.5 font-medium text-white transition-colors hover:bg-ink-800"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="shell max-w-4xl py-16 lg:py-20">
      <PageHeader eyebrow="Platform" title="Watchlist">
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-ink-500">
            {items.length} {items.length === 1 ? "company" : "companies"} saved
          </p>
          <Link href="/" className="text-sm text-ink-600 transition-colors hover:text-ink">
            + Add research
          </Link>
        </div>
      </PageHeader>

      {deleteError && (
        <div className="mb-4 rounded-xl border border-avoid/20 bg-avoid/10 px-4 py-3 text-sm text-avoid">
          {deleteError}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line py-20 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface-subtle">
              <ClipboardList className="h-6 w-6 text-ink-400" />
            </div>
          </div>
          <h3 className="mb-2 text-lg font-medium text-ink">No companies saved yet</h3>
          <p className="mb-6 text-ink-500">Search for a stock or crypto and save it to your watchlist.</p>
          <Link
            href="/"
            className="inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink-800"
          >
            Start researching
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="card-surface flex items-center gap-4 p-5 transition-all hover:border-line-strong"
            >
              {/* Ticker badge */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-line bg-surface-subtle">
                <span className="font-mono text-sm font-semibold text-ink">{item.ticker.slice(0, 3)}</span>
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">{item.companyName || item.ticker}</span>
                  <span className="rounded-md bg-surface-subtle px-1.5 py-0.5 font-mono text-xs text-ink-500">
                    {item.ticker}
                  </span>
                  {item.assetType === "crypto" && (
                    <span className="rounded-md bg-hold/10 px-1.5 py-0.5 text-xs text-hold">Crypto</span>
                  )}
                </div>
                <div className="mt-0.5 flex items-center gap-3">
                  {item.sector && <span className="text-xs text-ink-500">{item.sector}</span>}
                  <span className="text-xs text-ink-400">
                    Saved {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex-shrink-0 text-right">
                <PriceChange price={item.currentPrice} />
              </div>

              {/* Actions */}
              <div className="flex flex-shrink-0 items-center gap-2">
                <Link
                  href={`/research/${item.ticker}`}
                  className="whitespace-nowrap rounded-full bg-ink px-3.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-ink-800"
                >
                  View report
                </Link>
                <button
                  onClick={() => handleDelete(item.ticker)}
                  disabled={deleting === item.ticker}
                  className="rounded-full px-2.5 py-1.5 text-xs text-ink-500 transition-colors hover:bg-avoid/10 hover:text-avoid disabled:opacity-50"
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
