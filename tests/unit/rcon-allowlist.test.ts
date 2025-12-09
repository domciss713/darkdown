import { describe, it, expect } from "vitest";
import { isAllowedRconCommand } from "@/lib/rcon";

describe("RCON allow list", () => {
  it("allows whitelisted command", () => {
    process.env.RCON_ALLOWED = "say,whitelist";
    expect(isAllowedRconCommand("say hello")).toBe(true);
  });
  it("blocks non whitelisted", () => {
    process.env.RCON_ALLOWED = "say,whitelist";
    expect(isAllowedRconCommand("stop")).toBe(false);
  });
});
