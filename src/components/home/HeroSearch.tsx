"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Search, X } from "lucide-react";

const RECENT = [
  { ticker: "MSFT", name: "Microsoft Corporation", tint: "bg-[#2F6BD8]" },
  { ticker: "TSLA", name: "Tesla, Inc.", tint: "bg-[#4C8BE8]" },
  { ticker: "GOOGL", name: "Alphabet Inc.", tint: "bg-[#6AA4F2]" },
];

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
      <h2 className="text-[22px] font-medium leading-tight tracking-[-0.01em] text-ink">
        Search any company
      </h2>
      <p className="mt-1.5 text-[12px] text-ink-500">Start with a ticker or company name.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(value);
        }}
        className="mt-6"
      >
        <div className="flex h-[52px] items-center gap-3 rounded-[5px] border border-line bg-white px-4 transition-colors focus-within:border-brand-600">
          <Search className="h-4 w-4 flex-none text-ink-300" strokeWidth={1.8} />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            spellCheck={false}
            aria-label="Search any company"
            placeholder="Ticker or company name"
            className="min-w-0 flex-1 bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-400"
          />
          {value && (
            <button
              type="button"
              onClick={() => setValue("")}
              aria-label="Clear search"
              className="flex h-5 w-5 flex-none items-center justify-center text-ink-300 transition-colors hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={1.6} />
            </button>
          )}
        </div>

        {/* Autocomplete panel */}
        <div className="mt-3 overflow-hidden rounded-[6px] border border-line bg-white shadow-[0_2px_10px_rgba(10,15,30,0.06)]">
          <button
            type="button"
            onClick={() => go("AAPL")}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-subtle"
          >
            <span className="flex h-5 w-5 flex-none items-center justify-center rounded-[3px] bg-gradient-to-br from-brand-500 to-brand-700 text-[8px] font-semibold text-white">
              A
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] leading-tight text-ink">Apple Inc.</span>
              <span className="mt-0.5 block truncate text-[9.5px] text-ink-400">NASDAQ · AAPL</span>
            </span>
            <ArrowRight className="h-4 w-4 flex-none text-brand-600" strokeWidth={1.8} />
          </button>

          <div className="border-t border-line-soft px-4 pb-2 pt-3">
            <p className="text-[8px] font-medium uppercase tracking-[0.14em] text-ink-400">
              Recent searches
            </p>
            <ul className="mt-2 space-y-0.5">
              {RECENT.map((r) => (
                <li key={r.ticker}>
                  <button
                    type="button"
                    onClick={() => go(r.ticker)}
                    className="flex w-full items-center gap-2.5 rounded-[3px] py-1 text-left transition-colors hover:bg-surface-subtle"
                  >
                    <span
                      className={`flex h-3.5 w-3.5 flex-none items-center justify-center rounded-full ${r.tint} text-[6px] font-bold text-white`}
                    >
                      {r.ticker[0]}
                    </span>
                    <span className="w-10 flex-none text-[9px] font-medium text-ink-500">
                      {r.ticker}
                    </span>
                    <span className="truncate text-[9px] text-ink-400">{r.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>

      <p className="mt-3 text-[10px] text-ink-400">
        Tip: You can search by company name or ticker symbol.
      </p>
    </div>
  );
}
