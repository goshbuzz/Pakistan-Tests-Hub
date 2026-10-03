import type { Metadata } from "next";
import { PageFaq } from "@/components/PageFaq";
import { PAGE_FAQS } from "@/data/pageFaqs";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact — Corrections, Ad Issues & Privacy" },
  description: `Report a wrong syllabus or dead link on ${SITE_NAME}, or reach the GoshBuzz editorial team for privacy and advertising questions.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: `Contact ${SITE_NAME}`,
    description: "Content corrections, advertising and privacy contacts.",
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl space-y-4 text-sm">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p>
        Pakistan Tests Hub is published by GoshBuzz. For syllabus corrections, privacy, or advertising:
      </p>
      <ul className="list-disc pl-5">
        <li>
          Use the “Suggest an update” box on any test page (queued locally for moderation).
        </li>
        <li>
          Email:{" "}
          <a className="text-emerald-800 underline" href="mailto:hello@pakistantestshub.com">
            hello@pakistantestshub.com
          </a>
        </li>
      </ul>
      <PageFaq items={PAGE_FAQS.contact} title="Before you write — quick answers" idPrefix="contact-faq" />
    </article>
  );
}
