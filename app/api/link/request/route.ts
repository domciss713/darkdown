import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateCode, storeCode } from "@/lib/link-code";

export const dynamic = "force-dynamic";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const userId = (session.user as any).id as string;

  const code = generateCode();
  storeCode(code, userId);

  return NextResponse.json({ code });
}
