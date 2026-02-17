import type { ReactNode } from "react";
import Link from "next/link";
import { SessionKeepalive } from "@/components/session-keepalive";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/play", label: "Play" },
  { href: "/rules", label: "Rules" },
  { href: "/news", label: "News" },
  { href: "/store", label: "Store" },
  { href: "/tickets", label: "Tickets" },
  { href: "/status", label: "Status" },
  { href: "/staff", label: "Staff" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/map", label: "Map" }
];

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen dd-gradient-bg flex flex-col">
      <SessionKeepalive />
      <header className="z-30 px-3 pt-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 dd-liquid-bar">
          <Link
            href="/"
            className="text-lg font-semibold tracking-wide text-dd-accent"
          >
            DarkDowN
          </Link>
          <nav className="hidden gap-4 text-sm text-dd-muted md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-dd-text transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-lg border border-white/10 px-3 py-1.5 text-sm text-dd-text/90 hover:bg-white/5">
              Menu
            </summary>
            <div className="absolute right-0 top-11 z-40 w-48 rounded-xl dd-liquid-bar p-2">
              <nav className="flex flex-col text-sm text-dd-muted">
                {navLinks.map((l) => (
                  <Link key={`mobile-${l.href}`} href={l.href} className="rounded-lg px-3 py-2 hover:bg-white/5 hover:text-dd-text">
                    {l.label}
                  </Link>
                ))}
                <Link href="/login" className="mt-1 rounded-lg px-3 py-2 text-dd-text hover:bg-white/5">
                  Login
                </Link>
              </nav>
            </div>
          </details>
          <Link
            href="/login"
            className="hidden text-sm text-dd-muted hover:text-dd-text md:inline"
          >
            Login
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>
      <footer className="px-3 pb-3 pt-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 rounded-2xl px-4 py-4 text-xs text-dd-muted dd-liquid-bar md:flex-row md:justify-between">
          <span>DarkDowN © {new Date().getFullYear()}</span>
          <span>
            Čistě nekomerční projekt, nespolupracujeme s Mojang ani Microsoftem.
          </span>
        </div>
      </footer>
    </div>
  );
}
