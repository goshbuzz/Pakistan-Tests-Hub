"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MCQS, MOCKS } from "@/data/content";
import { TESTS } from "@/data/tests";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";

export default function MockPage() {
  const { id } = useParams<{ id: string }>();
  const test = TESTS.find((x) => x.id === id);
  const cfg = MOCKS.find((x) => x.test_id === id);
  const bank = MCQS.filter((x) => x.test_id === id);
  const questions = useMemo(() => bank.slice(0, cfg?.question_count ?? bank.length), [bank, cfg]);
  const { addAttempt, lang } = useStore();
  const t = dict[lang];
  const router = useRouter();
  const [i, setI] = useState(0);
  const [ans, setAns] = useState<Record<string, number>>({});
  const [left, setLeft] = useState((cfg?.time_limit_minutes ?? 10) * 60);
  const [done, setDone] = useState(false);
  const [showAd, setShowAd] = useState(false);

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
    questions.forEach((q) => {
      const a = ans[q.id];
      if (a === q.correct_answer) raw += 1;
      else if (a !== undefined && cfg?.negative_marking) raw -= cfg.negative_value;
    });
    const score = Math.max(0, raw);
    addAttempt({ test_id: id, score, total: questions.length, date: new Date().toISOString() });
    setShowAd(true);
  }

  if (!test || !cfg || questions.length === 0) {
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
    let score = 0;
    questions.forEach((qq) => {
      if (ans[qq.id] === qq.correct_answer) score += 1;
    });
    return (
      <div className="min-h-screen bg-[#01411C] p-6 text-white">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 text-stone-900">
          <p className="text-xs uppercase text-amber-700">{t.ads}</p>
          <h2 className="text-xl font-semibold">{t.interstitial}</h2>
          <p className="mt-2 text-sm text-stone-600">Banner/interstitial only between attempts — never mid-timer.</p>
          <p className="mt-4 text-lg font-semibold">
            {t.score}: {score} / {questions.length}
          </p>
          <button
            className="mt-4 w-full rounded-full bg-emerald-800 py-2 text-white"
            onClick={() => router.push(`/tests/${id}`)}
          >
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
            <div className="text-xs opacity-80">{test.name} mock</div>
            <div className="font-semibold">
              Q {i + 1} / {questions.length}
            </div>
          </div>
          <div className="rounded-full bg-[#C5A44E] px-3 py-1 font-mono text-[#01411C]">
            {mm}:{ss}
          </div>
        </div>
        <div className="mt-4 rounded-2xl border bg-white p-5">
          <p className="text-xs text-stone-500">
            {q.subject} · {q.topic}
          </p>
          <h2 className="mt-2 text-lg font-medium">{q.question_text}</h2>
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
          <div className="mt-6 flex justify-between">
            <button disabled={i === 0} onClick={() => setI(i - 1)} className="rounded-full border px-4 py-2 text-sm disabled:opacity-40">
              Prev
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
