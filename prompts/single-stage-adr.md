# Choosing an ADR title

A good ADR title is a short sentence that names:

1. The solution you picked (the what), and
2. The main problem or driver it addresses (the why).

Think: “We chose X in order to solve Y.”

## Guidelines:

- Start with the solution/action (Adopt…, Standardise…, Use…, Defer…).
- Name the specific technology, approach, or choice (e.g. PostgreSQL, CI pipeline, monorepo).
- Include the key driver/problem being solved (e.g. speed, scalability, compliance, simplicity).
- Keep it concise — about one line, 8–12 words.

## Examples

- Adopt Kubernetes to improve scalability and resilience
- Standardise on a monorepo to simplify dependency management
- Defer GraphQL adoption to reduce delivery risk
- Use GitHub Actions for CI to speed up feedback loops
- Introduce feature toggles to enable safe experimentation

Context:

{{context}}

Instructions:

- Use the provided template headings EXACTLY
- Replace template {placeholders} with concise content.
- Each {placeholder} provides guidance on completing.

Title (e.g. "# {short title...}"):

- A short present tense imperative phrase.
- Consisely summarises both:
  1. The solution ("Chosen option"): e.g. "{title of option}" as described in "## Decision Outcome"
  2. The solved problem: e.g. described in "## Context and Problem Statement"

Response Format:

- RESPOND ONLY IN MARKDOWN.
- Do NOT add an introduction (e.g. "Here is the ADR in Markdown format:").

Template:

```markdown
{{template}}
```
