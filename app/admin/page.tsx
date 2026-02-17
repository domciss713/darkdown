import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cookies } from "next/headers";

async function getAllTickets() {
  return prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true }
  });
}

type Tickets = Awaited<ReturnType<typeof getAllTickets>>;
type TicketWithAuthor = Tickets[number];

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?next=/admin");

  const role = (session.user as any).role as string;
  if (role !== "ADMIN" && role !== "STAFF") {
    redirect("/");
  }

  const expectedToken = process.env.ADMIN_ACCESS_TOKEN;
  if (!expectedToken) {
    return (
      <div className="rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-red-200">
        Missing ADMIN_ACCESS_TOKEN in environment.
      </div>
    );
  }

  const adminCookie = (await cookies()).get("admin_access")?.value;
  if (adminCookie !== expectedToken) {
    redirect("/admin/unlock");
  }

  const tickets: TicketWithAuthor[] = await getAllTickets();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Admin tickets</h1>
      <Card>
        <div className="space-y-2 text-sm">
          {tickets.map((t) => (
            <Link key={t.id} href={`/tickets/${t.id}`}>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-3 hover:border-dd-accent/60 transition-colors">
                <div>
                  <p className="font-medium">{t.subject}</p>
                  <p className="text-xs text-dd-muted">
                    {t.category} · {t.author.name ?? t.author.email}
                  </p>
                </div>
                <Badge
                  color={
                    t.status === "open"
                      ? "green"
                      : t.status === "waiting"
                      ? "yellow"
                      : "red"
                  }
                >
                  {t.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
