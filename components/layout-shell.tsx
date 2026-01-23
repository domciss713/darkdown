import type { ReactNode } from "react";
import Link from "next/link";

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
      <header className="sticky top-0 z-30 border-b border-white/5 bg-black/40 backdrop-blur-glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
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
          <Link
            href="/login"
            className="text-sm text-dd-muted hover:text-dd-text"
          >
            Login
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>
      <footer className="border-t border-white/5 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-dd-muted flex justify-between">
          <span>DarkDowN © {new Date().getFullYear()}</span>
          <span>
            Čistě nekomerční projekt , nespolupracujeme s Mojang ani Microsoftem.
          </span>
        </div>
      </footer>
    </div>
  );
}
