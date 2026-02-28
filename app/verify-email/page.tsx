"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function VerifyInner() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [msg, setMsg] = useState("Ověřuji...");

  useEffect(() => {
    (async () => {
      if (!token) return setMsg("Chybí ověřovací token.");
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
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="dd-glass p-6 md:p-7">
        <h1 className="text-2xl font-semibold">Ověření e-mailu</h1>
        <p className="mt-3 text-sm text-dd-muted">{msg}</p>
        <p className="mt-4 text-sm text-dd-muted"><Link href="/login" className="hover:text-dd-text">Pokračovat na přihlášení</Link></p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-10 text-sm text-dd-muted">Načítám...</div>}>
      <VerifyInner />
    </Suspense>
  );
}
