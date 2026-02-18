"use client";

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
  const [loading, setLoading] = useState(false);
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
    if (loading) return;
    setMsg("");

    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setMsg("Musíš potvrdit Turnstile.");
      return;
    }

    setLoading(true);
    try {
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

      setMsg("Špatné přihlašovací údaje.");
      setTurnstileToken("");
      if (window.turnstile && widgetIdRef.current) window.turnstile.reset(widgetIdRef.current);
    } finally {
      setLoading(false);
    }
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
    <div className="mx-auto mt-10 w-full max-w-md rounded-2xl border border-white/10 bg-black/35 p-6 shadow-dd">
      <h1 className="mb-4 text-2xl font-semibold">Přihlášení</h1>

      {msg ? (
        <div className="mb-4 rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {msg}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-dd-accent/50"
          placeholder="email nebo nick"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 outline-none focus:border-dd-accent/50"
          placeholder="heslo"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <div ref={widgetRef} className="my-2" /> : null}
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Přihlašuji..." : "Přihlásit se"}
        </Button>
      </form>
    </div>
  );
}
