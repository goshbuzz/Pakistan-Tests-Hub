import type { Metadata } from "next";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Govt Jobs Pakistan 2026 — FPSC, PPSC, NTS & Police Ads" },
  description:
    "Current FPSC, PPSC, NTS, PTS, police, educator and bank MTO ads with eligibility, fee, last date and the official apply link on every listing.",
  alternates: { canonical: `${SITE_URL}/jobs` },
  keywords: ["Pakistan government jobs", "PPSC jobs 2026", "FPSC jobs", "NTS jobs", "Punjab police jobs", "bank jobs Pakistan"],
  openGraph: {
    type: "website",
    url: `${SITE_URL}/jobs`,
    title: "Government jobs Pakistan — current ads & official apply links",
    description: "FPSC, PPSC, NTS, police, educators and bank recruitment, each mapped to its free prep test page.",
    images: [OG_IMAGE],
  },
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
