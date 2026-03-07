import { prisma } from "@/lib/prisma";

export const TEAM_ROLES = [
  "Helper",
  "Builder",
  "Developer",
  "Eventer",
  "Technician",
  "Creator",
  "Youtuber",
] as const;

export type TeamRole = (typeof TEAM_ROLES)[number];

function hasDb() {
  return !!process.env.DATABASE_URL;
}

export type TeamMember = {
  id: string;
  userId: string | null;
  minecraftNick: string;
  email: string | null;
  discord: string | null;
  role: TeamRole;
};

async function ensureTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS dark_team_members (
      id TEXT PRIMARY KEY,
      user_id TEXT NULL REFERENCES "User"(id) ON DELETE SET NULL,
      minecraft_nick TEXT NOT NULL,
      email TEXT NULL,
      discord TEXT NULL,
      role TEXT NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

export async function listTeamMembers(): Promise<TeamMember[]> {
  if (!hasDb()) return [];
  await ensureTable();
  const rows = await prisma.$queryRaw<Array<{
    id: string;
    user_id: string | null;
    minecraft_nick: string;
    email: string | null;
    discord: string | null;
    role: string;
  }>>`
    SELECT id, user_id, minecraft_nick, email, discord, role
    FROM dark_team_members
    WHERE active = TRUE
    ORDER BY created_at DESC
  `;

  return rows
    .filter((r) => TEAM_ROLES.includes(r.role as TeamRole))
    .map((r) => ({
      id: r.id,
      userId: r.user_id,
      minecraftNick: r.minecraft_nick,
      email: r.email,
      discord: r.discord,
      role: r.role as TeamRole,
    }));
}

export async function upsertTeamMember(input: {
  userId?: string | null;
  minecraftNick: string;
  email?: string | null;
  discord?: string | null;
  role: TeamRole;
}) {
  if (!hasDb()) return;
  await ensureTable();

  const id = crypto.randomUUID();

  if (input.userId) {
    await prisma.$executeRaw`
      UPDATE dark_team_members
      SET active = FALSE, updated_at = NOW()
      WHERE user_id = ${input.userId} AND role = ${input.role} AND active = TRUE
    `;
  }

  await prisma.$executeRaw`
    INSERT INTO dark_team_members (id, user_id, minecraft_nick, email, discord, role, active)
    VALUES (${id}, ${input.userId ?? null}, ${input.minecraftNick}, ${input.email ?? null}, ${input.discord ?? null}, ${input.role}, TRUE)
  `;
}

export async function removeTeamMember(id: string) {
  if (!hasDb()) return;
  await ensureTable();
  await prisma.$executeRaw`
    UPDATE dark_team_members
    SET active = FALSE, updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function removeHelperForUser(userId: string) {
  if (!hasDb()) return;
  await ensureTable();
  await prisma.$executeRaw`
    UPDATE dark_team_members
    SET active = FALSE, updated_at = NOW()
    WHERE user_id = ${userId} AND role = 'Helper' AND active = TRUE
  `;
}
