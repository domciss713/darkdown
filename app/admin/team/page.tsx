import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminUser } from "@/lib/access";
import { Card } from "@/components/ui/card";

export default async function AdminTeamPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const userId = (session.user as any).id as string;
  const role = (session.user as any).role as string;
  if (!isAdminUser(userId, role)) redirect("/");

  const staff = await prisma.user.findMany({
    where: { role: { in: ["STAFF", "ADMIN"] } },
    select: { id: true, minecraftNick: true, email: true, role: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Správa helper týmu</h1>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Přidat helpera</h2>
        <form action="/api/admin/team" method="post" className="grid gap-3 md:grid-cols-3">
          <input name="minecraftNick" placeholder="MC nick" className="rounded-xl border border-white/15 bg-black/25 px-3 py-2" />
          <input name="email" placeholder="email" className="rounded-xl border border-white/15 bg-black/25 px-3 py-2" />
          <button className="rounded-xl bg-emerald-600/80 px-4 py-2 text-sm font-semibold">Přidat jako STAFF</button>
        </form>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold">Aktuální tým</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-dd-muted">
                <th className="pb-2">Nick</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Akce</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((u) => (
                <tr key={u.id} className="border-t border-white/10">
                  <td className="py-2">{u.minecraftNick}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2">{u.role}</td>
                  <td className="py-2">
                    {u.role === "ADMIN" ? (
                      <span className="text-xs text-dd-muted">admin nelze odebrat tady</span>
                    ) : (
                      <form action="/api/admin/team/remove" method="post">
                        <input type="hidden" name="id" value={u.id} />
                        <button className="rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-1 text-red-200">Odebrat</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
