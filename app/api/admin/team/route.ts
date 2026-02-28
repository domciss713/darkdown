import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAdminUser } from "@/lib/access";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  if (!isAdminUser(userId, role)) return new NextResponse("Forbidden", { status: 403 });

  const users = await prisma.user.findMany({
    where: { role: { in: ["STAFF", "ADMIN"] } },
    select: { id: true, minecraftNick: true, email: true, role: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  if (!isAdminUser(userId, role)) return new NextResponse("Forbidden", { status: 403 });

  const form = await req.formData();
  const email = String(form.get("email") || "").toLowerCase().trim();
  const minecraftNick = String(form.get("minecraftNick") || "").toLowerCase().trim();

  if (!email && !minecraftNick) return new NextResponse("Missing identifier", { status: 400 });

  await prisma.user.updateMany({
    where: email ? { email } : { minecraftNick },
    data: { role: "STAFF" }
  });

  const target = url.searchParams.get("next") || "/admin/team";
  return NextResponse.redirect(new URL(target, url.origin), { status: 303 });
}
