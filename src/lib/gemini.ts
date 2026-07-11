import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Use empty string at build time (when env vars aren't present).
// At runtime, the API will throw a descriptive error if the key is missing.
const apiKey = process.env.GOOGLE_API_KEY ?? "";

// Shared Gemini model instance for analytical tasks
// Low temperature for consistent, factual analysis
export const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash",
  apiKey,
  temperature: 0.3,
  maxOutputTokens: 8192,
});

// Higher temperature for creative/narrative sections
export const geminiNarrativeModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash",
  apiKey,
  temperature: 0.5,
  maxOutputTokens: 4096,
});
