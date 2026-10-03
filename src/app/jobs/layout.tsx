import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Government jobs in Pakistan 2026 — FPSC, PPSC, NTS, police & bank ads" },
  description:
    "Live-style listings synced from official FPSC, PPSC, NTS, PTS, Punjab Police, bank MTO and educator ads — eligibility, fee, last date and the official apply URL. Practise the matching test free.",
  alternates: { canonical: `${SITE_URL}/jobs` },
  keywords: ["Pakistan government jobs", "PPSC jobs 2026", "FPSC jobs", "NTS jobs", "Punjab police jobs", "bank jobs Pakistan"],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/jobs`,
    title: "Government jobs Pakistan — current ads & official apply links",
    description: "FPSC, PPSC, NTS, police, educators and bank recruitment, each mapped to its free prep test page.",
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
