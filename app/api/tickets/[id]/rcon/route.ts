import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { rconSchema } from "@/lib/validation";
import { sendRconCommand } from "@/lib/rcon";
import { isHelperUser } from "@/lib/access";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const role = (session.user as any).role as string;
  const userId = (session.user as any).id as string;
  if (!isHelperUser(userId, role)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const json = await req.json();
  const parsed = rconSchema.safeParse(json);
  if (!parsed.success) {
    return new NextResponse(parsed.error.message, { status: 400 });
  }

  const result = await sendRconCommand(parsed.data.command);
  return NextResponse.json({ result });
}
