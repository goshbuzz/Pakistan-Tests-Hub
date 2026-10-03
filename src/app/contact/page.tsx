import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Contact — report a wrong syllabus, ad issue or privacy question" },
  description: `Reach ${SITE_NAME} (published by GoshBuzz). Suggest test corrections from any test page or email the editorial team — replies within a few working days.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: `Contact ${SITE_NAME}`,
    description: "Content corrections, advertising and privacy contacts.",
  },
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl space-y-4 text-sm">
      <h1 className="text-2xl font-semibold">Contact</h1>
      <p>
        Pakistan Tests Hub is published by GoshBuzz. For syllabus corrections, privacy, or advertising:
      </p>
      <ul className="list-disc pl-5">
        <li>
          Use the “Suggest an update” box on any test page (queued locally for moderation).
        </li>
        <li>
          Email:{" "}
          <a className="text-emerald-800 underline" href="mailto:hello@pakistantestshub.com">
            hello@pakistantestshub.com
          </a>
        </li>
      </ul>
    </article>
  );
}
