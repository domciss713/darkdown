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
          Vítejte na serveru DarkDowN
        </h1>
        <p className="text-dd-muted text-sm md:text-base">
          Prémiové zážitky ze survivalu. Pojďte si s námi užít nové techniky a příběhy
          v Minecraftu. Užijte si jedinečný herní svět s naší skvělou komunitou.
          Máme k dispozici aktivní tým podpory, který vám pomůže s čímkoliv budete potřebovat.
          Můžete se těšit na časté updaty, nové eventy a funkce.
          Zakoupením jakéhokoliv VIP získáte výhody a podpoříte vývoj serveru.
        </p>
        <div className="flex flex-wrap gap-3">
          <CopyIp />
          <Link href="/play">
            <Button variant="ghost">Jak se připojit</Button>
          </Link>
        </div>
         {/* <ServerStatus/>*/}
      </div>
      <Card className="h-full flex flex-col justify-between">
        <div className="space-y-3">
          <p className="text-sm text-dd-muted uppercase tracking-wide">
            Rychlé akce
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <Link href="/tickets">
              <div className="cursor-pointer rounded-2xl bg-black/30 border border-white/5 p-4 hover:border-dd-accent/60 transition-colors">
                <p className="font-medium">Vytvořit ticket</p>
                <p className="text-xs text-dd-muted">
                  Jakékoliv problémy či dotazy, reporty, návrhy
                </p>
              </div>
            </Link>
            <Link href="/appeals">
              <div className="cursor-pointer rounded-2xl bg-black/30 border border-white/5 p-4 hover:border-dd-accent/60 transition-colors">
                <p className="font-medium">Žádost o unban</p>
                <p className="text-xs text-dd-muted">
                  Nespravedlivý ban? Požádej o jeho zrušení
                </p>
              </div>
            </Link>
            <Link href="/store">
              <div className="cursor-pointer rounded-2xl bg-black/30 border border-white/5 p-4 hover:border-dd-accent/60 transition-colors">
                <p className="font-medium">Obchod</p>
                <p className="text-xs text-dd-muted">
                  Již brzy, plně integrovaný obchod přes Stripe
                </p>
              </div>
            </Link>
            <Link href="/map">
              <div className="cursor-pointer rounded-2xl bg-black/30 border border-white/5 p-4 hover:border-dd-accent/60 transition-colors">
                <p className="font-medium">Dynmapa</p>
                <p className="text-xs text-dd-muted">
                  Prozkoumej svět pomocí dynmapy
                </p>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
