import { Card } from "@/components/ui/card";
import Image from "next/image";

type Member = { name: string; role: string; discord: string; avatar: string };

type Team = {
  title: string;
  members: Member[];
};

const teams: Team[] = [
  {
    title: "Vedení serveru",
    members: [
      { name: "Domiprd", role: "Owner", discord: "@domiprdiik", avatar: "Domiprd" },
      { name: "LukasRandom", role: "Admin", discord: "@cocacolaguy", avatar: "Steve" },
      { name: "AllwEx_99", role: "Co-Owner", discord: "@allw3x", avatar: "38306024-e641-4371-80b7-8fdd10c7a6db" }
    ]
  },
  {
    title: "Helper tým",
    members: [
      { name: "Helper1", role: "Helper", discord: "@helper1", avatar: "Alex" },
      { name: "Helper2", role: "Helper", discord: "@helper2", avatar: "Alex" },
      { name: "Helper3", role: "Helper", discord: "@helper3", avatar: "Alex" }
    ]
  },
  {
    title: "Builder tým",
    members: [
      { name: "Builder1", role: "Builder", discord: "@builder1", avatar: "Alex" },
      { name: "Builder2", role: "Builder", discord: "@builder2", avatar: "Alex" }
    ]
  },
  {
    title: "Developer tým",
    members: [
      { name: "Dev1", role: "Developer", discord: "@dev1", avatar: "Alex" },
      { name: "Dev2", role: "Developer", discord: "@dev2", avatar: "Alex" }
    ]
  },
  {
    title: "Eventer tým",
    members: [
      { name: "Eventer1", role: "Eventer", discord: "@eventer1", avatar: "Alex" },
      { name: "Eventer2", role: "Eventer", discord: "@eventer2", avatar: "Alex" }
    ]
  },
  {
    title: "Technik tým",
    members: [
      { name: "Tech1", role: "Technician", discord: "@tech1", avatar: "Alex" },
      { name: "Tech2", role: "Technician", discord: "@tech2", avatar: "Alex" }
    ]
  },
  {
    title: "Youtuber tým",
    members: [
      { name: "Youtuber1", role: "Youtuber", discord: "@youtuber1", avatar: "Alex" }
    ]
  }
];

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
    : role === "Youtuber"
    ? "text-yellow-300"
    : "text-dd-muted";

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
    : role === "Youtuber"
    ? "hover:shadow-yellow-400/40"
    : "";

function TeamSection({ title, members }: Team) {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-semibold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {members.map((m) => (
          <Card
            key={`${title}-${m.name}`}
            className={`flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${getRoleGlow(
              m.role
            )}`}
          >
            <div className="flex flex-col gap-1">
              <p className="text-lg font-semibold">{m.name}</p>
              <p className={`text-sm font-semibold ${getRoleColor(m.role)}`}>{m.role}</p>
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
    </section>
  );
}

export default function StaffPage() {
  return (
    <div className="space-y-8">
      {teams.map((team) => (
        <TeamSection key={team.title} {...team} />
      ))}
    </div>
  );
}
