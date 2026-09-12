import type { Faq } from "@/data/faqs";

export function FaqList({ items, title = "Frequently asked questions" }: { items: Faq[]; title?: string }) {
  return (
    <section className="mt-8 rounded-3xl border border-stone-200 bg-white p-5" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-lg font-semibold text-[#01411C]">
        {title}
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        For job seekers, fresh graduates and professionals searching government jobs and test prep in Pakistan.
      </p>
      <div className="mt-3 divide-y">
        {items.map((f) => (
          <details key={f.q} className="py-3">
            <summary className="cursor-pointer font-medium text-stone-900">{f.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
