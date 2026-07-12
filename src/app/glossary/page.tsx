"use client";

import React, { useState } from "react";

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

  const categories = ["all", ...Array.from(new Set(GLOSSARY_ITEMS.map((item) => item.category.toLowerCase())))];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) || 
                          item.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-5xl font-serif text-white mb-4">Financial Glossary</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Understand the exact quantitative ratios, valuation scores, and technical signals parsed inside OnDecide&apos;s AI Research reports.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search glossary terms or definitions..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 font-sans"
        />
        <div className="flex gap-1 overflow-x-auto min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs capitalize transition-colors ${
                filterCategory === cat
                  ? "bg-zinc-900 text-white border border-zinc-800"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Terms */}
      {filteredItems.length === 0 ? (
        <div className="border border-zinc-800/60 bg-zinc-950/40 p-12 text-center rounded">
          <p className="text-zinc-500 text-sm">No glossary terms found matching your filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          {filteredItems.map((item) => (
            <div key={item.term} className="border border-zinc-800 bg-zinc-950/40 rounded p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-serif text-white">{item.term}</h2>
                  <span className="text-2xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded font-sans tracking-wide uppercase">
                    {item.category}
                  </span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">{item.definition}</p>
              </div>
              <div className="pt-4 border-t border-zinc-900 space-y-1">
                <span className="text-2xs text-zinc-600 font-sans tracking-wider uppercase block">Formula</span>
                <code className="text-2xs text-zinc-400 font-sans break-all block bg-zinc-950 p-2 border border-zinc-900 rounded">
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
