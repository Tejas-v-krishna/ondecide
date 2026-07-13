import type { Metadata } from "next";
import ProductDemo from "@/components/demo/ProductDemo";

export const metadata: Metadata = {
  title: "OnDecide — AI Investment Research Demo",
  description:
    "Watch OnDecide's AI agent pipeline analyze NVDA in real-time — from data ingestion to actionable investment thesis.",
};

export default function DemoPage() {
  return <ProductDemo />;
}
