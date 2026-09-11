import type { Metadata } from "next";
import { PARENT_ORG_NAME, PARENT_ORG_URL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE_NAME} is a ${PARENT_ORG_NAME} project (goshbuzz.com) — free Pakistan test prep.`,
  alternates: { canonical: `${SITE_URL}/about` },
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
    </article>
  );
}
