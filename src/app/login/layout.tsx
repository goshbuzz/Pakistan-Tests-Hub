import type { Metadata } from "next";

/** Local-auth screen — interactive app chrome, not search content. */
export const metadata: Metadata = {
  title: { absolute: "Sign in — Pakistan Tests Hub (local device accounts)" },
  description:
    "Optional sign-in for Pakistan Tests Hub. Accounts live only in this browser's IndexedDB — streaks, points and saved tests never leave the device.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
