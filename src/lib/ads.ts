/** Central ad IDs. Web = AdSense. Android app = AdMob. Never mix on the same surface. */

export const ADSENSE_PUB = "ca-pub-4067724379997931";
export const ADSENSE_SCRIPT = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB}`;

/** Production AdMob (confirm in AdMob console before a Play release). */
export const ADMOB_APP_ID_PROD = "ca-app-pub-4067724379997931~6208950543";
export const ADMOB_BANNER_PROD = "ca-app-pub-4067724379997931/4082502150";

/** Google sample / test — debug and browser preview only. */
export const ADMOB_APP_ID_TEST = "ca-app-pub-3940256099942544~3347511713";
export const ADMOB_BANNER_TEST = "ca-app-pub-3940256099942544/9214589741";

export function isProdAds() {
  return process.env.NEXT_PUBLIC_ADS_ENV === "production";
}

export function admobAppId() {
  return isProdAds() ? ADMOB_APP_ID_PROD : ADMOB_APP_ID_TEST;
}

export function admobBannerId() {
  return isProdAds() ? ADMOB_BANNER_PROD : ADMOB_BANNER_TEST;
}

export function isNativeAndroid(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as Window & { Capacitor?: { getPlatform?: () => string } };
  if (w.Capacitor?.getPlatform?.() === "android") return true;
  const ua = navigator.userAgent || "";
  return /; wv\)/.test(ua) || /Android.*Version\/[\d.]+.*Chrome\/[\d.]+ Mobile/.test(ua) && /\bwv\b/.test(ua);
}

export function isStandaloneApp(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
}
