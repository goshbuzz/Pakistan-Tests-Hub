import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * The app dashboard itself is not a search target — /explore, /jobs, /alerts and the
 * per-test pages already carry the indexable content. noindex + follow keeps Google
 * crawling *through* it while leaving the marketing home as the entry page.
 */
export const metadata: Metadata = {
  title: { absolute: "Prep dashboard — Pakistan Tests Hub app" },
  description:
    "Your personal Pakistan Tests Hub dashboard — day streak, points, saved tests, trending mocks and fresh exam alerts. Guest-friendly; progress stays on your device.",
  alternates: { canonical: `${SITE_URL}/start` },
  robots: { index: false, follow: true },
};

export default function StartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
