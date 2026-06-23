import { Card } from './ui/Card'
import { CopyButton } from './CopyButton'
import { FolderTree } from './FolderTree'
import { Markdown } from './Markdown'
import { isFolderSection, type Section } from '../lib/sections'

interface SectionCardProps {
  section: Section
  index: number
}

/** A single architecture section as an animated card with its own copy button. */
export function SectionCard({ section, index }: SectionCardProps) {
  const folder = isFolderSection(section.title)
  const copyText = `## ${section.title}\n${section.body}`

  return (
    <Card transition={{ delay: index * 0.06, type: 'spring', stiffness: 220, damping: 26 }}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <h2 className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-fg">
          <span className="font-mono text-xs text-faint">
            {String(index + 1).padStart(2, '0')}
          </span>
          {section.title}
        </h2>
        {section.body && <CopyButton text={copyText} />}
      </div>
      <div className="px-5 py-4">
        {section.body ? (
          folder ? (
            <FolderTree text={section.body} />
          ) : (
            <Markdown>{section.body}</Markdown>
          )
        ) : (
          <span className="text-xs text-faint">…</span>
        )}
      </div>
    </Card>
  )
}
