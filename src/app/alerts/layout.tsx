import type { Metadata } from "next";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Pakistan Exam Alerts — Admit Cards, Results & Dates" },
  description:
    "Date sheets, admit cards, results and deadline notices for MDCAT, CSS, PPSC, NTS and other Pakistani tests, restyled from official sources.",
  alternates: { canonical: `${SITE_URL}/alerts` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/alerts`,
    title: "Pakistan exam & job alerts — dates, admit cards, results",
    description: "A focused feed of conducting-body notices for the tests you follow.",
    images: [OG_IMAGE],
  },
};

export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
