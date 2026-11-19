"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";

const GLOSSARY_ITEMS = [
  {
    term: "P/E Ratio",
    category: "Valuation",
    definition: "Price-to-Earnings Ratio. Measures the current share price relative to its per-share earnings. A high P/E ratio could mean that a stock's price is high relative to earnings and possibly overvalued.",
    formula: "Market Value per Share / Earnings per Share (EPS)",
  },
  {
    term: "RSI",
    category: "Technical",
    definition: "Relative Strength Index. A momentum oscillator that measures the speed and change of price movements. RSI oscillates between 0 and 100. Traditionally, values above 70 indicate overbought conditions, and values below 30 indicate oversold.",
    formula: "100 - [100 / (1 + (Average Gain / Average Loss))]",
  },
  {
    term: "Debt-to-Equity",
    category: "Financial Health",
    definition: "A debt ratio used to measure a company's financial leverage. It indicates how much debt a company is using to finance its assets relative to the value of shareholders' equity.",
    formula: "Total Liabilities / Total Shareholders' Equity",
  },
  {
    term: "MACD",
    category: "Technical",
    definition: "Moving Average Convergence Divergence. A trend-following momentum indicator that shows the relationship between two moving averages of a security's price, typically the 26-day and 12-day EMAs.",
    formula: "12-period EMA - 26-period EMA",
  },
  {
    term: "Beta",
    category: "Volatility",
    definition: "A measure of a stock's volatility in relation to the overall market. A beta of 1.0 indicates the stock moves with the market. Greater than 1.0 means more volatile; less than 1.0 means less volatile.",
    formula: "Covariance(Stock, Market) / Variance(Market)",
  },
  {
    term: "EPS Growth",
    category: "Growth",
    definition: "Earnings Per Share Growth. Shows the rate at which a company has increased its profitability on a per-share basis over a specific time period (quarter-over-quarter or year-over-year).",
    formula: "[(EPS_current - EPS_prior) / EPS_prior] * 100",
  },
];

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const categories = [
    "all",
    ...Array.from(new Set(GLOSSARY_ITEMS.map((item) => item.category.toLowerCase()))),
  ];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      <PageHeader
        eyebrow="Resources"
        title="Financial Glossary"
        description="Understand the exact quantitative ratios, valuation scores, and technical signals parsed inside OnDecide's AI Research reports."
      />

      {/* Filters & Search */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search glossary terms or definitions..."
          className="flex-1 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
        />
        <div className="flex min-w-max gap-1 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs capitalize transition-colors ${
                filterCategory === cat
                  ? "bg-ink text-white"
                  : "text-ink-500 hover:bg-surface-subtle hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Terms */}
      {filteredItems.length === 0 ? (
        <div className="card-surface p-12 text-center">
          <p className="text-sm text-ink-500">No glossary terms found matching your filters.</p>
        </div>
      ) : (
        <div className="grid animate-fade-in gap-6 md:grid-cols-2">
          {filteredItems.map((item) => (
            <div key={item.term} className="card-surface flex flex-col justify-between space-y-4 p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium text-ink">{item.term}</h2>
                  <span className="rounded-full border border-line bg-surface-subtle px-2 py-0.5 text-2xs uppercase tracking-wide text-ink-500">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-ink-500">{item.definition}</p>
              </div>
              <div className="space-y-1 border-t border-line pt-4">
                <span className="block text-2xs uppercase tracking-wider text-ink-400">Formula</span>
                <code className="block break-all rounded-lg border border-line bg-surface-subtle p-2 font-mono text-2xs text-ink-600">
                  {item.formula}
                </code>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
