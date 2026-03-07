import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isAdminUser } from "@/lib/access";
import { removeTeamMember } from "@/lib/team";

export async function POST(req: Request) {
  const url = new URL(req.url);
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  if (!isAdminUser(userId, role)) return new NextResponse("Forbidden", { status: 403 });

  const form = await req.formData();
  const id = String(form.get("id") || "");
  if (!id) return new NextResponse("Missing id", { status: 400 });

  await removeTeamMember(id);

  const target = url.searchParams.get("next") || "/team";
  return NextResponse.redirect(new URL(target, url.origin), { status: 303 });
}
