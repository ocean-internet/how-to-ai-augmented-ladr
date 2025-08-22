# Step 01: Hello World ADR

**Branch**: `step-01-hello-world-adr`  
**Goal**: Generate a "Hello World" ADR using the Markdown Architectural Decision Records (MADR) format with a local
model (Ollama) from a title + prompt + ADR template.

---

## ⚡ TL;DR

Create a "Hello World" ADR with a local model (Ollama) in MADR format, using a TDD loop to refine prompts and validate
the output against required headings.

---

## 🎯 Learning Outcomes

By the end of this step, you will be able to:

- Produce a valid "Hello World" ADR in MADR format with a local model (Ollama).
- Use TDD to guide prompt design: start from a failing test, refine instructions, and re-run until it passes.
- Write prompts that enforce strict structure (headings, first-line title, no preamble).

---

## 🧠 Background

**Why this matters:** This step creates a steel thread: from prompt to model to ADR output, validated by tests. This
proves the end-to-end loop works before we add more structure and guardrails.

**Key ideas**

- **Test-driven prompting:** instead of "hoping" the model produces the right structure, we write tests and refine
  prompts until they pass.
- **MADR as standard:** we use the Markdown Architectural Decision Records format to keep decisions consistent and
  recognisable.
- **Trade-off:** a single-prompt workflow is simple to set up but fragile — small wording changes can break structure.

**Read more:**

- [MADR template and rationale](https://adr.github.io/madr/)
- [Test-Driven Development (Martin Fowler)](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

---

## 🔑 Prerequisites

Complete **Step 00 - Set Up** ([STEP_00.md](./STEP_00.md)):

- have Ollama running locally with a pulled model
- `.env` configured (e.g., `OLLAMA_MODEL`)
- dependencies installed
- baseline tests passing

---

## 🧭 Walkthrough

In this step we connect everything together: a **system prompt**, a **task prompt**, and an **MADR template**.

The prompts live in [prompts/system.md](./prompts/system.md) &
[prompts/hello-world-adr.md](./prompts/hello-world-adr.md), and the MADR template we use is
[docs/decisions/adr-template-minimal.md](./docs/decisions/adr-template-minimal.md) (**don't edit this file** — it
anchors the headings our tests expect).

### 1. Install dependencies

```bash
yarn install
```

**Expected:** install completes without errors.

### 2. Run the test suite

```bash
yarn test
```

**Expected:** the `Hello World ADR` test **fails** — the output includes some extra text before the title (e.g., it
prints `Here is the ADR:` and then the heading). This failure is expected — it shows the test loop is working and
catching formatting issues. The goal is to refine the prompt so the very first character of the response is `#`.

### 3. Edit the prompts (make all tests pass)

Open and adjust:

- [prompts/system.md](./prompts/system.md) — system role and style
- [prompts/hello-world-adr.md](./prompts/hello-world-adr.md) — task-specific instructions

Re-run the tests:

```bash
yarn test
```

**Expected:** tests **pass**; console prints a valid Micro‑ADR that:

- starts with `# Hello World ADR` on the **first line**, and
- includes the required headings: `## Context and Problem Statement`, `## Considered Options`, `## Decision Outcome`,
  `### Consequences`.

---

## 🧪 Evaluation

### 1. Tests pass

```bash
yarn test
```

**Passes if:** Vitest reports success (e.g., `✓ tests/step-01.test.ts (1 test)`) and the console shows the generated
ADR.

### 2. ADR headings present

Look at the console output from the passing test.

**Passes if:** the ADR contains all required MADR headings:

- `# Hello World ADR` (title)
- `## Context and Problem Statement`
- `## Considered Options`
- `## Decision Outcome`
- `### Consequences`

---

## ✅ Checklist

- ⬜ I ran `yarn test` and the `Hello World ADR` test passed
- ⬜ I saw all required MADR headings in the ADR output
- ⬜ I did not edit `docs/decisions/adr-template-minimal.md`
- ⬜ I saw how writing the test first gave me a clear target for my prompts.

---

## 🛠️ Troubleshooting

- **`yarn test` fails with "missing headings"** → prompts are incomplete or too generic → **Fix:** edit
  `prompts/system.md` and `prompts/hello-world-adr.md` to strengthen instructions, then re-run `yarn test`.
- **`yarn test` fails with "connection refused" from Ollama** → Ollama daemon not running or host misconfigured →
  **Fix:** start with `ollama serve` (or `ollama ps` to check) and confirm `.env` contains the correct `OLLAMA_HOST`.
- **Model not found** → the model in `.env` hasn't been pulled yet → **Fix:** `ollama pull llama3:8b` (or whichever
  model you set in `.env`).

---

## ➡️ Next

With a working steel thread in place, you're ready to go further.

Continue to **Step 02 — Single-Stage ADR**, where instead of just passing a title, you'll provide full context — and the
model will generate both the title and the ADR in one go.

```bash
git checkout step-02-single-stage-adr
```
