"use client";

import { useEffect, useRef } from "react";

const HEARTBEAT_MS = 5 * 60 * 1000;
const ACTIVE_WINDOW_MS = 10 * 60 * 1000;

export function SessionKeepalive() {
  const lastActivityRef = useRef<number>(Date.now());

  useEffect(() => {
    const markActive = () => {
      lastActivityRef.current = Date.now();
    };

    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "focus",
    ];

    events.forEach((eventName) => {
      window.addEventListener(eventName, markActive, { passive: true });
    });

    const interval = window.setInterval(async () => {
      if (document.visibilityState !== "visible") return;

      const isRecentlyActive = Date.now() - lastActivityRef.current < ACTIVE_WINDOW_MS;
      if (!isRecentlyActive) return;

      try {
        await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        });
      } catch {
        // no-op
      }
    }, HEARTBEAT_MS);

    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName, markActive);
      });
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
