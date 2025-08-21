import { beforeAll, describe, expect, it } from "vitest";
import { createSingleStageAdr } from "../src/create-single-stage-adr";
import { parseMadr } from "./utils/parse-madr";

const CONTEXT = `
We need to make a decision about our database strategy for new services. The main options are to standardise on PostgreSQL, standardise on MongoDB, or allow teams to choose their own strategy.

What's driving this decision is the need to reduce team cognitive load, preserve strong ACID guarantees where required, and avoid unnecessary tool sprawl while still supporting fast delivery. At the same time, we have to deal with mixed workloads — some transaction-heavy, some document-oriented — and our teams don't all have the same level of database expertise.
`;

describe("Hello World ADR", () => {
  let adr = "";
  let title = "";
  let options: string[] = [];
  let decision = "";
  let consequences: string[] = [];

  beforeAll(async () => {
    adr = await createSingleStageAdr(CONTEXT);
    const parsed = await parseMadr(adr);
    title = parsed.title;
    options = parsed.options;
    decision = parsed.decision;
    consequences = parsed.consequences;

    // (Vitest captures stdout but shows it on failure; for success, it keeps logs compact)
    console.log(`
--- Single Stage ADR Output ---
${adr}
-------------------------------
`);
  }, 30_000);

  it("options section mentions Postgres, MongoDB, and a team 'choose' variant", async () => {
    const mappedOptions = options.map(mapOption);

    expect(mappedOptions.length).toBe(3);
    expect(mappedOptions).not.toContain("ERROR");
    expect(mappedOptions).toEqual(expect.arrayContaining(["postgres", "mongo", "choose"]));
  });

  it("decision section contains one of the mapped options", () => {
    const mappedDecision = mapOption(decision);
    expect(["postgres", "mongo", "choose"]).toContain(mappedDecision);
  });

  it("consequences include at least one Good and one Bad", () => {
    expect(consequences.length).toBeGreaterThanOrEqual(2);
    expect(consequences.find((consequence) => consequence.startsWith("Good, "))).toBeTruthy();
    expect(consequences.find((consequence) => consequence.startsWith("Bad, "))).toBeTruthy();
  });

  it("title includes the chosen option and is a representative problem-solution summary", () => {
    const mappedDecision = mapOption(decision);

    const problem = ["cognitive load", "acid", "delivery", "workload", "expert"];
    let solution;

    switch (mappedDecision) {
      case "postgres":
      case "mongo":
        solution = ["standardise", mappedDecision];
        break;
      default:
        solution = [mappedDecision];
    }

    const lowerTitle = title.toLowerCase();

    expect(
      problem.some((p) => lowerTitle.includes(p)),
      `Problem: ${problem.join(", ")}`,
    ).toBeTruthy(); // some problem strings
    expect(
      solution.every((s) => lowerTitle.includes(s)),
      `Solution: ${solution.join(", ")}`,
    ).toBeTruthy(); // every solution string
  });
});

function mapOption(option: string): "postgres" | "mongo" | "choose" | "ERROR" {
  const lower = option.toLowerCase();
  switch (true) {
    case lower.includes("postgres"):
      return "postgres";
    case lower.includes("mongo"):
      return "mongo";
    case lower.includes("team") && lower.includes("choose"):
    case lower.includes("team") && lower.includes("allow"):
      return "choose";
    default:
      return "ERROR";
  }
}
