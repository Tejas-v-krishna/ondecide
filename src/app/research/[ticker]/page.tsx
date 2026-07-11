import type { Metadata } from "next";
import { ResearchPageClient } from "./ResearchPageClient";

interface Props {
  params: { ticker: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const ticker = decodeURIComponent(params.ticker).toUpperCase();
  return {
    title: `${ticker} Research Report — OnDecide`,
    description: `AI-powered investment research report for ${ticker}. Covers financial health, recent news, qualitative factors, historical patterns, and an Invest/Hold/Avoid verdict in plain language.`,
  };
}

export default function ResearchPage({ params }: Props) {
  return <ResearchPageClient ticker={params.ticker} />;
}
