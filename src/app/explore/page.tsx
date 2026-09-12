"use client";

import Link from "next/link";
import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORY_META, STAGES, TESTS } from "@/data/tests";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { AdBanner } from "@/components/Shell";

function ExploreInner() {
  const { lang } = useStore();
  const t = dict[lang];
  const sp = useSearchParams();
  const [cat, setCat] = useState<string>(sp.get("cat") || "all");
  const [stage, setStage] = useState<string>("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    return TESTS.filter((x) => {
      if (cat !== "all" && x.category !== cat) return false;
      if (stage !== "all" && x.career_stage !== stage) return false;
      if (q && !`${x.name} ${x.conducting_body}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, stage, q]);

  return (
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="text-2xl font-semibold sm:text-3xl">{t.explore}</h1>
      <p className="mt-1 text-sm text-stone-500">{TESTS.length} tests · filter by category or career stage</p>
      <div className="mx-auto max-w-xl">
        <AdBanner />
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.search}
        className="mx-auto mt-2 block w-full max-w-xl rounded-full border border-stone-300 bg-white px-5 py-2.5 text-center text-sm"
      />
      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-stone-500">{t.categories}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setCat("all")}
          className={`rounded-full px-3 py-1.5 text-xs ${cat === "all" ? "bg-emerald-800 text-white" : "border bg-white"}`}
        >
          All
        </button>
        {CATEGORY_META.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`rounded-full px-3 py-1.5 text-xs ${cat === c.key ? "bg-emerald-800 text-white" : "border bg-white"}`}
          >
            {c.icon} {lang === "ur" ? c.ur : c.label}
          </button>
        ))}
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-stone-500">{t.stages}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setStage("all")}
          className={`rounded-full px-3 py-1.5 text-xs ${stage === "all" ? "bg-[#C5A44E] text-[#01411C]" : "border bg-white"}`}
        >
          All stages
        </button>
        {STAGES.map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className={`rounded-full px-3 py-1.5 text-xs ${stage === s ? "bg-[#C5A44E] text-[#01411C]" : "border bg-white"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-5 text-sm text-stone-500">{list.length} matching</p>
      <div className="mt-2 grid gap-3 text-left sm:grid-cols-2">
        {list.map((test) => (
          <Link key={test.id} href={`/tests/${test.id}`} className="rounded-2xl border bg-white p-4 text-left hover:border-emerald-700">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{test.name}</div>
                <div className="text-sm text-stone-500">{test.conducting_body}</div>
              </div>
              {test.priority && (
                <span className="h-fit rounded bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-900">FULL</span>
              )}
            </div>
            <div className="mt-2 text-xs text-stone-500">
              {test.category} · {test.career_stage}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense>
      <ExploreInner />
    </Suspense>
  );
}
