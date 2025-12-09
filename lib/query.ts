import { Query } from "minecraft-query";

export type QueryStatus = {
  online: boolean;
  players: number;
  maxPlayers: number;
  playerList: string[];
  motd: string;
};

export async function getQueryStatus(): Promise<QueryStatus> {
  const host = process.env.QUERY_HOST!;
  const port = Number(process.env.QUERY_PORT ?? "25565");
  const q = new Query(host, { port, timeout: 3000 });

  try {
    const full = (await q.fullStat()) as any;
    return {
      online: true,
      players: Number(full.numplayers ?? 0),
      maxPlayers: Number(full.maxplayers ?? 0),
      playerList: Array.isArray(full.player_) ? full.player_ : [],
      motd: String(full.hostname ?? "")
    };
  } catch {
    return {
      online: false,
      players: 0,
      maxPlayers: 0,
      playerList: [],
      motd: ""
    };
  } finally {
    try {
      q.close();
    } catch {
      // ignore
    }
  }
}
