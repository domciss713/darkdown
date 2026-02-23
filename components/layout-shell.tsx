import type { ReactNode } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SessionKeepalive } from "@/components/session-keepalive";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/play", label: "Play" },
  { href: "/rules", label: "Rules" },
  { href: "/news", label: "News" },
  { href: "/store", label: "Store" },
  { href: "/tickets", label: "Tickets" },
  { href: "/helpers", label: "Helpers" },
  { href: "/status", label: "Status" },
  { href: "/staff", label: "Staff" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/map", label: "Map" }
];

export async function LayoutShell({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  const isAuthed = !!session?.user;

  return (
    <div className="min-h-screen dd-gradient-bg">
      <SessionKeepalive />
      <header className="z-30 px-3 pt-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 dd-liquid-bar">
          <Link
            href="/"
            className="text-lg font-semibold tracking-wide text-dd-accent transition-transform duration-300 hover:scale-105"
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
            <summary className="list-none cursor-pointer rounded-lg border border-white/20 bg-black/50 px-3 py-1.5 text-sm text-dd-text hover:bg-black/65 transition-colors">
              Menu
            </summary>
            <div className="absolute right-0 top-11 z-40 w-56 rounded-xl border border-white/20 bg-[#0f0a18f2] p-2 shadow-xl backdrop-blur-xl">
              <nav className="flex flex-col text-sm text-dd-muted">
                {navLinks.map((l) => (
                  <Link key={`mobile-${l.href}`} href={l.href} className="rounded-lg px-3 py-2 hover:bg-white/10 hover:text-dd-text">
                    {l.label}
                  </Link>
                ))}
                {isAuthed ? (
                  <form action="/api/auth/logout?next=/login" method="post" className="mt-1">
                    <button type="submit" className="w-full rounded-lg px-3 py-2 text-left text-red-200 hover:bg-red-500/15">
                      Odhlásit se
                    </button>
                  </form>
                ) : (
                  <Link href="/login" className="mt-1 rounded-lg px-3 py-2 text-dd-text hover:bg-white/10">
                    Přihlásit se
                  </Link>
                )}
              </nav>
            </div>
          </details>
          <div className="hidden md:block">
            {isAuthed ? (
              <form action="/api/auth/logout?next=/login" method="post">
                <button type="submit" className="rounded-xl border border-red-400/25 bg-red-500/10 px-3 py-1.5 text-sm text-red-200 hover:bg-red-500/20 transition-colors">
                  Odhlásit se
                </button>
              </form>
            ) : (
              <Link
                href="/login"
                className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-dd-muted hover:text-dd-text hover:bg-white/10 transition-colors"
              >
                Přihlásit se
              </Link>
            )}
          </div>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-6xl px-4 py-8 animate-[fadeIn_.35s_ease-out]">{children}</div>
      </main>
      <footer className="px-3 py-6">
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
