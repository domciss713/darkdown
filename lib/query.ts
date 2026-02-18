import { Query } from "minecraft-query";

export type QueryStatus = {
  online: boolean;
  players: number;
  maxPlayers: number;
  playerList: string[];
  motd: string;
};

const FALLBACK_STATUS: QueryStatus = {
  online: false,
  players: 0,
  maxPlayers: 0,
  playerList: [],
  motd: "offline",
};

export async function getQueryStatus(): Promise<QueryStatus> {
  const host = process.env.QUERY_HOST;
  if (!host) return FALLBACK_STATUS;

  const port = Number(process.env.QUERY_PORT ?? "25565");

  try {
    const q = new Query(host, { port, timeout: 3000 });
    const full = (await q.fullStat()) as any;

    return {
      online: true,
      players: Number(full.numplayers ?? full.numPlayers ?? full.players ?? 0),
      maxPlayers: Number(full.maxplayers ?? full.maxPlayers ?? 0),
      playerList: Array.isArray(full.players) ? full.players : [],
      motd: String(full.hostname ?? full.motd ?? ""),
    };
  } catch {
    return FALLBACK_STATUS;
  }
}
