"use client";

import Link from "next/link";
import { TESTS } from "@/data/tests";
import { SYLLABUS } from "@/data/content";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";


export default function ProfilePage() {
  const { lang, setLang, user, logout, saved, attempts, points, streak, badges, syllabusDone } = useStore();
  const t = dict[lang];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t.profile}</h1>
      {!user ? (
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-sm">{t.needAccount}</p>
          <Link href="/login" className="mt-3 inline-block rounded-full bg-emerald-800 px-4 py-2 text-sm text-white">
            {t.login}
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#01411C] p-5 text-white">
          <div className="text-xl font-semibold">{user.name}</div>
          <div className="text-sm text-emerald-100">{user.email}</div>
          <div className="mt-3 flex gap-4 text-sm">
            <span>🔥 {t.streak} {streak}</span>
            <span>{t.points} {points}</span>
          </div>
          <button onClick={logout} className="mt-3 text-xs underline">
            {t.logout}
          </button>
        </div>
      )}

      <section>
        <h2 className="font-semibold">{t.badges}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {(badges.length ? badges : ["Welcome"]).map((b) => (
            <span key={b} className="rounded-full bg-[#C5A44E] px-3 py-1 text-sm text-[#01411C]">
              {b}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold">{t.saved}</h2>
        <div className="mt-2 space-y-2">
          {saved.length === 0 && <p className="text-sm text-stone-500">No saved tests yet.</p>}
          {saved.map((id) => {
            const test = TESTS.find((x) => x.id === id);
            const syl = SYLLABUS.filter((s) => s.test_id === id);
            const done = syllabusDone[id]?.length ?? 0;
            const pct = syl.length ? Math.round((done / syl.length) * 100) : 0;
            return (
              <Link key={id} href={`/tests/${id}`} className="flex items-center justify-between rounded-xl border bg-white p-3">
                <span>{test?.name}</span>
                <span className="text-sm text-emerald-800">{pct}%</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-semibold">Mock history</h2>
        <ul className="mt-2 space-y-1 text-sm">
          {attempts.slice(0, 8).map((a, i) => (
            <li key={i} className="rounded-lg bg-white px-3 py-2">
              {TESTS.find((x) => x.id === a.test_id)?.name}: {a.score}/{a.total} · {a.date.slice(0, 10)}
            </li>
          ))}
          {attempts.length === 0 && <li className="text-stone-500">No attempts yet.</li>}
        </ul>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">{t.leaderboard}</h2>
          <Link href="/leaderboard" className="text-sm text-emerald-800">
            Full board
          </Link>
        </div>
        <p className="mt-2 text-sm text-stone-600">Your points: {points}. Public ranks appear only for opt-in users.</p>
      </section>

      <section className="rounded-2xl border bg-white p-4">
        <h2 className="font-semibold">{t.settings}</h2>
        <p className="mt-2 text-sm">{t.language}</p>
        <div className="mt-1 flex gap-2">
          <button onClick={() => setLang("en")} className={`rounded-full px-3 py-1 text-sm ${lang === "en" ? "bg-emerald-800 text-white" : "border"}`}>
            English
          </button>
          <button onClick={() => setLang("ur")} className={`rounded-full px-3 py-1 text-sm ${lang === "ur" ? "bg-emerald-800 text-white" : "border"}`}>
            اردو
          </button>
        </div>
        <p className="mt-3 text-sm font-medium">{t.offline}</p>
        <p className="text-xs text-stone-500">Saved tests cached in this browser (localStorage). Mock attempts sync when online.</p>
      </section>
    </div>
  );
}
