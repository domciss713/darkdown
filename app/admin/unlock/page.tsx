import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminUnlockPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?next=/admin/unlock");

  const role = (session.user as any).role as string;
  if (role !== "ADMIN" && role !== "STAFF") redirect("/");

  const params = searchParams ? await searchParams : undefined;
  const badToken = params?.error === "invalid_token";

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-white/10 bg-white/5 p-6">
      <h1 className="text-2xl font-semibold">Admin unlock</h1>
      <p className="mt-2 text-sm text-white/70">
        Pro vstup do /admin zadej extra admin token (proměnná <code>ADMIN_ACCESS_TOKEN</code>).
      </p>

      {badToken ? (
        <div className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          Neplatný admin token.
        </div>
      ) : null}

      <form action="/api/admin/unlock" method="post" className="mt-4 space-y-3">
        <input
          name="token"
          type="password"
          required
          className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-white outline-none focus:border-white/25"
          placeholder="Admin access token"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600/80 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
        >
          Odemknout admin
        </button>
      </form>
    </div>
  );
}
