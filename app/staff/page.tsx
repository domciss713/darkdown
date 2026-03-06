import { Card } from "@/components/ui/card";
import Image from "next/image";

type Member = { name: string; role: string; discord: string; avatar: string; summary?: string };

const leadership: Member[] = [
  { name: "Domiprd", role: "Owner", discord: "@domiprdiik", avatar: "Domiprd", summary: "Produkt, směr projektu, finální rozhodnutí." },
  { name: "LukasRandom", role: "Admin", discord: "@cocacolaguy", avatar: "Steve", summary: "Provoz serveru, dohled nad podporou." },
  { name: "AllwEx_99", role: "Co-Owner", discord: "@allw3x", avatar: "38306024-e641-4371-80b7-8fdd10c7a6db", summary: "Spoluřízení komunity a eventů." }
];

const helpers: Member[] = [];
const builders: Member[] = [];
const developers: Member[] = [];
const eventers: Member[] = [];
const technicians: Member[] = [];
const creators: Member[] = [];

const getRoleColor = (role: string) =>
  role === "Owner"
    ? "text-purple-400"
    : role === "Co-Owner"
    ? "text-fuchsia-400"
    : role === "Admin"
    ? "text-red-400"
    : role === "Helper"
    ? "text-emerald-400"
    : role === "Builder"
    ? "text-amber-400"
    : role === "Developer"
    ? "text-sky-400"
    : role === "Eventer"
    ? "text-pink-400"
    : role === "Technician"
    ? "text-cyan-400"
    : "text-yellow-300";

const getRoleGlow = (role: string) =>
  role === "Owner"
    ? "hover:shadow-purple-500/40"
    : role === "Co-Owner"
    ? "hover:shadow-fuchsia-500/40"
    : role === "Admin"
    ? "hover:shadow-red-500/40"
    : role === "Helper"
    ? "hover:shadow-emerald-500/40"
    : role === "Builder"
    ? "hover:shadow-amber-500/40"
    : role === "Developer"
    ? "hover:shadow-sky-500/40"
    : role === "Eventer"
    ? "hover:shadow-pink-500/40"
    : role === "Technician"
    ? "hover:shadow-cyan-500/40"
    : "hover:shadow-yellow-400/40";

function TeamSection({ title, members, openRole }: { title: string; members: Member[]; openRole: string }) {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">{title}</h2>
      {members.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-3">
          {members.map((m) => (
            <Card
              key={`${title}-${m.name}`}
              className={`flex items-center justify-between p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${getRoleGlow(m.role)}`}
            >
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">{m.name}</p>
                <p className={`text-sm font-semibold ${getRoleColor(m.role)}`}>{m.role}</p>
                {m.summary ? <p className="mt-1 text-xs text-dd-muted">{m.summary}</p> : null}
                <p className="mt-2 text-xs text-dd-muted">Discord {m.discord}</p>
              </div>
              <div className="ml-4">
                <Image
                  src={`https://visage.surgeplay.com/bust/100/${m.avatar}`}
                  alt={`Minecraft skin ${m.name}`}
                  width={100}
                  height={100}
                  unoptimized
                />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6">
          <p className={`text-sm font-semibold ${getRoleColor(openRole)}`}>Hledáme nové členy: {openRole}</p>
          <p className="mt-2 text-sm text-dd-muted">
            Tato pozice je aktuálně otevřená. Pokud chceš pomoci projektu DarkDowN, napiš ticket nebo kontaktuj vedení na Discordu.
          </p>
        </Card>
      )}
    </section>
  );
}

export default function StaffPage() {
  return (
    <div className="space-y-8">
      <TeamSection title="Vedení serveru" members={leadership} openRole="Leadership" />
      <TeamSection title="Helper tým" members={helpers} openRole="Helper" />
      <TeamSection title="Builder tým" members={builders} openRole="Builder" />
      <TeamSection title="Developer tým" members={developers} openRole="Developer" />
      <TeamSection title="Event tým" members={eventers} openRole="Eventer" />
      <TeamSection title="Technický tým" members={technicians} openRole="Technician" />
      <TeamSection title="Tvůrci" members={creators} openRole="Youtuber / Creator" />
    </div>
  );
}
