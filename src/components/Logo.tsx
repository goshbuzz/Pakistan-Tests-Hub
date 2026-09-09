"use client";

export function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Pakistan Tests Hub"
      width={size}
      height={size}
      className={`rounded-[22%] object-cover shadow-sm ${className}`}
    />
  );
}
