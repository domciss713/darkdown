import type { Session } from "next-auth";

export type AppRole = "USER" | "STAFF" | "ADMIN";

export function getRole(session: Session | null): AppRole {
  const r = (session?.user as any)?.role;
  if (r === "ADMIN" || r === "STAFF" || r === "USER") return r;
  return "USER";
}

export function hasRole(session: Session | null, role: AppRole): boolean {
  const current = getRole(session);

  if (role === "USER") return true;
  if (role === "STAFF") return current === "STAFF" || current === "ADMIN";
  return current === "ADMIN";
}

export function requireStaff(session: Session | null): boolean {
  return hasRole(session, "STAFF");
}

export function requireAdmin(session: Session | null): boolean {
  return hasRole(session, "ADMIN");
}
