"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  ADSTERRA_HOST,
  ADSTERRA_NATIVE_KEY,
  ADSTERRA_NATIVE_SRC,
  ADSTERRA_POPUNDER_SRC,
  ADSTERRA_SMARTLINK_URL,
  ADSTERRA_SOCIAL_BAR_SRC,
  ADSTERRA_UNITS,
  MQ_2XL,
  MQ_LG,
  MQ_SM,
  useAdEnv,
  useMedia,
  type AdsterraUnit,
} from "@/lib/adsterra";

/**
 * Adsterra placements for the web app. Every component:
 *  - renders nothing inside the Android (AdMob) wrapper — see useAdEnv();
 *  - reserves its final size before the ad loads, so the layout does not jump;
 *  - mounts the ad only on the client, after the viewport size is known.
 */

/* ───────────────────────── site-wide scripts ───────────────────────── */

/** Popunder + Social Bar. Loaded once from the root layout, so they run on every page. */
export function AdsterraSiteScripts() {
  const { ready, native } = useAdEnv();
  if (!ready || native) return null;
  return (
    <>
      <Script id="adsterra-popunder" src={ADSTERRA_POPUNDER_SRC} strategy="afterInteractive" />
      <Script id="adsterra-social-bar" src={ADSTERRA_SOCIAL_BAR_SRC} strategy="afterInteractive" />
    </>
  );
}

/* ───────────────────────── display banners ───────────────────────── */

/**
 * Adsterra's snippet is `atOptions = {...}` followed by `invoke.js`, which writes into the
 * document it runs in. Several banners on one page would overwrite each other's global
 * `atOptions`, so each one lives in its own srcdoc iframe with the official snippet verbatim.
 */
function frameDoc(unit: AdsterraUnit): string {
  const options = JSON.stringify({ key: unit.key, format: "iframe", height: unit.height, width: unit.width, params: {} });
  return `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden;background:transparent}</style></head><body><script>atOptions = ${options};</script><script src="${ADSTERRA_HOST}/${unit.key}/invoke.js"></script></body></html>`;
}

function AdsterraFrame({ unit }: { unit: AdsterraUnit }) {
  return (
    <iframe
      title="Advertisement"
      srcDoc={frameDoc(unit)}
      width={unit.width}
      height={unit.height}
      scrolling="no"
      loading="lazy"
      style={{ border: 0, display: "block", width: unit.width, height: unit.height, background: "transparent" }}
    />
  );
}

function AdBox({ boxClassName, boxStyle, className = "", children }: { boxClassName?: string; boxStyle?: CSSProperties; className?: string; children: ReactNode }) {
  return (
    <div role="complementary" aria-label="Advertisement" className={`my-3 text-center ${className}`}>
      <div className={`mx-auto flex items-center justify-center ${boxClassName ?? ""}`} style={boxStyle}>
        {children}
      </div>
      <p className="mt-1 text-[10px] text-stone-400">Advertisement</p>
    </div>
  );
}

/**
 * Responsive leaderboard: 320×50 on phones, 468×60 on tablets, 728×90 on desktop.
 * Only ONE unit is mounted at a time, so the viewer never gets two banners stacked.
 */
export function AdsterraBanner({ className = "" }: { className?: string }) {
  const { ready, native } = useAdEnv();
  const sm = useMedia(MQ_SM);
  const lg = useMedia(MQ_LG);
  if (native) return null;

  const unit = lg ? ADSTERRA_UNITS.leaderboard : sm ? ADSTERRA_UNITS.banner : ADSTERRA_UNITS.mobile;
  const sized = ready && sm !== null && lg !== null;
  return (
    <AdBox boxClassName="h-[50px] w-full sm:h-[60px] lg:h-[90px]" className={className}>
      {sized && <AdsterraFrame unit={unit} />}
    </AdBox>
  );
}

/** 300×250 medium rectangle — the highest-performing size inside content and on phones. */
export function AdsterraMediumRect({ className = "" }: { className?: string }) {
  const { ready, native } = useAdEnv();
  if (native) return null;
  const { width, height } = ADSTERRA_UNITS.medium;
  return (
    <AdBox boxStyle={{ width, height, maxWidth: "100%" }} className={className}>
      {ready && <AdsterraFrame unit={ADSTERRA_UNITS.medium} />}
    </AdBox>
  );
}

/**
 * Desktop side rails (160 wide). Only on very wide screens (≥1536px), where the 1152px
 * content column leaves room on both sides. Position it inside a `relative` parent.
 */
export function AdsterraRail({ side }: { side: "left" | "right" }) {
  const { ready, native } = useAdEnv();
  const wide = useMedia(MQ_2XL);
  if (native) return null;
  const unit = side === "left" ? ADSTERRA_UNITS.skyscraper : ADSTERRA_UNITS.tall;
  return (
    <div className={`absolute top-4 hidden 2xl:block ${side === "left" ? "right-full mr-4" : "left-full ml-4"}`}>
      <AdBox boxStyle={{ width: unit.width, height: unit.height }} className="my-0">
        {ready && wide === true && <AdsterraFrame unit={unit} />}
      </AdBox>
    </div>
  );
}

/* ───────────────────────── native banner ───────────────────────── */

/**
 * Native banner: the ad fills a `container-<key>` div in the page itself, so it adapts to
 * the surrounding card styling. Use ONE per page (the container id must be unique). It loads
 * only when scrolled near the viewport, so off-screen natives do not spend bandwidth.
 */
export function AdsterraNative({ className = "" }: { className?: string }) {
  const { ready, native } = useAdEnv();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const active = ready && !native;

  useEffect(() => {
    const el = wrapRef.current;
    if (!active || visible || !el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active, visible]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!visible || !el || native) return;
    // Same markup order as Adsterra's snippet: <script invoke.js> then the container.
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = ADSTERRA_NATIVE_SRC;
    el.insertBefore(script, el.firstChild);
    return () => script.remove();
  }, [visible, native]);

  if (native) return null;
  return (
    <div role="complementary" aria-label="Advertisement" className={`my-3 text-center ${className}`}>
      <div ref={wrapRef} className="w-full">
        <div id={`container-${ADSTERRA_NATIVE_KEY}`} />
      </div>
      <p className="mt-1 text-[10px] text-stone-400">Advertisement</p>
    </div>
  );
}

/* ───────────────────────── smartlink ───────────────────────── */

/**
 * Smartlink as a clearly labelled sponsored card. It is never placed on an exam apply
 * button (apply links must stay on official sites) and always says it is not official.
 */
export function AdsterraSmartlink({
  title = "Sponsored link",
  text = "Opens a partner page in a new tab. This is not an official exam or apply site.",
  cta = "Open sponsored link",
  className = "",
}: {
  title?: string;
  text?: string;
  cta?: string;
  className?: string;
}) {
  const { native } = useAdEnv();
  if (native) return null;
  return (
    <aside aria-label="Sponsored" className={`rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-left ${className}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-800">Sponsored</p>
      <p className="mt-1 font-semibold text-stone-900">{title}</p>
      <p className="mt-1 text-sm text-stone-600">{text}</p>
      <a
        href={ADSTERRA_SMARTLINK_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="mt-3 inline-block rounded-full bg-amber-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-amber-800"
      >
        {cta} ↗
      </a>
    </aside>
  );
}
