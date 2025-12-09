import { describe, it, expect } from "vitest";

describe("SFTP tail logic", () => {
  function tail(lines: string[], n: number) {
    return lines.slice(-n);
  }
  it("tails last n lines", () => {
    const arr = ["1", "2", "3", "4"];
    expect(tail(arr, 2)).toEqual(["3", "4"]);
  });
});
