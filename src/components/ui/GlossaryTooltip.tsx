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
        className="cursor-help border-b border-dotted border-slate-500 hover:border-emerald-400 transition-colors"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
      >
        {children}
      </span>

      {visible && (
        <span className="absolute z-50 left-0 top-full mt-2 w-72 rounded-lg border border-slate-700 bg-navy-800 p-3 shadow-xl animate-fade-in pointer-events-none">
          <span className="block text-xs font-semibold text-emerald-400 mb-1">{entry.term}</span>
          <span className="block text-sm text-slate-200 leading-relaxed">{entry.definition}</span>
          {entry.example && (
            <span className="block text-xs text-slate-400 mt-2 pt-2 border-t border-slate-700">
              <span className="font-medium text-slate-300">Example: </span>
              {entry.example}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
