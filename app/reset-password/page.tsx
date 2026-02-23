"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function ResetInner() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    if (!token) return setMsg("Chybí token.");

    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    setMsg(data.ok ? "Heslo bylo změněno." : "Neplatný nebo expirovaný token.");
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="dd-auth-shell">
        <h1 className="text-3xl font-semibold">Reset hesla</h1>
        <p className="mt-2 text-sm text-dd-muted">Zadej nové heslo pro svůj účet.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            className="dd-input"
            placeholder="Nové heslo"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button type="submit" className="w-full">Nastavit nové heslo</Button>
        </form>
        {msg ? <p className="mt-4 text-sm text-dd-text">{msg}</p> : null}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md py-10 text-dd-muted">Načítám…</div>}>
      <ResetInner />
    </Suspense>
  );
}
