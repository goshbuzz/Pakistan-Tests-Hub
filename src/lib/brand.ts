/**
 * Single brand asset for the website header, login, profile, install prompt,
 * notifications, Open Graph and the PWA. One file, one URL, everywhere.
 *
 * The `?v=` query is a deliberate cache-buster, not decoration. `/logo.png` is
 * precached by public/sw.js, so replacing the file on Vercel is *not* enough on its
 * own: every returning visitor and every installed PWA keeps serving the copy already
 * sitting in their Cache Storage until the URL changes. When the artwork changes,
 * bump this version AND `CACHE` in public/sw.js together, and the new logo propagates
 * on the next load.
 */
export const LOGO_SRC = "/logo.png?v=5";

/** public/logo.png is a 1024x1024 square — shared metadata must not claim 512. */
export const LOGO_WIDTH = 1024;
export const LOGO_HEIGHT = 1024;
