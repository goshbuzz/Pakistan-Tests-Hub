"use client";

import { LOGO_SRC } from "@/lib/brand";

/** Website header, login, profile, install prompt — same file as the PWA icon. */
export function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="Pakistan Tests Hub"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`shrink-0 object-contain ${className}`}
    />
  );
}
