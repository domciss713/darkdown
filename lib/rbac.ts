import { Role } from "@prisma/client";
import type { Session } from "next-auth";

export function hasRole(session: Session | null, role: Role): boolean {
  if (!session?.user) return false;
  const r = (session.user as any).role as Role | undefined;
  if (!r) return false;
  if (role === "USER") return true;
  if (role === "STAFF") return r === "STAFF" || r === "ADMIN";
  if (role === "ADMIN") return r === "ADMIN";
  return false;
}

export function requireRole(session: Session | null, role: Role) {
  if (!hasRole(session, role)) {
    const err: any = new Error("Forbidden");
    err.status = 403;
    throw err;
  }
}
