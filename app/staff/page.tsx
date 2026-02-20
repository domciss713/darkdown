import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const staff = [
  { name: "Domiprd", role: "Owner", discord: "@domiprdiik", avatar: "Domiprd" },
  { name: "LukasRandom", role: "Admin", discord: "@cocacolaguy", avatar: "Steve" },
  { name: "AllwEx_99", role: "Co-Owner", discord: "@allw3x", avatar: "38306024-e641-4371-80b7-8fdd10c7a6db" }
];

const helpers = [
  { name: "Helper1", role: "Helper", discord: "@helper1", avatar: "Alex" },
  { name: "Helper2", role: "Helper", discord: "@helper2", avatar: "Alex" },
  { name: "Helper3", role: "Helper", discord: "@helper3", avatar: "Alex" }
];

const builders = [
  { name: "Builder1", role: "Builder", discord: "@builder1", avatar: "Alex" },
  { name: "Builder2", role: "Builder", discord: "@builder2", avatar: "Alex" }
];

const developers = [
  { name: "Dev1", role: "Developer", discord: "@dev1", avatar: "Alex" },
  { name: "Dev2", role: "Developer", discord: "@dev2", avatar: "Alex" }
];

const eventers = [
  { name: "Eventer1", role: "Eventer", discord: "@eventer1", avatar: "Alex" },
  { name: "Eventer2", role: "Eventer", discord: "@eventer2", avatar: "Alex" }
];

const technicians = [
  { name: "Tech1", role: "Technician", discord: "@tech1", avatar: "Alex" },
  { name: "Tech2", role: "Technician", discord: "@tech2", avatar: "Alex" }
];

const youtubers = [
  { name: "Youtuber1", role: "Youtuber", discord: "@youtuber1", avatar: "Alex" }
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
    :"";


const roleBadge = (role: string) => {
  if (role === "OWNER") return "bg-purple-500/15 text-purple-300 ring-1 ring-purple-400/30";
  if (role === "ADMIN") return "bg-red-500/15 text-red-300 ring-1 ring-red-400/30";


export default function StaffPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Vedení serveru</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {staff.map((m) => (
          <Card 
            key={m.name}
            className={`flex items-center justify-between p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${getRoleGlow(
              m.role
            )}`}
          >
            <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{m.name}</p>
            <Card
              className={`text-sm font-bold ${getRoleColor(m.role)}`}>
                {m.role}
            </Card>

            <div className={`rounded-full px-3 py-1 text-xs font-semibold ${roleBadge(role)}`}>
            {role}
            </div>



            <p className="text-xs text-dd-muted mt-2">
               Discord {m.discord}
            </p>
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
      
      <h2 className="text-3xl font-semibold">Helper tým</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {helpers.map((m) => (
          <Card 
            key={m.name}
            className="flex items-center justify-between p-6"
          >
            <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{m.name}</p>
            <p className="text-sm text-dd-muted">{m.role}</p>
            <p className="text-xs text-dd-muted mt-2">
               Discord {m.discord}
            </p>
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

      <h2 className="text-3xl font-semibold">Builder tým</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {builders.map((m) => (
          <Card 
            key={m.name}
            className="flex items-center justify-between p-6"
          >
            <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{m.name}</p>
            <p className="text-sm text-dd-muted">{m.role}</p>
            <p className="text-xs text-dd-muted mt-2">
               Discord {m.discord}
            </p>
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

      <h2 className="text-3xl font-semibold">Developer tým</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {developers.map((m) => (
          <Card 
            key={m.name}
            className="flex items-center justify-between p-6"
          >
            <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{m.name}</p>
            <p className="text-sm text-dd-muted">{m.role}</p>
            <p className="text-xs text-dd-muted mt-2">
               Discord {m.discord}
            </p>
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

      <h2 className="text-3xl font-semibold">Eventer tým</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {eventers.map((m) => (
          <Card 
            key={m.name}
            className="flex items-center justify-between p-6"
          >
            <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{m.name}</p>
            <p className="text-sm text-dd-muted">{m.role}</p>
            <p className="text-xs text-dd-muted mt-2">
               Discord {m.discord}
            </p>
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

      <h2 className="text-3xl font-semibold">Technik tým</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {technicians.map((m) => (
          <Card 
            key={m.name}
            className="flex items-center justify-between p-6"
          >
            <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{m.name}</p>
            <p className="text-sm text-dd-muted">{m.role}</p>
            <p className="text-xs text-dd-muted mt-2">
               Discord {m.discord}
            </p>
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

      <h2 className="text-3xl font-semibold">Youtuber tým</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {youtubers.map((m) => (
          <Card 
            key={m.name}
            className="flex items-center justify-between p-6"
          >
            <div className="flex flex-col gap-1">
            <p className="text-lg font-semibold">{m.name}</p>
            <p className="text-sm text-dd-muted">{m.role}</p>
            <p className="text-xs text-dd-muted mt-2">
               Discord {m.discord}
            </p>
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

    </div>
  );
}
