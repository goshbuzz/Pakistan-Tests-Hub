import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles data, cookies, and Google advertising.`,
  alternates: { canonical: `${SITE_URL}/privacy` },
};

export default function PrivacyPage() {
  return (
    <article className="prose prose-stone max-w-2xl text-sm leading-relaxed">
      <h1 className="text-2xl font-semibold">Privacy Policy</h1>
      <p className="text-stone-500">Last updated: 11 September 2026</p>
      <p>
        Pakistan Tests Hub is a free self-study site for exam preparation in Pakistan. Logins, streaks and mock scores stay in this
        browser (IndexedDB). We do not run a user cloud database.
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
      <h2 className="mt-6 text-lg font-semibold">Children</h2>
      <p>
        This hub is aimed at intermediate students, graduates and job seekers — not children under 13. We do not knowingly collect
        personal data from children for personalised ads.
      </p>
      <h2 className="mt-6 text-lg font-semibold">Contact</h2>
      <p>
        Privacy questions: <a className="text-emerald-800 underline" href="/contact">Contact</a>.
      </p>
    </article>
  );
}
