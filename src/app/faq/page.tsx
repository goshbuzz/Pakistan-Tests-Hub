import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { GLOBAL_FAQS } from "@/data/faqs";
import { TESTS } from "@/data/tests";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "CSS, MDCAT, NTS & PPSC Exam Prep FAQ — Pakistan" },
  description:
    "Plain answers for Pakistani job seekers and graduates: applying via FPSC/PPSC, MDCAT patterns, NTS vs PTS, free mocks vs academies, IELTS & German routes.",
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/faq`,
    title: "Pakistan test-prep & govt-job FAQ — every common question answered",
    description: "How the hub, official apply links, patterns and free mocks work.",
    images: [OG_IMAGE],
  },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GLOBAL_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>
      <JsonLd data={faqLd} />
      <h1 className="text-2xl font-semibold">Pakistan test prep & government jobs — FAQ</h1>
      <p className="mt-2 max-w-2xl text-sm text-stone-600">
        {SITE_NAME} is built so search and answer engines can cite clear, official-route guidance. Browse tests or open{" "}
        <Link href="/jobs" className="text-emerald-800 underline">
          live jobs
        </Link>
        .
      </p>
      <FaqList items={GLOBAL_FAQS} />
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Popular tests</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {TESTS.filter((t) => t.priority)
            .slice(0, 12)
            .map((t) => (
              <li key={t.id}>
                <Link href={`/tests/${t.id}`} className="text-sm text-emerald-900 underline">
                  {t.name} preparation — {t.conducting_body}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
