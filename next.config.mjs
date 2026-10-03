/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/ads.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }, { key: "Cache-Control", value: "public, max-age=300" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // HTTPS is terminated by Vercel; HSTS here pins it for 2 years incl. subdomains,
          // preload-ready. Only safe once every served host is HTTPS-only (verifies true on *.vercel.app + apex).
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          // Report-Only CSP: full script/style ad+analytics allowlist (AdSense + GA4 + Next inline
          // hydration) without risking a revenue-breaking hard block. Flip to
          // "Content-Security-Policy" once AdSense renders pass with zero violations in console.
          {
            key: "Content-Security-Policy-Report-Only",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googletagmanager.com https://*.googlesyndication.com https://*.google-analytics.com https://www.google.com https://adservice.google.com https://tpc.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https://*.googlesyndication.com https://*.google-analytics.com https://www.google.com https://*.doubleclick.net; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://pagead2.googlesyndication.com; frame-src 'self' https://*.googlesyndication.com https://*.doubleclick.net https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
