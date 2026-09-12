import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Exam and job alerts Pakistan — CSS, MDCAT, PPSC, NTS",
  description: "Official-source style alerts for Pakistani admissions and government job tests. Always re-check the conducting-body website.",
  alternates: { canonical: `${SITE_URL}/alerts` },
};

export default function AlertsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
