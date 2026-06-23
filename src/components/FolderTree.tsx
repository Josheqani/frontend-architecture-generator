import { cn } from '../lib/cn'

/** Strip a single fenced code block wrapper if the model added one. */
function stripFence(text: string): string {
  const trimmed = text.trim()
  if (trimmed.startsWith('```')) {
    return trimmed
      .replace(/^```[a-zA-Z]*\n?/, '')
      .replace(/\n?```$/, '')
      .trim()
  }
  return trimmed
}

/**
 * Renders an ascii folder tree as a styled monospace block: directory entries
 * (and lines ending in `/`) get the accent color, tree-drawing glyphs are
 * dimmed, everything aligns on a mono grid.
 */
export function FolderTree({ text }: { text: string }) {
  const lines = stripFence(text).split('\n')

  return (
    <pre className="overflow-x-auto rounded-lg border border-white/10 bg-black/30 p-4 font-mono text-[13px] leading-6">
      {lines.map((line, i) => {
        // Separate the tree-drawing prefix from the entry name.
        const match = /^([\s│├└─|`+\-]*)(.*)$/.exec(line) ?? ['', '', line]
        const prefix = match[1] ?? ''
        const name = match[2] ?? ''
        const isDir = name.endsWith('/') || /^[\w.@-]+\/$/.test(name.trim())
        const isComment = name.includes('#')

        return (
          <div key={i} className="whitespace-pre">
            <span className="text-faint">{prefix}</span>
            <span
              className={cn(
                isDir && 'font-medium text-accent-2',
                isComment && 'text-faint',
                !isDir && !isComment && 'text-fg',
              )}
            >
              {name || ' '}
            </span>
          </div>
        )
      })}
    </pre>
  )
}
