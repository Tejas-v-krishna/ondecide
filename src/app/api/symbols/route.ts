import { NextRequest, NextResponse } from "next/server";
import { searchSymbol } from "@/lib/finnhub";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 1) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await searchSymbol(q);
    // Filter to stocks and crypto only, limit to 8
    const filtered = (data.result || [])
      .filter((r: { type: string }) => ["Common Stock", "ADR", "ETP"].includes(r.type))
      .slice(0, 8);
    return NextResponse.json({ results: filtered });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
