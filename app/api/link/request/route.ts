import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inMemoryCodes = new Map<
  string,
  { userId: string; created: number }
>();

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId = (session.user as any).id as string;
  const code = generateCode();
  inMemoryCodes.set(code, { userId, created: Date.now() });
  return NextResponse.json({ code });
}

/* Helper for plugin claim route */
export function resolveCode(code: string) {
  const record = inMemoryCodes.get(code);
  if (!record) return null;
  if (Date.now() - record.created > 10 * 60_000) {
    inMemoryCodes.delete(code);
    return null;
  }
  inMemoryCodes.delete(code);
  return record.userId;
}
