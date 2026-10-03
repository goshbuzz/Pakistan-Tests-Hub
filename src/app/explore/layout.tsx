import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Explore tests — filter 100+ Pakistan exams by category & career stage" },
  description:
    "Browse MDCAT, ECAT, CSS, PMS, GAT, ISSB, ACCA, IELTS, German A1–C2 and recruitment tests for Pakistan. Filter by category or career stage, then open any test for syllabus, MCQs and timed mocks.",
  alternates: { canonical: `${SITE_URL}/explore` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/explore`,
    title: "Explore — every major Pakistan test in one filterable hub",
    description:
      "100+ exams for admissions, jobs, licensing and immigration. Free syllabus ticklists, original MCQ banks and timed mocks for each.",
  },
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
