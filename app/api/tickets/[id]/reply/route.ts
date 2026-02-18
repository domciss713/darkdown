import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ticketReplySchema } from "@/lib/validation";
import { getTicketStaffRecipientList, sendTicketReplyEmail } from "@/lib/mailer";
import { isHelperUser } from "@/lib/access";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const json = await req.json();
  const parsed = ticketReplySchema.safeParse(json);
  if (!parsed.success) {
    return new NextResponse(parsed.error.message, { status: 400 });
  }

  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;

  const ticket = await prisma.ticket.findUnique({
    where: { id },
    include: { author: { select: { email: true } } }
  });
  if (!ticket) return new NextResponse("Not found", { status: 404 });

  const isStaff = isHelperUser(userId, role);

  if (!isStaff && ticket.authorId !== userId) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const msg = await prisma.message.create({
    data: {
      ticketId: ticket.id,
      authorId: userId,
      body: parsed.data.body,
      byStaff: isStaff
    }
  });

  if (isStaff) {
    await sendTicketReplyEmail({
      to: ticket.author.email,
      ticketCode: ticket.code,
      ticketSubject: ticket.subject,
      byStaff: true,
    });
  } else {
    const recipients = getTicketStaffRecipientList();
    if (recipients.length > 0) {
      await sendTicketReplyEmail({
        to: recipients.join(","),
        ticketCode: ticket.code,
        ticketSubject: ticket.subject,
        byStaff: false,
      });
    }
  }

  return NextResponse.json(msg, { status: 201 });
}
