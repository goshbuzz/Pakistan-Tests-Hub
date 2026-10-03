import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import {
  DEFAULT_KEYWORDS,
  PARENT_ORG_NAME,
  PARENT_ORG_SAME_AS,
  PARENT_ORG_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import { ADSENSE_PUB, ADSENSE_SCRIPT } from "@/lib/ads";
import { LOGO_SRC } from "@/lib/brand";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Government jobs & test prep Pakistan`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
  applicationName: SITE_NAME,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: PARENT_ORG_NAME, url: PARENT_ORG_URL }],
  creator: PARENT_ORG_NAME,
  publisher: PARENT_ORG_NAME,
  category: "education",
  manifest: "/manifest.json",
  // NOTE: no `alternates.canonical` here on purpose. A root-level canonical used to be
  // inherited by every page that forgot its own, which made /start, /profile,
  // /leaderboard etc. look like exact duplicates of the homepage to Google. Each page
  // (and each page layout) now declares its own unique title + canonical.
  // OG title/description/url are left unset so they fall through to each page's own
  // metadata. The share image is a 1424×752 (~1.9:1, OG-recommended) brand cover.
  openGraph: {
    locale: "en_PK",
    siteName: SITE_NAME,
    images: [{ url: "/og-cover.png", width: 1424, height: 752, alt: `${SITE_NAME} — free Pakistan test prep hub` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    // Real, correctly-sized favicons (the 1024px /logo.png used to be served as a
    // 512px "favicon", which Google's favicon crawler rejects). Google wants a
    // square icon that is a multiple of 48px — /favicon.ico carries 48/32/16.
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { url: "/icon-192.png?v=4", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png?v=4", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=4", type: "image/png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    title: "PK Tests",
    statusBarStyle: "black-translucent",
  },
  other: {
    "google-adsense-account": ADSENSE_PUB,
  },
};

export const viewport: Viewport = {
  themeColor: "#01411C",
};

const goshbuzzOrg = {
  "@type": "Organization",
  "@id": `${PARENT_ORG_URL}/#organization`,
  name: PARENT_ORG_NAME,
  legalName: PARENT_ORG_NAME,
  url: PARENT_ORG_URL,
  sameAs: PARENT_ORG_SAME_AS,
  description: "GoshBuzz — digital knowledge hub. Publisher of Pakistan Tests Hub.",
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: ["PK Tests", "Pakistan Tests Hub by GoshBuzz"],
  url: SITE_URL,
  logo: `${SITE_URL}${LOGO_SRC}`,
  description: `${SITE_TAGLINE} Pakistan Tests Hub is a GoshBuzz project (goshbuzz.com).`,
  areaServed: { "@type": "Country", name: "Pakistan" },
  audience: ["Student", "Job seeker", "Graduate"],
  knowsAbout: DEFAULT_KEYWORDS,
  inLanguage: ["en", "ur"],
  parentOrganization: goshbuzzOrg,
  publisher: goshbuzzOrg,
  brand: { "@type": "Brand", name: PARENT_ORG_NAME, url: PARENT_ORG_URL },
  isPartOf: { "@id": `${PARENT_ORG_URL}/#organization` },
};

const webLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_TAGLINE,
  inLanguage: ["en-PK", "ur"],
  publisher: goshbuzzOrg,
  copyrightHolder: goshbuzzOrg,
  isPartOf: { "@id": `${PARENT_ORG_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/explore?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// Site-wide schema is limited to Organization + WebSearch-capable WebSite. The FAQPage
// schema used to be emitted on EVERY page here, which (a) duplicated the same Q&A
// across the whole site — weakening each page's distinct identity — and (b) mismatched
// the visible content on non-FAQ pages. Each FAQ-rich page now ships its own FAQPage:
// /faq with GLOBAL_FAQS, the home page with its own shorter question set.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK">
      <head>
        <Analytics />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <JsonLd data={[orgLd, webLd]} />
        <Script id="pth-bip" strategy="beforeInteractive">{`window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pthBIP=e;});`}</Script>
        <Script async src={ADSENSE_SCRIPT} crossOrigin="anonymous" strategy="afterInteractive" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
