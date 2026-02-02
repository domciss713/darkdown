import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { makeRawToken, hashToken, expiresInMinutes } from "@/lib/tokens";
import { sendResetEmail } from "@/lib/mailer";

const BodySchema = z.object({
  identifier: z.string().min(3).max(254),
});

export async function POST(req: Request) {
  try {
    const { identifier } = BodySchema.parse(await req.json());
    const id = identifier.toLowerCase().trim();

    const user = await prisma.user.findFirst({
      where: id.includes("@") ? { email: id } : { minecraftNick: id },
      select: { id: true, email: true },
    });

    // vzdy stejna odpoved (aby neslo enumerovat ucty)
    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const raw = makeRawToken();
    const tokenHash = hashToken(raw);

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: expiresInMinutes(30),
      },
    });

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password?token=${raw}`;

    await sendResetEmail(user.email, resetUrl);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
