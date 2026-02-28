"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetInner() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    if (!token) return setMsg("Chybí reset token.");

    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    setMsg(data.ok ? "Heslo bylo změněno." : "Neplatný nebo expirovaný token.");
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="dd-glass p-6 md:p-7">
        <h1 className="text-2xl font-semibold">Reset hesla</h1>
        <p className="mt-1 text-sm text-dd-muted">Nastav nové heslo pro svůj účet.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            placeholder="Nové heslo"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 outline-none focus:border-dd-accent/70"
          />
          <button className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition-colors" type="submit">
            Nastavit nové heslo
          </button>
        </form>

        <p className="mt-4 text-sm text-dd-muted"><Link href="/login" className="hover:text-dd-text">Zpět na přihlášení</Link></p>
        {msg ? <p className="mt-3 text-sm text-amber-200">{msg}</p> : null}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-10 text-sm text-dd-muted">Načítám...</div>}>
      <ResetInner />
    </Suspense>
  );
}
