import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await ctx.params;

  // dynamic imports -> kdyby nejakej z nich padal pri build-importu, tak se to odlozi az na runtime
  const [{ prisma }, { getAttachmentStream }] = await Promise.all([
    import("@/lib/prisma"),
    import("@/lib/storage"),
  ]);

  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;

  const attachment = await prisma.attachment.findUnique({
    where: { id },
    include: { ticket: true },
  });

  if (!attachment) return new NextResponse("Not found", { status: 404 });

  if (attachment.ticket.authorId !== userId) {
    if (role !== "ADMIN" && role !== "STAFF") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  const { stream, contentType } = await getAttachmentStream(attachment.storageKey);

  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      "Content-Type": contentType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${attachment.name}"`,
    },
  });
}
