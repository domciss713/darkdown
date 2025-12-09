import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAttachmentStream } from "@/lib/storage";

export async function GET(
  _req: Request,
  ctx: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;

  const attachment = await prisma.attachment.findUnique({
    where: { id: ctx.params.id },
    include: { ticket: true }
  });
  if (!attachment) return new NextResponse("Not found", { status: 404 });

  if (attachment.ticket.authorId !== userId) {
    if (role !== "ADMIN" && role !== "STAFF") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const { stream, contentType } = await getAttachmentStream(
    attachment.storageKey
  );

  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      "Content-Type": contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${attachment.name}"`
    }
  });
}
