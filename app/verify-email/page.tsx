"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function VerifyInner() {
  const sp = useSearchParams();
  const token = sp.get("token");
  const [msg, setMsg] = useState("overuju...");

  useEffect(() => {
    (async () => {
      if (!token) return setMsg("chybi token");
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      setMsg(data.ok ? "email overen" : "neplatny nebo expirovany token");
    })();
  }, [token]);

  return <div style={{ margin: 40 }}>{msg}</div>;
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div style={{ margin: 40 }}>nahravam...</div>}>
      <VerifyInner />
    </Suspense>
  );
}
