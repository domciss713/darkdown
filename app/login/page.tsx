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
      setMsg("potvrd turnstile");
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

    setMsg("error: invalid credentials");
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
        setMsg("turnstile nejde nacist");
      }
    })();
  }, []);

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1>login</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="email nebo nick" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        <br />
        <input placeholder="heslo" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <div ref={widgetRef} style={{ margin: "16px 0" }} /> : null}
        <Button variant="primary" type="submit">přihlásit</Button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
