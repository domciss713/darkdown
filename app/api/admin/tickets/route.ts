import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const role = (session.user as any).role as string;
  if (role !== "ADMIN" && role !== "STAFF") {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true }
  });

  return NextResponse.json(tickets);
}
