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
        className="cursor-help border-b border-dotted border-ink-400 transition-colors hover:border-brand-500"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible((v) => !v)}
      >
        {children}
      </span>

      {visible && (
        <span className="pointer-events-none absolute left-0 top-full z-50 mt-2 block w-72 animate-fade-in rounded-xl border border-line bg-surface p-3 shadow-xl">
          <span className="mb-1 block text-xs font-medium text-brand-700">{entry.term}</span>
          <span className="block text-sm leading-relaxed text-ink-600">{entry.definition}</span>
          {entry.example && (
            <span className="mt-2 block border-t border-line pt-2 text-xs text-ink-500">
              <span className="font-medium text-ink-600">Example: </span>
              {entry.example}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
