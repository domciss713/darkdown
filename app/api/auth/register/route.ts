import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { makeRawToken, hashToken, expiresInMinutes } from "@/lib/tokens";
import { sendVerifyEmail } from "@/lib/mailer";

const BodySchema = z.object({
  username: z
    .string()
    .min(3)
    .max(24)
    .regex(/^[a-zA-Z0-9_]+$/, "bad_username"),
  email: z.string().email().max(254),
  password: z.string().min(8).max(72),
});

export async function POST(req: Request) {
  try {
    const data = BodySchema.parse(await req.json());

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ username: data.username.toLowerCase() }, { email: data.email.toLowerCase() }],
      },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json({ ok: false, error: "account_exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        username: data.username.toLowerCase(),
        email: data.email.toLowerCase(),
        passwordHash,
      },
      select: { id: true, email: true },
    });

    const raw = makeRawToken();
    const tokenHash = hashToken(raw);

    await prisma.emailVerifyToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: expiresInMinutes(60),
      },
    });

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const verifyUrl = `${appUrl}/verify-email?token=${raw}`;

    await sendVerifyEmail(user.email, verifyUrl);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
