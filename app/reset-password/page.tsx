"use client";

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

    if (!token) return setMsg("chybi token");

    const res = await fetch("/api/auth/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    setMsg(data.ok ? "heslo zmeneno" : "neplatny nebo expirovany token");
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1>reset hesla</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="nove heslo"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <button type="submit">nastavit nove heslo</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ margin: 40 }}>nahravam...</div>}>
      <ResetInner />
    </Suspense>
  );
}
