"use client";

import { useEffect, useState } from "react";
import { ADSENSE_PUB, admobBannerId, isNativeAndroid, isProdAds } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/** Web: AdSense display slot (fills after AdSense approval + Auto ads / unit). Android WebView/app: AdMob banner IDs only — native SDK must load the creative. */
export function AdSlot({ placement = "in-feed" }: { placement?: "in-feed" | "footer" }) {
  const [native, setNative] = useState(false);

  useEffect(() => {
    setNative(isNativeAndroid());
  }, []);

  useEffect(() => {
    if (native) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not ready / blocked */
    }
  }, [native, placement]);

  if (native) {
    return (
      <div
        data-admob-banner={admobBannerId()}
        data-admob-test={isProdAds() ? "0" : "1"}
        className="my-3 flex min-h-[50px] items-center justify-center rounded-xl bg-stone-100 text-[10px] text-stone-500"
        role="complementary"
        aria-label="Advertisement"
      >
        AdMob banner · {isProdAds() ? "live unit" : "Google test unit"}
      </div>
    );
  }

  return (
    <div className="my-3 overflow-hidden rounded-xl bg-stone-50" role="complementary" aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={ADSENSE_PUB}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-slot=""
      />
      <p className="px-2 py-1 text-center text-[10px] text-stone-400">Ads help keep Pakistan Tests Hub free</p>
    </div>
  );
}
