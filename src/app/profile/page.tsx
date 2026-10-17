"use client";

import Link from "next/link";
import { useState } from "react";
import { TESTS } from "@/data/tests";
import { ALL_SYL } from "@/data/coverage";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { Logo } from "@/components/Logo";
import { enableNotifications } from "@/lib/notify";
import { AdsterraBanner } from "@/components/Adsterra";

export default function ProfilePage() {
  const { lang, setLang, user, logout, saved, attempts, points, streak, badges, syllabusDone, notify, setNotify, dbReady } =
    useStore();
  const t = dict[lang];
  const [noteMsg, setNoteMsg] = useState("");

  async function toggleMaster() {
    setNoteMsg("");
    if (!notify.enabled) {
      try {
        await enableNotifications();
        setNotify({ enabled: true });
        setNoteMsg(t.notifyOn);
      } catch (e) {
        setNoteMsg(e instanceof Error ? e.message : t.notifyFail);
      }
    } else {
      setNotify({ enabled: false });
      setNoteMsg(t.notifyOff);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Logo size={44} />
        <h1 className="text-2xl font-semibold">{t.profile}</h1>
      </div>
      {!user ? (
        <div className="rounded-2xl border bg-white p-5">
          <p className="text-sm">{t.needAccount}</p>
          <Link href="/login" className="mt-3 inline-block rounded-full bg-emerald-800 px-4 py-2 text-sm text-white">
            {t.login}
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#01411C] p-5 text-white">
          <div className="flex items-center gap-3">
            <Logo size={48} />
            <div>
              <div className="text-xl font-semibold">{user.name}</div>
              <div className="text-sm text-emerald-100">{user.email}</div>
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            <span>🔥 {t.streak} {streak}</span>
            <span>{t.points} {points}</span>
            <span className="text-emerald-200">{dbReady ? t.dbReady : "…"}</span>
          </div>
          <button onClick={logout} className="mt-3 text-xs underline">
            {t.logout}
          </button>
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border bg-white">
        <div className="flex items-center justify-between gap-3 border-b bg-gradient-to-r from-emerald-50 to-amber-50 px-4 py-3">
          <div>
            <h2 className="font-semibold">{t.notifications}</h2>
            <p className="text-xs text-stone-500">{t.notifyHint}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={notify.enabled}
            onClick={toggleMaster}
            className={`relative h-8 w-14 shrink-0 rounded-full transition ${notify.enabled ? "bg-[#01411C]" : "bg-stone-300"}`}
          >
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${notify.enabled ? "left-7" : "left-1"}`} />
          </button>
        </div>
        <div className="space-y-3 p-4">
          <ToggleRow
            label={t.notifyJobs}
            on={notify.jobs}
            disabled={!notify.enabled}
            onChange={(v) => setNotify({ jobs: v })}
          />
          <ToggleRow
            label={t.notifyAlerts}
            on={notify.alerts}
            disabled={!notify.enabled}
            onChange={(v) => setNotify({ alerts: v })}
          />
          <ToggleRow
            label={t.notifyMocks}
            on={notify.mocks}
            disabled={!notify.enabled}
            onChange={(v) => setNotify({ mocks: v })}
          />
          {noteMsg && <p className="text-xs text-emerald-800">{noteMsg}</p>}
        </div>
      </section>

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
            const syl = ALL_SYL.filter((s) => s.test_id === id);
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
        <p className="text-xs text-stone-500">{t.localDbHint}</p>
      </section>
      <AdsterraBanner />
    </div>
  );
}

function ToggleRow({
  label,
  on,
  disabled,
  onChange,
}: {
  label: string;
  on: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className={`flex items-center justify-between gap-3 ${disabled ? "opacity-40" : ""}`}>
      <span className="text-sm">{label}</span>
      <button
        type="button"
        role="switch"
        disabled={disabled}
        aria-checked={on}
        onClick={() => onChange(!on)}
        className={`relative h-7 w-12 rounded-full ${on && !disabled ? "bg-emerald-700" : "bg-stone-300"}`}
      >
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow ${on ? "left-5" : "left-0.5"}`} />
      </button>
    </div>
  );
}
