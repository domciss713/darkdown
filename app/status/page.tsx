import { Card } from "@/components/ui/card";
import { ServerStatus } from "@/components/server-status";

export default function StatusPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Live status</h1>
      <Card>
        <ServerStatus />
      </Card>
    </div>
  );
}
