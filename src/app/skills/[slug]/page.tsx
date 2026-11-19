"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Database, Search, Cpu, TrendingUp, HelpCircle, FileText, ArrowLeft } from "lucide-react";

interface SkillData {
  title: string;
  tag: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  shortDesc: string;
  detailedDesc: string;
  howItWorks: string[];
  metricsUsed: string[];
  ctaText: string;
  ctaHref: string;
}

const SKILLS_MAP: Record<string, SkillData> = {
  "financial-ratios": {
    title: "Pull Financial Ratios",
    tag: "Fundamental Analysis",
    icon: Database,
    shortDesc: "Automate SEC filing extractions to retrieve historical balance sheets, margins, and capital metrics.",
    detailedDesc: "Our financial ratio agent parses complex filings directly from the SEC's EDGAR system in real time. It calculates key ratios including debt-to-equity, current ratio, operating margin, and return on equity (ROE), giving you an institutional-grade sanity check on corporate liquidity and leverage.",
    howItWorks: [
      "Retrieve the latest Form 10-K or 10-Q filing from EDGAR.",
      "Identify the key balance sheet and income statement items.",
      "Compute normalized margins and leverage metrics.",
    ],
    metricsUsed: ["Debt-to-Equity Ratio", "Operating Margin %", "Return on Equity (ROE)"],
    ctaText: "Launch Agent Workspace",
    ctaHref: "/agents",
  },
  "news-sentiment": {
    title: "Read News Sentiment",
    tag: "Social Sentiment",
    icon: Search,
    shortDesc: "Scan 30-day web articles and press releases to calculate real-time market sentiment indexes.",
    detailedDesc: "Leveraging Tavily Search endpoints, this agent crawls public news feeds, financial newsletters, and press releases. It utilizes natural language processing to assign positive, neutral, or negative weights to each article, compiling a cohesive sentiment index.",
    howItWorks: [
      "Query search engines for recent news articles related to the ticker.",
      "Extract core headline text and article bodies.",
      "Classify article sentiment using NLP algorithms.",
    ],
    metricsUsed: ["Sentiment index score (-1.0 to 1.0)", "Daily news volume tracking", "Key positive/negative topics"],
    ctaText: "Launch Agent Workspace",
    ctaHref: "/agents",
  },
  "technical-signals": {
    title: "Analyze Technical Signals",
    tag: "Quantitative Tracking",
    icon: TrendingUp,
    shortDesc: "Monitor trend momentum and breakout patterns including RSI, MACD, and moving average cross-overs.",
    detailedDesc: "This agent pulls historical price candle data from Finnhub to run automated technical analysis. It calculates relative strength indexes (RSI), moving average convergence divergence (MACD), and exponential moving averages (EMA) to identify overbought or oversold conditions.",
    howItWorks: [
      "Fetch historical price candle arrays for the target asset.",
      "Calculate 14-day RSI and MACD convergence indexes.",
      "Flag moving average crossovers (e.g. Golden Cross).",
    ],
    metricsUsed: ["RSI Index Score", "MACD Signal Crossovers", "EMA 50 / 200 breakouts"],
    ctaText: "Launch Agent Workspace",
    ctaHref: "/agents",
  },
  "qualitative-synthesis": {
    title: "Qualitative Synthesis",
    tag: "Semantic Processing",
    icon: FileText,
    shortDesc: "Parse qualitative statements in earnings transcripts to outline risks and core tailwinds.",
    detailedDesc: "Quantitative metrics don't tell the whole story. Our qualitative agent searches for strategic direction, product milestones, and regulatory headwinds mentioned in filings and earnings calls, organizing them into a structured pros-and-cons checklist.",
    howItWorks: [
      "Parse the management discussion and analysis (MD&A) sections.",
      "Extract mentions of competitive threats and growth strategies.",
      "Synthesize structured bullet summaries.",
    ],
    metricsUsed: ["Competitor mentions", "Strategic tailwind indicators", "Risk factor count"],
    ctaText: "Launch Agent Workspace",
    ctaHref: "/agents",
  },
  "historical-patterns": {
    title: "Historical Pattern Search",
    tag: "Statistical Correlation",
    icon: HelpCircle,
    shortDesc: "Cross-reference historical earnings releases to measure stock performance correlation.",
    detailedDesc: "History doesn't repeat, but it rhymes. This agent scans historical price movements during past earnings announcements to predict probable price distribution offsets for upcoming earnings cycles.",
    howItWorks: [
      "Cross-reference prior earnings dates with historic price database.",
      "Calculate average percentage changes over post-release periods.",
      "Output historical distribution statistics.",
    ],
    metricsUsed: ["Post-earnings average price drift", "Probability density offsets", "Earnings volatility index"],
    ctaText: "Launch Agent Workspace",
    ctaHref: "/agents",
  },
  "form-thesis": {
    title: "Form Research Thesis",
    tag: "Gemini Synthesis Node",
    icon: Cpu,
    shortDesc: "Orchestrate Gemini 2.0 Flash to synthesize final recommendations based on all collected data.",
    detailedDesc: "The final synthesis agent brings everything together. It reads the payloads from the fundamental, technical, news, and qualitative nodes to compile a single cohesive research report with an automated rating (Invest, Hold, Avoid).",
    howItWorks: [
      "Assemble payload states from all preceding agent nodes.",
      "Format system prompts containing the data context.",
      "Synthesize recommendation metrics and plain English reports.",
    ],
    metricsUsed: ["Automated Rating (Invest, Hold, Avoid)", "Final Thesis statement", "Summary bullet metrics"],
    ctaText: "Launch Agent Workspace",
    ctaHref: "/agents",
  },
};

