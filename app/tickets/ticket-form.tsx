"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function TicketForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify({
          subject: formData.get("subject"),
          category: formData.get("category"),
          body: formData.get("body")
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create ticket");
      }
      window.location.reload();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-3"
    >
      <Input name="subject" placeholder="Subject" required />
      <Select name="category" defaultValue="other">
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
