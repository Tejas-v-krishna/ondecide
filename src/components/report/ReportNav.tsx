"use client";

import { useState } from "react";

const SECTIONS = [
  { id: "snapshot", label: "Overview" },
  { id: "decision", label: "Thesis" },
  { id: "market", label: "Market Data" },
  { id: "scorecard", label: "Scorecard" },
  { id: "qualitative", label: "Moat & History" },
  { id: "news", label: "News & Earnings" },
  { id: "technical", label: "Technicals & Peers" },
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
    <nav className="overflow-x-auto">
      <div className="flex min-w-max gap-1">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors ${
              active === section.id
                ? "bg-ink text-white"
                : "text-ink-500 hover:bg-surface-subtle hover:text-ink"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
