import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { BaseLanguageModelInput } from "@langchain/core/language_models/base";
import type { BaseMessage } from "@langchain/core/messages";

// Use empty string at build time (when env vars aren't present).
// At runtime, the API will throw a descriptive error if the key is missing.
const apiKey = process.env.GOOGLE_API_KEY ?? "";

// Ordered list of working Gemini models on this key. Each has its OWN
// free-tier daily quota pool, so falling back spreads load and lets the
// demo survive one pool being exhausted (the 20 req/day limit hits a
// single model, not the project). gemini-3-flash-preview is fastest;
// gemini-flash-latest is the slower-but-reliable backup.
type ModelTier = { name: string; temperature: number; maxOutputTokens: number };

const MODEL_TIERS: ModelTier[] = [
  { name: "gemini-3-flash-preview", temperature: 0.3, maxOutputTokens: 8192 },
  { name: "gemini-flash-latest", temperature: 0.3, maxOutputTokens: 8192 },
];

function buildModel(tier: ModelTier) {
  return new ChatGoogleGenerativeAI({
    model: tier.name,
    apiKey,
    temperature: tier.temperature,
    maxOutputTokens: tier.maxOutputTokens,
  });
}

// Wraps a primary model so that any failed invoke (e.g. 429 quota
// exhausted) transparently retries on the next model tier. Exposes the
// same `.invoke()` shape LangChain nodes already call, so no node edits
// are required.
function withFallback(
  primary: ChatGoogleGenerativeAI,
  others: ChatGoogleGenerativeAI[]
) {
  const models = [primary, ...others];
  return {
    async invoke(
      input: BaseLanguageModelInput,
      options?: unknown
    ): Promise<BaseMessage> {
      let lastErr: unknown;
      for (const m of models) {
        try {
          // LangChain invoke signature: (input, options?)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return await (m as any).invoke(input, options);
        } catch (err) {
          lastErr = err;
          // Try the next tier
        }
      }
      throw lastErr;
    },
  };
}

// Shared model instance for analytical tasks (low temperature).
export const geminiModel = withFallback(
  buildModel(MODEL_TIERS[0]),
  MODEL_TIERS.slice(1).map(buildModel)
);

// Higher temperature for creative/narrative sections.
export const geminiNarrativeModel = withFallback(
  buildModel({ ...MODEL_TIERS[0], temperature: 0.5, maxOutputTokens: 4096 }),
  MODEL_TIERS.slice(1).map((t) =>
    buildModel({ ...t, temperature: 0.5, maxOutputTokens: 4096 })
  )
);
