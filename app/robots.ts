import { profile } from "@/lib/data"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

// A portfolio wants to be found: search engines and AI crawlers are both
// welcome, and named explicitly so the intent is unambiguous.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${profile.url}/sitemap.xml`,
  }
}
