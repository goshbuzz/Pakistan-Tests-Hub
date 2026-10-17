"use client";

import { useEffect, useState } from "react";
import { isNativeAndroid } from "@/lib/ads";

/**
 * Adsterra (web-only) ad units. Single source of truth for every Adsterra key/URL.
 *
 * Android wrapper = AdMob only (see src/lib/ads.ts). Every Adsterra component checks
 * `useAdEnv().native` and renders nothing inside the native shell, so the two networks
 * never share a surface.
 *
 * Note: the 468×60 key was pasted twice in the brief (7ebc517c…). It is listed once here.
 */

export const ADSTERRA_HOST = "https://thatlobster.com";

/** Popunder — loaded once, site-wide (root layout). */
export const ADSTERRA_POPUNDER_SRC = `${ADSTERRA_HOST}/77/0a/f8/770af8e89e617820fa9b631d81823217.js`;

/** Social bar — loaded once, site-wide (root layout). */
export const ADSTERRA_SOCIAL_BAR_SRC = `${ADSTERRA_HOST}/2a/08/e6/2a08e6de8d7a429c245b35a1e447da78.js`;

/** Smartlink — used only as a labelled "Sponsored" link, never on exam apply buttons. */
export const ADSTERRA_SMARTLINK_URL = `${ADSTERRA_HOST}/r5efhe8me?key=c25cfb3a074649fa06973a182511eb7c`;

/** Native banner — exactly one per page (its container id must be unique). */
export const ADSTERRA_NATIVE_KEY = "0726208c556dbe9d119794c94fec4232";
export const ADSTERRA_NATIVE_SRC = `${ADSTERRA_HOST}/${ADSTERRA_NATIVE_KEY}/invoke.js`;

export type AdsterraUnit = {
  key: string;
  width: number;
  height: number;
};

/** Display banners (format=iframe). Rendered inside an isolated iframe — see Adsterra.tsx. */
export const ADSTERRA_UNITS = {
  /** 728×90 — desktop leaderboard */
  leaderboard: { key: "08bf33556a7b73c443e1eb72a78f1c08", width: 728, height: 90 },
  /** 468×60 — tablet banner */
  banner: { key: "7ebc517c851a754e97990f3054ae82cf", width: 468, height: 60 },
  /** 320×50 — phone banner */
  mobile: { key: "cb5bd6a26aab8550fc205982ec1bbcd3", width: 320, height: 50 },
  /** 300×250 — medium rectangle, fits in content and on phones */
  medium: { key: "87ac210944400467e56e12a648b2a306", width: 300, height: 250 },
  /** 160×600 — desktop left rail (wide screens only) */
  skyscraper: { key: "29136390b60b9ee882dd2c82ec2b3f2c", width: 160, height: 600 },
  /** 160×300 — desktop right rail (wide screens only) */
  tall: { key: "ac35fcbfae924aa461361e1b72e2ed1a", width: 160, height: 300 },
} satisfies Record<string, AdsterraUnit>;

export type AdsterraUnitName = keyof typeof ADSTERRA_UNITS;

/** Breakpoints mirror Tailwind's sm (640) / lg (1024) / 2xl (1536). */
export const MQ_SM = "(min-width: 640px)";
export const MQ_LG = "(min-width: 1024px)";
export const MQ_2XL = "(min-width: 1536px)";

/** Environment: `ready` is false during SSR and the first render; `native` = Android wrapper. */
export function useAdEnv(): { ready: boolean; native: boolean } {
  const [env, setEnv] = useState({ ready: false, native: false });
  useEffect(() => {
    setEnv({ ready: true, native: isNativeAndroid() });
  }, []);
  return env;
}

/** Live media-query match. `null` until mounted, so nothing ad-related mounts on the server. */
export function useMedia(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}
