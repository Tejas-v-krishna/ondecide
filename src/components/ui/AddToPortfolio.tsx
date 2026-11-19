"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Plus, Check, X } from "lucide-react";

interface AddToPortfolioProps {
  ticker: string;
  assetType: string;
  companyName?: string;
  currentPrice: number;
}

export function AddToPortfolio({ ticker, assetType, companyName, currentPrice }: AddToPortfolioProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState(currentPrice.toString());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!isSignedIn) return null;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }
    if (!buyPrice || isNaN(Number(buyPrice)) || Number(buyPrice) < 0) {
      setError("Please enter a valid buy price.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticker,
          assetType,
          companyName,
          quantity: Number(quantity),
          averageBuyPrice: Number(buyPrice),
        }),
      });

      if (!res.ok) throw new Error("Failed to save to portfolio");

      setSaved(true);
      setIsOpen(false);
      router.refresh();

      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={saved}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          saved
            ? "border-brand-200 bg-brand-50 text-brand-700"
            : "border-line bg-surface text-ink-600 hover:border-line-strong hover:text-ink"
        }`}
      >
        {saved ? (
          <>
            <Check className="h-4 w-4" />
            In Portfolio
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Add to Portfolio
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-ink-400 transition-colors hover:bg-surface-subtle hover:text-ink"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="mb-1 text-lg font-medium text-ink">Add {ticker} to Portfolio</h3>
            <p className="mb-6 text-sm text-ink-500">Enter your holding details to track P&amp;L.</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Quantity</label>
                <input
                  type="number"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-ink transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                  placeholder="e.g. 10.5"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Average Buy Price ($)</label>
                <input
                  type="number"
                  step="any"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-ink transition-colors focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                  required
                />
              </div>

              {error && <div className="text-sm text-avoid">{error}</div>}

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-full bg-brand-600 py-2.5 font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Holding"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
