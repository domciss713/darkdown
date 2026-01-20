import { Rcon } from "rcon-client";

function getAllowed(): string[] {
  return (process.env.RCON_ALLOWED ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedRconCommand(cmd: string): boolean {
  const base = cmd.trim().split(/\s+/)[0]?.toLowerCase();
  if (!base) return false;
  return getAllowed().includes(base);
}

export async function sendRconCommand(command: string) {
  if (!isAllowedRconCommand(command)) {
    const err: any = new Error("Command not allowed");
    err.status = 400;
    throw err;
  }

  const client = await Rcon.connect({
    host: process.env.RCON_HOST!,
    port: Number(process.env.RCON_PORT ?? "25575"),
    password: process.env.RCON_PASSWORD!
  });

  try {
    const res = await client.send(command);
    return res;
  } finally {
    try {
      await client.end();
    } catch {
      // ignore
    }
  }
}
