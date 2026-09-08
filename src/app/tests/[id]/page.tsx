"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ALERTS, MCQS, MOCKS, PAST_PAPERS, SYLLABUS } from "@/data/content";
import { TESTS } from "@/data/tests";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { AdBanner } from "@/components/Shell";

const TABS = ["overview", "syllabus", "papers", "mcq", "mock", "alerts"] as const;

export default function TestPage() {
  const { id } = useParams<{ id: string }>();
  const test = TESTS.find((x) => x.id === id);
  const { lang, user, saved, toggleSave, syllabusDone, toggleTopic, suggest } = useStore();
  const t = dict[lang];
  const [tab, setTab] = useState<(typeof TABS)[number]>("overview");
  const [note, setNote] = useState("");
  const [filter, setFilter] = useState("");
  const [revealed, setRevealed] = useState<string | null>(null);

  const syl = SYLLABUS.filter((s) => s.test_id === id);
  const papers = PAST_PAPERS.filter((s) => s.test_id === id);
  const mcqs = MCQS.filter((s) => s.test_id === id);
  const mock = MOCKS.find((s) => s.test_id === id);
  const alerts = ALERTS.filter((s) => s.test_id === id);
  const done = syllabusDone[id] ?? [];
  const pct = syl.length ? Math.round((done.length / syl.length) * 100) : 0;

  const grouped = useMemo(() => {
    const g: Record<string, typeof syl> = {};
    syl.forEach((s) => {
      (g[s.subject] ??= []).push(s);
    });
    return g;
  }, [syl]);

  const filteredMcq = mcqs.filter(
    (m) =>
      !filter ||
      m.subject.toLowerCase().includes(filter.toLowerCase()) ||
      m.question_text.toLowerCase().includes(filter.toLowerCase())
  );

  if (!test) return <p>Test not found.</p>;

  const labels: Record<(typeof TABS)[number], string> = {
    overview: t.overview,
    syllabus: t.syllabus,
    papers: t.papers,
    mcq: t.mcq,
    mock: t.mock,
    alerts: t.alertsTab,
  };

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-emerald-800">{test.category}</p>
          <h1 className="text-3xl font-semibold">{test.name}</h1>
          <p className="text-stone-600">{test.conducting_body}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14">
            <svg viewBox="0 0 36 36" className="h-14 w-14 -rotate-90">
              <path d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32" fill="none" stroke="#e7e5e4" strokeWidth="4" />
              <path
                d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                fill="none"
                stroke="#01411C"
                strokeWidth="4"
                strokeDasharray={`${pct}, 100`}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">{pct}%</span>
          </div>
          <button
            onClick={() => (user ? toggleSave(test.id) : (window.location.href = "/login"))}
            className={`rounded-full px-4 py-2 text-sm ${saved.includes(test.id) ? "bg-emerald-800 text-white" : "border bg-white"}`}
          >
            {saved.includes(test.id) ? t.savedBtn : t.save}
          </button>
        </div>
      </div>
      <AdBanner />
      <div className="mt-2 flex gap-1 overflow-x-auto">
        {TABS.map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${tab === k ? "bg-emerald-900 text-white" : "bg-white border"}`}
          >
            {labels[k]}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="mt-4 space-y-4 rounded-2xl border bg-white p-5">
          <Row label={t.conducting} value={test.conducting_body} />
          <Row label={t.eligibility} value={test.eligibility} />
          <Row label={t.format} value={test.format_description} />
          <Row label={t.fee} value={test.fee_info} />
          <Row
            label={t.official}
            value={
              <a className="text-emerald-800 underline" href={test.official_url} target="_blank" rel="noreferrer">
                {test.official_url}
              </a>
            }
          />
          <p className="text-xs text-stone-400">Updated {test.last_updated}</p>
          <form
            className="border-t pt-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (note.trim()) {
                suggest(test.id, note);
                setNote("");
                alert("Queued for moderation.");
              }
            }}
          >
            <label className="text-sm font-medium">{t.suggest}</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2 text-sm"
              rows={2}
            />
            <button className="mt-2 rounded-lg bg-emerald-800 px-3 py-1.5 text-sm text-white">Submit</button>
          </form>
        </div>
      )}

      {tab === "syllabus" && (
        <div className="mt-4 space-y-3">
          {Object.keys(grouped).length === 0 && (
            <p className="rounded-xl bg-white p-4 text-sm text-stone-600">
              Template ready — detailed syllabus will populate from official sources. Priority tests have full trees.
            </p>
          )}
          {Object.entries(grouped).map(([sub, items]) => (
            <details key={sub} open className="rounded-xl border bg-white p-3">
              <summary className="cursor-pointer font-medium">
                {sub}{" "}
                <span className="text-xs text-stone-500">
                  {items.reduce((a, b) => a + b.weightage, 0)}% weight (approx)
                </span>
              </summary>
              <ul className="mt-2 space-y-1">
                {items.map((it) => (
                  <li key={it.id} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={done.includes(it.id)} onChange={() => toggleTopic(test.id, it.id)} />
                    <span>
                      {it.topic} — {it.subtopic}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      )}

      {tab === "papers" && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {papers.length === 0 && <p className="text-sm text-stone-600">Past papers will attach as official PDFs are verified.</p>}
          {papers.map((p) => (
            <a key={p.id} href={p.file_url} className="rounded-xl border bg-white p-4">
              <div className="font-medium">
                {test.name} {p.year}
              </div>
              <div className="text-xs text-stone-500">
                {p.source} {p.verified ? "· verified" : "· pending review"}
              </div>
            </a>
          ))}
        </div>
      )}

      {tab === "mcq" && (
        <div className="mt-4 space-y-3">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by subject or text"
            className="w-full rounded-xl border bg-white px-3 py-2 text-sm"
          />
          {filteredMcq.length === 0 && <p className="text-sm">MCQ bank filling in — practice the mock when available.</p>}
          {filteredMcq.map((m) => (
            <div key={m.id} className="rounded-xl border bg-white p-4">
              <div className="text-xs text-stone-500">
                {m.subject} · {m.topic} · {m.difficulty} · {m.source}
              </div>
              <p className="mt-1 font-medium">{m.question_text}</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                {m.options.map((o, i) => (
                  <li key={i}>{o}</li>
                ))}
              </ol>
              <button className="mt-2 text-sm text-emerald-800" onClick={() => setRevealed(revealed === m.id ? null : m.id)}>
                {revealed === m.id ? "Hide" : "Show answer"}
              </button>
              {revealed === m.id && (
                <p className="mt-1 text-sm text-emerald-900">
                  {m.options[m.correct_answer]} — {m.explanation}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "mock" && (
        <div className="mt-4 rounded-2xl border bg-white p-5">
          {mock ? (
            <>
              <p className="text-sm text-stone-600">
                {mock.question_count} questions · {mock.time_limit_minutes} minutes
                {mock.negative_marking ? ` · negative marking −${mock.negative_value}` : " · no negative marking"}
              </p>
              <p className="mt-2 text-sm">Demo runner matches this test&apos;s rules. No ads during the timer.</p>
              <Link href={`/mock/${test.id}`} className="mt-4 inline-block rounded-full bg-emerald-800 px-5 py-2 text-white">
                {t.startMock}
              </Link>
            </>
          ) : (
            <p className="text-sm">Mock config uses the same template — add questions to enable the runner.</p>
          )}
        </div>
      )}

      {tab === "alerts" && (
        <ul className="mt-4 space-y-2">
          {alerts.length === 0 && <li className="text-sm text-stone-600">No alerts yet. Scrapers will fill this feed.</li>}
          {alerts.map((a) => (
            <li key={a.id} className="rounded-xl border bg-white p-3">
              <div className="text-xs text-stone-500">
                {a.type} · {a.published_at.slice(0, 10)}
              </div>
              <div className="font-medium">{a.title}</div>
              <p className="text-sm">{a.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase text-stone-500">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
}
