export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 bg-black mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-white flex items-center justify-center">
                <span className="text-black font-bold text-sm">O</span>
              </div>
              <span className="font-serif text-white text-xl">OnDecide</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Institutional-grade investment research powered by AI. Covering stocks, ETFs, crypto, bonds, mutual funds, and REITs.
            </p>
            <p className="text-zinc-600 text-xs mt-4 leading-relaxed max-w-xs">
              For informational purposes only. Not financial advice. Always do your own due diligence.
            </p>
          </div>

          {/* Features */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Features</p>
            <ul className="space-y-3">
              {[
                { label: "Stock Analysis", href: "/research/AAPL" },
                { label: "ETF Research", href: "/research/SPY" },
                { label: "Crypto Analysis", href: "/research/BTC" },
                { label: "Portfolio Tracker", href: "/portfolio" },
                { label: "Watchlist", href: "/watchlist" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Legal</p>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Investment Disclaimer", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-zinc-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-800/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">
            © {currentYear} OnDecide. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
