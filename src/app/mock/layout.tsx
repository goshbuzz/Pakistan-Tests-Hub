import type { Metadata } from "next";

/**
 * Interactive timed-mock player. Questions reshuffle per open and the UI is
 * meaningless without JS, so it must never compete with the /tests/[id] pages
 * that it is drilled from.
 */
export const metadata: Metadata = {
  title: { absolute: "Timed mock session — Pakistan Tests Hub" },
  robots: { index: false, follow: false },
};

export default function MockLayout({ children }: { children: React.ReactNode }) {
  return children;
}
