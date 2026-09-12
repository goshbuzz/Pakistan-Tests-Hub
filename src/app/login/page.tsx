"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const { loginLocal, registerLocal, lang } = useStore();
  const t = dict[lang];
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (mode === "signup") {
        if (!name.trim() || !email.trim() || password.length < 6) throw new Error("Name, email and 6+ character password required.");
        await registerLocal(name, email, password);
      } else {
        if (!email.trim() || !password) throw new Error("Email and password required.");
        await loginLocal(email, password);
      }
      router.push("/");
    } catch (ex) {
      setErr(ex instanceof Error ? ex.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#01411C] p-4">
      <form className="w-full max-w-md rounded-3xl bg-[#f4f1e8] p-6 shadow-xl" onSubmit={submit}>
        <div className="flex items-center gap-3">
          <Logo size={56} />
          <div>
            <h1 className="text-2xl font-semibold text-[#01411C]">{t.app}</h1>
            <p className="text-xs text-stone-500">{t.localDb}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-stone-600">{t.needAccount}</p>
        <div className="mt-3 flex rounded-full bg-white p-1 text-sm">
          <button type="button" className={`flex-1 rounded-full py-1.5 ${mode === "login" ? "bg-[#01411C] text-white" : ""}`} onClick={() => setMode("login")}>
            {t.login}
          </button>
          <button type="button" className={`flex-1 rounded-full py-1.5 ${mode === "signup" ? "bg-[#01411C] text-white" : ""}`} onClick={() => setMode("signup")}>
            {t.signup}
          </button>
        </div>
        {mode === "signup" && (
          <>
            <label className="mt-4 block text-sm">Name</label>
            <input className="mt-1 w-full rounded-xl border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          </>
        )}
        <label className="mt-3 block text-sm">Email</label>
        <input className="mt-1 w-full rounded-xl border px-3 py-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
        <label className="mt-3 block text-sm">Password</label>
        <input className="mt-1 w-full rounded-xl border px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} />
        {err && <p className="mt-2 text-sm text-red-700">{err}</p>}
        <button disabled={busy} className="mt-4 w-full rounded-full bg-emerald-800 py-2 text-white disabled:opacity-60">
          {busy ? "…" : mode === "signup" ? t.signup : t.login}
        </button>
        <Link href="/" className="mt-3 block text-center text-sm text-emerald-800">
          {t.guest}
        </Link>
      </form>
    </div>
  );
}
