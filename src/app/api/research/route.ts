import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 120; // 2 minutes for the full pipeline

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  if (!query || typeof query !== "string") {
    return new Response(JSON.stringify({ error: "query is required" }), {
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
        await runResearchPipeline(query.trim(), sendSSE);
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
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
