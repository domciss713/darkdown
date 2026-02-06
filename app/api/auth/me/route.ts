import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return NextResponse.json({ ok: false }, { status: 401 });

  const secret = process.env.AUTH_SECRET;
  if (!secret) return NextResponse.json({ ok: false }, { status: 500 });

  try {
    jwt.verify(token, secret);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
