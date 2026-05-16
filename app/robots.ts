import type { MetadataRoute } from "next";

// Major AI / LLM crawlers we explicitly want to allow.
// Each gets its own block so the policy is unambiguous if we ever tighten
// the wildcard default.
const AI_BOTS = [
  // OpenAI
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Google AI
  "Google-Extended",
  // Meta
  "FacebookBot",
  "Meta-ExternalAgent",
  // Apple
  "Applebot-Extended",
  // Cohere
  "cohere-ai",
  // Common Crawl (used by many AI training sets)
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_BOTS, allow: "/", disallow: "/api/" },
    ],
    sitemap: "https://webbly.no/sitemap.xml",
  };
}
