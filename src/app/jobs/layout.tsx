import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pakistan government jobs 2026 — FPSC, PPSC, NTS, police, banks",
  description:
    "Official-route listings for FPSC, PPSC, NTS, PTS, Punjab Police, bank MTO and teaching jobs in Pakistan. Apply on the conducting-body site; practise the matching test here.",
  alternates: { canonical: `${SITE_URL}/jobs` },
  keywords: ["Pakistan government jobs", "PPSC jobs 2026", "FPSC jobs", "NTS jobs", "Punjab police jobs", "bank jobs Pakistan"],
};

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
