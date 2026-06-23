export interface ArchitectureInput {
  projectName: string
  projectType: string
  scale: string
  framework: string
  requirements: string
  model: string
}

/** Models offered in the selector. `id` is sent to OpenRouter. */
export const MODELS = [
  { id: 'deepseek/deepseek-chat', label: 'DeepSeek Chat' },
  { id: 'mistralai/mistral-7b-instruct', label: 'Mistral 7B' },
  { id: 'google/gemma-3-27b-it', label: 'Gemma 3 27B' },
  { id: 'meta-llama/llama-3.1-8b-instruct', label: 'Llama 3.1 8B' },
  { id: 'qwen/qwen-2.5-72b-instruct', label: 'Qwen 2.5 72B' },
] as const

export const DEFAULT_MODEL = MODELS[0].id

/** Human label for a model id, falling back to the raw id. */
export function modelLabel(id: string): string {
  return MODELS.find((m) => m.id === id)?.label ?? id
}

const SYSTEM_PROMPT = `You are a senior frontend architect. Based on the project description, respond ONLY with a structured architecture. No introductions, no explanations, no conclusions. Output format must be exactly:

## Stack
[list the recommended tech with one-line reason each]

## Folder Structure
[ascii tree]

## Key Components
[component name → responsibility, one line each]

## State Management
[approach and library]

## Routing Strategy
[approach]

## Important Patterns
[bullet list]`

function buildUserPrompt(input: ArchitectureInput): string {
  const lines = [
    `Project name: ${input.projectName}`,
    `Project type: ${input.projectType}`,
    `Scale: ${input.scale}`,
    `Framework preference: ${input.framework}`,
  ]
  if (input.requirements.trim()) {
    lines.push(`Special requirements: ${input.requirements.trim()}`)
  }
  return lines.join('\n')
}

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions'

/**
 * Streams the architecture from OpenRouter, invoking `onToken` with each
 * incremental chunk of text. Resolves when the stream completes.
 * Throws a human-readable Error on failure.
 */
export async function streamArchitecture(
  input: ArchitectureInput,
  onToken: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined
  if (!apiKey) {
    throw new Error('Missing VITE_OPENROUTER_API_KEY in environment.')
  }

  let res: Response
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Frontend Architecture Generator',
      },
      signal,
      body: JSON.stringify({
        model: input.model || DEFAULT_MODEL,
        stream: true,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(input) },
        ],
      }),
    })
  } catch (err) {
    if ((err as Error).name === 'AbortError') throw err
    throw new Error('Network error — could not reach OpenRouter.')
  }

  if (!res.ok) {
    let detail = ''
    try {
      const body = await res.json()
      detail = body?.error?.message ?? ''
    } catch {
      /* ignore non-JSON error bodies */
    }
    throw new Error(
      `OpenRouter request failed (${res.status})${detail ? `: ${detail}` : ''}`,
    )
  }

  if (!res.body) {
    throw new Error('OpenRouter returned an empty response stream.')
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    // SSE frames are separated by double newlines.
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const raw of lines) {
      const line = raw.trim()
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') return
      if (!data) continue
      try {
        const parsed = JSON.parse(data)
        const delta: string | undefined = parsed?.choices?.[0]?.delta?.content
        if (delta) onToken(delta)
      } catch {
        /* partial JSON across chunk boundaries — safe to skip */
      }
    }
  }
}
