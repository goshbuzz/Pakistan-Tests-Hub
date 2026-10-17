import type { Metadata } from "next";
import { PageFaq } from "@/components/PageFaq";
import { PAGE_FAQS } from "@/data/pageFaqs";
import { OG_IMAGE, PARENT_ORG_NAME, PARENT_ORG_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import { AdsterraBanner } from "@/components/Adsterra";

export const metadata: Metadata = {
  title: { absolute: "About Pakistan Tests Hub — a GoshBuzz Project" },
  description:
    "Why this hub exists: free, honest prep for 100 Pakistani exams — original MCQs, timed mocks and official apply links, never leaked papers.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    title: `About ${SITE_NAME} — a ${PARENT_ORG_NAME} project`,
    description: "Why a free, honest, official-links-only exam prep hub exists for Pakistani students and job seekers.",
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <article className="max-w-2xl space-y-4 text-sm leading-relaxed">
      <h1 className="text-2xl font-semibold">About Pakistan Tests Hub</h1>
      <p>
        <strong>Pakistan Tests Hub is a project of {PARENT_ORG_NAME}</strong> (
        <a className="text-emerald-800 underline" href={PARENT_ORG_URL} rel="noopener noreferrer">
          goshbuzz.com
        </a>
        ). GoshBuzz publishes this free exam-prep hub as part of its digital knowledge work.
      </p>
      <p>
        We built this hub so Pakistani students and job seekers can prepare for MDCAT, CSS, PPSC, NTS, ISSB, IELTS and 100 packed
        tests without paying an academy. Practice items are original public-knowledge MCQs and mini-mocks that follow each exam’s
        last publicly described mix. We do not host leaked papers. You always apply on the official conducting-body site.
      </p>
      <p>
        The website is free and may show Google ads. An Android wrapper, if you install one, uses AdMob banners instead of AdSense.
      </p>
      <AdsterraBanner />
      <PageFaq items={PAGE_FAQS.about} title="About this project — quick answers" idPrefix="about-faq" />
    </article>
  );
}
