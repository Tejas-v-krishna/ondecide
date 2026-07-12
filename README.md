# OnDecide — AI-Powered Investment Research Platform

Understand any investment. Not just its score.

---

## Overview

OnDecide is a full-stack AI research platform built to replicate the daily workflow of a professional investment analyst, but written in plain language so that a first-time investor and a seasoned professional can both understand the reasoning behind a decision — not just the conclusion.

When a user searches for any stock, company name, or cryptocurrency, OnDecide runs seven parallel AI agents that gather data, synthesise it, and produce a structured research report in under 60 seconds. The report covers everything a real analyst would cover: live price data, financial fundamentals, recent news, qualitative judgment on the business, historical pattern matching, analyst sentiment, and a final reasoned recommendation.

The core design philosophy is transparency. Most investment tools give you a score. OnDecide shows its work. Every section of the report explains not just what the numbers say, but what they mean for this specific investment at this specific moment.

Supported asset types:
- US stocks with full financial data, news, and fundamentals (for example, AAPL, NVDA, TSLA)
- International stocks with price charts via an automatic Yahoo Finance fallback (for example, RELIANCE.NS, TCS.NS)
- Cryptocurrencies with an adapted pipeline using CoinGecko data where needed (for example, BTC, ETH, SOL)

---

## How to Run It

### What you need before you start

- Node.js version 18 or later
- npm version 9 or later
- Free accounts on Finnhub, Google AI Studio, Clerk, and Supabase (all have free tiers with no credit card required for basic use)

### Step 1 — Clone the repository

```
git clone https://github.com/Tejas-v-krishna/ondecide.git
cd ondecide
```

### Step 2 — Install dependencies

```
npm install
```

### Step 3 — Set up your environment variables

Create a file called `.env.local` in the root of the project and add the following:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

FINNHUB_API_KEY=<your-finnhub-key>
GOOGLE_API_KEY=<your-gemini-key>
TAVILY_API_KEY=<your-tavily-key>
```

Where to get each key:

| Key | Service | Link |
|-----|---------|-------|
| FINNHUB_API_KEY | Finnhub | https://finnhub.io — Register, then go to API Keys |
| GOOGLE_API_KEY | Google AI Studio | https://aistudio.google.com — click Get API Key |
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY | Clerk | https://clerk.dev — create an app, then go to API Keys |
| NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase | https://supabase.com — create a project, then go to Settings > API |
| TAVILY_API_KEY | Tavily | https://tavily.com — optional, used for supplementary web search |

One important note: if the Google API key is missing or the Gemini quota runs out, every AI node in the pipeline automatically falls back to a deterministic rules-based system. The report is still fully populated with real data — only the prose narration changes from generated text to structured computed summaries. The platform never crashes because of a missing API key.

### Step 4 — Start the development server

```
npm run dev
```

Then open http://localhost:3000 and search for any ticker or company name. Good ones to try are AAPL, NVDA, BTC, RELIANCE.NS, or ETH.

---

## How It Works

### The overall flow

The user types a search query. The Next.js frontend sends it to the API route at /api/research. That route runs a LangGraph.js agent pipeline — seven nodes that each handle a specific layer of the research — and streams the result back to the client, which renders the report section by section as data arrives.

```
User searches "AAPL"
        |
Next.js App Router (frontend)
        |
POST /api/research (runs on the server)
        |
LangGraph pipeline — 7 nodes run in sequence
  1. resolve.ts       — identify the asset, normalise the ticker
  2. financials.ts    — fetch live price, candles, and fundamentals
  3. synthesis.ts     — assemble the full report object from raw data
  4. qualitative.ts   — LLM analysis of management and competitive position
  5. historicalPattern.ts — find the closest market-history parallel
  6. news.ts          — fetch headlines and synthesise sentiment
  7. decision.ts      — produce Invest / Hold / Avoid with reasoning
        |
