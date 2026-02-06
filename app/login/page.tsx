"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";


export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
  (async () => {
    const res = await fetch("/api/auth/me", { cache: "no-store", credentials: "include" });
    if (res.ok) window.location.assign("/me");
  })();
  }, []);

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
      window.location.href = "/me"; // přesměrování po úspěšném přihlášení
      console.log("login ok, presmerovavam na /me");
      return;
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
