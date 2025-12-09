import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { linkClaimSchema } from "@/lib/validation";
import { resolveCode } from "../request/route";

export async function POST(req: Request) {
  const json = await req.json();
  const parsed = linkClaimSchema.safeParse(json);
  if (!parsed.success) {
    return new NextResponse(parsed.error.message, { status: 400 });
  }

  const userId = resolveCode(parsed.data.code);
  if (!userId) {
    return new NextResponse("Invalid or expired code", { status: 400 });
  }

  await prisma.playerLink.upsert({
    where: { userId },
    create: {
      userId,
      uuid: parsed.data.uuid,
      name: parsed.data.name
    },
    update: {
      uuid: parsed.data.uuid,
      name: parsed.data.name
    }
  });

  await prisma.user.update({
    where: { id: userId },
    data: { minecraftNick: parsed.data.name }
  });

  return NextResponse.json({ ok: true });
}
