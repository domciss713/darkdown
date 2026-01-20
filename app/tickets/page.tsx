import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { TicketForm } from "./ticket-form";

async function getTickets(userId: string) {
  return prisma.ticket.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" }
  });
}

type Tickets = Awaited<ReturnType<typeof getTickets>>;
type TicketItem = Tickets[number];

export default async function TicketsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as any).id as string;
  const tickets: TicketItem[] = await getTickets(userId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">My tickets</h1>
      <div className="grid gap-6 md:grid-cols-[2fr,1.5fr]">
        <Card>
          <h2 className="text-xl font-semibold mb-3">Existing tickets</h2>
          {tickets.length === 0 ? (
            <p className="text-sm text-dd-muted">
              You have not created any tickets yet.
            </p>
          ) : (
            <div className="space-y-3">
              {tickets.map((t: TicketItem) => (
                <Link key={t.id} href={`/tickets/${t.id}`}>
                  <div className="rounded-xl border border-white/10 bg-black/30 p-3 hover:border-dd-accent/60 transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{t.subject}</p>
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
                    <p className="text-xs text-dd-muted mt-1">
                      {t.category} · code {t.code}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-3">New ticket</h2>
          <TicketForm />
        </Card>
      </div>
    </div>
  );
}
