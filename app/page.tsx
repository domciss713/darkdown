import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIp } from "@/components/copy-ip";
import Link from "next/link";

const primary = [
  { href: "/play", title: "Jak se připojit", desc: "Rychlý start na server během minuty" },
  { href: "/tickets", title: "Podpora / Tickety", desc: "Napiš ticket a dostaneš odpověď od týmu" },
  { href: "/status", title: "Status serveru", desc: "Zjisti online stav a hráče" },
  { href: "/me", title: "Můj účet", desc: "Profil, role a přehled účtu" }
];

const secondary = [
  { href: "/store", title: "Obchod" },
  { href: "/rules", title: "Pravidla" },
  { href: "/staff", title: "AT tým" },
  { href: "/map", title: "Dynmapa" },
  { href: "/news", title: "Novinky" },
  { href: "/leaderboard", title: "Leaderboard" }
];

export default function HomePage() {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">DarkDowN Minecraft server</h1>
        <p className="text-sm text-dd-muted md:text-base">
          Survival server s aktivní komunitou, ticket podporou a připravenou webovou administrací.
          Připojení, podpora i důležité informace máš na pár kliků.
        </p>
        <div className="flex flex-wrap gap-3">
          <CopyIp />
          <Link href="/play">
            <Button variant="ghost">Jak se připojit</Button>
          </Link>
          <Link href="/tickets">
            <Button variant="primary">Vytvořit ticket</Button>
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {primary.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="cursor-pointer border border-white/10 bg-black/30 p-4 transition-colors hover:border-dd-accent/60">
                <p className="font-medium">{item.title}</p>
                <p className="mt-1 text-xs text-dd-muted">{item.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <Card className="space-y-4">
        <h2 className="text-lg font-semibold">Další sekce webu</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {secondary.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-dd-muted transition-colors hover:border-dd-accent/60 hover:text-dd-text">
              {item.title}
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
