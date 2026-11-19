import type { Metadata } from "next";
import ProductDemo from "@/components/demo/ProductDemo";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "OnDecide — AI Investment Research Demo",
  description:
    "Watch OnDecide's AI agent pipeline analyze NVDA in real-time — from data ingestion to actionable investment thesis.",
};

export default function DemoPage() {
  return (
    <div className="shell max-w-5xl py-16 lg:py-20">
      <PageHeader
        eyebrow="Product"
        title="See the pipeline in action"
        description="Watch OnDecide's AI agent pipeline work through an asset in real-time — from data ingestion to an actionable investment thesis."
      />
      <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-line bg-surface-subtle shadow-lg">
        <ProductDemo className="h-full w-full" />
      </div>
    </div>
  );
}