Streaming response renders each section as it completes
```

### Data sources and the fallback chain

For market data, the pipeline tries Finnhub first. If Finnhub returns no data — which is common for international stocks on the free tier — it automatically retries against Yahoo Finance's public chart API. For crypto, it tries Finnhub first and falls back to CoinGecko if blocked. These fallbacks are completely silent from the user's perspective. The chart just loads.

For AI analysis, all prose generation uses Google Gemini 2.0 Flash. It is fast enough that four sequential LLM calls still complete in under 30 seconds. If the quota is exceeded, the rules-based fallback takes over and the report remains accurate, just less narratively rich.

### Project structure

```
src/
  app/
    page.tsx                    — marketing homepage
    research/[ticker]/
      page.tsx                  — server component, triggers the pipeline
      ResearchPageClient.tsx    — client component, renders the report
    api/research/route.ts       — the POST endpoint that runs LangGraph
    portfolio/page.tsx          — portfolio tracker
    watchlist/page.tsx          — watchlist
    globals.css                 — global styles and print media queries

  lib/
    agents/
      state.ts                  — shared state schema for the graph
      graph.ts                  — node wiring and graph topology
      nodes/                    — one file per agent node
    finnhub.ts                  — API client with Yahoo and CoinGecko fallbacks
    gemini.ts                   — Gemini 2.0 Flash client

  components/
    report/                     — one component per report section
    ui/
      Navbar.tsx                — mega-menu navigation
      SearchBar.tsx             — global asset search
      AgentProgress.tsx         — real-time pipeline progress display

  types/index.ts                — all shared TypeScript interfaces
