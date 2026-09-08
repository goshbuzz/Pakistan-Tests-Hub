"use client";

import { useState } from "react";
import Link from "next/link";
import { ALERTS } from "@/data/content";
import { TESTS } from "@/data/tests";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function AlertsPage() {
  const { lang, saved } = useStore();
  const t = dict[lang];
  const [only, setOnly] = useState(false);
  const items = [...ALERTS]
    .filter((a) => !only || saved.includes(a.test_id))
    .sort((a, b) => b.published_at.localeCompare(a.published_at));

  return (
    <div>
      <h1 className="text-2xl font-semibold">{t.alerts}</h1>
      <div className="mt-3 flex gap-2">
        <button onClick={() => setOnly(false)} className={`rounded-full px-3 py-1 text-sm ${!only ? "bg-emerald-800 text-white" : "border bg-white"}`}>
          {t.allAlerts}
        </button>
        <button onClick={() => setOnly(true)} className={`rounded-full px-3 py-1 text-sm ${only ? "bg-emerald-800 text-white" : "border bg-white"}`}>
          {t.savedOnly}
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-500">Sourced from official conducting-body notices. Always re-check the linked site before applying.</p>
      <ul className="mt-4 space-y-2">
        {items.map((a) => {
          const test = TESTS.find((x) => x.id === a.test_id);
          return (
            <li key={a.id} className="rounded-xl border bg-white p-4">
              <Link href={`/tests/${a.test_id}`} className="text-xs text-emerald-800">
                {test?.name}
              </Link>
              <div className="font-medium">{a.title}</div>
              <p className="text-sm text-stone-600">{a.body}</p>
              <div className="mt-1 text-xs text-stone-400">
                {a.type} · {a.published_at.slice(0, 10)}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
