"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORY_META, STAGES, TESTS } from "@/data/tests";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { AdBanner } from "@/components/Shell";
import { Suspense } from "react";

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
    <div>
      <h1 className="text-2xl font-semibold">{t.explore}</h1>
      <AdBanner />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t.search}
        className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => setCat("all")} className={`rounded-full px-3 py-1 text-xs ${cat === "all" ? "bg-emerald-800 text-white" : "bg-white border"}`}>
          All
        </button>
        {CATEGORY_META.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`rounded-full px-3 py-1 text-xs ${cat === c.key ? "bg-emerald-800 text-white" : "bg-white border"}`}
          >
            {c.icon} {lang === "ur" ? c.ur : c.label}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-stone-600">{t.stages}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button onClick={() => setStage("all")} className={`rounded-full px-3 py-1 text-xs ${stage === "all" ? "bg-[#C5A44E] text-[#01411C]" : "bg-white border"}`}>
          All stages
        </button>
        {STAGES.map((s) => (
          <button
            key={s}
            onClick={() => setStage(s)}
            className={`rounded-full px-3 py-1 text-xs ${stage === s ? "bg-[#C5A44E] text-[#01411C]" : "bg-white border"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-stone-500">{list.length} tests</p>
      <div className="mt-2 grid gap-3 sm:grid-cols-2">
        {list.map((test) => (
          <Link key={test.id} href={`/tests/${test.id}`} className="rounded-2xl border bg-white p-4 hover:border-emerald-700">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{test.name}</div>
                <div className="text-sm text-stone-500">{test.conducting_body}</div>
              </div>
              {test.priority && <span className="h-fit rounded bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-900">FULL</span>}
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
