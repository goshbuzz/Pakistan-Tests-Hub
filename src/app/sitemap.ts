import type { MetadataRoute } from "next";
import { TESTS } from "@/data/tests";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/explore`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${SITE_URL}/alerts`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];
  const tests = TESTS.map((t) => ({
    url: `${SITE_URL}/tests/${t.id}`,
    lastModified: t.last_updated ? new Date(t.last_updated) : now,
    changeFrequency: "weekly" as const,
    priority: t.priority ? 0.9 : 0.7,
  }));
  return [...staticPages, ...tests];
}
