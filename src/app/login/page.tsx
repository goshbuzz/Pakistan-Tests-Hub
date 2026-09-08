"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { dict } from "@/lib/i18n";
import Link from "next/link";

export default function LoginPage() {
  const { login, lang } = useStore();
  const t = dict[lang];
  const [name, setName] = useState("Ayesha Khan");
  const [email, setEmail] = useState("ayesha@example.com");
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#01411C] p-4">
      <form
        className="w-full max-w-md rounded-3xl bg-[#f4f1e8] p-6 shadow-xl"
        onSubmit={(e) => {
          e.preventDefault();
          login(name, email);
          router.push("/");
        }}
      >
        <h1 className="text-2xl font-semibold text-[#01411C]">{t.app}</h1>
        <p className="text-sm text-stone-600">{t.needAccount}</p>
        <label className="mt-4 block text-sm">Name</label>
        <input className="mt-1 w-full rounded-xl border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
        <label className="mt-3 block text-sm">Email</label>
        <input className="mt-1 w-full rounded-xl border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="mt-4 w-full rounded-full bg-emerald-800 py-2 text-white">{t.login}</button>
        <Link href="/" className="mt-3 block text-center text-sm text-emerald-800">
          {t.guest}
        </Link>
      </form>
    </div>
  );
}
