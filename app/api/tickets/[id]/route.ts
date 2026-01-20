import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ticketUpdateSchema } from "@/lib/validation";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = (session.user as any).id as string;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: {
      messages: { include: { author: true } },
      snapshot: true
    }
  });

  if (!ticket) return new NextResponse("Not found", { status: 404 });

  if (ticket.authorId !== userId) {
    const role = (session.user as any).role as string;
    if (role !== "ADMIN" && role !== "STAFF") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.json(ticket);
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const role = (session.user as any).role as string;
  if (role !== "ADMIN" && role !== "STAFF") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const json = await req.json();
  const parsed = ticketUpdateSchema.safeParse(json);
  if (!parsed.success) {
    return new NextResponse(parsed.error.message, { status: 400 });
  }

  const ticket = await prisma.ticket.update({
    where: { id },
    data: parsed.data
  });

  return NextResponse.json(ticket);
}
