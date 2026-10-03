import type { Metadata } from "next";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Explore 100+ Pakistan Tests — Admissions, Jobs, IELTS" },
  description:
    "Filter MDCAT, ECAT, CSS, PMS, GAT, ISSB, ACCA, IELTS and recruitment tests by category or career stage — free syllabus, MCQs and timed mocks for each.",
  alternates: { canonical: `${SITE_URL}/explore` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/explore`,
    title: "Explore — every major Pakistan test in one filterable hub",
    description:
      "100+ exams for admissions, jobs, licensing and immigration. Free syllabus ticklists, original MCQ banks and timed mocks for each.",
    images: [OG_IMAGE],
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
