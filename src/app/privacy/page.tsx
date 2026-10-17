import type { Metadata } from "next";
import { PageFaq } from "@/components/PageFaq";
import { PAGE_FAQS } from "@/data/pageFaqs";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { AdsterraBanner } from "@/components/Adsterra";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy — On-Device Data, Cookies & Ads" },
  description: `How ${SITE_NAME} handles data: practice stays in your browser's IndexedDB, no cloud database, and how AdSense cookies and your choices work.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-stone max-w-2xl text-sm leading-relaxed">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      <p className="text-stone-500">Last updated: 11 September 2026</p>
      <p>
        Pakistan Tests Hub is a GoshBuzz (goshbuzz.com) project — a free self-study site for exam preparation in Pakistan. Logins,
        streaks and mock scores stay in this browser (IndexedDB). We do not run a user cloud database.
      </p>
      <h2 className="mt-6 text-lg font-semibold">Advertising</h2>
      <p>
        On the <strong>website</strong> we use Google AdSense (publisher {`ca-pub-4067724379997931`}). On a future{" "}
        <strong>Android app</strong> we use Google AdMob banners only (no interstitials in this build). Third parties including Google
        may place and read cookies or use similar technologies and IP addresses to serve ads. Read{" "}
        <a className="text-emerald-800 underline" href="https://policies.google.com/technologies/partner-sites">
          How Google uses data when you use our partners’ sites or apps
        </a>
        .
      </p>
      <p>
        The website also shows banner, native, popunder, social-bar and sponsored-link ads from <strong>Adsterra</strong>, a
        third-party ad network. Adsterra and its partners may set cookies or use device identifiers to serve and measure ads. Adsterra
        ads are never shown inside the Android app.
      </p>
      <h2 className="mt-6 text-lg font-semibold">Children</h2>
      <p>
        This hub is aimed at intermediate students, graduates and job seekers — not children under 13. We do not knowingly collect
        personal data from children for personalised ads.
      </p>
      <h2 className="mt-6 text-lg font-semibold">Contact</h2>
      <p>
        Privacy questions: <a className="text-emerald-800 underline" href="/contact">Contact</a>.
      </p>
      <PageFaq items={PAGE_FAQS.privacy} title="Privacy — quick answers" idPrefix="privacy-faq" />
      <AdsterraBanner />
    </article>
  );
}
