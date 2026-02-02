import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const BodySchema = z.object({
  identifier: z.string().min(3).max(254),
  password: z.string().min(1).max(72),
});

export async function POST(req: Request) {
  try {
    const { identifier, password } = BodySchema.parse(await req.json());
    const id = identifier.toLowerCase().trim();

    const user = await prisma.user.findFirst({
      where: id.includes("@") ? { email: id } : { minecraftName: id },
      select: { id: true, passwordHash: true, emailVerifiedAt: true },
    });

    if (!user) {
      return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
    }

    // volitelny: vynutit verify email pred loginem
    if (!user.emailVerifiedAt) {
      return NextResponse.json({ ok: false, error: "email_not_verified" }, { status: 403 });
    }

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      return NextResponse.json({ ok: false, error: "server_misconfig" }, { status: 500 });
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" });

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
