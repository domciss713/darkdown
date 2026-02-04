"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    if (data.ok) {
      setMsg("ok, přihlášeno");
      window.location.href = "/me"; // přesměrování po úspěšném přihlášení
    }
    else setMsg("error: " + (data.error || "unknown"));
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1>login</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="email nebo nick" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        <br />
        <input placeholder="heslo" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <Button variant="primary" type="submit">přihlásit</Button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
