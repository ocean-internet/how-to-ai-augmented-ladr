import "dotenv/config";
import { describe, it, expect } from "vitest";
import ollama from "ollama";

type OllamaModelSummary = { name?: string; model?: string };

const MODEL = process.env.OLLAMA_MODEL || "";

describe("Step 0: Ollama environment", () => {
  it("reads from .env", () => {
    expect(process.env.OLLAMA_MODEL).toBeDefined();
  });

  it("connects to the local Ollama server", async () => {
    // Will throw if daemon isn't reachable
    const list = await ollama.list();
    expect(Array.isArray(list.models)).toBe(true);
  });

  it(`has the required model loaded (${MODEL})`, async () => {
    const { models } = await ollama.list();

    // Model name can appear under .name or .model depending on SDK/daemon
    const names = models.flatMap(
      (m: OllamaModelSummary) => [m.name, m.model].filter(Boolean) as string[],
    );

    expect(
      names,
      `Model "${MODEL}" not found. Fix:\n  ollama pull ${MODEL}`,
    ).toContain(MODEL);
  });
});
