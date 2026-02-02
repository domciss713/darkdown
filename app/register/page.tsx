"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (data.ok) setMsg("ok, poslal jsem overeni na email");
    else setMsg("error: " + (data.error || "unknown"));
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h1>registrace</h1>
      <form onSubmit={onSubmit}>
        <input placeholder="nick" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <input placeholder="heslo" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">vytvorit ucet</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
