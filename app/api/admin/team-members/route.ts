import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminUser } from "@/lib/access";
import { TEAM_ROLES, listTeamMembers, upsertTeamMember } from "@/lib/team";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  if (!isAdminUser(userId, role)) return new NextResponse("Forbidden", { status: 403 });

  return NextResponse.json(await listTeamMembers());
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  if (!isAdminUser(userId, role)) return new NextResponse("Forbidden", { status: 403 });

  const form = await req.formData();
  const minecraftNick = String(form.get("minecraftNick") || "").trim();
  const email = String(form.get("email") || "").toLowerCase().trim();
  const discord = String(form.get("discord") || "").trim();
  const selectedRole = String(form.get("role") || "").trim();

  if (!minecraftNick || !TEAM_ROLES.includes(selectedRole as any)) {
    return new NextResponse("Invalid payload", { status: 400 });
  }

  await upsertTeamMember({
    minecraftNick,
    email: email || null,
    discord: discord || null,
    role: selectedRole as any,
  });

  const target = url.searchParams.get("next") || "/team";
  return NextResponse.redirect(new URL(target, url.origin), { status: 303 });
}
