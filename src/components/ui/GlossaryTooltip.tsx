"use client";

import { useState } from "react";
import { glossary } from "@/lib/glossary";

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function GlossaryTooltip({ term, children, className = "" }: GlossaryTooltipProps) {
  const [visible, setVisible] = useState(false);
  const entry = glossary[term];

  if (!entry) {
    return <>{children}</>;
  }

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className="cursor-help border-b border-dotted border-zinc-600 hover:border-emerald-400 transition-colors"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
      >
        {children}
      </span>

      {visible && (
        <span className="absolute z-50 left-0 top-full mt-2 w-72 rounded-lg border border-zinc-800 bg-zinc-950 p-3 shadow-xl animate-fade-in pointer-events-none">
          <span className="block text-xs font-semibold text-emerald-400 mb-1">{entry.term}</span>
          <span className="block text-sm text-zinc-100 leading-relaxed">{entry.definition}</span>
          {entry.example && (
            <span className="block text-xs text-zinc-400 mt-2 pt-2 border-t border-zinc-800">
              <span className="font-medium text-zinc-300">Example: </span>
              {entry.example}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
