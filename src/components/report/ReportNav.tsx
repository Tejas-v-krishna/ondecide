"use client";

import { useState } from "react";

const SECTIONS = [
  { id: "snapshot", label: "Snapshot" },
  { id: "market", label: "Market Data" },
  { id: "scorecard", label: "Scorecard" },
  { id: "news", label: "News" },
  { id: "financials", label: "Financials" },
  { id: "qualitative", label: "Qualitative" },
  { id: "history", label: "History" },
  { id: "decision", label: "Decision" },
];

export function ReportNav() {
  const [active, setActive] = useState("snapshot");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <nav className="sticky top-16 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 border-b border-zinc-800/60 bg-black/80 backdrop-blur-sm overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${
              active === section.id
                ? "text-white bg-white/10"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
