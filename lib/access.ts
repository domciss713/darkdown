export function parseIdList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export function isAdminUser(userId: string | undefined, role: string | undefined): boolean {
  if (!userId) return false;
  if (role === "ADMIN") return true;
  const allow = parseIdList(process.env.ADMIN_USER_IDS);
  return allow.includes(userId);
}

export function isHelperUser(userId: string | undefined, role: string | undefined): boolean {
  if (!userId) return false;
  if (isAdminUser(userId, role)) return true;
  if (role === "STAFF") return true;
  const helper = parseIdList(process.env.HELPER_USER_IDS);
  return helper.includes(userId);
}

export function mcDisplayRole(role: string, minecraftNick: string): string {
  const vipNicks = parseIdList(process.env.MC_VIP_NICKS).map((n) => n.toLowerCase());
  if (role === "USER" && vipNicks.includes(minecraftNick.toLowerCase())) return "VIP";
  return role;
}
