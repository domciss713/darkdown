import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const BodySchema = z.object({
  identifier: z.string().min(3).max(254),
  password: z.string().min(1).max(72),
  turnstileToken: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const { identifier, password, turnstileToken } = BodySchema.parse(await req.json());

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (!turnstileSecret) {
      return NextResponse.json({ ok: false, error: "server_misconfig_turnstile" }, { status: 500 });
    }

    // turnstile verify
    const form = new FormData();
    form.append("secret", turnstileSecret);
    form.append("response", turnstileToken);

    const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
      cache: "no-store",
    });

    const verifyData = (await verifyRes.json()) as { success: boolean };
    if (!verifyData?.success) {
      return NextResponse.json({ ok: false, error: "turnstile_failed" }, { status: 403 });
    }

    const id = identifier.toLowerCase().trim();

    const user = await prisma.user.findFirst({
      where: id.includes("@") ? { email: id } : { minecraftNick: id },
      select: { id: true, passwordHash: true, emailVerifiedAt: true },
    });

    if (!user) {
      return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ ok: false, error: "invalid_credentials" }, { status: 401 });
    }

    if (!user.emailVerifiedAt) {
      return NextResponse.json({ ok: false, error: "email_not_verified" }, { status: 403 });
    }

    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      return NextResponse.json({ ok: false, error: "server_misconfig" }, { status: 500 });
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" });

    const res = NextResponse.json({ ok: true });

    res.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res; // tohle je ta zasadni oprava
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
}
