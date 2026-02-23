"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [minecraftNick, setMinecraftNick] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minecraftNick, email, password }),
    });

    const data = await res.json();
    if (data.ok) setMsg("Hotovo. Poslali jsme ověřovací e-mail.");
    else setMsg("Chyba: " + (data.error || "unknown"));
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="dd-auth-shell">
        <p className="text-xs uppercase tracking-[0.2em] text-dd-accent/80">DarkDown Network</p>
        <h1 className="mt-2 text-3xl font-semibold">Registrace</h1>
        <p className="mt-2 text-sm text-dd-muted">Vytvoř si účet pro web i budoucí propojení s MC serverem.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input className="dd-input" placeholder="Minecraft nick" value={minecraftNick} onChange={(e) => setMinecraftNick(e.target.value)} />
          <input className="dd-input" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="dd-input" placeholder="Heslo" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button variant="primary" type="submit" className="w-full">Vytvořit účet</Button>
        </form>

        <div className="mt-4 text-sm text-dd-muted">
          Už účet máš? <Link href="/login" className="text-dd-accent hover:text-white">Přihlásit se</Link>
        </div>

        {msg ? <p className="mt-4 text-sm text-emerald-300">{msg}</p> : null}
      </div>
    </div>
  );
}
