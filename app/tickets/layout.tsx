import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function TicketsLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get("session")?.value;
  if (!token) redirect("/login?next=/tickets");
  return <>{children}</>;
}
