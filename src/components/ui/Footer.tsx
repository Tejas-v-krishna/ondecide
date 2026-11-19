import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoLockup } from "@/components/ui/LogoMark";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Ticker Search", href: "/explore" },
      { label: "AI Pipeline", href: "/agents" },
      { label: "Scorecard", href: "/research/AAPL" },
      { label: "Pattern Match", href: "/skills/historical-patterns" },
      { label: "Portfolio Tool", href: "/portfolio" },
      { label: "Pricing Plans", href: "/#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Financial Terms", href: "/glossary" },
      { label: "Sample Reports", href: "/research/AAPL" },
      { label: "Market Guides", href: "/resources/tutorials" },
      { label: "Documentation", href: "/resources/platform-guide" },
      { label: "API Status", href: "/resources/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About OnDecide", href: "/about" },
      { label: "Methodology", href: "/resources/methodology" },
      { label: "Trust & Safety", href: "/legal" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact Us", href: "/company/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/trust/privacy" },
      { label: "Terms of Use", href: "/trust/terms" },
      { label: "Cookie Settings", href: "/cookie-consent" },
      { label: "Disclaimer", href: "/trust/disclaimers" },
      { label: "Security", href: "/trust/privacy" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-paper">
      <div className="mx-auto w-full max-w-[1320px] px-4 lg:px-8">
        <div className="bg-white px-6 py-12 lg:px-14 lg:py-16">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_2.4fr]">
            {/* Brand + newsletter */}
            <div>
              <LogoLockup markClassName="h-5" textClassName="text-[19px] font-semibold tracking-tight text-ink" />
              <p className="mt-6 text-[15px] leading-snug text-ink-600">
                Understand any investment.
                <br />
                <span className="text-ink-400">Not just its score.</span>
              </p>

              <div className="mt-10 max-w-[290px]">
                <p className="text-[13px] text-brand-600">Get weekly market intelligence.</p>
                <form className="mt-3 flex items-center gap-2 border-b border-ink-800/70 pb-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    aria-label="Email address"
                    className="min-w-0 flex-1 bg-transparent text-[12.5px] text-ink outline-none placeholder:text-ink-400"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="text-ink transition-transform hover:translate-x-0.5"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>

              <p className="mt-10 text-[11px] text-ink-400">
                &copy; {year} OnDecide. Research synthesis, not financial advice.
              </p>
            </div>

            {/* Link columns */}
            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {COLUMNS.map((col) => (
                <div key={col.title}>
                  <h4 className="text-[12.5px] font-medium text-brand-600">{col.title}</h4>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[12px] text-ink-600 transition-colors hover:text-brand-700"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Oversized wordmark over a cobalt glow */}
      <div className="relative mt-1 flex justify-center overflow-hidden">
        <div className="halo-blue pointer-events-none absolute -bottom-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-80 blur-[90px]" />
        <span className="wordmark relative block translate-y-[0.06em] px-2">OnDecide</span>
      </div>
    </footer>
  );
}
