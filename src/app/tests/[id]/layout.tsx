import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/FaqList";
import { faqsForTest } from "@/data/faqs";
import { TESTS } from "@/data/tests";
import { PARENT_ORG_NAME, PARENT_ORG_URL, SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return TESTS.map((t) => ({ id: t.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const test = TESTS.find((t) => t.id === params.id);
  if (!test) return { title: "Test not found" };
  const title = `${test.name} preparation Pakistan — syllabus, MCQs, mocks, apply | ${SITE_NAME}`;
  const description = `${test.name} by ${test.conducting_body}. ${test.format_description} Eligibility: ${test.eligibility} Free original MCQs and 10 mocks. Apply only on the official site.`;
  const url = `${SITE_URL}/tests/${test.id}`;
  return {
    title,
    description,
    keywords: [test.name, `${test.name} MCQs`, `${test.name} syllabus`, `${test.name} mock`, test.conducting_body, "Pakistan jobs"],
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", locale: "en_PK" },
    twitter: { card: "summary", title, description },
  };
}

export default function TestLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const test = TESTS.find((t) => t.id === params.id);
  const faqs = test ? faqsForTest(test.name, test.conducting_body, test.format_description) : [];
  const ld = test
    ? [
        {
          "@context": "https://schema.org",
          "@type": "Course",
          name: `${test.name} self-study`,
          description: test.format_description,
          provider: {
            "@type": "EducationalOrganization",
            name: SITE_NAME,
            url: SITE_URL,
            parentOrganization: { "@type": "Organization", name: PARENT_ORG_NAME, url: PARENT_ORG_URL },
            publisher: { "@type": "Organization", name: PARENT_ORG_NAME, url: PARENT_ORG_URL },
          },
          educationalLevel: test.career_stage,
          inLanguage: ["en", "ur"],
          url: `${SITE_URL}/tests/${test.id}`,
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ]
    : [];

  return (
    <>
      {ld.length > 0 && <JsonLd data={ld} />}
      {children}
      {faqs.length > 0 && <FaqList items={faqs} title={`${test?.name} FAQ`} />}
    </>
  );
}
