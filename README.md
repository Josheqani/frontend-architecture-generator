# Frontend Architecture Generator

Describe a project, get a structured frontend architecture — streamed live from an LLM and rendered as animated, copyable sections. No explanations, no fluff: just the architecture.

Powered by [OpenRouter](https://openrouter.ai), so you can switch between DeepSeek, Mistral, Gemma, Llama, and Qwen from a single dropdown.

## Features

- **Streaming output** — the architecture renders token-by-token as the model responds.
- **Structured sections** — Stack, Folder Structure, Key Components, State Management, Routing Strategy, and Important Patterns, each in its own animated card.
- **Styled folder tree** — the ASCII tree is parsed and rendered as a monospace, syntax-tinted block.
- **Model selector** — pick from five OpenRouter models; the choice is shown in the result summary.
- **Two-phase UX** — a clean input form animates into a result view with a sticky context summary on the left.
- **Copy anywhere** — per-section copy buttons plus a single "Copy All".
- **Polished dark UI** — glassmorphism cards, an animated gradient-mesh background, grain texture, and a floating liquid-glass "Regenerate" button.
- **Graceful errors** — failures surface as a clean inline banner, never an alert.

## Tech Stack

| Layer        | Choice                                  |
| ------------ | --------------------------------------- |
| Framework    | React 19 + TypeScript                   |
| Build tool   | Vite 8                                   |
| Styling      | Tailwind CSS v4 (`@tailwindcss/vite`)   |
| Animation    | [Motion](https://motion.dev)            |
| Markdown     | `react-markdown` + `remark-gfm`         |
| LLM gateway  | OpenRouter Chat Completions (streaming) |

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io)
- An [OpenRouter API key](https://openrouter.ai/keys)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Add your API key
echo "VITE_OPENROUTER_API_KEY=sk-or-..." > .env

# 3. Start the dev server
pnpm dev
```

Then open the printed local URL (default: `http://localhost:5173`).

### Environment

| Variable                   | Description                  |
| -------------------------- | ---------------------------- |
| `VITE_OPENROUTER_API_KEY`  | Your OpenRouter API key.     |

> **Note:** Vite inlines `VITE_*` variables into the client bundle. This is fine for local use, but for a public deployment, route requests through a small backend proxy so the key never ships to the browser.

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `pnpm dev`     | Start the Vite dev server with HMR.  |
| `pnpm build`   | Type-check and build for production. |
| `pnpm preview` | Preview the production build.        |
| `pnpm lint`    | Run ESLint.                          |

## Project Structure

```
src/
├── components/
│   ├── ui/                  # Animated primitives: Button, Card, Input, Select, Skeleton
│   ├── ArchitectureForm.tsx # Input form (project details + model selector)
│   ├── SummaryCard.tsx      # Sticky "context chip" shown beside the result
│   ├── SectionCard.tsx      # One animated architecture section
│   ├── FolderTree.tsx       # Styled monospace ASCII-tree renderer
│   ├── Markdown.tsx         # Themed markdown renderer
│   ├── CopyButton.tsx       # Copy-to-clipboard with feedback
│   ├── RegenerateButton.tsx # Floating liquid-glass action
│   ├── StreamingIndicator.tsx
│   └── ErrorBanner.tsx
├── lib/
│   ├── openrouter.ts        # Streaming client, models, system prompt
│   ├── sections.ts          # Parses streamed markdown into sections
│   ├── useCopy.ts           # Clipboard hook
│   └── cn.ts                # className combiner
├── App.tsx                  # Two-phase orchestration
└── index.css                # Theme tokens, background, glass utilities
```

## How It Works

1. The form collects a project description, scale, framework preference, optional requirements, and a target model.
2. On submit, `streamArchitecture` posts to OpenRouter with a fixed system prompt that forces a strict, sectioned format.
3. The response stream is read incrementally, parsed into sections, and rendered as cards that fade in as they arrive.
4. The chosen model and inputs are pinned in a sticky summary; **Regenerate** re-runs the same request.

## Available Models

- `deepseek/deepseek-chat` — DeepSeek Chat *(default)*
- `mistralai/mistral-7b-instruct` — Mistral 7B
- `google/gemma-3-27b-it` — Gemma 3 27B
- `meta-llama/llama-3.1-8b-instruct` — Llama 3.1 8B
- `qwen/qwen-2.5-72b-instruct` — Qwen 2.5 72B

## License

MIT
