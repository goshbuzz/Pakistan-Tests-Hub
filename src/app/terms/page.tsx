import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of use",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <article className="max-w-2xl space-y-4 text-sm leading-relaxed">
      <h1 className="text-2xl font-semibold">Terms of use</h1>
      <p>
        Pakistan Tests Hub is a GoshBuzz (goshbuzz.com) project. It is unofficial study material. Exam rules, fees and dates are only
        authoritative on FPSC, PPSC, NTS, UHS and other conducting-body sites. Practice scores are not official results. Do not
        submit applications on this site.
      </p>
      <p>Content is provided as-is. Ads may appear on content pages after Google approval.</p>
    </article>
  );
}
