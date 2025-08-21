# How-To: AI-Augmented Lightweight Architectural Decision Records (LADR)

> How-to: Build an AI-augmented LADR CLI that drafts, grounds, and reviews ADRs. Learn multi-stage prompting, schema +
> guardrails, retrieval (RAG), judge scoring, and testing.

## Inspiration

- [Using generative AI as an architect buddy for creating architecture decision records](https://handsonarchitects.com/blog/2025/using-generative-ai-as-architect-buddy-for-adrs/)

## Getting Started

Start with [Step 00: Set Up](/STEP_00.md) to make sure your machine can talk to a local model. Once that's green, move
on to Step 01.

### 1. Clone and check out Step 00

```bash
git clone git@github.com:ocean-internet/how-to-ai-augmented-ladr.git
cd how-to-ai-augmented-ladr
git checkout step-00-setup
```

### 2. Follow the step guide

Open [STEP_00.md](/STEP_00.md) in this branch and work through it:

- Install Ollama
- Pull a small instruct model (default: llama3:8b)
- Create .env with OLLAMA_MODEL=llama3:8b
- Install Node (LTS) + enable Corepack, then yarn install
- Run the smoke test: yarn test

### 3. Verify the smoke test

You should see tests that:

- connect to the local Ollama daemon, and
- confirm your OLLAMA_MODEL is installed.

If either check fails, see **Troubleshooting** in [STEP_00.md](./STEP_00.md) for quick fixes.

## Further Reading

- [Agents: Chip Huyen](https://huyenchip.com/2025/01/07/agents.html)
- [Building effective agents: Anthropic](https://www.anthropic.com/engineering/building-effective-agents)
- [The DNA of AI Agents - Common Patterns in Recent Design Principles: Cedric Chee](https://cedricchee.com/blog/the-dna-of-ai-agents/)
- [Emerging Patterns in Building GenAI Products: Bharani Subramaniam & Martin Fowler](https://martinfowler.com/articles/gen-ai-patterns/)

### AI Engineering

> by Chip Huyen

![image](https://www.oreilly.com/covers/urn:orm:book:9781098166298/100w/)

Recent breakthroughs in AI have not only increased demand for AI products, they've also lowered the barriers to entry
for those who want to build AI products. The model-as-a-service... - Selection from AI Engineering
[Book](https://www.oreilly.com/library/view/ai-engineering/9781098166298/)
