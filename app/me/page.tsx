export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mcDisplayRole } from "@/lib/access";

const roleBadge = (role: string) => {
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
    select: { minecraftNick: true, email: true, emailVerifiedAt: true, role: true }
  });

  if (!user) redirect("/login");

  const nick = user.minecraftNick || "Unknown";
  const role = mcDisplayRole(String(user.role || "USER"), nick);

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <h1 className="text-center text-3xl font-semibold">Můj účet</h1>

      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
        <div className="dd-glass flex flex-col items-center gap-3 p-5">
          <Image
            src={`https://visage.surgeplay.com/full/120/${encodeURIComponent(nick)}`}
            alt={`Minecraft skin ${nick}`}
            width={180}
            height={180}
            unoptimized
            className="drop-shadow-xl"
          />
          <p className="text-lg font-semibold">{nick}</p>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${roleBadge(role)}`}>{role}</span>
        </div>

        <div className="dd-glass p-6">
          <h2 className="mb-4 text-lg font-semibold">Profil</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-xl bg-black/25 px-4 py-3">
              <span className="text-white/70">E-mail</span>
              <span>{user.email}</span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-black/25 px-4 py-3">
              <span className="text-white/70">Ověření e-mailu</span>
              <span className={user.emailVerifiedAt ? "text-emerald-300" : "text-red-300"}>
                {user.emailVerifiedAt ? "Ověřeno" : "Neověřeno"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-black/25 px-4 py-3">
              <span className="text-white/70">Role na webu</span>
              <span>{role}</span>
            </div>
          </div>

          <form action="/api/auth/logout?next=/login" method="post" className="mt-6">
            <button
              type="submit"
              className="rounded-xl border border-red-400/25 bg-red-500/10 px-4 py-2 text-sm text-red-200 hover:bg-red-500/20 transition-colors"
            >
              Odhlásit se
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
