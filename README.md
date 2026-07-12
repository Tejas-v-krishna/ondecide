# OnDecide — AI-Powered Investment Research Platform

> **Understand any investment. Not just its score.**

OnDecide is a full-stack AI research platform that synthesizes live market data, financial fundamentals, news sentiment, historical patterns, and qualitative analysis into a single, plain-language research report — delivered in under 60 seconds.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-purple?style=flat-square)](https://clerk.dev/)
[![LangGraph](https://img.shields.io/badge/AI-LangGraph.js-green?style=flat-square)](https://langchain-ai.github.io/langgraphjs/)
[![Gemini](https://img.shields.io/badge/LLM-Gemini%202.0-blue?style=flat-square&logo=google)](https://ai.google.dev/)

---

## 🚀 What It Does

OnDecide runs **7 parallel AI agents** on every research request, each responsible for a distinct layer of investment analysis:

| # | Agent | Description |
|---|-------|-------------|
| 1 | **Resolve** | Identifies the asset from a partial name or ticker |
| 2 | **Financials** | Fetches live price, OHLC candles, fundamentals & scorecard |
| 3 | **News Synthesis** | Reads recent coverage and explains what it means for *this* investment |
| 4 | **Qualitative Read** | Reasons through management quality and competitive positioning |
| 5 | **Historical Pattern Matching** | Finds the closest market-history parallel and projects implications |
| 6 | **Analyst Sentiment Synthesis** | Summarises publicly available analyst commentary |
| 7 | **The Decision** | Produces a transparent Invest / Hold / Avoid recommendation with a reasoning breakdown |

The final report is rendered as a rich, interactive dashboard with a sticky navigation bar, a live price chart, financial scorecards, bull/bear case analysis, and a downloadable PDF.

---

## ✨ Features

- 🔍 **Smart Asset Resolution** — Accepts tickers, company names, or crypto symbols
- 📊 **Live Market Data** — Interactive 1-year price chart powered by `lightweight-charts`
- 📰 **News Synthesis** — AI-summarised headlines with sentiment analysis
- 🧮 **Financial Scorecard** — Valuation, profitability, growth, and red-flag metrics
- 🧠 **Qualitative & Historical Analysis** — LLM-powered reasoning layers
- 📈 **Technical Signals** — RSI, SMA, support/resistance, and trend indicators
- 🐂🐻 **Bull & Bear Case** — Structured tailwinds and risks
- ⬇️ **PDF Export** — Print-optimised dark-mode PDF via browser print dialog
- 💼 **Portfolio Tracker** — Save and monitor your positions
- 👁️ **Watchlist** — Track assets without a full research run
- 🌐 **International Stocks & Crypto** — Yahoo Finance fallback for global markets; CoinGecko fallback for crypto candles
- 🔐 **Authentication** — Clerk-powered sign-up / sign-in

---

## 🏗️ Architecture

```
src/
├── app/                        # Next.js 14 App Router
│   ├── page.tsx                # Marketing homepage (Bento Grid layout)
│   ├── research/[ticker]/      # Dynamic research report page
│   │   ├── page.tsx            # Server component (triggers SSE pipeline)
│   │   └── ResearchPageClient.tsx  # Client component (renders report)
│   ├── api/
│   │   └── research/route.ts   # POST endpoint — runs LangGraph pipeline
│   ├── portfolio/              # Portfolio tracker
│   ├── watchlist/              # Watchlist page
│   └── globals.css             # Global styles + print media queries
│
├── lib/
│   ├── agents/
│   │   ├── state.ts            # LangGraph shared state definition
│   │   ├── graph.ts            # Agent graph topology (7 nodes)
│   │   └── nodes/
│   │       ├── resolve.ts      # Asset resolution node
│   │       ├── financials.ts   # Market data & fundamentals node
│   │       ├── synthesis.ts    # Core synthesis node (builds ResearchReport)
│   │       └── ...             # Other pipeline nodes
│   ├── finnhub.ts              # Finnhub API client + Yahoo/CoinGecko fallbacks
│   └── gemini.ts               # Google Gemini LLM client
│
├── components/
│   ├── report/                 # Research report section components
│   │   ├── CompanySnapshot.tsx
│   │   ├── LiveMarketData.tsx  # lightweight-charts price chart
│   │   ├── Scorecard.tsx
│   │   ├── Decision.tsx        # Bull/Bear case + verdict
│   │   ├── NewsAnalysis.tsx
│   │   ├── TechnicalSignal.tsx
│   │   ├── HistoricalPattern.tsx
│   │   ├── QualitativeRead.tsx
│   │   ├── InsiderSentiment.tsx
│   │   ├── EarningsCallAnalysis.tsx
│   │   ├── CompetitorMatrix.tsx
│   │   ├── FinancialHealth.tsx
│   │   └── ReportNav.tsx       # Sticky section navigation
│   └── ui/
│       ├── Navbar.tsx          # Main navigation with mega-menu dropdowns
│       ├── SearchBar.tsx       # Global asset search
│       ├── AgentProgress.tsx   # Real-time SSE progress indicator
│       ├── AddToPortfolio.tsx
│       ├── SaveToWatchlist.tsx
│       └── ...
│
└── types/
    └── index.ts                # Shared TypeScript interfaces
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v3 |
| **Auth** | Clerk |
| **Database** | Supabase (Postgres) |
| **AI Pipeline** | LangGraph.js + LangChain.js |
| **LLM** | Google Gemini 2.0 Flash |
| **Market Data** | Finnhub API (primary), Yahoo Finance (fallback), CoinGecko (crypto fallback) |
| **Charts** | lightweight-charts (TradingView) |
| **Icons** | Lucide React |
| **Fonts** | Hedvig Letters Serif, Inter |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js `>=18`
- A Finnhub API key (free tier works for US stocks)
- A Google AI Studio API key (Gemini)
- A Clerk account (free tier)
- A Supabase project (free tier)

### 1. Clone the repository

```bash
git clone https://github.com/Tejas-v-krishna/ondecide.git
cd ondecide
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file at the root of the project:

```env
# ── Clerk Auth ──────────────────────────────────
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# ── Supabase ─────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>

# ── Market Data ───────────────────────────────────
FINNHUB_API_KEY=<your-finnhub-key>

# ── AI ───────────────────────────────────────────
GOOGLE_API_KEY=<your-google-ai-studio-key>

# ── Search (optional) ─────────────────────────────
TAVILY_API_KEY=<your-tavily-key>
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — search for any stock ticker (e.g. `AAPL`, `NVDA`, `RELIANCE.NS`) or crypto symbol (`BTC`, `ETH`).

---

## 🔑 API Keys

| Service | Free Tier? | Sign-up Link |
|---------|-----------|--------------|
| Finnhub | ✅ Yes (60 req/min) | https://finnhub.io |
| Google AI Studio (Gemini) | ✅ Yes | https://aistudio.google.com |
| Clerk | ✅ Yes (10k MAUs) | https://clerk.dev |
| Supabase | ✅ Yes | https://supabase.com |
| Tavily | ✅ Yes (1000 req/month) | https://tavily.com |

> **Note:** If the Gemini quota is exhausted, all AI nodes fall back to deterministic rules-based analysis. The platform remains fully functional, with the AI-generated prose replaced by structured computed summaries.

---

## 📐 Research Report Sections

Each generated report contains the following sections, accessible via the sticky sidebar navigation:

1. **Overview** — Company snapshot with logo, description, market cap, sector, and website
2. **Live Market Data** — Interactive 1-year OHLC chart with volume bars
3. **Scorecard** — Structured financial metrics across Valuation, Profitability, Growth, and Red Flags
4. **Financial Health** — Debt ratios, liquidity, and balance sheet summary
5. **Moat & History** — Competitive positioning and historical price pattern matching
6. **News & Earnings** — Synthesised news headlines + earnings call analysis
7. **Technicals & Peers** — RSI, SMAs, support/resistance + peer comparison matrix
8. **Thesis** — Bull case, Bear case, insider sentiment, and final Invest/Hold/Avoid decision

---

## 🌍 International Stock & Crypto Support

- **US Stocks:** Full support via Finnhub (price, fundamentals, news, analyst data)
- **International Stocks** (e.g. `RELIANCE.NS`, `TCS.NS`): Price chart data falls back to Yahoo Finance's public chart API automatically
- **Crypto** (e.g. `BTC`, `ETH`, `SOL`): Finnhub is attempted first; CoinGecko public API is the automatic fallback for candle data

---

## 📄 PDF Export

Click **Download PDF** on any research report to trigger the browser's print dialog. The page uses `@media print` CSS queries to:
- Preserve the dark theme (disables forced white background)
- Hide the navigation bars, action buttons, and chart controls
- Expand all collapsed sections for full content capture

---

## 🚧 Roadmap

- [ ] ETF & Mutual Fund research (via dedicated data partners)
- [ ] Real-time WebSocket price feed
- [ ] Multi-asset portfolio analytics dashboard
- [ ] Saved report history per user
- [ ] Email report delivery
- [ ] Mobile app (React Native)

---

## 📜 License

This project is for **personal and educational use**. All market data is sourced from third-party providers and is subject to their respective terms of service.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

*Built with ❤️ using Next.js, LangGraph, and Google Gemini.*
