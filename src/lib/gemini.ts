import { ChatOpenAI } from "@langchain/openai";

// Use empty string at build time (when env vars aren't present).
// At runtime, the API will throw a descriptive error if the key is missing.
const apiKey = process.env.OPENROUTER_API_KEY ?? "";

// Shared model instance for analytical tasks
// Low temperature for consistent, factual analysis
export const geminiModel = new ChatOpenAI({
  modelName: "tencent/hy3:free",
  apiKey: apiKey,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  temperature: 0.3,
  maxTokens: 8192,
});

// Higher temperature for creative/narrative sections
export const geminiNarrativeModel = new ChatOpenAI({
  modelName: "tencent/hy3:free",
  apiKey: apiKey,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  temperature: 0.5,
  maxTokens: 4096,
});
