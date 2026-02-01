import { Card } from "@/components/ui/card";

const staff = [
  { name: "Domiprd", role: "Owner", discord: "@domiprdiik", avatar: <img src="https://visage.surgeplay.com/bust/100/Domiprd"></img> },
  { name: "LukasRandom", role: "Admin", discord: "@cocacolaguy", avatar: <img src="https://visage.surgeplay.com/bust/100/Steve"></img> }
];

const helpers = [
  { name: "Helper1", role: "Helper", discord: "@helper1", avatar: <img src="https://visage.surgeplay.com/bust/100/Alex"></img> },
  { name: "Helper2", role: "Helper", discord: "@helper2", avatar: <img src="https://visage.surgeplay.com/bust/100/Notch"></img> },
  { name: "Helper3", role: "Helper", discord: "@helper3", avatar: <img src="https://visage.surgeplay.com/bust/100/Herobrine"></img> }
];

const builders = [
  { name: "Builder1", role: "Builder", discord: "@builder1", avatar: <img src="https://visage.surgeplay.com/bust/100/Builder1"></img> },
  { name: "Builder2", role: "Builder", discord: "@builder2", avatar: <img src="https://visage.surgeplay.com/bust/100/Builder2"></img> }
];

const developers = [
  { name: "Dev1", role: "Developer", discord: "@dev1", avatar: <img src="https://visage.surgeplay.com/bust/100/Dev1"></img> },
  { name: "Dev2", role: "Developer", discord: "@dev2", avatar: <img src="https://visage.surgeplay.com/bust/100/Dev2"></img> }
];

const eventers = [
  { name: "Eventer1", role: "Eventer", discord: "@eventer1", avatar: <img src="https://visage.surgeplay.com/bust/100/Eventer1"></img> },
  { name: "Eventer2", role: "Eventer", discord: "@eventer2", avatar: <img src="https://visage.surgeplay.com/bust/100/Eventer2"></img> }
];

const technicians = [
  { name: "Tech1", role: "Technician", discord: "@tech1", avatar: <img src="https://visage.surgeplay.com/bust/100/Tech1"></img> },
  { name: "Tech2", role: "Technician", discord: "@tech2", avatar: <img src="https://visage.surgeplay.com/bust/100/Tech2"></img> }
];

const youtubers = [
  { name: "Youtuber1", role: "Youtuber", discord: "@youtuber1", avatar: <img src="https://visage.surgeplay.com/bust/100/Youtuber1"></img> },
  { name: "Youtuber2", role: "Youtuber", discord: "@youtuber2", avatar: <img src="https://visage.surgeplay.com/bust/100/Youtuber2"></img> }
];

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Vedení serveru</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {staff.map((m) => (
          <Card key={m.name}>
            <p>{m.avatar}</p>
            <p className="font-semibold">{m.name}</p>
            <p className="text-sm text-dd-muted">{m.role}</p>
            <p className="text-xs text-dd-muted mt-2">
              Discord {m.discord}
            </p>
          </Card>
        ))}
      </div>
      
      <h2 className="text-3xl font-semibold">Helper tým</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {helpers.map((m) => (
          <Card key={m.name}>
            <p>{m.avatar}</p>
            <p className="font-semibold">{m.name}</p>
            <p className="text-sm text-dd-muted">{m.role}</p>
            <p className="text-xs text-dd-muted mt-2">
              Discord {m.discord}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
