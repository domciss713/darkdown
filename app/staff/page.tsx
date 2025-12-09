import { Card } from "@/components/ui/card";

const staff = [
  { name: "Owner", role: "Owner", discord: "@owner" },
  { name: "Admin", role: "Admin", discord: "@admin" }
];

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Staff team</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {staff.map((m) => (
          <Card key={m.name}>
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
