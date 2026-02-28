"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    turnstile?: any;
  }
}

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const widgetRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);

  const getNext = () => {
    const p = new URLSearchParams(window.location.search);
    const next = p.get("next");
    return next && next.startsWith("/") ? next : "/me";
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/auth/me", { cache: "no-store", credentials: "include" });
      if (res.ok) window.location.assign(getNext());
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setMsg("Potvrď prosím ochranu Turnstile.");
      return;
    }

    const next = getNext();
    const result = await signIn("credentials", {
      identifier,
      password,
      turnstileToken,
      redirect: false,
      callbackUrl: next,
    });

    if (result?.ok) {
      window.location.assign(next);
      return;
    }

    setMsg("Neplatné přihlašovací údaje.");
    setTurnstileToken("");
    if (window.turnstile && widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
  }

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    const ensureScript = () =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector('script[data-turnstile="1"]') as HTMLScriptElement | null;
        if (existing) return resolve();

        const s = document.createElement("script");
        s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        s.async = true;
        s.defer = true;
        s.dataset.turnstile = "1";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("turnstile script load failed"));
        document.head.appendChild(s);
      });

    (async () => {
      try {
        await ensureScript();
        if (!widgetRef.current || widgetIdRef.current) return;

        widgetIdRef.current = window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          callback: (token: string) => setTurnstileToken(token),
          "expired-callback": () => setTurnstileToken(""),
          "error-callback": () => setTurnstileToken(""),
        });
      } catch {
        setMsg("Turnstile se nepodařilo načíst.");
      }
    })();
  }, []);

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="dd-glass p-6 md:p-7">
        <h1 className="text-2xl font-semibold">Přihlášení</h1>
        <p className="mt-1 text-sm text-dd-muted">Přihlas se pomocí emailu nebo Minecraft nicku.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            placeholder="Email nebo nick"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 outline-none focus:border-dd-accent/70"
          />
          <input
            placeholder="Heslo"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/25 px-3 py-2 outline-none focus:border-dd-accent/70"
          />
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <div ref={widgetRef} className="pt-1" /> : null}
          <Button variant="primary" type="submit" className="w-full">Přihlásit se</Button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm text-dd-muted">
          <Link href="/register" className="hover:text-dd-text">Vytvořit účet</Link>
          <Link href="/reset-password" className="hover:text-dd-text">Zapomenuté heslo</Link>
        </div>

        {msg ? <p className="mt-3 text-sm text-amber-200">{msg}</p> : null}
      </div>
    </div>
  );
}
