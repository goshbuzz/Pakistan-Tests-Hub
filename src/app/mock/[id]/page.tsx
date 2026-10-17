"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { ALL_MOCKS, paperShape, questionsForPaper } from "@/data/coverage";
import { TESTS } from "@/data/tests";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import { AdsterraMediumRect } from "@/components/Adsterra";

function MockInner() {
  const { id } = useParams<{ id: string }>();
  const sp = useSearchParams();
  const year = sp.get("year") ? Number(sp.get("year")) : 2025;
  const n = sp.get("n") ? Number(sp.get("n")) : 1;
  const test = TESTS.find((x) => x.id === id);
  const cfg = ALL_MOCKS.find((x) => x.test_id === id);
  const r = sp.get("r") ?? "";
  const questions = useMemo(() => questionsForPaper(id, year, n, r), [id, year, n, r]);
  const shape = paperShape(id, test?.category ?? "Recruitment");
  const { addAttempt, lang } = useStore();
  const t = dict[lang];
  const router = useRouter();
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<Record<string, number>>({});
  const [written, setWritten] = useState<Record<string, string>>({});
  const [showModel, setShowModel] = useState(false);
  const [left, setLeft] = useState((cfg?.time_limit_minutes ?? 10) * 60);
  const [done, setDone] = useState(false);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    setI(0);
    setAns({});
    setWritten({});
    setDone(false);
    setShowModel(false);
    setLeft((cfg?.time_limit_minutes ?? shape.minutes) * 60);
  }, [id, year, n, r, cfg, shape.minutes]);

  useEffect(() => {
    if (done) return;
    const tm = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          finish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function finish() {
    if (done) return;
    setDone(true);
    let raw = 0;
    const mcqItems = questions.filter((q) => (q.kind ?? "mcq") === "mcq");
    mcqItems.forEach((q) => {
      const a = ans[q.id];
      if (a === q.correct_answer) raw += 1;
      else if (a !== undefined && cfg?.negative_marking) raw -= cfg.negative_value;
    });
    addAttempt({ test_id: id, score: Math.max(0, raw), total: mcqItems.length || questions.length, date: new Date().toISOString(), paper_year: year });
    setShowAd(true);
  }

  if (!test || questions.length === 0) {
    return (
      <div className="p-8">
        <p>Mock not available for this test yet.</p>
        <Link href={`/tests/${id}`}>Back</Link>
      </div>
    );
  }

  const q = questions[i];
  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  if (showAd) {
    const mcqItems = questions.filter((qq) => (qq.kind ?? "mcq") === "mcq");
    let score = 0;
    mcqItems.forEach((qq) => {
      if (ans[qq.id] === qq.correct_answer) score += 1;
    });
    const writtenN = questions.length - mcqItems.length;
    return (
      <div className="min-h-screen bg-[#01411C] p-6 text-white">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 text-stone-900">
          <p className="text-xs uppercase text-amber-700">{t.ads}</p>
          <h2 className="text-xl font-semibold">{t.interstitial}</h2>
          <p className="mt-4 text-lg font-semibold">
            {t.score} (MCQ): {score} / {mcqItems.length || 0}
          </p>
          {writtenN > 0 && (
            <p className="text-sm text-stone-600">{writtenN} written task(s) — compare with the model, not auto-marked.</p>
          )}
          <div className="mt-4 flex justify-center">
            <AdsterraMediumRect />
          </div>
          <button className="mt-4 w-full rounded-full bg-emerald-800 py-2 text-white" onClick={() => router.push(`/tests/${id}`)}>
            {t.skip}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1e8] p-4">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between rounded-2xl bg-[#01411C] px-4 py-3 text-white">
          <div>
            <div className="text-xs opacity-80">
              {test.name} · Mock {n} · {year} · timed paper (not the MCQ bank)
            </div>
            <div className="font-semibold">
              Q {i + 1} / {questions.length}
            </div>
          </div>
          <div className="rounded-full bg-[#C5A44E] px-3 py-1 font-mono text-[#01411C]">
            {mm}:{ss}
          </div>
        </div>
        <p className="mt-2 rounded-xl bg-white/80 px-3 py-2 text-[11px] text-stone-600">{shape.note}</p>
        <div className="mt-4 rounded-2xl border bg-white p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-800">
            {(q.kind ?? "mcq") === "mcq" ? "MCQ section" : q.kind === "long" ? "Written / essay" : "Short / speaking"}
            {" · "}
            {q.subject}
          </p>
          <p className="text-xs text-stone-500">
            {q.topic}
          </p>
          <h2 className="mt-2 text-lg font-medium">{q.question_text}</h2>
          {(q.kind ?? "mcq") === "mcq" ? (
            <div className="mt-4 space-y-2">
              {q.options.map((o, idx) => (
                <button
                  key={idx}
                  onClick={() => setAns({ ...ans, [q.id]: idx })}
                  className={`block w-full rounded-xl border px-4 py-3 text-left ${
                    ans[q.id] === idx ? "border-emerald-800 bg-emerald-50" : "hover:bg-stone-50"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <textarea
                className="w-full rounded-xl border p-3 text-sm"
                rows={q.kind === "long" ? 8 : 4}
                placeholder="Write your answer (English / Urdu). Compare with the model after you finish."
                value={written[q.id] ?? ""}
                onChange={(e) => setWritten({ ...written, [q.id]: e.target.value })}
              />
              <button type="button" className="mt-2 text-sm text-emerald-800" onClick={() => setShowModel(!showModel)}>
                {showModel ? "Hide model" : "Show model answer"}
              </button>
              {showModel && <p className="mt-2 text-sm text-emerald-900">{q.model_answer}</p>}
            </div>
          )}
          <div className="mt-6 flex justify-between gap-2">
            <button disabled={i === 0} onClick={() => setI(i - 1)} className="rounded-full border px-4 py-2 text-sm disabled:opacity-40">
              Prev
            </button>
            <button
              type="button"
              className="rounded-full border px-3 py-2 text-xs"
              onClick={() => router.replace(`/mock/${id}?year=${year}&n=${n}&r=${Date.now()}`)}
            >
              New draw
            </button>
            {i < questions.length - 1 ? (
              <button onClick={() => setI(i + 1)} className="rounded-full bg-emerald-800 px-4 py-2 text-sm text-white">
                Next
              </button>
            ) : (
              <button onClick={finish} className="rounded-full bg-[#C5A44E] px-4 py-2 text-sm text-[#01411C]">
                {t.submit}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MockPage() {
  return (
    <Suspense>
      <MockInner />
    </Suspense>
  );
}
