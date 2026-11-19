"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchResult {
  symbol: string;
  description: string;
  type: string;
}

const CRYPTO_SUGGESTIONS = [
  { symbol: "BTC", description: "Bitcoin", type: "Crypto" },
  { symbol: "ETH", description: "Ethereum", type: "Crypto" },
  { symbol: "SOL", description: "Solana", type: "Crypto" },
];

export function SearchBar({ className = "", large = false }: { className?: string; large?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const router = useRouter();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 1) { setResults([]); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/symbols?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/research/${encodeURIComponent(query.trim().toUpperCase())}`);
    setFocused(false);
  };

  const handleSelect = (symbol: string) => {
    router.push(`/research/${encodeURIComponent(symbol)}`);
    setQuery("");
    setFocused(false);
  };

  const showDropdown = focused && (results.length > 0 || query.length === 0);
  const displayResults = results.length > 0 ? results : CRYPTO_SUGGESTIONS;

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div
          className={`relative flex items-center rounded-full border bg-surface transition-all duration-200 ${
            focused
              ? "border-brand-500 shadow-[0_0_0_4px_rgba(11,143,96,0.10)]"
              : "border-line shadow-sm hover:border-line-strong"
          } ${large ? "py-1.5 pl-5 pr-1.5" : "py-1 pl-4 pr-1"}`}
        >
          <Search className={`shrink-0 text-ink-400 ${large ? "h-5 w-5" : "h-4 w-4"}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder={large ? "Search by ticker or company name (AAPL, Apple, BTC...)" : "Search stocks or crypto..."}
            className={`w-full bg-transparent text-ink placeholder:text-ink-400 outline-none ${
              large ? "px-3 text-base h-11" : "px-2.5 text-sm h-8"
            }`}
          />
          {loading && (
            <div
              className={`mx-3 shrink-0 animate-spin rounded-full border-2 border-ink-300 border-t-brand-600 ${
                large ? "h-5 w-5" : "h-4 w-4"
              }`}
            />
          )}
          <button
            type="submit"
            className={`ml-2 shrink-0 rounded-full bg-ink font-medium text-white transition-colors hover:bg-ink-800 ${
              large ? "h-11 px-7 text-sm" : "h-8 px-4 text-xs"
            }`}
          >
            Search
          </button>
        </div>
      </form>

      {showDropdown && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
          {results.length === 0 && (
            <div className="px-4 py-2.5 text-2xs font-medium uppercase tracking-wider text-ink-400">
              Popular
            </div>
          )}
          {displayResults.map((r) => (
            <button
              key={r.symbol}
              onMouseDown={() => handleSelect(r.symbol)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-subtle"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-xs font-semibold text-ink">
                {r.symbol.slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-ink">{r.symbol}</div>
                <div className="truncate text-xs text-ink-500">{r.description}</div>
              </div>
              <span className="ml-auto rounded-md bg-surface-subtle px-2 py-0.5 text-2xs text-ink-500">
                {r.type}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
