"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MockAttempt, User } from "./types";
import { Lang } from "./i18n";

type Store = {
  user: User | null;
  lang: Lang;
  saved: string[];
  syllabusDone: Record<string, string[]>;
  attempts: MockAttempt[];
  points: number;
  streak: number;
  lastActive: string | null;
  badges: string[];
  pendingQueue: { testId: string; note: string }[];
  login: (name: string, email: string) => void;
  logout: () => void;
  setLang: (l: Lang) => void;
  toggleSave: (id: string) => void;
  toggleTopic: (testId: string, topicId: string) => void;
  addAttempt: (a: MockAttempt) => void;
  suggest: (testId: string, note: string) => void;
};

const Ctx = createContext<Store | null>(null);
const KEY = "pth-store-v1";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [saved, setSaved] = useState<string[]>([]);
  const [syllabusDone, setSyllabusDone] = useState<Record<string, string[]>>({});
  const [attempts, setAttempts] = useState<MockAttempt[]>([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lastActive, setLastActive] = useState<string | null>(null);
  const [badges, setBadges] = useState<string[]>([]);
  const [pendingQueue, setPending] = useState<{ testId: string; note: string }[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setUser(d.user ?? null);
        setLang(d.lang ?? "en");
        setSaved(d.saved ?? []);
        setSyllabusDone(d.syllabusDone ?? {});
        setAttempts(d.attempts ?? []);
        setPoints(d.points ?? 0);
        setStreak(d.streak ?? 0);
        setLastActive(d.lastActive ?? null);
        setBadges(d.badges ?? []);
        setPending(d.pendingQueue ?? []);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      KEY,
      JSON.stringify({ user, lang, saved, syllabusDone, attempts, points, streak, lastActive, badges, pendingQueue })
    );
  }, [hydrated, user, lang, saved, syllabusDone, attempts, points, streak, lastActive, badges, pendingQueue]);

  const value = useMemo<Store>(
    () => ({
      user,
      lang,
      saved,
      syllabusDone,
      attempts,
      points,
      streak,
      lastActive,
      badges,
      pendingQueue,
      login: (name, email) =>
        setUser({ id: "u1", name, email, language: lang }),
      logout: () => setUser(null),
      setLang,
      toggleSave: (id) => {
        if (!user) return;
        setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
        setPoints((p) => p + 5);
      },
      toggleTopic: (testId, topicId) => {
        setSyllabusDone((prev) => {
          const cur = prev[testId] ?? [];
          const next = cur.includes(topicId) ? cur.filter((x) => x !== topicId) : [...cur, topicId];
          return { ...prev, [testId]: next };
        });
        bumpActivity(setStreak, setLastActive, setPoints, setBadges);
      },
      addAttempt: (a) => {
        setAttempts((x) => [a, ...x]);
        setPoints((p) => p + Math.round((a.score / a.total) * 50) + 10);
        bumpActivity(setStreak, setLastActive, setPoints, setBadges);
        if (a.score / a.total >= 0.8) setBadges((b) => (b.includes("High Scorer") ? b : [...b, "High Scorer"]));
      },
      suggest: (testId, note) => setPending((q) => [...q, { testId, note }]),
    }),
    [user, lang, saved, syllabusDone, attempts, points, streak, lastActive, badges, pendingQueue]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

function bumpActivity(
  setStreak: React.Dispatch<React.SetStateAction<number>>,
  setLastActive: React.Dispatch<React.SetStateAction<string | null>>,
  setPoints: React.Dispatch<React.SetStateAction<number>>,
  setBadges: React.Dispatch<React.SetStateAction<string[]>>
) {
  const today = new Date().toISOString().slice(0, 10);
  setLastActive((prev) => {
    if (prev === today) return prev;
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const ys = y.toISOString().slice(0, 10);
    setStreak((s) => {
      const ns = prev === ys ? s + 1 : 1;
      if (ns >= 7) setBadges((b) => (b.includes("7-Day Streak") ? b : [...b, "7-Day Streak"]));
      return ns;
    });
    setPoints((p) => p + 8);
    return today;
  });
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("store");
  return v;
}
