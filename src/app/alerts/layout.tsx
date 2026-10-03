import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Exam alerts Pakistan — CSS, MDCAT, PPSC & NTS notices feed" },
  description:
    "Date sheets, admit cards, result announcements and fee-deadline reminders for Pakistani admissions and recruitment tests, restyled from official conducting-body notices. Always re-check the source link.",
  alternates: { canonical: `${SITE_URL}/alerts` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/alerts`,
    title: "Pakistan exam & job alerts — dates, admit cards, results",
    description: "A focused feed of conducting-body notices for the tests you follow.",
  },
};

export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
