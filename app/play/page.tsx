import { Card } from "@/components/ui/card";
import { CopyIp } from "@/components/copy-ip";

export default function PlayPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Play DarkDowN</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Server IP</h2>
        <p className="text-sm text-dd-muted mb-3">
          Add this server in your Minecraft client and join.
        </p>
        <CopyIp />
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Supported versions</h2>
        <p className="text-sm text-dd-muted">
          Java Edition 1.20.x recommended. Other modern versions may
          work but are not guaranteed.
        </p>
      </Card>
    </div>
  );
}
