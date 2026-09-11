"use client";

import { useEffect, useState } from "react";

const KEY = "pth-cookie-ok";

export function CookieBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!localStorage.getItem(KEY));
    } catch {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-20 left-1/2 z-[60] w-[min(92vw,36rem)] -translate-x-1/2 rounded-2xl border bg-white p-3 text-xs text-stone-700 shadow-xl md:bottom-8">
      <p>
        We use cookies and Google may use cookies / device IDs to serve ads. See our{" "}
        <a className="text-emerald-800 underline" href="/privacy">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a className="text-emerald-800 underline" href="https://policies.google.com/technologies/partner-sites">
          How Google uses data
        </a>
        .
      </p>
      <button
        className="mt-2 rounded-full bg-emerald-800 px-4 py-1.5 text-white"
        onClick={() => {
          try {
            localStorage.setItem(KEY, "1");
          } catch {
            /* ignore */
          }
          setShow(false);
        }}
      >
        OK
      </button>
    </div>
  );
}
