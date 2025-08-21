# Step 02: Single Stage ADR

**Branch**: `step-02-single-stage-adr`  
**Goal**: {{1–2 lines describing the outcome.}}

---

## ⚡ TL;DR

{{One or two sentences: what you’ll build + what you’ll learn.}}

---

## 🎯 Learning Outcomes

By the end of this step, you will be able to:

- {{Outcome 1}}
- {{Outcome 2}}
- {{Outcome 3}}

---

## 🧠 Background (Optional)

**Why this matters:** {{1 short sentence.}}

**Key ideas**

- {{Idea 1}}
- {{Idea 2}}
- {{Constraint or trade-off}}

**Read more:** {{link 1}}, {{link 2}}

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
**title is too generic** (e.g., `# Database strategy for new services`).  
Our test requires the title to also mention a **driver/problem** (like "cognitive load" or "ACID").

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

### 1. {{Check 1}}

```bash
{{command}}
```

**Passes if:** {{explicit success signal (e.g., `✓ 2 passed` or a specific line)}}

### 2. {{Check 2}}

```bash
{{command}}
```

**Passes if:** {{explicit success signal}}

---

## ✅ Checklist

- ⬜ {{Concrete state #1 (e.g., `File exists: docs/decisions/NNNN-*.md`)}}
- ⬜ {{Concrete state #2 (e.g., `Prettier + markdownlint pass`)}}
- ⬜ {{Quality gate (e.g., `Schema valid; chosenOption ∈ options`)}}
- ⬜ {{ Reflection: one sentence about the key lesson - e.g. I can explain why offline-first matters}}

---

## 🛠️ Troubleshooting

- **{{Symptom}}** → {{Cause}} → **Fix:** `{{command}}`
- **{{Symptom}}** → {{Cause}} → **Fix:** `{{command}}`

---

## ➡️ Next

Continue to **Step {{NN+1}} — {{Next title}}**

```bash
git checkout step-{{NN+1}}-{{next-slug}}
```
