import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { playerLink: true }
  });
  return user;
}

export default async function MePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");
  const userId = (session.user as any).id as string;
  const user = await getProfile(userId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">My account</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold mb-2">Discord</h2>
          <p className="text-sm text-dd-muted">
            Logged in as {user?.name ?? session.user?.name}
          </p>
          <p className="text-xs text-dd-muted mt-2">
            Email {user?.email ?? session.user?.email ?? "not linked"}
          </p>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-2">Minecraft link</h2>
          {user?.playerLink ? (
            <div className="text-sm text-dd-muted">
              <p>Linked as {user.playerLink.name}</p>
              <p className="text-xs mt-1">UUID {user.playerLink.uuid}</p>
            </div>
          ) : (
            <div className="text-sm text-dd-muted space-y-2">
              <p>
                To link your Minecraft account, join the server and use
                the command
              </p>
              <code className="rounded bg-black/40 px-2 py-1 text-xs">
                /link
              </code>
              <p className="text-xs">
                Then open this page and enter the 6 character code
                shown in game.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
