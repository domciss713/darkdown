import { describe, it, expect } from "vitest";
import type { QueryStatus } from "@/lib/query";

describe("Query parser", () => {
  it("shape is correct", () => {
    const sample: QueryStatus = {
      online: true,
      players: 3,
      maxPlayers: 20,
      playerList: ["A", "B", "C"],
      motd: "Hi"
    };
    expect(sample.online).toBe(true);
    expect(sample.playerList.length).toBe(3);
  });
});