export default function SkillDetailPage({ params }: { params: { slug: string } }) {
  const skill = SKILLS_MAP[params.slug];

  if (!skill) {
    notFound();
  }

  const IconComponent = skill.icon;

  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      {/* Back Link */}
      <Link
        href="/agents"
        className="mb-8 inline-flex items-center gap-1.5 text-xs text-ink-500 transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-3 w-3" /> Back to Agent Workspace
      </Link>

      {/* Main Grid */}
      <div className="grid items-start gap-12 md:grid-cols-[1.5fr_1fr]">
        {/* Left Informational Content */}
        <div className="space-y-8">
          <div className="space-y-3">
            <span className="block text-2xs uppercase tracking-wider text-brand-700">{skill.tag}</span>
            <h1 className="text-display-sm font-medium text-ink">{skill.title}</h1>
            <p className="text-lg leading-relaxed text-ink-500">{skill.shortDesc}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-ink">Detailed Overview</h2>
            <p className="text-sm leading-relaxed text-ink-500">{skill.detailedDesc}</p>
          </div>

          <div className="card-surface space-y-4 p-6">
            <h3 className="text-sm font-medium text-ink">How the Agent Executes</h3>
            <ul className="space-y-3">
              {skill.howItWorks.map((step, idx) => (
                <li key={idx} className="flex gap-3 text-xs text-ink-500">
                  <span className="text-brand-600">0{idx + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Sidebar Details */}
        <div className="space-y-6">
          <div className="card-surface flex min-h-[220px] flex-col items-center space-y-4 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface-subtle">
              <IconComponent className="h-6 w-6 text-brand-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-ink">{skill.title}</h3>
            <p className="max-w-[200px] text-xs text-ink-500">
              Ready to execute this agent skill? Access the LangGraph workspace.
            </p>
            <Link href={skill.ctaHref} className="w-full">
              <Button className="w-full py-2.5 text-xs font-medium">{skill.ctaText}</Button>
            </Link>
          </div>

          <div className="card-surface space-y-4 p-6">
            <h4 className="text-xs uppercase tracking-wider text-ink-400">Key Metrics Parsed</h4>
            <ul className="space-y-2">
              {skill.metricsUsed.map((m) => (
                <li key={m} className="flex items-center gap-2 text-xs text-ink-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
