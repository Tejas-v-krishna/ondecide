"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const TEAM = [
  { name: "Sarah Jenkins", role: "Co-Founder & CEO", prev: "AQR, Goldman Sachs" },
  { name: "Dr. Alex Chen", role: "Chief AI Architect", prev: "DeepMind, OpenAI" },
  { name: "Marcus Vance", role: "Head of Quantitative Strategy", prev: "Two Sigma, Citadel" },
];

const JOBS = [
  { title: "Senior AI Research Engineer", team: "Engineering", location: "Remote / London" },
  { title: "Quantitative Developer", team: "Research", location: "New York / Hybrid" },
  { title: "Senior Product Designer", team: "Product", location: "Remote" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"about" | "team" | "careers" | "contact">("about");

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      {/* Page Header */}
      <div className="mb-12 border-b border-line pb-8">
        <span className="mb-4 inline-block text-2xs font-medium uppercase tracking-widest text-brand-700">
          Company
        </span>
        <h1 className="text-display-sm mb-4 font-medium text-ink">Our Company</h1>
        <p className="max-w-2xl text-lg text-ink-500">
          OnDecide is redefining institutional-grade investment research by combining advanced AI
          agent chains with real-time quantitative pipelines.
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-12 flex gap-2 overflow-x-auto border-b border-line pb-4">
        {(["about", "team", "careers", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm capitalize transition-colors ${
              activeTab === tab
                ? "bg-ink text-white"
                : "text-ink-500 hover:bg-surface-subtle hover:text-ink"
            }`}
          >
            {tab === "about" ? "About Us" : tab}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === "about" && (
        <div className="animate-fade-in space-y-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-3xl font-medium text-ink">Our Mission</h2>
              <p className="text-sm leading-relaxed text-ink-500">
                We believe that premium financial intelligence shouldn&apos;t be locked behind a
                $24,000/year Bloomberg Terminal subscription. OnDecide democratizes
                institutional-grade research by giving retail investors, family offices, and quant
                funds instant access to deep financial analysis.
              </p>
              <p className="text-sm leading-relaxed text-ink-500">
                Our autonomous agents analyze filings, parse news sentiment, scan technical signals,
                and run historical pattern matching in under 60 seconds.
              </p>
            </div>
            <div className="card-surface flex min-h-[220px] flex-col justify-center p-8">
              <div className="mb-2 font-display text-5xl text-ink">$0</div>
              <div className="mb-4 text-xs uppercase tracking-wider text-ink-400">
                Subscription Barrier
              </div>
              <p className="text-xs text-ink-500">
                We are building a future where intelligence is open, fast, and accessible to anyone
                seeking to make informed capital decisions.
              </p>
            </div>
          </div>

          <div className="card-surface p-8">
            <h3 className="mb-4 text-lg font-medium text-ink">Platform Values</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  n: "01 / Rigor",
                  d: "Every AI assertion is referenced directly back to verifiable SEC filings, earnings calls, or live market metrics.",
                },
                {
                  n: "02 / Speed",
                  d: "Decisions are made in milliseconds. Our agent architecture works in parallel to synthesize reports in under a minute.",
                },
                {
                  n: "03 / Privacy",
                  d: "Your portfolio allocation, watchlist items, and research search history are entirely your own. We do not sell your data.",
                },
              ].map((v) => (
                <div key={v.n} className="space-y-2">
                  <span className="text-xs uppercase tracking-wide text-brand-700">{v.n}</span>
                  <p className="text-xs leading-relaxed text-ink-500">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <div className="animate-fade-in space-y-8">
          <h2 className="mb-6 text-3xl font-medium text-ink">The Founding Team</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="card-surface space-y-4 p-6">
                <div>
                  <h3 className="text-lg font-medium text-ink">{member.name}</h3>
                  <p className="text-xs text-ink-500">{member.role}</p>
                </div>
                <div>
                  <span className="mb-1 block text-2xs uppercase tracking-wider text-ink-400">
                    Alumni of
                  </span>
                  <p className="text-xs text-ink-500">{member.prev}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "careers" && (
        <div className="animate-fade-in space-y-8">
          <div className="card-surface mb-8 p-8">
            <h2 className="mb-4 text-3xl font-medium text-ink">Join OnDecide</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-ink-500">
              We are a remote-first group of engineers, designers, and quantitative strategists
              building the future of decentralized financial tools. If you are passionate about LLM
              orchestration, Next.js, and quantitative trading, let&apos;s build together.
            </p>
          </div>

          <h3 className="mb-4 text-xs uppercase tracking-wider text-ink-400">Open Positions</h3>
          <div className="space-y-3">
            {JOBS.map((job) => (
              <div
                key={job.title}
                className="flex items-center justify-between rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
              >
                <div>
                  <h4 className="text-sm font-medium text-ink">{job.title}</h4>
                  <p className="mt-1 text-xs text-ink-500">
                    {job.team} · {job.location}
                  </p>
                </div>
                <Button size="sm" className="h-8 text-xs">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="animate-fade-in grid items-start gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-3xl font-medium text-ink">Get in Touch</h2>
            <p className="text-sm leading-relaxed text-ink-500">
              Have questions about our data feeds, institutional API rates, or research
              methodologies? Send us a message and our team will get back to you shortly.
            </p>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-2xs uppercase tracking-wider text-ink-400">
                  General &amp; Press Inquiry
                </span>
                <span className="text-ink-600">hello@ondecide.com</span>
              </div>
              <div>
                <span className="block text-2xs uppercase tracking-wider text-ink-400">
                  Institutional Sales
                </span>
                <span className="text-ink-600">institutions@ondecide.com</span>
              </div>
            </div>
          </div>

          <form className="card-surface space-y-4 p-6">
            <div className="space-y-1.5">
              <label className="text-xs text-ink-500">Full Name</label>
              <input
                type="text"
                className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-ink-500">Email Address</label>
              <input
                type="email"
                className="w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-ink-500">Message</label>
              <textarea
                rows={4}
                className="w-full resize-none rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
                placeholder="Your message here..."
              />
            </div>
            <Button className="w-full py-2.5 text-sm font-medium">Send Message</Button>
          </form>
        </div>
      )}
    </div>
  );
}
