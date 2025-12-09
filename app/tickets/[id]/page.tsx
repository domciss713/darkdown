import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TicketReplyForm } from "./reply-form";

async function getTicket(id: string, userId: string) {
  const t = await prisma.ticket.findUnique({
    where: { id },
    include: {
      author: true,
      messages: {
        include: { author: true },
        orderBy: { createdAt: "asc" }
      },
      snapshot: true
    }
  });
  if (!t) return null;
  if (t.authorId !== userId) return null;
  return t;
}

export default async function TicketDetailPage({
  params
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  const userId = (session.user as any).id as string;
  const ticket = await getTicket(params.id, userId);
  if (!ticket) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{ticket.subject}</h1>
          <p className="text-xs text-dd-muted">
            Code {ticket.code} · {ticket.category}
          </p>
        </div>
        <Badge
          color={
            ticket.status === "open"
              ? "green"
              : ticket.status === "waiting"
              ? "yellow"
              : "red"
          }
        >
          {ticket.status}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-[2fr,1.3fr]">
        <Card>
          <h2 className="text-sm font-semibold mb-2">Thread</h2>
          <div className="space-y-3 text-sm">
            {ticket.messages.map((m) => (
              <div
                key={m.id}
                className="rounded-xl bg-black/30 border border-white/5 p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">
                    {m.author.name ?? m.author.email ?? "User"}
                  </span>
                  <span className="text-xs text-dd-muted">
                    {m.createdAt.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{m.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <TicketReplyForm ticketId={ticket.id} />
          </div>
        </Card>
        <Card>
          <h2 className="text-sm font-semibold mb-2">Server snapshot</h2>
          {ticket.snapshot ? (
            <div className="text-sm text-dd-muted space-y-1">
              <p>
                Taken at {ticket.snapshot.takenAt.toLocaleString()}
              </p>
              <p>
                Online {ticket.snapshot.online ? "yes" : "no"} · players{" "}
                {ticket.snapshot.players}
              </p>
              {ticket.snapshot.list && (
                <p className="text-xs">
                  Players {ticket.snapshot.list}
                </p>
              )}
              {typeof ticket.snapshot.tps === "number" && (
                <p className="text-xs">TPS {ticket.snapshot.tps}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-dd-muted">
              No snapshot recorded for this ticket.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
