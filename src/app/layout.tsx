import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { JsonLd } from "@/components/JsonLd";
import { GLOBAL_FAQS } from "@/data/faqs";
import { DEFAULT_KEYWORDS, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { ADSENSE_PUB, ADSENSE_SCRIPT } from "@/lib/ads";

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
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
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
    images: [{ url: "/logo.png?v=3", width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_TAGLINE,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: {
    icon: [{ url: "/logo.png?v=3", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/logo.png?v=3", type: "image/png", sizes: "512x512" }],
    shortcut: "/logo.png?v=3",
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

const orgLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_TAGLINE,
  areaServed: { "@type": "Country", name: "Pakistan" },
  audience: ["Student", "Job seeker", "Graduate"],
  knowsAbout: DEFAULT_KEYWORDS,
  inLanguage: ["en", "ur"],
};

const webLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
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
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <JsonLd data={[orgLd, webLd, faqLd]} />
        <Script async src={ADSENSE_SCRIPT} crossOrigin="anonymous" strategy="afterInteractive" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
