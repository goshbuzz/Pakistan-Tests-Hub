"use client";

import { StoreProvider } from "@/lib/store";
import { Shell } from "@/components/Shell";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const bare = path === "/login" || path.startsWith("/mock/");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return <StoreProvider>{bare ? children : <Shell>{children}</Shell>}</StoreProvider>;
}
