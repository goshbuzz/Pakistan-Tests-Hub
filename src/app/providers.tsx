"use client";

import { StoreProvider } from "@/lib/store";
import { Shell } from "@/components/Shell";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  // "/" is the standalone marketing home — it ships its own header/footer, so no Shell.
  const bare = path === "/" || path === "/login" || path.startsWith("/mock/");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return <StoreProvider>{bare ? children : <Shell>{children}</Shell>}</StoreProvider>;
}
