import { describe, expect, it } from "vitest";
import { createMicroAdr } from "../src/create-micro-adr";

describe("Hello World ADR", () => {
  it("produces a Micro-ADR", async () => {
    const title = "Hello World ADR";
    const adr = await createMicroAdr(title);

    expect(adr).toMatch(new RegExp(`^#\\s*${title}`, "i"));
    expect(adr).toMatch(/##\s*Context and Problem Statement/i);
    expect(adr).toMatch(/##\s*Considered Options/i);
    expect(adr).toMatch(/##\s*Decision Outcome/i);
    expect(adr).toMatch(/###\s*Consequences/i);

    // (Vitest captures stdout but shows it on failure; for success, it keeps logs compact)
    console.log(
      `
--- Micro-ADR Output ---
${adr}
------------------------
`,
    );
  }, 30_000);
});
