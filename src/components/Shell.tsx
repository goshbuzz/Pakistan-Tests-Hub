"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dict } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { TESTS } from "@/data/tests";
import { Logo } from "@/components/Logo";
import { InstallPrompt } from "@/components/InstallPrompt";

export function Shell({ children }: { children: React.ReactNode }) {
  const { lang, streak, points } = useStore();
  const t = dict[lang];
  const path = usePathname();
  const rtl = lang === "ur";
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const tabs = [
    { href: "/", label: t.home, icon: "🏠" },
    { href: "/explore", label: t.explore, icon: "🧭" },
    { href: "/jobs", label: t.jobs, icon: "💼" },
    { href: "/alerts", label: t.alerts, icon: "🔔" },
    { href: "/profile", label: t.profile, icon: "😎" },
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

  return (
    <div dir={rtl ? "rtl" : "ltr"} className="min-h-dvh bg-emerald-950 md:bg-gradient-to-br md:from-emerald-950 md:via-[#01411C] md:to-lime-900">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col bg-[#f7f4ea] shadow-2xl md:max-w-lg">
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
          <div className="relative mx-4 mt-3">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="🔍  CSS, MDCAT, PPSC, IELTS…"
              className="w-full rounded-2xl border-0 bg-white px-4 py-2.5 text-sm text-stone-800 shadow-inner outline-none placeholder:text-stone-400"
            />
            {open && hits.length > 0 && (
              <div className="absolute mt-1 w-full overflow-hidden rounded-2xl bg-white text-stone-800 shadow-xl">
                {hits.map((h) => (
                  <button
                    key={h.id}
                    className="block w-full px-4 py-3 text-left text-sm active:bg-emerald-50"
                    onClick={() => router.push(`/tests/${h.id}`)}
                  >
                    <span className="font-medium">{h.name}</span>
                    <span className="ml-2 text-xs text-stone-500">{h.conducting_body}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>
        <main className="flex-1 px-4 pb-28 pt-4">{children}</main>
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
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-2xl text-lg transition ${
                      on ? "scale-110 bg-emerald-100 shadow-sm" : "bg-transparent"
                    }`}
                  >
                    {tab.icon}
                  </span>
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </nav>
        <footer className="px-4 pb-4 text-center text-[10px] text-stone-400">
          <Link href="/faq" className="text-emerald-800">
            FAQ
          </Link>
          {" · "}100 packed tests · apply only on official sites
        </footer>
        <InstallPrompt />
      </div>
    </div>
  );
}

export function AdBanner() {
  const { lang } = useStore();
  return (
    <div className="my-3 flex items-center justify-between rounded-2xl border border-dashed border-amber-400/70 bg-gradient-to-r from-amber-50 to-lime-50 px-4 py-3 text-xs text-amber-900">
      <span>✨ {dict[lang].ads} · free hub</span>
      <span className="rounded-full bg-amber-200 px-2 py-0.5 font-medium">Ad slot</span>
    </div>
  );
}
