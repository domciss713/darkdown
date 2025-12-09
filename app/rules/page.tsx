import { Card } from "@/components/ui/card";

const rules = [
  "No hacking or unfair modifications.",
  "Respect other players and staff.",
  "No advertising other servers.",
  "No griefing outside designated areas.",
  "Use tickets for support, not public chat spam."
];

export default function RulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Server rules</h1>
      <Card>
        <ol className="space-y-2 text-sm text-dd-muted list-decimal list-inside">
          {rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
