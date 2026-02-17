export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mcDisplayRole } from "@/lib/access";

const roleBadge = (role: string) => {
  if (role === "ADMIN") return "bg-red-500/20 text-red-200 ring-1 ring-red-400/30";
  if (role === "STAFF") return "bg-blue-500/20 text-blue-200 ring-1 ring-blue-400/30";
  if (role === "VIP") return "bg-yellow-500/20 text-yellow-100 ring-1 ring-yellow-400/30";
  return "bg-white/10 text-white/70 ring-1 ring-white/20";
};

export default async function MePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      minecraftNick: true,
      email: true,
      emailVerifiedAt: true,
      role: true,
      createdAt: true,
      tickets: {
        orderBy: { createdAt: "desc" },
        take: 3,
        select: { id: true, code: true, subject: true, status: true, createdAt: true },
      },
    },
  });

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-xl">/me</div>
          <div className="mt-2 text-sm text-white/70">Session validní, ale user v db nenalezen</div>
          <div className="mt-2 text-sm text-white/70">userId: {userId}</div>
        </div>
      </div>
    );
  }

  const nick = user.minecraftNick || "Unknown";
  const role = mcDisplayRole(String(user.role || "USER"), nick);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#1a1230]/90 via-[#11101f]/90 to-[#0d0c16]/90 p-6 shadow-dd backdrop-blur-xl">
        <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
          <div className="flex flex-col items-center">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
              <Image
                src={`https://visage.surgeplay.com/full/120/${encodeURIComponent(nick)}`}
                alt={`Minecraft skin ${nick}`}
                width={180}
                height={180}
                unoptimized
                className="drop-shadow-xl"
              />
            </div>
            <div className="mt-3 text-xl font-semibold">{nick}</div>
            <div className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${roleBadge(role)}`}>{role}</div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-dd-accent/80">Player Profile</p>
            <h1 className="mt-2 text-3xl font-semibold">Můj účet</h1>
            <p className="mt-2 text-sm text-dd-muted">Centrum tvého Minecraft web účtu a ticketů.</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <p className="text-xs text-dd-muted">E-mail</p>
                <p className="text-sm text-white mt-1 break-all">{user.email || "-"}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <p className="text-xs text-dd-muted">Ověření</p>
                <p className={`text-sm mt-1 ${user.emailVerifiedAt ? "text-emerald-300" : "text-red-300"}`}>
                  {user.emailVerifiedAt ? "Ověřeno" : "Neověřeno"}
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <p className="text-xs text-dd-muted">Člen od</p>
                <p className="text-sm text-white mt-1">{new Date(user.createdAt).toLocaleDateString("cs-CZ")}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                <p className="text-xs text-dd-muted">Rychlé akce</p>
                <div className="mt-1 flex gap-2">
                  <Link href="/tickets" className="rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15">Tickety</Link>
                  <Link href="/status" className="rounded-lg bg-white/10 px-2 py-1 text-xs hover:bg-white/15">Status</Link>
                </div>
              </div>
            </div>

            <form action="/api/auth/logout?next=/login" method="post" className="mt-5">
              <button type="submit" className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-2 text-sm text-red-200 hover:bg-red-500/20 transition-colors">
                Odhlásit se
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
        <h2 className="text-xl font-semibold">Poslední tickety</h2>
        <div className="mt-4 space-y-2">
          {user.tickets.length === 0 ? (
            <p className="text-sm text-dd-muted">Zatím nemáš žádný ticket.</p>
          ) : (
            user.tickets.map((t) => (
              <Link key={t.id} href={`/tickets/${t.id}`} className="block rounded-xl border border-white/10 bg-black/25 px-4 py-3 hover:border-dd-accent/50 transition-colors">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm">{t.subject}</p>
                  <span className="text-xs text-dd-muted">{t.status}</span>
                </div>
                <p className="mt-1 text-xs text-dd-muted">#{t.code} · {new Date(t.createdAt).toLocaleString("cs-CZ")}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
