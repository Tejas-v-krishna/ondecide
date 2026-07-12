"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const formatCurrency = (val: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

interface PortfolioItem {
  id: string;
  ticker: string;
  asset_type: string;
  company_name: string | null;
  quantity: number;
  average_buy_price: number;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // We will need live prices to calculate P&L. For now, we will just display holdings.
  // In the next step, we will wire up the Finnhub websocket or API for live P&L.

  useEffect(() => {
    fetchPortfolio();
  }, []);

  async function fetchPortfolio() {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setItems(data.portfolio || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(ticker: string) {
    if (!confirm(`Are you sure you want to remove ${ticker} from your portfolio?`)) return;

    setItems((prev) => prev.filter((i) => i.ticker !== ticker));
    try {
      await fetch(`/api/portfolio?ticker=${ticker}`, { method: "DELETE" });
    } catch (err) {
      console.error(err);
      fetchPortfolio(); // Revert on failure
    }
  }

  const totalInvested = items.reduce((acc, item) => acc + item.quantity * item.average_buy_price, 0);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-zinc-900 rounded"></div>
          <div className="h-64 w-full bg-zinc-900/50 rounded-xl mt-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-serif text-white">My Portfolio</h1>
          <p className="text-zinc-400 mt-2">Track your holdings and P&L (Live pricing coming shortly)</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-zinc-500 uppercase tracking-wider font-semibold">Total Invested</div>
          <div className="text-3xl font-bold text-white mt-1">{formatCurrency(totalInvested)}</div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-12 text-center">
          <h2 className="text-xl font-serif text-zinc-300 mb-2">Your portfolio is empty</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Search for stocks or crypto, read the AI research report, and add them to your portfolio to track your performance.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-zinc-100 text-black font-medium hover:bg-white transition-colors"
          >
            Explore Assets
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/50 text-zinc-400 uppercase text-xs font-semibold tracking-wider border-b border-zinc-800/60">
                <tr>
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4 text-right">Quantity</th>
                  <th className="px-6 py-4 text-right">Avg Price</th>
                  <th className="px-6 py-4 text-right">Invested Value</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900/20 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/research/${item.ticker}`} className="flex items-center gap-3 group">
                        <div className="bg-zinc-900 w-10 h-10 rounded flex items-center justify-center font-bold text-zinc-300 group-hover:text-white transition-colors">
                          {item.ticker.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-serif text-zinc-100 group-hover:text-white transition-colors">
                            {item.ticker}
                          </div>
                          <div className="text-xs text-zinc-500">{item.company_name || item.asset_type}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-zinc-300">{item.quantity}</td>
                    <td className="px-6 py-4 text-right font-medium text-zinc-300">{formatCurrency(item.average_buy_price)}</td>
                    <td className="px-6 py-4 text-right font-medium text-zinc-100">
                      {formatCurrency(item.quantity * item.average_buy_price)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => removeItem(item.ticker)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-2"
                        title="Remove from portfolio"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
