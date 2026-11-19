"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import type { ResearchReport } from "@/types";

interface SaveToWatchlistProps {
  report: ResearchReport;
  isSaved?: boolean;
  onSaved?: () => void;
}

export function SaveToWatchlist({ report, isSaved: initialSaved = false, onSaved }: SaveToWatchlistProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useAuth();

  const handleToggle = async () => {
    if (!isSignedIn) {
      window.location.href = "/sign-in";
      return;
    }

    setLoading(true);
    try {
      if (saved) {
        await fetch(`/api/watchlist?ticker=${report.ticker}`, { method: "DELETE" });
        setSaved(false);
      } else {
        await fetch("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ticker: report.ticker,
            assetType: report.assetType,
            companyName: report.companySnapshot.name,
            sector: report.companySnapshot.sector,
            currentPrice: report.companySnapshot.currentPrice,
            reportData: report,
          }),
        });
        setSaved(true);
        onSaved?.();
      }
    } catch (err) {
      console.error("Watchlist toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
        saved
          ? "border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100"
          : "border-line bg-surface text-ink-600 hover:border-line-strong hover:text-ink"
      }`}
    >
      {loading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        <svg
          className="h-4 w-4"
          fill={saved ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      )}
      {saved ? "Saved" : "Save to Watchlist"}
    </button>
  );
}
