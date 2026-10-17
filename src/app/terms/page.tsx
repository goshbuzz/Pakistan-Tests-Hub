import type { Metadata } from "next";
import { PageFaq } from "@/components/PageFaq";
import { PAGE_FAQS } from "@/data/pageFaqs";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { AdsterraBanner } from "@/components/Adsterra";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use — Unofficial Study Material" },
  description: `${SITE_NAME} is unofficial practice material. Rules, dates and fees are authoritative only on FPSC, PPSC, NTS, UHS and other official sites.`,
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
      <p>Content is provided as-is. Ads from Google AdSense and our ad partner Adsterra may appear on the website. Ads are labelled and never change exam dates, fees or apply links.</p>
      <PageFaq items={PAGE_FAQS.terms} title="Terms — quick answers" idPrefix="terms-faq" />
      <AdsterraBanner />
    </article>
  );
}
