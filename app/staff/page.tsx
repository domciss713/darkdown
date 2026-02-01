import { Card } from "@/components/ui/card";

const staff = [
  { name: "Domiprd", role: "Owner", discord: "@domiprdiik" },
  { name: "LukasRandom", role: "Admin", discord: "@cocacolaguy" }
];

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold">Vedení serveru</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {staff.map((m) => (
          <Card key={m.name}>
            <img src="https://visage.surgeplay.com/bust/100/af7dae6977234a5db78f2386fe6a6111"></img>
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
