import { NextRequest } from "next/server";
// import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
export const maxDuration = 120; // 2 minutes for the full pipeline

// ─── In-memory rate limiter ────────────────────────────────
// Simple sliding window: max 5 requests per IP per minute
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true; // allowed
  }
  if (entry.count >= RATE_LIMIT_MAX) return false; // blocked
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // ── Auth check (DISABLED FOR DEMO) ─────────────────────────────────────────────
  // const { userId } = await auth();
  // if (!userId) {
  //   return new Response(JSON.stringify({ error: "Authentication required. Please sign in to run research." }), {
  //     status: 401,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // }

  // ── Rate limiting ──────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment before searching again." }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": "60",
      },
    });
  }

  // ── Input validation ───────────────────────────────────────
  const body = await req.json().catch(() => ({}));
  const { query } = body;

  if (!query || typeof query !== "string") {
    return new Response(JSON.stringify({ error: "query is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const trimmedQuery = query.trim();
  if (trimmedQuery.length === 0 || trimmedQuery.length > 100) {
    return new Response(JSON.stringify({ error: "Query must be between 1 and 100 characters." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Dynamically import runner so Gemini model isn't instantiated at build time
  const { runResearchPipeline } = await import("@/lib/agents/runner");

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sendSSE = (event: any) => {
        const data = `data: ${JSON.stringify(event)}\n\n`;
        controller.enqueue(encoder.encode(data));
      };

      try {
        await runResearchPipeline(trimmedQuery, sendSSE);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Pipeline failed unexpectedly";
        sendSSE({ type: "error", message });
      } finally {
        controller.close();
      }
    },
    cancel() {
      // Client disconnected
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
