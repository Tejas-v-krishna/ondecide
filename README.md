# OnDecide — AI-Powered Investment Research Platform

OnDecide is an AI-driven investment research platform that replicates the daily workflow of a professional investment research analyst. It synthesizes real-time market data, financial models, news sentiment, and qualitative judgment to deliver a reasoned buy/hold/avoid recommendation in plain, accessible language.

---

## 🌟 Features

- **Live AI Research Pipeline:** Watch the LangGraph-powered AI assemble a full research report in real-time, fetching financials, news, and analyzing historical patterns.
- **Plain Language Breakdown:** Progressive disclosure via glossary tooltips ensures both beginners and professionals understand the *why* behind the data.
- **Multi-Asset Support:** Full research reports for both traditional stocks (e.g., AAPL, MSFT) and major cryptocurrencies (e.g., BTC, ETH, SOL).
- **Comprehensive Scorecards:** Visual breakdowns of company health including Technical Signals (RSI, SMA), Financial Health matrices, and Recharts-powered radar charts.
- **Real-Time Market Data:** Interactive price charts powered by TradingView's `lightweight-charts`.
- **Saved Watchlists:** Save and track your favorite research reports securely.

---

## 🏗 Architecture & Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server-Sent Events)
- **AI / Agentic Flow:** [LangGraph.js](https://langchain-ai.github.io/langgraphjs/) + Google Gemini (1.5/3.5 Flash)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL + RLS)
- **Market Data:** [Finnhub API](https://finnhub.io/)
- **News / Web Search:** [Tavily](https://tavily.com/)
- **Styling:** Tailwind CSS + Custom dark mode aesthetic

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Tejas-v-krishna/ondecide.git
cd ondecide
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

You will need to fill in `.env.local` with your own API keys:
- **Clerk:** Set up a project on [Clerk](https://clerk.com) to get `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
- **Supabase:** Set up a project on [Supabase](https://supabase.com) to get `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- **Finnhub:** Get a free API key at [Finnhub](https://finnhub.io).
- **Tavily:** Get a search API key at [Tavily](https://tavily.com).
- **Google Gemini:** Get an AI API key from [Google AI Studio](https://aistudio.google.com/).

### 4. Database Setup
Run the SQL script provided in `supabase/schema.sql` within your Supabase project's SQL editor to set up the `watchlist` table and Row Level Security (RLS) policies.

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🧠 How the AI Pipeline Works

When a user searches for a ticker, a POST request is sent to `/api/research`, triggering a LangGraph StateGraph that streams Server-Sent Events (SSE) back to the client. The pipeline involves:

1. **Resolve:** Identifies the asset type (Stock vs Crypto).
2. **Financials & News (Parallel):** Fetches real-time market metrics, quotes, and recent headlines.
3. **Qualitative Analysis:** Gemini synthesizes management strength, economic moats, and news sentiment.
4. **Historical Pattern:** Gemini compares current conditions to historical market parallels.
5. **Synthesis:** Assembles all data into a cohesive structured JSON report.
6. **Decision:** Issues a final Invest / Hold / Avoid verdict with a detailed confidence breakdown.

---

## 📜 License

MIT License. See `LICENSE` for more information.
