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
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Page Header */}
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-5xl font-serif text-white mb-4">Our Company</h1>
        <p className="text-zinc-400 text-lg max-w-2xl">
          OnDecide is redefining institutional-grade investment research by combining advanced AI agent chains with real-time quantitative pipelines.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-800 pb-4 mb-12 overflow-x-auto">
        {(["about", "team", "careers", "contact"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded text-sm capitalize transition-colors whitespace-nowrap ${
              activeTab === tab
                ? "bg-zinc-900 text-white border border-zinc-800"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {tab === "about" ? "About Us" : tab}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === "about" && (
        <div className="space-y-12 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-serif text-white">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed text-sm">
                We believe that premium financial intelligence shouldn&apos;t be locked behind a $24,000/year Bloomberg Terminal subscription. OnDecide democratizes institutional-grade research by giving retail investors, family offices, and quant funds instant access to deep financial analysis.
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm">
                Our autonomous agents analyze filings, parse news sentiment, scan technical signals, and run historical pattern matching in under 60 seconds.
              </p>
            </div>
            <div className="border border-zinc-800 bg-zinc-950 p-8 rounded flex flex-col justify-center min-h-[220px]">
              <div className="text-5xl font-serif text-white mb-2">$0</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-sans mb-4">Subscription Barrier</div>
              <p className="text-zinc-400 text-xs">
                We are building a future where intelligence is open, fast, and accessible to anyone seeking to make informed capital decisions.
              </p>
            </div>
          </div>

          <div className="border border-zinc-800 bg-zinc-950/40 rounded p-8">
            <h3 className="text-lg font-serif text-white mb-4">Platform Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <span className="text-xs text-zinc-500 font-sans tracking-wide uppercase">01 / Rigor</span>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Every AI assertion is referenced directly back to verifiable SEC filings, earnings calls, or live market metrics.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-zinc-500 font-sans tracking-wide uppercase">02 / Speed</span>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Decisions are made in milliseconds. Our agent architecture works in parallel to synthesize reports in under a minute.
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-xs text-zinc-500 font-sans tracking-wide uppercase">03 / Privacy</span>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  Your portfolio allocation, watchlist items, and research search history are entirely your own. We do not sell your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-3xl font-serif text-white mb-6">The Founding Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((member) => (
              <div key={member.name} className="border border-zinc-800 bg-zinc-950 rounded p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-serif text-white">{member.name}</h3>
                  <p className="text-xs text-zinc-500">{member.role}</p>
                </div>
                <div>
                  <span className="text-2xs text-zinc-600 font-sans tracking-wider uppercase block mb-1">Alumni of</span>
                  <p className="text-xs text-zinc-400">{member.prev}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "careers" && (
        <div className="space-y-8 animate-fade-in">
          <div className="border border-zinc-800 bg-zinc-950/40 rounded p-8 mb-8">
            <h2 className="text-3xl font-serif text-white mb-4">Join OnDecide</h2>
            <p className="text-zinc-400 text-sm max-w-2xl leading-relaxed">
              We are a remote-first group of engineers, designers, and quantitative strategists building the future of decentralized financial tools. If you are passionate about LLM orchestration, Next.js, and quantitative trading, let&apos;s build together.
            </p>
          </div>

          <h3 className="text-xs text-zinc-500 font-sans tracking-wider uppercase mb-4">Open Positions</h3>
          <div className="space-y-3">
            {JOBS.map((job) => (
              <div key={job.title} className="flex justify-between items-center border border-zinc-800 bg-zinc-950 rounded p-5 hover:border-zinc-700 transition-colors">
                <div>
                  <h4 className="text-sm font-sans font-medium text-white">{job.title}</h4>
                  <p className="text-xs text-zinc-500 mt-1">{job.team} · {job.location}</p>
                </div>
                <Button variant="default" className="bg-zinc-100 hover:bg-white text-black text-xs py-1.5 h-auto rounded">
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="grid md:grid-cols-2 gap-8 items-start animate-fade-in">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-white">Get in Touch</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Have questions about our data feeds, institutional API rates, or research methodologies? Send us a message and our team will get back to you shortly.
            </p>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-2xs text-zinc-500 font-sans tracking-wider uppercase block">General & Press Inquiry</span>
                <span className="text-zinc-300">hello@ondecide.com</span>
              </div>
              <div>
                <span className="text-2xs text-zinc-500 font-sans tracking-wider uppercase block">Institutional Sales</span>
                <span className="text-zinc-300">institutions@ondecide.com</span>
              </div>
            </div>
          </div>

          <form className="border border-zinc-800 bg-zinc-950 rounded p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500 font-sans">Full Name</label>
              <input type="text" className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600" placeholder="John Doe" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500 font-sans">Email Address</label>
              <input type="email" className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600" placeholder="john@example.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500 font-sans">Message</label>
              <textarea rows={4} className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-zinc-600 resize-none" placeholder="Your message here..." />
            </div>
            <Button className="w-full bg-zinc-100 hover:bg-white text-black py-2.5 text-sm font-medium rounded transition-colors">
              Send Message
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
