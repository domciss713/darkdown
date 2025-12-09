"use client";

import useSWR from "swr";

type Status = {
  online: boolean;
  players: number;
  maxPlayers: number;
  playerList: string[];
  motd: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function ServerStatus() {
  const { data, error } = useSWR<Status>("/api/status", fetcher, {
    refreshInterval: 10_000
  });

  if (error) {
    return <p className="text-dd-muted text-sm">Status unavailable</p>;
  }
  if (!data) {
    return <p className="text-dd-muted text-sm">Loading status</p>;
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          data.online ? "bg-emerald-400" : "bg-red-400"
        }`}
      />
      <div>
        <p className="font-medium">
          {data.online ? "Online" : "Offline"}
        </p>
        <p className="text-xs text-dd-muted">
          {data.players}/{data.maxPlayers} players
        </p>
      </div>
    </div>
  );
}
