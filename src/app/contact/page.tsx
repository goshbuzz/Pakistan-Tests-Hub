import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Pakistan Tests Hub about content, privacy, or ads.",
  alternates: { canonical: `${SITE_URL}/contact` },
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
