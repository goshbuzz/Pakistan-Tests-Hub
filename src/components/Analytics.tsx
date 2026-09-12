import { GA_ENABLED, GA_MEASUREMENT_ID, GA_SCRIPT_SRC } from "@/lib/analytics";

/**
 * Google tag (gtag.js) for GA4 — rendered inside the root layout's <head>.
 *
 * Deliberately raw <script> tags, not `next/script`: with `beforeInteractive`
 * Next.js emits only a preload link plus a `self.__next_s` bootstrap queue, so the
 * literal `gtag/js?id=G-…` tag never lands in the HTML response. Google's tag
 * scanner, Tag Assistant and the GA4 installation guide all look for that tag in
 * the page source, so it has to be literal. These are server components — no
 * client JS is involved, and the tag is present in the very first response.
 *
 * No manual `page_view` call on navigation: GA4 Enhanced measurement
 * ("Page changes based on browser history events") covers Next.js client-side
 * route changes, and adding one here would double-count page views.
 */
export function Analytics() {
  if (!GA_ENABLED) return null;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src={GA_SCRIPT_SRC} />
      <script
        id="ga-init"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`,
        }}
      />
    </>
  );
}
