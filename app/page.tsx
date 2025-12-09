import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIp } from "@/components/copy-ip";
//import { ServerStatus } from "@/components/server-status";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid gap-8 md:grid-cols-2 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Welcome to DarkDowN
        </h1>
        <p className="text-dd-muted text-sm md:text-base">
          Premium purple survival experience. Tickets, bans, VIP and
          support fully integrated with your Minecraft account and
          Discord login.
        </p>
        <div className="flex flex-wrap gap-3">
          <CopyIp />
          <Link href="/play">
            <Button variant="ghost">How to join</Button>
          </Link>
        </div>
         {/* <ServerStatus/>*/}
      </div>
      <Card className="h-full flex flex-col justify-between">
        <div className="space-y-3">
          <p className="text-sm text-dd-muted uppercase tracking-wide">
            Quick actions
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/tickets">
              <div className="cursor-pointer rounded-2xl bg-black/30 border border-white/5 p-4 hover:border-dd-accent/60 transition-colors">
                <p className="font-medium">Create ticket</p>
                <p className="text-xs text-dd-muted">
                  Technical issues, VIP problems, bug reports
                </p>
              </div>
            </Link>
            <Link href="/appeals">
              <div className="cursor-pointer rounded-2xl bg-black/30 border border-white/5 p-4 hover:border-dd-accent/60 transition-colors">
                <p className="font-medium">Ban appeal</p>
                <p className="text-xs text-dd-muted">
                  Appeal your punishment
                </p>
              </div>
            </Link>
            <Link href="/store">
              <div className="cursor-pointer rounded-2xl bg-black/30 border border-white/5 p-4 hover:border-dd-accent/60 transition-colors">
                <p className="font-medium">Store</p>
                <p className="text-xs text-dd-muted">
                  Coming soon, fully integrated Stripe store
                </p>
              </div>
            </Link>
            <Link href="/map">
              <div className="cursor-pointer rounded-2xl bg-black/30 border border-white/5 p-4 hover:border-dd-accent/60 transition-colors">
                <p className="font-medium">Online map</p>
                <p className="text-xs text-dd-muted">
                  Explore the world via Dynmap
                </p>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
