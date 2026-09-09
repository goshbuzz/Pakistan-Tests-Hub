import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pakistan Tests Hub",
  description:
    "Free hub for MDCAT, ECAT, CSS, NTS, ISSB, ACCA, CA, CFA and 60+ Pakistan tests — syllabus, past papers, MCQs, mocks, alerts.",
  applicationName: "Pakistan Tests Hub",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/logo.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/logo.png",
  },
  appleWebApp: {
    capable: true,
    title: "PK Tests",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#01411C",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
