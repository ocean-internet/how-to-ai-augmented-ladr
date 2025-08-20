# Step 00: Setup

**Branch**: `step-00-setup`  
**Goal**: provision and test a local LLM runtime in a reproducible way.

---

## ⚡ TL;DR

Install Ollama, pull a small model, set `OLLAMA_MODEL` in `.env`, install Node/Yarn deps, and run a smoke test that verifies: (1) the daemon is reachable and (2) the required model is installed.

---

## 🎯 Learning Outcomes

By the end of this step, you will be able to:

- Install and run a local LLM runtime using **Ollama**.
- Execute a **smoke test** (`vitest` + `ollama-js`) that verifies connectivity and that your chosen model is installed.
- Explain why an _offline-first design_ is valuable (reproducibility, latency control, data privacy).

---

## 🧠 Background

**Why this matters:** A reliable local runtime removes “works on my machine” variability and avoids cloud dependencies during learning.

**Key ideas**

- Same model artefacts for everyone → reproducible outputs
- Lower latency and no API bills
- Inputs/outputs stay on your machine

**Read more:** see Further Reading in the main README.

---

## 🔑 Prerequisites

- **Operating system:** macOS, Linux, or Windows via **WSL2**
- **Tools:** Git, Node LTS, Yarn (via Corepack or global install)
- **Connectivity:** Internet access to download Ollama + model
- **Disk/RAM:** enough for a small instruct model (e.g., `llama3:8b`)

---

## 🧭 Walkthrough

### 1. Install Ollama

#### macOS

Download and install: https://ollama.com/download/mac

#### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

If needed, start the service:

```bash
systemctl --user start ollama
```

#### Windows (via WSL2)

1. Install WSL: [https://learn.microsoft.com/en-us/windows/wsl/install](https://learn.microsoft.com/en-us/windows/wsl/install)
2. Inside WSL (Ubuntu recommended), follow the Linux steps above.

**Expected:** `ollama` is on your PATH.

---

### 2. Ensure the daemon is running

```bash
ollama ps
# or, to run ollama in the foreground (Ctrl+C to stop):
ollama serve
```

**Expected:** `ollama ps` exits without error (prints the header even if no models are running).

---

### 3. Pull a compact model

```bash
ollama pull llama3:8b
```

**Expected:** download completes; `ollama list` shows `llama3:8b`.

---

### 4. Configure environment

Copy the example and set your default model:

```bash
cp .env.example .env
```

#### .env

```env
# The local model you expect to be present
OLLAMA_MODEL=llama3:8b

# Optional: override host (e.g., WSL/remote)
# OLLAMA_HOST=http://127.0.0.1:11434
```

**Expected:** `.env` exists and includes `OLLAMA_MODEL=llama3:8b` (or your choice).

---

### 5. Set up Node.js, Yarn, and dependencies

Using **nvm** + **Corepack** (recommended):

```bash
nvm install && nvm use   # installs/uses the .nvmrc or latest LTS
corepack enable          # enables Yarn bundled with Node
yarn install             # installs package.json dependencies
```

(If you prefer global Yarn: `npm i -g yarn && yarn`.)

**Expected:** dependencies install successfully.

---

### 6. Run the smoke test

```bash
yarn test
```

**Expected:**

- Tests connect to the Ollama daemon.
- Tests confirm `OLLAMA_MODEL` is installed.
- Clear failure messages if either check fails (no side effects).

> Reference test file: `tests/step-00.test.ts`

---

## 🧪 Evaluation

### 1. Daemon reachable

```bash
ollama ps
```

**Passes if:** command exits without error.

### 2. Model present

```bash
ollama list | grep llama3:8b
```

**Passes if:** output contains `llama3:8b`.
(Adjust the grep to your chosen model if different.)

### 3. Smoke test passes

```bash
yarn test
```

**Passes if:** Vitest reports success (e.g., `✓ 2 passed`).

---

## ✅ Checklist

- ⬜ Ollama installed and running (`ollama ps` succeeds)
- ⬜ Model pulled (`ollama list` shows `llama3:8b`, or your chosen model)
- ⬜ `.env` contains `OLLAMA_MODEL=llama3:8b` (or your choice)
- ⬜ `yarn install` completes without error
- ⬜ `yarn test` passes (connectivity + model presence)
- ⬜ I can explain why _offline-first_ matters

---

## 🛠️ Troubleshooting

- **Model won’t load** → insufficient RAM/VRAM → try a smaller quantised build (e.g., `llama3:8b-instruct:q4_0`).
- **Ollama not reachable** → daemon not running → start with `ollama serve` (foreground) or `systemctl --user start ollama` (Linux).
- **WSL networking issues** → set `OLLAMA_HOST=http://127.0.0.1:11434` in `.env`.
- **Node/Yarn issues** → confirm `node -v` (LTS); run `corepack enable` before `yarn install`.

---

## ➡️ Next

Continue to **Step 01 — Hello World (Guardrails)**

```bash
git checkout step-01-hello-world-guardrails
```
