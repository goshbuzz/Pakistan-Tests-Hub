import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { GLOBAL_FAQS } from "@/data/faqs";
import { TESTS } from "@/data/tests";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ — Government jobs, CSS, MDCAT, NTS, PPSC in Pakistan",
  description:
    "Answers for Pakistani job seekers and graduates: how to apply on FPSC/PPSC, MDCAT pattern, NTS vs PTS, free mocks vs academies, IELTS and German for immigration.",
  alternates: { canonical: `${SITE_URL}/faq` },
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
