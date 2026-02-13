import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const next = url.searchParams.get("next");
  const target = next && next.startsWith("/") ? next : "/login";

  const res = NextResponse.redirect(new URL(target, url.origin));

  res.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    domain: process.env.NODE_ENV === "production" ? ".darkdown.xyz" : undefined,
  });

  return res;
}
