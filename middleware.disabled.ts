import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { rateLimit } from "@/lib/rate-limit";

const protectedPrefixes = ["/tickets", "/me", "/admin", "/api/tickets", "/api/admin", "/api/link"];

export async function middleware(req: NextRequest) {
  const ip =
    req.ip ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const ok = rateLimit(`ip:${ip}`);
  if (!ok) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  const url = req.nextUrl.pathname;
  const needsAuth = protectedPrefixes.some((p) =>
    url === p || url.startsWith(p + "/")
  );

  if (!needsAuth) return NextResponse.next();

  const token = await getToken({ req });
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (url.startsWith("/admin")) {
    const role = token.role as string | undefined;
    if (role !== "ADMIN" && role !== "STAFF") {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
