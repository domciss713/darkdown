"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function TicketReplyForm({ ticketId }: { ticketId: string }) {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/tickets/${ticketId}/reply`, {
        method: "POST",
        body: JSON.stringify({ body }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to reply");
      }
      window.location.reload();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write a reply"
        required
      />
      {error && (
        <p className="text-xs text-red-400 whitespace-pre-line">
          {error}
        </p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Sending…" : "Reply"}
      </Button>
    </form>
  );
}
