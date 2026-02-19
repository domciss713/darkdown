import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { isHelperUser } from "@/lib/access";

async function getTicketQueue() {
  return prisma.ticket.findMany({
    where: { status: { in: ["open", "waiting"] } },
    orderBy: { updatedAt: "desc" },
    include: { author: true },
    take: 100,
  });
}

export default async function HelpersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  if (!isHelperUser(userId, role)) redirect("/");

  const queue = await getTicketQueue();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Helper dashboard</h1>
        <p className="text-sm text-dd-muted mt-1">
          Přihlášený helper/admin ID: <span className="text-dd-text">{userId}</span>
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold mb-3">Aktivní ticket fronta</h2>
        <div className="space-y-2 text-sm">
          {queue.length === 0 ? (
            <p className="text-dd-muted">Žádné otevřené tickety.</p>
          ) : (
            queue.map((t) => (
              <Link key={t.id} href={`/tickets/${t.id}`}>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3 hover:border-dd-accent/60 transition-colors">
                  <div>
                    <p className="font-medium">{t.subject}</p>
                    <p className="text-xs text-dd-muted">
                      #{t.code} · {t.author.minecraftNick} ({t.author.email})
                    </p>
                  </div>
                  <Badge color={t.status === "open" ? "green" : "yellow"}>{t.status}</Badge>
                </div>
              </Link>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
