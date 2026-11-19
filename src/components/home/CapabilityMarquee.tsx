const CAPABILITIES = [
  "Pull Financial Ratios",
  "Read News Sentiment",
  "Analyze Technical Signals",
  "Historical Patterns",
  "Form Theses",
  "Multi-Asset Coverage",
  "Crypto Integration",
  "Real-Time Pricing",
  "Qualitative Read",
  "Invest / Hold / Avoid",
];

/**
 * Scrolling capability strip — each item on its own rail cell,
 * alternating ink and cobalt so it reads like a terminal ticker.
 */
export function CapabilityMarquee() {
  const items = [...CAPABILITIES, ...CAPABILITIES];
  return (
    <div className="mask-fade-x overflow-hidden border-y border-line bg-white">
      <div className="flex w-max animate-marquee">
        {items.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className={`flex h-11 flex-none items-center border-r border-line-soft px-6 text-[12.5px] ${
              i % 3 === 1 ? "text-brand-600" : "text-ink-700"
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
