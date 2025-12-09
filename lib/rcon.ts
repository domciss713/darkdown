import { Rcon } from "rcon-client";

const allowed = (process.env.RCON_ALLOWED ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export function isAllowedRconCommand(cmd: string): boolean {
  const base = cmd.split(" ")[0];
  return allowed.includes(base);
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
    await client.end();
    return res;
  } catch (e) {
    await client.end();
    throw e;
  }
}
