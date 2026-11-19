"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const RECENT = [
  { ticker: "MSFT", name: "Microsoft Corporation" },
  { ticker: "TSLA", name: "Tesla, Inc." },
  { ticker: "GOOGL", name: "Alphabet Inc." },
];

function TickerTile({ label }: { label: string }) {
  return (
    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-[3px] bg-brand-50 text-[11px] font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
      {label.slice(0, 2)}
    </span>
  );
}

/**
 * Product shot of the ticker search: a working input with the autocomplete
 * panel left open, exactly as the marketing design presents it.
 */
export function HeroSearch() {
  const router = useRouter();
  const [value, setValue] = useState("AAPL");

  const go = (ticker: string) => {
    const t = ticker.trim().toUpperCase();
    if (!t) return;
    router.push(`/research/${encodeURIComponent(t)}`);
  };

  return (
    <div className="w-full max-w-[460px]">
      <h2 className="text-[26px] font-medium leading-tight text-ink">Search any company</h2>
      <p className="mt-1 text-[13px] text-ink-500">Start with a ticker or company name.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
        className="relative mt-5"
      >
        <div className="flex h-11 items-center gap-2 rounded-[4px] border border-line bg-white px-3 shadow-xs transition-colors focus-within:border-brand-600">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            aria-label="Search any company"
            placeholder="Ticker or company name"
            className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-ink-400"
          />
          {value && (
            <button
              type="button"
              onClick={() => setValue("")}
              aria-label="Clear search"
              className="flex h-4 w-4 flex-none items-center justify-center rounded-full text-ink-400 transition-colors hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Autocomplete panel */}
        <div className="mt-2 overflow-hidden rounded-[5px] border border-line bg-white shadow-sm">
          <button
            type="button"
            onClick={() => go("AAPL")}
            className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-surface-subtle"
          >
            <TickerTile label="AAPL" />
            <span className="min-w-0">
              <span className="block truncate text-[13px] font-medium text-ink">Apple Inc.</span>
              <span className="block truncate text-[11.5px] text-ink-400">NASDAQ · AAPL</span>
            </span>
          </button>

          <div className="border-t border-line-soft px-3 pb-1 pt-3">
            <p className="text-3xs font-semibold uppercase tracking-[0.12em] text-ink-400">
              Recent searches
            </p>
            <ul className="mt-1.5">
              {RECENT.map((r) => (
                <li key={r.ticker}>
                  <button
                    type="button"
                    onClick={() => go(r.ticker)}
                    className="flex w-full items-baseline gap-2 rounded-[3px] py-1 text-left transition-colors hover:text-brand-700"
                  >
                    <span className="w-12 flex-none text-[12px] font-medium text-ink">{r.ticker}</span>
                    <span className="truncate text-[12px] text-ink-500">{r.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <p className="border-t border-line-soft px-3 py-2.5 text-[11px] text-ink-400">
            Tip: You can search by company name or ticker symbol.
          </p>
        </div>
      </form>
    </div>
  );
}
