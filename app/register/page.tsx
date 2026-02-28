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
    if (data.ok) setMsg("Účet vytvořen. Ověření jsme poslali na e-mail.");
    else setMsg("Chyba: " + (data.error || "unknown"));
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="dd-glass p-6 md:p-7">
        <h1 className="text-2xl font-semibold">Registrace</h1>
        <p className="mt-1 text-sm text-dd-muted">Vytvoř si účet pro web i budoucí propojení s MC serverem.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            placeholder="Minecraft nick"
            value={minecraftNick}
            onChange={(e) => setMinecraftNick(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 outline-none focus:border-dd-accent/70"
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 outline-none focus:border-dd-accent/70"
          />
          <input
            placeholder="Heslo"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 outline-none focus:border-dd-accent/70"
          />
          <Button variant="primary" type="submit" className="w-full">Vytvořit účet</Button>
        </form>

        <p className="mt-4 text-sm text-dd-muted">
          Už účet máš? <Link href="/login" className="hover:text-dd-text">Přihlásit se</Link>
        </p>
        {msg ? <p className="mt-3 text-sm text-amber-200">{msg}</p> : null}
      </div>
    </div>
  );
}
