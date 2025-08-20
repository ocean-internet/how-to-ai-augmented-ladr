# Step 00: Setup

**Branch**: step-00-setup  
**Goal**: provision and test a local LLM runtime in a reproducible way.

---

## 🎯 Learning Outcomes

By the end of this step, you will be able to:

- Install and run a local LLM runtime using **Ollama**.
- Execute a **smoke test** (`vitest` + `ollama-js`)that verifies connectivity and that your chosen model is installed.
- Explain why an _offline-first design_ is valuable (reproducibility, latency control, data privacy).

---

## 📝 Why Offline-First?

We start with local models instead of cloud APIs because:

- **Reproducibility**: everyone gets the same model artefacts.
- **Latency & cost**: no round-trips or token bills.
- **Privacy**: your inputs stay on your machine.

---

## ⚙️ What You’ll Set Up

- **Ollama** (daemon)
- **Compact instruct model** (e.g. `llama3:8b`)
- **Smoke test** (`tests/step-00.test.ts` using `vitest` + `ollama-js`)

---

## 🚀 Steps

### 1. Install Ollama

#### macOS

Download and install from [ollama.ai/download](https://ollama.com/download/mac).

#### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Then start the service (if not auto-started):

```bash
systemctl --user start ollama
```

#### Windows (via WSL2)

1. Install [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install).
2. Inside WSL (Ubuntu recommended), follow the Linux instructions above.

---

### 2. Pull the Model

```bash
ollama pull llama3:8b
```

---

### 3. Configure Environment

Copy the example file and set the default model:

```bash
cp .env.example .env
```

#### `.env`

```env
# .env

# The local model you expect to be present
OLLAMA_MODEL=llama3:8b

# If you need to override (e.g. WSL/remote host)
# OLLAMA_HOST=http://127.0.0.1:11434
```

### 4. Ensure the daemon is up &

```bash
ollama ps    # should return quickly with no error
# or:
ollama serve # foreground the server (Ctrl+C to stop)
```

### 5. Set up Node.js, Yarn, and dependencies

Using nvm + Corepack (recommended):

```bash
nvm install && nvm use # intall .nvmrc version of node
corepack enable        # enables Yarn bundled with Node
yarn install yarn      # install package.json dependencies
```

(If you prefer global Yarn: `npm i -g yarn && yarn`.)

### 6. Run the smoke test

```bash
yarn test
```

#### Expected:

- Test connects to Ollama successfully.
- Test confirms OLLAMA_MODEL is installed.
- Clear failure messages if either check fails (no side effects).

---

## ✅ Checklist

- ✅ Ollama installed and running
- ✅ `llama3:8b` (or your chosen) model pulled
- ✅ `.env` file created with `OLLAMA_MODEL=llama3:8b`
- ✅ `yarn test` passes (connectivity + model present)
- ✅ I can explain why offline-first matters

---

## 🔍 Troubleshooting

- **Model won’t load** → try a smaller quantised model (e.g. llama3:8b-instruct:q4_0).
- **Ollama not reachable** → ensure the service is running (ollama ps), or start ollama serve.
- **WSL networking issues** → set OLLAMA_HOST=http://127.0.0.1:11434 in .env.
- **Node/Yarn issues** → confirm node -v (LTS) and run corepack enable before yarn install.
