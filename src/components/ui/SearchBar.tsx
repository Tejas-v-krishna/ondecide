"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

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
        <div className={`relative flex items-center rounded-xl border border-zinc-800 bg-zinc-950 transition-all duration-200 ${focused ? "border-white " : "hover:border-zinc-700"}`}>
          <svg className={`absolute left-4 text-zinc-400 ${large ? "w-5 h-5" : "w-4 h-4"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder={large ? "Search by ticker or company name (AAPL, Apple, BTC...)" : "Search stocks or crypto..."}
            className={`w-full bg-transparent text-white placeholder-zinc-500 outline-none ${large ? "py-4 pl-12 pr-4 text-lg" : "py-2.5 pl-10 pr-4 text-sm"}`}
          />
          {loading && (
            <div className="absolute right-4 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      </form>

      {showDropdown && (
        <div className="absolute z-50 w-full mt-2 rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl overflow-hidden">
          {results.length === 0 && (
            <div className="px-4 py-2 text-xs text-zinc-500 uppercase tracking-wider">Popular</div>
          )}
          {displayResults.map((r) => (
            <button
              key={r.symbol}
              onMouseDown={() => handleSelect(r.symbol)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-900 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-xs font-sans font-bold text-white flex-shrink-0">
                {r.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{r.symbol}</div>
                <div className="text-xs text-zinc-400 truncate">{r.description}</div>
              </div>
              <span className="ml-auto text-2xs text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded">{r.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
