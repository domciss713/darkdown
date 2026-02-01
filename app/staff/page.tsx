import { Card } from "@/components/ui/card";

const staff = [
  { name: "Domiprd", role: "Owner", discord: "@domiprdiik", avatar: <img src="https://visage.surgeplay.com/bust/100/Domiprd"/> },
  { name: "LukasRandom", role: "Admin", discord: "@cocacolaguy", avatar: <img src="https://visage.surgeplay.com/bust/100/Steve"/> },
  { name: "AllwEx_99", role: "Co-Owner", discord: "@allw3x", avatar: <img src="https://visage.surgeplay.com/bust/100/38306024-e641-4371-80b7-8fdd10c7a6db"/> }
];

const helpers = [
  { name: "Helper1", role: "Helper", discord: "@helper1", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> },
  { name: "Helper2", role: "Helper", discord: "@helper2", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> },
  { name: "Helper3", role: "Helper", discord: "@helper3", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> }
];

const builders = [
  { name: "Builder1", role: "Builder", discord: "@builder1", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> },
  { name: "Builder2", role: "Builder", discord: "@builder2", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> }
];

const developers = [
  { name: "Dev1", role: "Developer", discord: "@dev1", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> },
  { name: "Dev2", role: "Developer", discord: "@dev2", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> }
];

const eventers = [
  { name: "Eventer1", role: "Eventer", discord: "@eventer1", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> },
  { name: "Eventer2", role: "Eventer", discord: "@eventer2", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> }
];

const technicians = [
  { name: "Tech1", role: "Technician", discord: "@tech1", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> },
  { name: "Tech2", role: "Technician", discord: "@tech2", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> }
];

const youtubers = [
  { name: "Youtuber1", role: "Youtuber", discord: "@youtuber1", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> }
];

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Vedení serveru</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {staff.map((m) => (
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
                {m.avatar}
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
                {m.avatar}
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
                {m.avatar}
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
                {m.avatar}
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
                {m.avatar}
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
                {m.avatar}
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
                {m.avatar}
            </div>
            </Card>
        ))}
      </div>

    </div>
  );
}
