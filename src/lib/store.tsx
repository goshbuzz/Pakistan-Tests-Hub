"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { MockAttempt, User } from "./types";
import { Lang } from "./i18n";
import { authUser, createUser, kvGet, kvSet, logEvent } from "./db";
import { notifyLocal } from "./notify";

export type NotifyPrefs = {
  enabled: boolean;
  jobs: boolean;
  alerts: boolean;
  mocks: boolean;
};

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
  lastSync: string | null;
  jobFollow: string[];
  docsDone: Record<string, string[]>;
  notify: NotifyPrefs;
  dbReady: boolean;
  login: (name: string, email: string) => void;
  registerLocal: (name: string, email: string, password: string) => Promise<void>;
  loginLocal: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setLang: (l: Lang) => void;
  toggleSave: (id: string) => void;
  toggleTopic: (testId: string, topicId: string) => void;
  addAttempt: (a: MockAttempt) => void;
  suggest: (testId: string, note: string) => void;
  markSynced: () => void;
  toggleJobFollow: (testId: string) => void;
  toggleDoc: (testId: string, doc: string) => void;
  setNotify: (p: Partial<NotifyPrefs>) => void;
};

const Ctx = createContext<Store | null>(null);
const KEY = "pth-store-v1";
const defaultNotify: NotifyPrefs = { enabled: false, jobs: true, alerts: true, mocks: false };

function snapshot(s: {
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
  lastSync: string | null;
  jobFollow: string[];
  docsDone: Record<string, string[]>;
  notify: NotifyPrefs;
}) {
  return {
    user: s.user,
    lang: s.lang,
    saved: s.saved,
    syllabusDone: s.syllabusDone,
    attempts: s.attempts,
    points: s.points,
    streak: s.streak,
    lastActive: s.lastActive,
    badges: s.badges,
    pendingQueue: s.pendingQueue,
    lastSync: s.lastSync,
    jobFollow: s.jobFollow,
    docsDone: s.docsDone,
    notify: s.notify,
  };
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [dbReady, setDbReady] = useState(false);
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
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [jobFollow, setJobFollow] = useState<string[]>([]);
  const [docsDone, setDocsDone] = useState<Record<string, string[]>>({});
  const [notify, setNotifyState] = useState<NotifyPrefs>(defaultNotify);

  useEffect(() => {
    (async () => {
      try {
        const fromDb = await kvGet<ReturnType<typeof snapshot>>("store");
        const raw = fromDb ?? (localStorage.getItem(KEY) ? JSON.parse(localStorage.getItem(KEY) as string) : null);
        if (raw) {
          setUser(raw.user ?? null);
          setLang(raw.lang ?? "en");
          setSaved(raw.saved ?? []);
          setSyllabusDone(raw.syllabusDone ?? {});
          setAttempts(raw.attempts ?? []);
          setPoints(raw.points ?? 0);
          setStreak(raw.streak ?? 0);
          setLastActive(raw.lastActive ?? null);
          setBadges(raw.badges ?? []);
          setPending(raw.pendingQueue ?? []);
          setLastSync(raw.lastSync ?? null);
          setJobFollow(raw.jobFollow ?? []);
          setDocsDone(raw.docsDone ?? {});
          setNotifyState({ ...defaultNotify, ...(raw.notify ?? {}) });
        }
        setDbReady(true);
      } catch {
        setDbReady(true);
      }
      setHydrated(true);
    })();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const snap = snapshot({
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
      lastSync,
      jobFollow,
      docsDone,
      notify,
    });
    localStorage.setItem(KEY, JSON.stringify(snap));
    kvSet("store", snap).catch(() => {});
  }, [
    hydrated,
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
    lastSync,
    jobFollow,
    docsDone,
    notify,
  ]);

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
      lastSync,
      jobFollow,
      docsDone,
      notify,
      dbReady,
      login: (name, email) => setUser({ id: "u1", name, email, language: lang }),
      registerLocal: async (name, email, password) => {
        const u = await createUser(name, email, password);
        setUser({ id: u.id, name: u.name, email: u.email, language: lang });
      },
      loginLocal: async (email, password) => {
        const u = await authUser(email, password);
        setUser({ id: u.id, name: u.name, email: u.email, language: lang });
      },
      logout: () => {
        setUser(null);
        logEvent("logout", "local");
      },
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
        if (notify.enabled && notify.mocks) {
          notifyLocal("Mock finished", `Score ${a.score}/${a.total}`, `/tests/${a.test_id}`);
        }
      },
      suggest: (testId, note) => setPending((q) => [...q, { testId, note }]),
      markSynced: () => setLastSync(new Date().toISOString()),
      toggleJobFollow: (testId) => {
        setJobFollow((s) => {
          const on = !s.includes(testId);
          const next = on ? [...s, testId] : s.filter((x) => x !== testId);
          if (on && notify.enabled && notify.jobs) notifyLocal("Job alerts on", "We will ping this device when you open Jobs.", "/jobs");
          return next;
        });
      },
      toggleDoc: (testId, doc) =>
        setDocsDone((prev) => {
          const cur = prev[testId] ?? [];
          const next = cur.includes(doc) ? cur.filter((x) => x !== doc) : [...cur, doc];
          return { ...prev, [testId]: next };
        }),
      setNotify: (p) => setNotifyState((n) => ({ ...n, ...p })),
    }),
    [user, lang, saved, syllabusDone, attempts, points, streak, lastActive, badges, pendingQueue, lastSync, jobFollow, docsDone, notify, dbReady]
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
