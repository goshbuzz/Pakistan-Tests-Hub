"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

declare global {
  interface Window {
    __pthBIP?: BIP;
  }
}

export function InstallPrompt() {
  const [evt, setEvt] = useState<BIP | null>(null);
  const [ios, setIos] = useState(false);
  const [hide, setHide] = useState(true);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isStand =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    setStandalone(!!isStand);
    if (isStand) return;

    const dismissedAt = Number(localStorage.getItem("pth-install-dismiss-at") || "0");
    const recent = dismissedAt && Date.now() - dismissedAt < 1000 * 60 * 60 * 12;
    if (recent) return;

    setHide(false);
    const ua = navigator.userAgent;
    setIos(/iphone|ipad|ipod/i.test(ua) && !("MSStream" in window));

    if (window.__pthBIP) setEvt(window.__pthBIP);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      const bip = e as BIP;
      window.__pthBIP = bip;
      setEvt(bip);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function dismiss() {
    localStorage.setItem("pth-install-dismiss-at", String(Date.now()));
    setHide(true);
  }

  if (hide || standalone) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[4.75rem] z-[70] flex justify-center px-3 pb-[env(safe-area-inset-bottom)]">
      <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-emerald-900/20 bg-white p-3 text-center shadow-2xl">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:text-left">
          <Logo size={48} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#01411C]">Install Pakistan Tests Hub</p>
            <p className="mt-0.5 text-xs text-stone-600">
              {ios
                ? "Safari → Share → Add to Home Screen. Works offline on this phone."
                : evt
                  ? "Add the app to your home screen. Scores stay on this device."
                  : "Chrome menu (⋮) → Install app or Add to Home screen. HTTPS + this site."}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
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
    </div>
  );
}
