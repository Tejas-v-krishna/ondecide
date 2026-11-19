"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

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
      fetchPortfolio();
    }
  }

  const totalInvested = items.reduce((acc, item) => acc + item.quantity * item.average_buy_price, 0);

  if (loading) {
    return (
      <div className="shell max-w-5xl py-12">
        <div className="flex animate-pulse flex-col items-center gap-4">
          <div className="h-8 w-48 rounded bg-surface-muted" />
          <div className="mt-8 h-64 w-full rounded-xl bg-surface-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      <PageHeader
        eyebrow="Platform"
        title="My Portfolio"
        description="Track your holdings and P&L (Live pricing coming shortly)."
      >
        <div className="mt-6">
          <div className="text-sm font-medium uppercase tracking-wider text-ink-400">Total Invested</div>
          <div className="mt-1 font-mono text-3xl font-semibold text-ink">{formatCurrency(totalInvested)}</div>
        </div>
      </PageHeader>

      {items.length === 0 ? (
        <div className="card-surface p-12 text-center">
          <h2 className="mb-2 text-xl font-medium text-ink">Your portfolio is empty</h2>
          <p className="mx-auto mb-6 max-w-md text-ink-500">
            Search for stocks or crypto, read the AI research report, and add them to your portfolio to
            track your performance.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 font-medium text-white transition-colors hover:bg-ink-800"
          >
            Explore Assets
          </Link>
        </div>
      ) : (
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface-subtle text-xs font-medium uppercase tracking-wider text-ink-400">
                <tr>
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4 text-right">Quantity</th>
                  <th className="px-6 py-4 text-right">Avg Price</th>
                  <th className="px-6 py-4 text-right">Invested Value</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {items.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-surface-subtle/60">
                    <td className="px-6 py-4">
                      <Link href={`/research/${item.ticker}`} className="group flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-subtle font-mono font-semibold text-ink-500 transition-colors group-hover:text-ink">
                          {item.ticker.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-medium text-ink transition-colors group-hover:text-brand-700">
                            {item.ticker}
                          </div>
                          <div className="text-xs text-ink-500">{item.company_name || item.asset_type}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-ink-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-right font-mono font-medium text-ink-600">
                      {formatCurrency(item.average_buy_price)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-medium text-ink">
                      {formatCurrency(item.quantity * item.average_buy_price)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => removeItem(item.ticker)}
                        className="rounded-lg p-2 text-ink-400 transition-colors hover:bg-avoid/10 hover:text-avoid"
                        title="Remove from portfolio"
                      >
                        <Trash2 className="h-4 w-4" />
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
