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
  const { lang, user, streak } = useStore();
  const t = dict[lang];
  const path = usePathname();
  const rtl = lang === "ur";
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const tabs = [
    { href: "/", label: t.home, icon: "⌂" },
    { href: "/explore", label: t.explore, icon: "▣" },
    { href: "/jobs", label: t.jobs, icon: "💼" },
    { href: "/alerts", label: t.alerts, icon: "⚑" },
    { href: "/profile", label: t.profile, icon: "☺" },
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
    <div dir={rtl ? "rtl" : "ltr"} className="min-h-screen bg-[#f4f1e8] text-stone-900">
      <header className="sticky top-0 z-40 border-b border-emerald-900/10 bg-[#01411C] text-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <Logo size={32} />
            <span className="hidden sm:inline">{t.app}</span>
          </Link>
          <div className="relative flex-1">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder={t.search}
              className="w-full rounded-full border-0 bg-white/15 px-4 py-2 text-sm text-white placeholder:text-white/60 outline-none ring-1 ring-white/20 focus:bg-white/20"
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
          <Link href="/profile" className="hidden text-xs text-white/80 sm:block">
            {user ? user.name : t.guest}
            {user && streak > 0 ? ` · 🔥 ${streak}` : ""}
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-4">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur md:hidden">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center px-3 text-[11px] ${
                path === tab.href ? "text-emerald-800 font-semibold" : "text-stone-500"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
      <nav className="fixed bottom-6 left-1/2 z-40 hidden -translate-x-1/2 rounded-full border border-stone-200 bg-white px-2 py-1 shadow-lg md:flex">
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-2 text-sm ${
              path === tab.href ? "bg-emerald-800 text-white" : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
      <InstallPrompt />
    </div>
  );
}

export function AdBanner() {
  const { lang } = useStore();
  return (
    <div className="my-3 flex items-center justify-between rounded-xl border border-dashed border-amber-400/70 bg-amber-50 px-4 py-3 text-xs text-amber-900">
      <span>{dict[lang].ads} · Pakistan Tests Hub is free with ads</span>
      <span className="rounded bg-amber-200 px-2 py-0.5 font-medium">AdMob / AdSense slot</span>
    </div>
  );
}
