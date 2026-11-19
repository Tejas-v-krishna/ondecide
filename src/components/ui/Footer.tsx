"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Explore Assets", href: "/explore" },
        { label: "Portfolio Tracker", href: "/portfolio" },
        { label: "Watchlist Analyzer", href: "/watchlist" },
        { label: "Glossary Hub", href: "/glossary" },
        { label: "Agent Synthesizer", href: "/agents" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Retail Traders", href: "/solutions/retail-traders" },
        { label: "Family Offices", href: "/solutions/family-offices" },
        { label: "Wealth Advisors", href: "/solutions/wealth-advisors" },
        { label: "Hedge Funds", href: "/solutions/hedge-funds" },
        { label: "Due Diligence", href: "/solutions/due-diligence" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/company/careers" },
        { label: "Press Kit", href: "/company/press" },
        { label: "Contact", href: "/company/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/trust/privacy" },
        { label: "Terms of Service", href: "/trust/terms" },
        { label: "Investment Disclaimer", href: "/trust/disclaimers" },
        { label: "Cookie Policy", href: "/trust/privacy" },
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <motion.div
        className="shell py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          {/* Brand & Disclaimer */}
          <motion.div variants={itemVariants} className="max-w-sm space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white">
                <span className="font-sans text-sm font-semibold">O</span>
              </div>
              <span className="font-sans text-[19px] font-medium tracking-tight text-ink">
                OnDecide
              </span>
            </Link>

            <h3 className="display-serif text-2xl leading-snug text-ink">
              Understand any investment.
              <br />
              <span className="text-ink-400">Not just its score.</span>
            </h3>

            <div className="rounded-xl border border-line bg-surface-subtle p-4">
              <p className="mb-1.5 text-xs font-medium text-ink">Investment Disclaimer</p>
              <p className="text-[11px] leading-relaxed text-ink-500">
                OnDecide provides research synthesis for informational purposes only. This is
                not personalized financial advice. Always do your own due diligence.
              </p>
            </div>

            <div className="flex items-center gap-4 text-ink-400">
              <a
                href="https://x.com/ondecide"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
                aria-label="X (Twitter)"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/ondecide"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/ondecide"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>

            <p className="text-xs text-ink-400">
              &copy; {currentYear} OnDecide. All rights reserved.
            </p>
          </motion.div>

          {/* Links + Newsletter */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between gap-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {footerLinks.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-4">
                  <h4 className="text-sm font-medium text-ink">{section.title}</h4>
                  <ul className="flex flex-col space-y-2.5 text-sm text-ink-500">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="transition-colors duration-200 hover:text-brand-700"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-line pt-8">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="space-y-1.5">
                  <h4 className="text-base font-medium text-ink">Newsletter</h4>
                  <p className="max-w-sm text-xs leading-relaxed text-ink-500">
                    Get weekly synthesis of market trends, pattern analysis, and updates on new
                    research skills.
                  </p>
                </div>
                <div className="flex w-full max-w-md flex-col gap-2.5 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-full border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-ink-400 transition-all focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                  />
                  <button className="rounded-full bg-ink px-6 py-2.5 text-xs font-medium text-white transition-colors hover:bg-ink-800">
                    Subscribe
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-1.5 text-xs text-ink-500">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
                All systems operational
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
