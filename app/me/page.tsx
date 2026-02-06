export const dynamic = "force-dynamic";
export const revalidate = 0;

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function MePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) redirect("/login");

  const secret = process.env.AUTH_SECRET;
  if (!secret) redirect("/login");

  let userId: string;

  try {
    const payload = jwt.verify(token, secret) as { userId: string };
    userId = payload.userId;
  } catch {
    redirect("/login");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        minecraftNick: true,
        email: true,
        emailVerifiedAt: true,
        role: true,
      },
    });

    if (!user) {
      return (
        <div style={{ margin: 40 }}>
          <h1>/me</h1>
          <p>jwt ok, ale user v db nenalezen</p>
          <p>userId: {userId}</p>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: 700, margin: "40px auto" }}>
        <h1>me</h1>
        <p>nick: {user.minecraftNick}</p>
        <p>email: {user.email}</p>
        <p>overeno: {user.emailVerifiedAt ? "ano" : "ne"}</p>
        <p>role: {user.role}</p>
        <form action="/api/auth/logout" method="post">
          <button type="submit">odhlasit</button>
        </form>
      </div>
    );
  } catch (e: any) {
    return (
      <div style={{ margin: 40 }}>
        <h1>/me</h1>
        <p>jwt ok, ale db dotaz spadl</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>{String(e?.message || e)}</pre>
      </div>
    );
  }
}
