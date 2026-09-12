"use client";

import Link from "next/link";
import { ALL_ALERTS } from "@/data/coverage";
import { JOBS } from "@/data/jobs";
import { CATEGORY_META, TESTS } from "@/data/tests";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { AdBanner } from "@/components/Shell";
import { Logo } from "@/components/Logo";
import { FaqList } from "@/components/FaqList";
import { GLOBAL_FAQS } from "@/data/faqs";

export default function Home() {
  const { lang, user, saved, streak, points } = useStore();
  const t = dict[lang];
  const savedTests = TESTS.filter((x) => saved.includes(x.id));
  const rec = TESTS.filter((x) => x.priority);
  const feed = [...ALL_ALERTS].sort((a, b) => b.published_at.localeCompare(a.published_at)).slice(0, 5);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#01411C] via-[#046a32] to-[#0a7a3e] p-6 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <Logo size={56} />
          <div>
            <p className="text-sm text-emerald-100">{t.tagline}</p>
            <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{t.app}</h1>
          </div>
        </div>
        <p className="mt-2 max-w-xl text-sm text-emerald-50">
          100 packed tests — MDCAT, CSS, PPSC, NTS, SAT, OET, Rescue 1122 and more. Playful self-study: syllabus ticks, MCQ bank, 10 mocks in that paper’s mix. Apply only on official sites.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1">🔥 {t.streak}: {streak}</span>
          <span className="rounded-full bg-[#C5A44E] px-3 py-1 text-[#01411C]">{t.points}: {points}</span>
          {!user && (
            <Link href="/login" className="rounded-full bg-white px-3 py-1 text-emerald-900">
              {t.login}
            </Link>
          )}
        </div>
      </section>
      <AdBanner />
      <section>
        <h2 className="mb-3 text-center text-lg font-semibold">{t.categories}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {CATEGORY_META.map((c) => {
            const n = TESTS.filter((x) => x.category === c.key).length;
            return (
              <Link
                key={c.key}
                href={`/explore?cat=${encodeURIComponent(c.key)}`}
                className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              >
                <div className="text-2xl">{c.icon}</div>
                <div className="mt-2 text-sm font-medium">{lang === "ur" ? c.ur : c.label}</div>
                <div className="text-xs text-stone-500">{n} tests</div>
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">{t.trending}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rec.map((test) => (
            <Link
              key={test.id}
              href={`/tests/${test.id}`}
              className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm hover:border-emerald-700/40"
            >
              <div className="text-xs uppercase tracking-wide text-emerald-800">{test.category}</div>
              <div className="mt-1 text-lg font-semibold">{test.name}</div>
              <div className="text-sm text-stone-500">{test.conducting_body}</div>
            </Link>
          ))}
        </div>
      </section>
      {savedTests.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold">{t.saved}</h2>
          <div className="flex flex-wrap gap-2">
            {savedTests.map((s) => (
              <Link key={s.id} href={`/tests/${s.id}`} className="rounded-full bg-emerald-900 px-3 py-1 text-sm text-white">
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      )}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t.jobs}</h2>
          <Link href="/jobs" className="text-sm text-emerald-800">
            View all
          </Link>
        </div>
        <ul className="space-y-2">
          {JOBS.slice(0, 4).map((j) => (
            <li key={j.id} className="rounded-xl border bg-white p-3">
              <div className="font-medium">{j.title}</div>
              <a href={j.apply_url} className="text-xs text-emerald-800" target="_blank" rel="noreferrer">
                {j.apply_url}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t.forYou} · {t.alerts}</h2>
          <Link href="/alerts" className="text-sm text-emerald-800">
            View all
          </Link>
        </div>
        <ul className="space-y-2">
          {feed.map((a) => {
            const test = TESTS.find((x) => x.id === a.test_id);
            return (
              <li key={a.id} className="rounded-xl border border-stone-200 bg-white p-3">
                <div className="text-xs text-stone-500">
                  {test?.name} · {a.type} · {a.published_at.slice(0, 10)}
                </div>
                <div className="font-medium">{a.title}</div>
                <p className="text-sm text-stone-600">{a.body}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <p className="text-center text-sm">
        <Link href="/faq" className="text-emerald-800 underline">
          Full FAQ for government jobs &amp; test prep
        </Link>
      </p>
      <FaqList items={GLOBAL_FAQS.slice(0, 6)} />
    </div>
  );
}
