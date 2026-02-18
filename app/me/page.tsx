export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mcDisplayRole } from "@/lib/access";

const roleBadge = (role: string) => {
  if (role === "OWNER") return "bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/30";
  if (role === "ADMIN") return "bg-red-500/15 text-red-300 ring-1 ring-red-400/30";
  if (role === "VIP") return "bg-yellow-500/15 text-yellow-200 ring-1 ring-yellow-400/30";
  return "bg-white/10 text-white/70 ring-1 ring-white/15";
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
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 text-center text-4xl font-semibold">Můj účet</div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Image
              src={`https://visage.surgeplay.com/full/120/${encodeURIComponent(nick)}`}
              alt={`Minecraft skin ${nick}`}
              width={220}
              height={220}
              unoptimized
              className="drop-shadow-xl"
            />
          </div>

          <div className="text-xl font-semibold">{nick}</div>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${roleBadge(role)}`}>
            {role}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-3 text-xl font-semibold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">i</span>
            Informace:
          </div>

          <div className="mt-5 grid gap-3 text-sm text-white/80">
            <div className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3">
              <div>E-mail</div>
              <div className="text-white">{user.email || "-"}</div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3">
              <div>Ověřeno</div>
              <div className={user.emailVerifiedAt ? "text-emerald-300" : "text-red-300"}>
                {user.emailVerifiedAt ? "ano" : "ne"}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3">
              <div>Role</div>
              <div className="text-white">{role}</div>
            </div>
          </div>

          <div className="mt-6">
            <form action="/api/auth/logout?next=/login" method="post">
              <button type="submit">odhlasit</button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Změna e-mailu:</div>

          <form action="/api/account/change-email" method="post" className="mt-4 space-y-3">
            <div>
              <div className="mb-1 text-sm text-white/70">Nová e-mailová adresa:</div>
              <input
                name="newEmail"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-white/25"
                placeholder="nova@email.cz"
              />
            </div>

            <div>
              <div className="mb-1 text-sm text-white/70">Aktuální heslo:</div>
              <input
                name="password"
                type="password"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-white/25"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-blue-600/80 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
            >
              Změnit e-mail
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold">Změna hesla:</div>

          <form action="/api/account/change-password" method="post" className="mt-4 space-y-3">
            <div>
              <div className="mb-1 text-sm text-white/70">Aktuální heslo:</div>
              <input
                name="currentPassword"
                type="password"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-white/25"
                placeholder="********"
              />
            </div>

            <div>
              <div className="mb-1 text-sm text-white/70">Nové heslo:</div>
              <input
                name="newPassword"
                type="password"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-white/25"
                placeholder="********"
              />
            </div>

            <div>
              <div className="mb-1 text-sm text-white/70">Nové heslo znovu:</div>
              <input
                name="newPassword2"
                type="password"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-white/25"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-blue-600/80 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
            >
              Změnit heslo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
