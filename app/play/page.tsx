import { Card } from "@/components/ui/card";
import { CopyIp } from "@/components/copy-ip";

export default function PlayPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Jak se připojit?</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Server IP</h2>
        <p className="text-sm text-dd-muted mb-3">
          Zkopírujte IP adresu serveru a přijďte si zahrát.
        </p>
        <CopyIp />
      </Card>
      <Card>
        <h2 className="text-xl font-semibold mb-2">Podporované verze</h2>
        <p className="text-sm text-dd-muted">
          Doporučené verze Java 1.9 - 1.20.x. Jiné moderní verze mohou fungovat, ale nejsou zaručeny.
        </p>
        <p className="text-sm text-dd-muted">
          V budoucnu plánujeme podporu Bedrock edice.
        </p>
      </Card>
    </div>
  );
}
