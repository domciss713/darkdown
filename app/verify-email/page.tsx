"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function VerifyInner() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [msg, setMsg] = useState("Ověřuji e-mail…");

  useEffect(() => {
    (async () => {
      if (!token) return setMsg("Chybí token.");
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      setMsg(data.ok ? "E-mail úspěšně ověřen." : "Neplatný nebo expirovaný token.");
    })();
  }, [token]);

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="dd-auth-shell">
        <h1 className="text-3xl font-semibold">Ověření e-mailu</h1>
        <p className="mt-4 text-sm text-dd-text">{msg}</p>
        <Link href="/login" className="mt-5 inline-block text-sm text-dd-accent hover:text-white">
          Zpět na přihlášení
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md py-10 text-dd-muted">Načítám…</div>}>
      <VerifyInner />
    </Suspense>
  );
}
