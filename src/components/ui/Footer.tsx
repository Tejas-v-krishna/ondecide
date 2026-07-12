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
              AI-powered investment research that explains itself. Built for stocks and crypto today, expanding from there.
            </p>
            <div className="mt-4 p-4 border border-zinc-800/60 bg-zinc-950 rounded-sm">
              <p className="text-zinc-400 font-serif text-sm mb-2">Investment Disclaimer</p>
              <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
                OnDecide provides research synthesis for informational purposes only. This is not personalized financial advice. Always do your own due diligence.
              </p>
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Features</p>
            <ul className="space-y-3">
              {[
                { label: "Stock Research", href: "/research/AAPL" },
                { label: "Crypto Research", href: "/research/BTC" },
                { label: "Explore (ETFs, Mutual Funds, Bonds, REITs)", href: "/explore" },
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
                { label: "Privacy Policy", href: "/trust/privacy" },
                { label: "Terms of Service", href: "/trust/terms" },
                { label: "Investment Disclaimer", href: "/trust/disclaimers" },
                { label: "Cookie Policy", href: "/trust/privacy" },
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
