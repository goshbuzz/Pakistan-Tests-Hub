"use client";

import Link from "next/link";
import { Fragment } from "react";
import { JOBS } from "@/data/jobs";
import { TESTS } from "@/data/tests";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { PageFaq } from "@/components/PageFaq";
import { PAGE_FAQS } from "@/data/pageFaqs";
import { AdsterraNative } from "@/components/Adsterra";

export default function JobsPage() {
  const { lang, saved, jobFollow, lastSync, markSynced } = useStore();
  const t = dict[lang];
  const prefs = new Set([...saved, ...jobFollow]);
  const mine = JOBS.filter((j) => prefs.size === 0 || prefs.has(j.test_id));
  const list = mine.length ? mine : JOBS;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{t.jobs}</h1>
          <p className="text-sm text-stone-500">
            Synced from official conducting-body URLs. Last sync: {lastSync ? lastSync.slice(0, 16).replace("T", " ") : "not yet"}
          </p>
        </div>
        <button
          onClick={() => {
            markSynced();
          }}
          className="rounded-full bg-emerald-800 px-4 py-2 text-sm text-white"
        >
          {t.sync}
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-500">
        Showing {prefs.size ? "followed / saved tests" : "all synced ads"}. Save a test or tap Follow on its Jobs tab.
      </p>
      <ul className="mt-4 space-y-3">
        {list.map((j, i) => {
          const test = TESTS.find((x) => x.id === j.test_id);
          return (
            <Fragment key={j.id}>
            {i === 2 && (
              <li className="list-none">
                <AdsterraNative />
              </li>
            )}
            <li className="rounded-2xl border bg-white p-4">
              <Link href={`/tests/${j.test_id}`} className="text-xs text-emerald-800">
                {test?.name}
              </Link>
              <div className="font-medium">{j.title}</div>
              <p className="text-sm text-stone-600">
                {j.organization} · {j.location}
              </p>
              <p className="text-xs text-stone-500">
                Close: {j.last_date} · {j.fee}
              </p>
              <a href={j.apply_url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-emerald-800">
                {t.applyNow} →
              </a>
            </li>
            </Fragment>
          );
        })}
      </ul>
      <PageFaq items={PAGE_FAQS.jobs} title="Jobs & apply — quick answers" idPrefix="jobs-faq" />
    </div>
  );
}
