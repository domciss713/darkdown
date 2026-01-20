// lib/link-code.ts
type CodeRecord = { userId: string; created: number };

const inMemoryCodes = new Map<string, CodeRecord>();

export function generateCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function storeCode(code: string, userId: string) {
  inMemoryCodes.set(code, { userId, created: Date.now() });
}

export function resolveCode(code: string): string | null {
  const record = inMemoryCodes.get(code);
  if (!record) return null;

  // 10 min expiry
  if (Date.now() - record.created > 10 * 60_000) {
    inMemoryCodes.delete(code);
    return null;
  }

  inMemoryCodes.delete(code);
  return record.userId;
}
