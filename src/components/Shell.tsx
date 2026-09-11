"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { TESTS } from "@/data/tests";
import { Logo } from "@/components/Logo";
import { InstallPrompt } from "@/components/InstallPrompt";
import { AdSlot } from "@/components/AdSlot";
import { CookieBar } from "@/components/CookieBar";
import { isStandaloneApp } from "@/lib/ads";

export function Shell({ children }: { children: React.ReactNode }) {
  const { lang, user, streak, points } = useStore();
  const t = dict[lang];
  const path = usePathname();
  const rtl = lang === "ur";
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setPhone(mq.matches || isStandaloneApp());
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const tabs = [
    { href: "/", label: t.home, icon: phone ? "🏠" : "⌂" },
    { href: "/explore", label: t.explore, icon: phone ? "🧭" : "▣" },
    { href: "/jobs", label: t.jobs, icon: "💼" },
    { href: "/alerts", label: t.alerts, icon: phone ? "🔔" : "⚑" },
    { href: "/profile", label: t.profile, icon: phone ? "😎" : "☺" },
  ];

  const hits = q.trim()
    ? TESTS.filter(
        (x) =>
          x.name.toLowerCase().includes(q.toLowerCase()) ||
          x.conducting_body.toLowerCase().includes(q.toLowerCase()) ||
          x.category.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 8)
    : [];

  useEffect(() => {
    setOpen(false);
    setQ("");
  }, [path]);

  const search = (
    <div className="relative flex-1">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={phone ? "🔍  CSS, MDCAT, PPSC, IELTS…" : t.search}
        className={
          phone
            ? "w-full rounded-2xl border-0 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-inner outline-none placeholder:text-stone-400"
            : "w-full rounded-full border-0 bg-white/15 px-4 py-2 text-sm text-white placeholder:text-white/60 outline-none ring-1 ring-white/20 focus:bg-white/20"
        }
      />
      {open && hits.length > 0 && (
        <div className="absolute mt-1 w-full overflow-hidden rounded-xl bg-white text-stone-800 shadow-xl">
          {hits.map((h) => (
            <button
              key={h.id}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-emerald-50"
              onClick={() => router.push(`/tests/${h.id}`)}
            >
              <span className="font-medium">{h.name}</span>
              <span className="ml-2 text-xs text-stone-500">{h.conducting_body}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  if (phone) {
    return (
      <div dir={rtl ? "rtl" : "ltr"} className="min-h-dvh bg-[#f7f4ea] text-stone-900">
        <div className="mx-auto flex min-h-dvh max-w-md flex-col md:max-w-lg">
          <header className="sticky top-0 z-40 bg-gradient-to-br from-[#01411C] via-[#046a32] to-[#0a8f44] pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white">
            <div className="flex items-center gap-2 px-4">
              <Link href="/" className="flex items-center gap-2">
                <Logo size={36} />
                <div>
                  <div className="text-sm font-bold leading-tight">{t.app}</div>
                  <div className="text-[10px] text-emerald-100">100 tests · playful prep</div>
                </div>
              </Link>
              <div className="ml-auto flex items-center gap-1 text-[11px]">
                <span className="rounded-full bg-white/15 px-2 py-0.5">🔥 {streak}</span>
                <span className="rounded-full bg-[#C5A44E] px-2 py-0.5 font-semibold text-[#01411C]">⭐ {points}</span>
              </div>
            </div>
            <div className="relative mx-4 mt-3">{search}</div>
          </header>
          <main className="flex-1 px-4 pb-32 pt-4">{children}</main>
          <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-emerald-900/10 bg-white/95 pb-[max(0.4rem,env(safe-area-inset-bottom))] pt-1 shadow-[0_-8px_30px_rgba(1,65,28,0.12)] backdrop-blur md:max-w-lg">
            <div className="grid grid-cols-5">
              {tabs.map((tab) => {
                const on = path === tab.href;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`flex flex-col items-center gap-0.5 py-1.5 text-[10px] ${on ? "font-bold text-emerald-800" : "text-stone-400"}`}
                  >
                    <span className={`grid h-9 w-9 place-items-center rounded-2xl text-lg ${on ? "scale-110 bg-emerald-100" : ""}`}>
                      {tab.icon}
                    </span>
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </nav>
          <InstallPrompt />
          <CookieBar />
        </div>
      </div>
    );
  }

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="min-h-screen bg-[#f4f1e8] text-stone-900">
      <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-[#01411C] text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Logo size={32} />
            <span className="hidden sm:inline">{t.app}</span>
          </Link>
          {search}
          <Link href="/profile" className="hidden text-xs text-white/80 sm:block">
            {user ? user.name : t.guest}
            {user && streak > 0 ? ` · 🔥 ${streak}` : ""}
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-4">{children}</main>
      <nav className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-stone-200 bg-white px-2 py-1 shadow-lg md:flex">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-2 text-sm ${path === tab.href ? "bg-emerald-800 text-white" : "text-stone-600 hover:bg-stone-50"}`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
      <footer className="mx-auto max-w-6xl px-4 pb-28 pt-8 text-xs text-stone-500">
        <p className="font-medium text-stone-700">Pakistan Tests Hub — 100 tests · CSS, MDCAT, PPSC, NTS, IELTS</p>
        <nav className="mt-2 flex flex-wrap gap-3">
          <Link href="/faq">FAQ</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/jobs">Jobs</Link>
        </nav>
      </footer>
      <InstallPrompt />
      <CookieBar />
    </div>
  );
}

export function AdBanner() {
  return <AdSlot placement="in-feed" />;
}
