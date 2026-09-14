import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";
import { GLOBAL_FAQS } from "@/data/faqs";
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
import { LOGO_HEIGHT, LOGO_SRC, LOGO_WIDTH } from "@/lib/brand";

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
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — CSS, MDCAT, PPSC, NTS, IELTS`,
    description: SITE_TAGLINE,
    images: [{ url: LOGO_SRC, width: LOGO_WIDTH, height: LOGO_HEIGHT, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GLOBAL_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK">
      <head>
        <Analytics />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <JsonLd data={[orgLd, webLd, faqLd]} />
        <Script id="pth-bip" strategy="beforeInteractive">{`window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__pthBIP=e;});`}</Script>
        <Script async src={ADSENSE_SCRIPT} crossOrigin="anonymous" strategy="afterInteractive" />
        <Providers>{children}</Providers>
        <VercelAnalytics />
      </body>
    </html>
  );
}
