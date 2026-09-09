"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

export function InstallPrompt() {
  const [evt, setEvt] = useState<BIP | null>(null);
  const [ios, setIos] = useState(false);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone;
    if (standalone || localStorage.getItem("pth-install-dismiss")) return;
    setHide(false);
    const ua = navigator.userAgent;
    const isIos = /iphone|ipad|ipod/i.test(ua) && !("MSStream" in window);
    setIos(isIos);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIP);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function dismiss() {
    localStorage.setItem("pth-install-dismiss", "1");
    setHide(true);
    setEvt(null);
  }

  if (hide || (!evt && !ios)) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-50 w-[min(92vw,28rem)] -translate-x-1/2 rounded-2xl border border-emerald-900/20 bg-white p-3 shadow-2xl md:bottom-24">
      <div className="flex items-start gap-3">
        <Logo size={48} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#01411C]">Install Pakistan Tests Hub</p>
          {ios ? (
            <p className="mt-0.5 text-xs text-stone-600">
              Tap Share, then <span className="font-medium">Add to Home Screen</span> — works offline on this phone.
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-stone-600">Add the app to your home screen. Data stays on this device — no cloud.</p>
          )}
          <div className="mt-2 flex gap-2">
            {evt && (
              <button
                className="rounded-full bg-[#01411C] px-3 py-1.5 text-xs font-medium text-white"
                onClick={async () => {
                  await evt.prompt();
                  await evt.userChoice;
                  dismiss();
                }}
              >
                Install app
              </button>
            )}
            <button className="rounded-full border px-3 py-1.5 text-xs" onClick={dismiss}>
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