```

---

## Key Decisions and Trade-offs

### Why LangGraph.js for the pipeline

LangGraph provides a typed state graph where each node reads from and writes to a shared state object. This makes the inter-node data flow explicit and easy to debug. A plain LangChain chain would have been less transparent. The graph topology also made it straightforward to add fallback logic at the node level — if one node fails, it writes a default value to state and the rest of the pipeline continues unaffected.

### Why Finnhub with layered fallbacks instead of a single premium data source

Finnhub has a generous free tier and solid coverage for US equities. The critical insight during development was that building automatic fallbacks — rather than accepting failure — makes the app genuinely global without a paid data subscription. If Finnhub returns no candle data for a ticker, the system silently retries against Yahoo Finance, which covers virtually every global exchange. For crypto, CoinGecko fills the same gap. Users in India can research Reliance Industries with the same experience as users researching Apple.

### Why Gemini 2.0 Flash over other LLMs

Speed was the dominant constraint. A research report that takes three minutes defeats the purpose. Gemini Flash consistently generates 500-800 word analytical sections in two to four seconds per node, keeping the full pipeline under 30 seconds even when four LLM calls run sequentially. Latency matters more than marginal quality differences at this use case scale.

### Why a rules-based fallback exists at all

An AI platform that breaks when its API quota runs out is not a reliable product. Every LLM node has a structured fallback that computes a deterministic output from the raw numerical data. This means the platform degrades gracefully during demos, high-traffic periods, or when running without valid API keys. The financial data is always accurate — only the prose changes.

### What was deliberately left out and why

Real-time WebSocket price feeds would require a persistent server-side process to relay messages to clients, which is out of scope for this build but a clear next step.

ETF and mutual fund research is absent because Finnhub's free tier does not provide holdings data or expense ratios. Rather than showing a broken partial feature, the app redirects ETF queries to a curated educational directory. This is an honest acknowledgment of a data limitation, not an oversight.

Full report history — re-reading a past report without regenerating it — was not built. The Supabase schema supports it, but the pipeline is fast enough that regenerating felt acceptable within the submission timeframe.

Segment revenue breakdowns (for example, iPhone versus Services for Apple) require a premium data source. Top-level revenue figures are shown instead.

---

## Example Runs

### Apple Inc. (AAPL)

The pipeline identifies AAPL as a US equity on NASDAQ. Financials come in at roughly $213 per share, a P/E of 33x, trailing twelve-month revenue of $391 billion, and a gross margin around 46 percent. The scorecard grades it as expensive on valuation, excellent on profitability, moderate on growth, and clean on red flags. Technical indicators show RSI at 58 (neutral), price above both the 50-day and 200-day moving averages, and an overall bullish trend. News synthesis highlights accelerating Services revenue growth against iPhone demand uncertainty heading into a new hardware cycle. The historical pattern match finds a resemblance to Apple's own Q4 2020 setup before a strong multi-month run. The final verdict is Invest with a 72 percent confidence score. The reasoning notes that a strong balance sheet, expanding Services margin, and an upcoming product cycle favour patient long positions, with the premium valuation as the primary downside risk.

### Bitcoin (BTC)

The pipeline identifies BTC as a cryptocurrency and routes it through the crypto-adapted analysis path. Price data comes from CoinGecko since the Finnhub free tier restricts crypto candle access. At around $103,000, with a market cap near $2 trillion, the report acknowledges upfront that there are no earnings, management, or balance sheet to analyse — the thesis is macro and narrative driven. News synthesis finds institutional ETF inflows and a post-halving supply narrative dominating commentary. The historical pattern match draws a parallel to the 2020 post-halving cycle. The verdict is Hold with 58 percent confidence, noting strong structural tailwinds against high short-term volatility risk and emphasising that position sizing matters more than timing at this stage of the cycle.

### Reliance Industries (RELIANCE.NS)

The pipeline identifies the ticker as an NSE-listed Indian equity. Finnhub returns no candle data for this exchange, so the system automatically retries against Yahoo Finance and successfully loads the full year of price history. The scorecard shows revenue of roughly 9.7 trillion rupees, a 14 percent gross margin, and moderate leverage. News synthesis picks up positive commentary around the Jio 5G rollout and Reliance Retail expansion. The qualitative read notes the conglomerate's scale, capital allocation discipline, and political positioning as structural advantages. The verdict is Hold with 61 percent confidence, noting that diversification across telecom, retail, and energy provides stability but that near-term catalysts are limited at the current valuation.

---

## What I Would Improve With More Time

The most impactful next step would be real-time price streaming. The current implementation shows historical candle data but not a live-ticking price. Finnhub provides a WebSocket feed and adding it would make the Company Snapshot feel genuinely live.

Persistent report history would significantly improve the product for repeat users. The data model in Supabase already supports it — the main work is building the storage and retrieval layer and adding a Reports page to the dashboard.

ETF and mutual fund research requires a data partner that exposes holdings and expense ratios on a reasonably priced tier. Alpha Vantage and EOD Historical Data are candidates worth evaluating.

Segment revenue charts — showing revenue by product line or geography — would add meaningful depth to the financial section for companies where that breakdown is analytically important.

A multi-asset comparison view, where users can place two tickers side by side, would be straightforward to build given that the report data is already structured.

Shareable report URLs would let users send research to others without requiring an account, which is how research actually gets used and discussed.

On the technical side, a prompt evaluation harness — a way to systematically score LLM output quality across different asset types and iterate on the prompts — would be the most valuable infrastructure investment for improving report quality over time.

---

## Bonus — LLM Build Session Transcript

This entire project was built in a single extended conversation with Google Deepmind's Antigravity AI coding assistant, which runs on Gemini. The complete session transcript is included in the file called llm_build_transcript.jsonl.

It is a raw JSONL file where each line is a JSON object representing one step in the conversation — tool calls, file writes, terminal commands, design decisions, debugging sessions, and UI iterations based on screenshot feedback. The full build from initial specification to submission took place within this session, covering every architectural decision and implementation detail.

Notable moments in the transcript include the original project specification arriving at step zero, research sub-agents being spawned to study Finnhub, LangGraph, and Next.js patterns in steps one through fifty, the core pipeline being built across steps fifty through two hundred, frontend components and charts being assembled through step four hundred, debugging sessions covering the charting library swap and streaming architecture through step six hundred, and the final polish work on the Bento Grid homepage, Navbar z-index fix, Yahoo Finance fallback, and PDF export through the end of the session.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 with App Router |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v3 |
| Authentication | Clerk |
| Database | Supabase on Postgres |
| AI Pipeline | LangGraph.js and LangChain.js |
| Language Model | Google Gemini 2.0 Flash |
| Primary Market Data | Finnhub API |
| International Stock Fallback | Yahoo Finance public API |
| Crypto Price Fallback | CoinGecko public API |
| Charts | lightweight-charts by TradingView |
| Icons | Lucide React |
| Typography | Hedvig Letters Serif and Inter |

---

Built using Google Deepmind's Antigravity AI assistant — July 2026
