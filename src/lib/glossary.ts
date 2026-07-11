import { GlossaryEntry } from "@/types";

export const glossary: Record<string, GlossaryEntry> = {
  "P/E Ratio": {
    term: "P/E Ratio",
    definition:
      "Price-to-Earnings ratio. How much investors are willing to pay for every ₹1 (or $1) of profit the company makes. A higher P/E usually means the market expects strong future growth.",
    example:
      "If a company earns ₹10 per share and trades at ₹200, its P/E is 20 — you're paying 20x earnings.",
  },
  "P/B Ratio": {
    term: "P/B Ratio",
    definition:
      "Price-to-Book ratio. Compares the stock price to the company's net assets (assets minus liabilities). A P/B below 1 can mean the stock is undervalued, or that the business is struggling.",
    example:
      "P/B of 3 means the market values the company at 3 times what its books say it's worth.",
  },
  "Market Cap": {
    term: "Market Cap",
    definition:
      "Market Capitalisation — the total value of all shares of a company combined. It tells you the size of the company as priced by the stock market.",
    example:
      "If a company has 1 crore shares at ₹500 each, its market cap is ₹500 crore.",
  },
  "52-Week Range": {
    term: "52-Week Range",
    definition:
      "The highest and lowest price the stock has traded at over the past year. It gives you context on whether today's price is near historical highs or lows.",
    example:
      "52-week range of ₹200–₹400 means the stock hit ₹400 at its best and ₹200 at its worst this year.",
  },
  "Revenue": {
    term: "Revenue",
    definition:
      "The total money a company earns from its core business activities — before subtracting any expenses. Also called 'top line' or 'sales'.",
    example:
      "If a company sells 1,000 products at ₹500 each, its revenue is ₹5 lakh.",
  },
  "Gross Margin": {
    term: "Gross Margin",
    definition:
      "The percentage of revenue left after subtracting the direct cost of making the product (cost of goods sold). A higher gross margin means more money available to cover other expenses and generate profit.",
    example:
      "Gross margin of 60% means for every ₹100 in sales, ₹60 remains after production costs.",
  },
  "Net Margin": {
    term: "Net Margin",
    definition:
      "The percentage of revenue that becomes actual profit after all expenses — including taxes, interest, and overhead — are paid. This is the company's 'bottom line'.",
    example:
      "Net margin of 10% means the company keeps ₹10 as profit for every ₹100 in sales.",
  },
  "Operating Margin": {
    term: "Operating Margin",
    definition:
      "The percentage of revenue left after operating expenses (like salaries, rent, marketing) but before interest payments and taxes. It shows how efficient the core business is.",
    example:
      "Operating margin of 20% means the business earns ₹20 per ₹100 in sales from day-to-day operations.",
  },
  "ROE": {
    term: "ROE",
    definition:
      "Return on Equity — how efficiently a company uses shareholders' money to generate profit. A higher ROE generally means the company is creating more value for its owners.",
    example:
      "ROE of 15% means for every ₹100 of shareholders' funds, the company earns ₹15 in profit.",
  },
  "ROA": {
    term: "ROA",
    definition:
      "Return on Assets — how much profit a company makes relative to its total assets. It shows how good the management is at using what they own to generate earnings.",
    example:
      "ROA of 8% means the company generates ₹8 in profit for every ₹100 of assets.",
  },
  "Debt-to-Equity": {
    term: "Debt-to-Equity",
    definition:
      "How much debt the company has compared to shareholders' equity. A high ratio means the company relies heavily on borrowed money, which adds financial risk.",
    example:
      "D/E of 2 means the company has borrowed ₹2 for every ₹1 owned by shareholders.",
  },
  "Current Ratio": {
    term: "Current Ratio",
    definition:
      "A measure of a company's ability to pay its short-term bills. A ratio above 1 means the company has more current assets (cash, inventory) than current liabilities (bills due soon).",
    example:
      "Current ratio of 1.5 means for every ₹1 of bills due soon, the company has ₹1.50 in liquid assets.",
  },
  "EPS": {
    term: "EPS",
    definition:
      "Earnings Per Share — the portion of a company's profit allocated to each outstanding share. A growing EPS over time generally signals a healthy, growing business.",
    example:
      "EPS of ₹25 means the company earned ₹25 of profit for each share outstanding.",
  },
  "Beta": {
    term: "Beta",
    definition:
      "A measure of a stock's volatility compared to the overall market. Beta of 1 = moves with the market. Beta > 1 = more volatile (higher risk, higher potential reward). Beta < 1 = less volatile.",
    example:
      "Beta of 1.5 means if the market falls 10%, this stock might fall around 15%.",
  },
  "RSI": {
    term: "RSI",
    definition:
      "Relative Strength Index — a technical indicator that measures how fast a stock's price is moving up or down, on a scale of 0–100. Above 70 suggests overbought (may pull back); below 30 suggests oversold (may rebound).",
    example:
      "RSI of 75 signals the stock has rallied fast and might be due for a pullback.",
  },
  "Moving Average": {
    term: "Moving Average",
    definition:
      "The average price of a stock over a specific period (like 50 or 200 days), updated daily. It smooths out short-term noise to show the underlying trend.",
    example:
      "If a stock's 200-day moving average is ₹500 but it's trading at ₹450, the stock is below its long-term trend.",
  },
  "Golden Cross": {
    term: "Golden Cross",
    definition:
      "A bullish technical signal where the 50-day moving average crosses above the 200-day moving average. Traders see this as a potential start of an uptrend.",
    example:
      "When 50-day MA crosses above 200-day MA, it's called a Golden Cross — historically a positive signal.",
  },
  "Death Cross": {
    term: "Death Cross",
    definition:
      "The opposite of a Golden Cross — when the 50-day moving average crosses below the 200-day moving average. It can signal the start of a downtrend.",
    example:
      "Death Cross often appears after a prolonged decline and can indicate continued weakness.",
  },
  "Volume": {
    term: "Volume",
    definition:
      "The number of shares traded in a given period. High volume during a price move suggests strong conviction; low volume during a move suggests it may not be sustained.",
    example:
      "Volume spike on an up-day often confirms buyers are serious about the rally.",
  },
  "Dividend Yield": {
    term: "Dividend Yield",
    definition:
      "The annual dividend a company pays per share, expressed as a percentage of the current stock price. A useful income metric for investors who want regular cash payouts.",
    example:
      "Dividend yield of 3% means a ₹1,000 stock pays ₹30 per year in dividends.",
  },
  "FII": {
    term: "FII",
    definition:
      "Foreign Institutional Investors — large overseas funds (like pension funds, hedge funds) that invest in Indian markets. FII buying is often seen as a sign of confidence in India's economy.",
    example:
      "When FIIs are net buyers, they're purchasing more shares than they're selling — a generally bullish sign.",
  },
  "DII": {
    term: "DII",
    definition:
      "Domestic Institutional Investors — large Indian funds like mutual funds and insurance companies that invest in Indian stocks. DII activity often counters FII flows.",
    example:
      "When FIIs sell, DIIs often step in to buy, which can cushion the market decline.",
  },
  "Free Cash Flow": {
    term: "Free Cash Flow",
    definition:
      "The actual cash a company generates from its business after accounting for capital expenditures (investment in equipment, property, etc.). It's the cash that's truly available to return to shareholders.",
    example:
      "A company with ₹100 crore in profit but negative free cash flow may be spending heavily on growth — not necessarily bad, but worth watching.",
  },
  "Moat": {
    term: "Moat",
    definition:
      "A company's durable competitive advantage — what protects it from competition over the long term. Companies with a strong moat can maintain profitability even when competitors try to copy them.",
    example:
      "A moat could be a brand (Coca-Cola), network effects (WhatsApp), or patents (pharmaceutical companies).",
  },
  "52-Week High": {
    term: "52-Week High",
    definition:
      "The highest price at which the stock has traded in the past 12 months. Trading near the 52-week high can indicate strong momentum; breaking above it is often seen as bullish.",
    example: "Stock at ₹490 vs 52-week high of ₹500 — it's close to its peak.",
  },
  "52-Week Low": {
    term: "52-Week Low",
    definition:
      "The lowest price at which the stock has traded in the past 12 months. A stock near its 52-week low may be under pressure, or may represent a value opportunity if fundamentals are intact.",
    example:
      "Stock at ₹210 vs 52-week low of ₹200 — it's near its lowest point this year.",
  },
  "Earnings Surprise": {
    term: "Earnings Surprise",
    definition:
      "The difference between what analysts predicted a company would earn and what it actually reported. A positive surprise often causes the stock to rise; a negative surprise can cause it to fall sharply.",
    example:
      "If analysts expected ₹10 EPS and the company reported ₹13, that's a +30% positive earnings surprise.",
  },
  "Valuation": {
    term: "Valuation",
    definition:
      "How the market prices a company relative to its earnings, assets, or revenue. 'Expensive' valuation means you're paying a high premium for growth; 'cheap' valuation may indicate value or risk.",
    example:
      "A company with a P/E of 50 is more 'expensively valued' than one with a P/E of 12 in the same sector.",
  },
  "Bull Market": {
    term: "Bull Market",
    definition:
      "A period where stock prices are rising broadly, typically by 20% or more from a recent low, and investor confidence is high.",
    example: "India's bull market from 2020–2024 saw Nifty 50 nearly triple in value.",
  },
  "Bear Market": {
    term: "Bear Market",
    definition:
      "A period where stock prices fall broadly by 20% or more from recent highs, often accompanied by economic slowdowns and low investor confidence.",
    example:
      "The 2008 financial crisis triggered a global bear market; Indian markets fell over 50%.",
  },
  "ETF": {
    term: "ETF",
    definition:
      "Exchange-Traded Fund — a basket of securities (like stocks or bonds) that you can buy and sell on a stock exchange, just like a regular share. ETFs typically track an index.",
    example:
      "Nifty BeES is an ETF that tracks the Nifty 50 index — buying it gives you exposure to all 50 top Indian stocks at once.",
  },
  "Mutual Fund": {
    term: "Mutual Fund",
    definition:
      "A pooled investment vehicle managed by a professional fund manager who invests in stocks, bonds, or other assets on behalf of investors. Unlike ETFs, mutual funds are priced once a day at NAV.",
    example:
      "A large-cap mutual fund pools money from many investors to buy shares in top Indian companies.",
  },
  "NAV": {
    term: "NAV",
    definition:
      "Net Asset Value — the per-unit price of a mutual fund. It's calculated by dividing the total value of all assets in the fund by the number of units outstanding.",
    example:
      "If a fund holds ₹1 crore in stocks and has 1 lakh units outstanding, the NAV is ₹100.",
  },
  "Support Level": {
    term: "Support Level",
    definition:
      "A price level where a stock has historically tended to stop falling and bounce back up. Traders watch support levels as potential buying zones.",
    example:
      "If a stock keeps bouncing off ₹300 every time it falls, ₹300 is a support level.",
  },
  "Resistance Level": {
    term: "Resistance Level",
    definition:
      "A price level where a stock has historically tended to stop rising and pull back. Traders watch resistance levels as potential selling zones.",
    example:
      "If a stock consistently fails to break above ₹500, that's a resistance level.",
  },
  "Sector": {
    term: "Sector",
    definition:
      "A broad category of businesses that share similar activities. Common sectors include Technology, Healthcare, Finance, Energy, and Consumer Goods. Stocks in the same sector often move together.",
    example:
      "Infosys, TCS, and Wipro are all in the Technology sector — all benefit when IT spending rises.",
  },
  "Earnings Per Share": {
    term: "Earnings Per Share",
    definition:
      "See EPS — the amount of profit a company makes for each share outstanding. Used to compare profitability across companies.",
    example: "EPS of ₹20 means the company made ₹20 of profit per share.",
  },
  "Revenue Growth": {
    term: "Revenue Growth",
    definition:
      "How much a company's sales have increased compared to the previous period (quarter or year). Consistent revenue growth is a key sign of a healthy, expanding business.",
    example:
      "10% annual revenue growth means the company is selling 10% more this year than last year.",
  },
  "Price Target": {
    term: "Price Target",
    definition:
      "An analyst's estimate of where a stock's price will be in 12 months, based on financial modeling. It's a research opinion, not a guarantee.",
    example:
      "An analyst sets a ₹600 price target on a stock trading at ₹450 — implying 33% upside potential.",
  },
  "CAGR": {
    term: "CAGR",
    definition:
      "Compound Annual Growth Rate — the rate at which something (revenue, earnings, stock price) would have grown if it had grown at a steady rate each year. Smooths out year-to-year volatility.",
    example:
      "Revenue CAGR of 15% over 5 years means revenues roughly doubled from the starting point.",
  },
  "Promoter Holding": {
    term: "Promoter Holding",
    definition:
      "The percentage of shares held by the company's founders or controlling shareholders. High, stable promoter holding is often seen as a sign of confidence in the company's future.",
    example:
      "Promoter holding of 60% means founders own 60% of the company and have significant skin in the game.",
  },
};

export function getGlossaryEntry(term: string): GlossaryEntry | undefined {
  return glossary[term];
}

export function getAllGlossaryTerms(): string[] {
  return Object.keys(glossary);
}
