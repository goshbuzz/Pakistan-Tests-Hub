import type { Faq } from "@/data/faqs";
import { JsonLd } from "./JsonLd";

/**
 * Visible FAQ block + matching FAQPage JSON-LD for a single page (AEO requirement:
 * every page answers its own questions, schema validates against visible content).
 * No hooks — usable from server pages and client pages alike.
 */
export function PageFaq({
  items,
  title = "Frequently asked questions",
  idPrefix = "page-faq",
}: {
  items: Faq[];
  title?: string;
  idPrefix?: string;
}) {
  const headingId = `${idPrefix}-h`;
  return (
    <section
      className="mt-10 rounded-3xl border border-stone-200 bg-white p-5"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="text-lg font-semibold text-[#01411C]">
        {title}
      </h2>
      <div className="mt-3 divide-y divide-stone-100">
        {items.map((f) => (
          <details key={f.q} className="group py-2">
            <summary className="cursor-pointer list-none text-sm font-semibold text-stone-800 hover:text-emerald-900">
              <span className="mr-1.5 inline-block text-emerald-700 transition-transform group-open:rotate-90" aria-hidden>
                ▸
              </span>
              {f.q}
            </summary>
            <p className="mt-1.5 pl-6 pr-1 text-sm leading-relaxed text-stone-600">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </section>
  );
}
