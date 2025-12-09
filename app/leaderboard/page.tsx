import { Card } from "@/components/ui/card";

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Leaderboard</h1>
      <Card>
        <p className="text-sm text-dd-muted">
          Future integration with stats plugin will display top players,
          playtime, kills and more.
        </p>
      </Card>
    </div>
  );
}
