"use client";

import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { AdsterraBanner } from "@/components/Adsterra";

export default function LeaderboardPage() {
  const { lang, points, user, streak } = useStore();
  const t = dict[lang];

  return (
    <div>
      <h1 className="text-2xl font-semibold">{t.leaderboard}</h1>
      <p className="mt-2 text-sm text-stone-600">
        Rankings use opt-in accounts only. Placeholder names have been removed. Sign in and practise to appear here.
      </p>
      <ol className="mt-4 space-y-2">
        {user ? (
          <li className="flex items-center justify-between rounded-xl border bg-white px-4 py-3">
            <div>
              <span className="mr-2 font-mono text-stone-400">1</span>
              {user.name}
              <span className="ml-2 text-xs text-stone-500">you · 🔥 {streak}</span>
            </div>
            <span className="font-semibold">{points}</span>
          </li>
        ) : (
          <li className="rounded-xl border bg-white px-4 py-3 text-sm text-stone-600">Log in to join the board.</li>
        )}
      </ol>
      <AdsterraBanner className="mt-6" />
    </div>
  );
}
