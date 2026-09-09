import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explore 70+ Pakistan tests — admissions, CSS, NTS, IELTS",
  description:
    "Browse MDCAT, ECAT, CSS, PMS, GAT, ISSB, ACCA, IELTS, German A1–C2 and recruitment tests. Filter by category for job seekers and students in Pakistan.",
  alternates: { canonical: `${SITE_URL}/explore` },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
