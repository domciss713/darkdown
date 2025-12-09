"use client";

import { useState } from "react";
import { Button } from "./ui/button";

const IP = "play.darkdown.xyz";

export function CopyIp() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Button onClick={handleClick}>
      {copied ? "Copied" : `Copy IP: ${IP}`}
    </Button>
  );
}
