import { describe, expect, it } from "vitest";
import { createMicroAdr } from "../src/create-hello-world-adr";

describe("Hello World ADR", () => {
  it("produces a hello-world-adr", async () => {
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
--- Hello World ADR Output ---
${adr}
------------------------------
`,
    );
  }, 30_000);
});
