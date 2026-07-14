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
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="py-16 px-6 md:px-12 mt-24 border-t border-zinc-900 bg-black w-full">
      <motion.div
        className="w-full mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-zinc-800/60 p-px rounded-2xl overflow-hidden items-stretch w-full">
          {/* Left Card: Brand & Disclaimer */}
          <motion.div
            className="relative col-span-1 md:col-span-4 min-h-[350px] md:min-h-[550px] overflow-hidden bg-gradient-to-br from-[#0c1022] via-[#050913] to-black flex flex-col justify-between p-8 md:p-10"
            variants={itemVariants}
          >
            {/* Subtle SVG Noise Overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <filter id="noiseFilterFooter">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#noiseFilterFooter)" />
            </svg>

            {/* Logo */}
            <div className="relative z-10">
              <Link href="/" className="flex items-center gap-2 text-white">
                <div className="w-7 h-7 bg-white flex items-center justify-center rounded-sm">
                  <span className="text-black text-xs font-bold font-sans">O</span>
                </div>
                <span className="text-white font-serif text-xl tracking-tight">
                  OnDecide
                </span>
              </Link>
            </div>

            {/* Middle/Bottom Text & Socials */}
            <div className="relative z-10 space-y-6 mt-12 md:mt-0">
              <h3 className="text-2xl font-serif text-white tracking-tight leading-snug">
                Understand any investment.<br />
                <span className="text-zinc-400">Not just its score.</span>
              </h3>

              {/* Investment Disclaimer */}
              <div className="p-4 border border-zinc-800/40 bg-black/60 rounded-lg backdrop-blur-sm">
                <p className="text-zinc-400 font-serif text-xs mb-1.5">Investment Disclaimer</p>
                <p className="text-zinc-500 text-[11px] leading-relaxed">
                  OnDecide provides research synthesis for informational purposes only. This is not personalized financial advice. Always do your own due diligence.
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 text-zinc-400 pt-2">
                <a
                  href="https://x.com/ondecide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/ondecide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/ondecide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              </div>

              {/* Copyright */}
              <p className="text-zinc-600 text-xs font-sans">
                &copy; {currentYear} OnDecide. All rights reserved.
              </p>
            </div>
          </motion.div>

          {/* Right Card: Links & Newsletter */}
          <motion.div
            className="col-span-1 md:col-span-8 bg-zinc-950/20 p-8 md:p-12 flex flex-col justify-between min-h-[500px] md:min-h-[550px] backdrop-blur-md"
            variants={itemVariants}
          >
            {/* Top Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {footerLinks.map((section, idx) => (
                <div key={idx} className="flex flex-col space-y-6">
                  <h4 className="text-sm font-semibold tracking-wider text-white uppercase font-sans">
                    {section.title}
                  </h4>
                  <ul className="flex flex-col space-y-3 text-zinc-400 text-sm">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="hover:text-white transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom Newsletter & Operational Status */}
            <div className="space-y-8 mt-12 md:mt-0 pt-8 border-t border-zinc-900/60">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="space-y-2">
                  <h4 className="text-lg font-serif text-white">
                    Newsletter
                  </h4>
                  <p className="text-zinc-500 text-xs max-w-sm leading-relaxed">
                    Get weekly synthesis of market trends, pattern analysis, and updates on new research skills.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="flex-1 rounded bg-zinc-900/60 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-700 border border-zinc-800/80 transition-all"
                  />
                  <button className="rounded bg-white text-black px-6 py-2.5 text-xs font-semibold hover:bg-zinc-200 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Systems Status bar */}
              <div className="flex items-center justify-end gap-1.5 text-xs text-zinc-500 pt-4 border-t border-zinc-900/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                All systems operational
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
