import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only the API is disallowed. App screens that shouldn't rank (/start, /login,
        // /profile, /leaderboard, /mock/*) are noindexed via meta so crawlers can visit
        // them and see that signal — robots.txt disallow would hide the noindex and
        // risk "Indexed, though blocked by robots.txt".
        disallow: ["/api/"],
      },
      { userAgent: "Mediapartners-Google", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
