import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login?next=/admin", req.url));
  }

  const role = (session.user as any).role as string;
  if (role !== "ADMIN" && role !== "STAFF") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const formData = await req.formData();
  const token = String(formData.get("token") ?? "").trim();
  const expected = process.env.ADMIN_ACCESS_TOKEN;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "admin_token_not_configured" },
      { status: 500 }
    );
  }

  if (token !== expected) {
    return NextResponse.redirect(new URL("/admin/unlock?error=invalid_token", req.url));
  }

  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set("admin_access", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return res;
}
