"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Alex Mercer",
    role: "Retail Trader",
    quote: "Replaced 3 paid subscriptions with one report.",
  },
  {
    name: "Sarah Lin",
    role: "Portfolio Manager",
    quote: "The 7 agent pipeline covers every macro angle.",
  },
  {
    name: "Devon Vance",
    role: "Crypto Analyst",
    quote: "Finally, an AI tool that gets crypto tokenomics.",
  },
  {
    name: "Marcus Thorne",
    role: "Value Investor",
    quote: "Explains complex leverage and P/E in plain English.",
  },
  {
    name: "Elena Rostova",
    role: "Equity Researcher",
    quote: "Historical cycle analogs save hours of manual research.",
  },
];

function Avatar({ name }: { name: string }) {
  return (
    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/70 text-[11px] font-semibold text-brand-700">
      {name
        .split(" ")
        .map((n) => n[0])
        .join("")}
    </span>
  );
}

export function Testimonials() {
  const rail = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.6), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={rail}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
      >
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="flex min-h-[212px] w-[196px] flex-none snap-start flex-col rounded-[3px] bg-gradient-to-b from-accent to-accent-soft p-4 text-white shadow-sm"
          >
            <div className="flex items-center gap-2.5">
              <Avatar name={t.name} />
              <figcaption className="min-w-0">
                <span className="block truncate text-[12.5px] font-medium leading-tight">{t.name}</span>
                <span className="block truncate text-[10.5px] text-white/80">{t.role}</span>
              </figcaption>
            </div>
            <blockquote className="mt-auto text-[12.5px] leading-snug text-white/95">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
          </figure>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous testimonials"
          className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-brand-100 text-ink transition-colors hover:bg-brand-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next testimonials"
          className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-brand-100 text-ink transition-colors hover:bg-brand-200"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
