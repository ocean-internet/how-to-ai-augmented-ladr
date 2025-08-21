import { describe, expect, it } from "vitest";
import { getTemplate } from "../../src/shared";
import { MadrParsed as ParsedMadr, parseMadr } from "./parse-madr";
import { sanitiseString } from "./sanitise-string";

const ADR_TEMPLATE = "adr-template-minimal";

describe("parseMadr on adr-template-minimal", () => {
  it("extracts title, options (bullets), decision line, and consequences into MadrParsed", async () => {
    const adrTemplate = await getTemplate(ADR_TEMPLATE);
    const parsedAdr: ParsedMadr = await parseMadr(adrTemplate);

    // Title
    expect(sanitiseString(parsedAdr.title)).toBe("{short title, representative of solved problem and found solution}");

    // Options
    expect(parsedAdr.options.length).toBeGreaterThanOrEqual(3);
    expect(parsedAdr.options).toEqual(
      expect.arrayContaining(["{title of option 1}", "{title of option 2}", "{title of option 3}"]),
    );

    // Decision
    expect(sanitiseString(parsedAdr.decision)).toBe(
      `"{title of option}", because {justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force {force} | … | comes out best (see below)}.`,
    );

    // Consequences
    expect(parsedAdr.consequences.length).toBeGreaterThanOrEqual(2);
    expect(parsedAdr.consequences).toEqual(
      expect.arrayContaining([
        "Good, because {positive consequence, e.g., improvement of one or more desired qualities, …}",
        "Bad, because {negative consequence, e.g., compromising one or more desired qualities, …}",
      ]),
    );
  });
});
