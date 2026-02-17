import type { ReactNode } from "react";
import Link from "next/link";
import { SessionKeepalive } from "@/components/session-keepalive";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuthNavButton } from "@/components/auth-nav-button";

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

export async function LayoutShell({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen dd-gradient-bg flex flex-col">
      <SessionKeepalive />
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
          <AuthNavButton loggedIn={!!session?.user} />
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
      </main>
      <footer className="border-t border-white/5 bg-black/40">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-dd-muted flex justify-between">
          <span>DarkDowN © {new Date().getFullYear()}</span>
          <span>
            Čistě nekomerční projekt, nespolupracujeme s Mojang ani Microsoftem.
          </span>
        </div>
      </footer>
    </div>
  );
}
