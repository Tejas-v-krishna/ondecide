import { NextRequest, NextResponse } from "next/server";
import { searchSymbol } from "@/lib/finnhub";

// ─── In-memory rate limiter ────────────────────────────────
// Higher limit than research, 30 requests per minute per IP
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 30;
const RATE_LIMIT_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function GET(req: NextRequest) {
  // ── Rate limiting ──────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await searchSymbol(q);
    // Filter to stocks, ETPs, Mutual Funds
    const filtered = (data.result || [])
      .filter((r: { type: string }) => ["Common Stock", "ADR", "ETP", "ETF", "Mutual Fund"].includes(r.type))
      .slice(0, 8);
    return NextResponse.json({ results: filtered });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
