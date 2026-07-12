"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
          averageBuyPrice: Number(buyPrice)
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
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
          saved
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
            : "bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700"
        }`}
      >
        {saved ? (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            In Portfolio
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add to Portfolio
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
          <div className="bg-black border border-zinc-800/60 rounded-xl p-6 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-bold text-white mb-1">Add {ticker} to Portfolio</h3>
            <p className="text-sm text-zinc-400 mb-6">Enter your holding details to track P&L.</p>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Quantity</label>
                <input
                  type="number"
                  step="any"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. 10.5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1">Average Buy Price ($)</label>
                <input
                  type="number"
                  step="any"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {error && <div className="text-red-400 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-emerald-500 text-zinc-900 font-bold py-2.5 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50"
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
