import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ticketCreateSchema } from "@/lib/validation";
import { getQueryStatus } from "@/lib/query";

function generateCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = (session.user as any).id as string;
  const tickets = await prisma.ticket.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(tickets);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const json = await req.json();
  const parsed = ticketCreateSchema.safeParse(json);
  if (!parsed.success) {
    return new NextResponse(parsed.error.message, { status: 400 });
  }

  const snapshotStatus = await getQueryStatus();

  const userId = (session.user as any).id as string;
  const ticket = await prisma.ticket.create({
    data: {
      code: generateCode(),
      subject: parsed.data.subject,
      category: parsed.data.category,
      authorId: userId,
      messages: {
        create: {
          authorId: userId,
          body: parsed.data.body,
          byStaff: false
        }
      },
      snapshot: {
        create: {
          online: snapshotStatus.online,
          players: snapshotStatus.players,
          list: snapshotStatus.playerList.join(", "),
          tps: null,
          mspt: null
        }
      }
    }
  });

  return NextResponse.json(ticket, { status: 201 });
}
