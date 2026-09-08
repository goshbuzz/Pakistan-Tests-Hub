"use client";

import { StoreProvider } from "@/lib/store";
import { Shell } from "@/components/Shell";
import { usePathname } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const bare = path === "/login" || path.startsWith("/mock/");
  return (
    <StoreProvider>
      {bare ? children : <Shell>{children}</Shell>}
    </StoreProvider>
  );
}
