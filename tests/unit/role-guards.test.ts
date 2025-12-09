import { describe, it, expect } from "vitest";
import { hasRole } from "@/lib/rbac";

describe("role guards", () => {
  const mkSession = (role: any) =>
    ({
      user: { role }
    } as any);

  it("user has USER", () => {
    expect(hasRole(mkSession("USER"), "USER")).toBe(true);
  });
  it("staff has STAFF rights", () => {
    expect(hasRole(mkSession("STAFF"), "STAFF")).toBe(true);
  });
  it("user not admin", () => {
    expect(hasRole(mkSession("USER"), "ADMIN")).toBe(false);
  });
});
