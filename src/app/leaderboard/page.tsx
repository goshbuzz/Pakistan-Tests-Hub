"use client";

import { useState } from "react";
import { LEADERBOARD } from "@/data/content";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export default function LeaderboardPage() {
  const { lang, points, user } = useStore();
  const t = dict[lang];
  const [cat, setCat] = useState("all");
  const rows = LEADERBOARD.filter((r) => cat === "all" || r.category === cat);

  return (
    <div>
      <h1 className="text-2xl font-semibold">{t.leaderboard}</h1>
      <p className="text-sm text-stone-500">
        You: {user?.name ?? "Guest"} · {points} pts (opt-in board in production)
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["all", "Admissions", "PSC", "Professional", "Recruitment", "Armed Forces", "Banking"].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`rounded-full px-3 py-1 text-xs ${cat === c ? "bg-emerald-800 text-white" : "border bg-white"}`}>
            {c}
          </button>
        ))}
      </div>
      <ol className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <li key={r.name} className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
            <div>
              <span className="mr-2 font-mono text-stone-400">{i + 1}</span>
              {r.name}
              <span className="ml-2 text-xs text-stone-500">{r.category} · 🔥 {r.streak}</span>
            </div>
            <span className="font-semibold">{r.points}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
