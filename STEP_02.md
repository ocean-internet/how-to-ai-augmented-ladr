# Step 02: Single Stage ADR

**Branch**: `step-02-single-stage-adr`  
**Goal**: Generate a complete ADR (including title) from a context statement, using a local model (Ollama) and the MADR
template.

---

## ⚡ TL;DR

Generate a complete ADR (title + content) from a context statement with a local model.  
Learn how stricter, test-driven checks guide prompt design and improve ADR quality.

---

## 🎯 Learning Outcomes

By the end of this step, you will be able to:

- Generate a complete ADR (including title) from a full context statement with a local model (Ollama).
- Use incremental, test-driven refinement to evaluate and improve ADR quality (options, decision, consequences, title).
- Explain how stricter checks (solution + problem in title) support an incremental architecture approach.

---

## 🧠 Background

**Why this matters:** We're moving from "just generate something" to producing a proper ADR — learning how AI can help
draft real engineering artefacts.

**Key ideas**

- **Titles matter:** a good ADR title captures both the solution and the problem — it's the first thing readers see.
- **Incremental refinement:** we extend test-driven prompting to not just structure, but content quality (options,
  decision, consequences, title).
- **Trade-off:** collapsing everything into one prompt is simple, but quality depends heavily on how we phrase
  instructions.

**Read more:**

- [MADR template and rationale](https://adr.github.io/madr/)
- [Architecture Decision Records (Martin Fowler)](https://martinfowler.com/articles/architecture-decision-records.html)

---

## 🔑 Prerequisites

Complete **Step 01 - Hello World ADR** ([STEP_01.md](./STEP_01.md)):

- have Ollama running locally with a pulled model
- `.env` configured (e.g., `OLLAMA_MODEL`)
- dependencies installed
- baseline tests passing

---

## 🧭 Walkthrough

In Step 01 the model wrote an ADR from a given title; in this step we provide the full context and let the model
generate both the title and the ADR in one go.

New files introduced in this step:

- code: [src/create-single-stage-adr.ts](./src/create-single-stage-adr.ts)
- test: [tests/create-single-stage-adr.test.ts](./tests/create-single-stage-adr.test.ts)
- prompt: [prompts/single-stage-adr.md](./prompts/single-stage-adr.md)

Parsing utilities for validating ADR output:

- [tests/utils/parse-madr.ts](./tests/utils/parse-madr.ts)
- [tests/utils/parse-madr.test.ts](./tests/utils/parse-madr.test.ts)

### 1. Install dependencies

```bash
yarn install
```

**Expected:** install completes without errors.

### 2. Run the test suite

```bash
yarn test
```

**Expected:** the `Single Stage ADR` test **fails** — the output includes options, decision, and consequences, but the
**title is too generic** (e.g., `# Database strategy for new services`). This failure is expected — it shows the the
test loop is working and nudging you to include a driver/problem (like ‘cognitive load' or ‘ACID') in the title.

### 3. Edit the prompts (make all tests pass)

Open and adjust:

- [prompts/system.md](./prompts/system.md) — system role and style
- [prompts/single-stage-adr.md](./prompts/single-stage-adr.md) — task-specific instructions, especially how to form the
  title

Re-run the tests:

```bash
yarn test
```

**Expected:** tests **pass**; console prints a valid Single-Stage ADR that:

- starts with `# …` (short title that names **solution + problem**),
- includes the required headings: `## Context and Problem Statement`, `## Considered Options`, `## Decision Outcome`,
  `### Consequences`,
- and passes the stricter checks for options, decision, consequences, and title.

---

## 🧪 Evaluation

### 1. Run the tests (initial failure)

```bash
yarn test
```

**Passes if:** you see a failing assertion for the **title check**, e.g.:

```bash
FAIL  tests/create-single-stage-adr.test.ts > Single Stage ADR > title includes the chosen option and is a representative problem-solution summary
AssertionError: Problem: cognitive load, acid, delivery, workload, expert: expected false to be truthy
```

This confirms the ADR is generated, but the **title is too generic**.

### 2. Re-run after editing prompts

```bash
yarn test
```

**Passes if:** all tests succeed, e.g.:

```bash
✓ 4 passed
```

This confirms the ADR now has a valid title (solution + problem), and all required sections are present.

---

## ✅ Checklist

- ⬜ I ran `yarn test` and the `Single Stage ADR` test passed
- ⬜ I saw options, decision, consequences, and a title that includes both the chosen option and a problem/driver
- ⬜ I did not edit `docs/decisions/adr-template-minimal.md`
- ⬜ I saw how stricter tests (e.g. title checks) help guide prompt design

---

## 🛠️ Troubleshooting

- **Title is still too generic** → the prompt doesn't instruct the model to include a problem/driver in the title →
  **Fix:** update `prompts/single-stage-adr.md` to reinforce "solution + problem" in the title.
- **Options or consequences missing** → the MADR template was modified or not preserved in the prompt → **Fix:** restore
  `docs/decisions/adr-template-minimal.md` and re-run `yarn test`.
- **Ollama error: model not found** → the model name in `.env` doesn't match an installed model → **Fix:** run
  `ollama pull <model>` and check `.env` has `OLLAMA_MODEL=<model>`.

---

## ➡️ Next

With your first proper ADR working end-to-end, you're ready to add more guardrails.

Continue to **Step 03 — Structured Output & MADR Schema**

Here we'll add a schema layer so the ADR output isn't just "valid Markdown," but also machine-checked for structure.

```bash
git checkout step-03-structured-output
```
