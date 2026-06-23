export interface Section {
  title: string
  body: string
}

/** Canonical sections we expect from the system prompt, in display order. */
export const KNOWN_SECTIONS = [
  'Stack',
  'Folder Structure',
  'Key Components',
  'State Management',
  'Routing Strategy',
  'Important Patterns',
] as const

/**
 * Splits streamed markdown into `## `-delimited sections. Works incrementally:
 * a trailing partial section (still streaming) is returned with whatever body
 * has arrived so far.
 */
export function parseSections(markdown: string): Section[] {
  if (!markdown.trim()) return []

  const sections: Section[] = []
  const lines = markdown.split('\n')
  let current: Section | null = null

  for (const line of lines) {
    const heading = /^##\s+(.+?)\s*$/.exec(line)
    if (heading) {
      if (current) sections.push(current)
      current = { title: heading[1], body: '' }
    } else if (current) {
      current.body += (current.body ? '\n' : '') + line
    }
  }
  if (current) sections.push(current)

  return sections.map((s) => ({ title: s.title, body: s.body.trim() }))
}

/** True when a section title is the folder-structure tree. */
export function isFolderSection(title: string): boolean {
  return /folder\s*structure/i.test(title)
}
