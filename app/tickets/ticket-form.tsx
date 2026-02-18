"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function TicketForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("other");
  const [body, setBody] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify({ subject, category, body }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create ticket");
      }
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input name="subject" placeholder="Subject" required value={subject} onChange={(e) => setSubject(e.target.value)} />
      <Select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="ban">Ban appeal</option>
        <option value="bug">Bug report</option>
        <option value="vip">VIP</option>
        <option value="tech">Technical</option>
        <option value="other">Other</option>
      </Select>
      <Textarea
        name="body"
        placeholder="Describe your issue"
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {error && (
        <p className="text-xs text-red-400 whitespace-pre-line">
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating…" : "Create ticket"}
      </Button>
    </form>
  );
}
