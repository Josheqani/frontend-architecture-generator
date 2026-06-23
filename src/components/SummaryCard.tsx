import { motion } from 'motion/react'
import { modelLabel, type ArchitectureInput } from '../lib/openrouter'

interface SummaryCardProps {
  input: ArchitectureInput
  onBack: () => void
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-faint">
        {label}
      </span>
      <span className="break-words text-sm text-fg">{value}</span>
    </div>
  )
}

/** Quiet "context chip" summarizing the user's inputs in the result view. */
export function SummaryCard({ input, onBack }: SummaryCardProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl
                 shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_16px_48px_-20px_rgba(0,0,0,0.7)]
                 lg:sticky lg:top-8 lg:self-start"
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted
                   transition-colors hover:text-fg outline-none focus-visible:text-fg"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5">
          <path d="m12 19-7-7 7-7M19 12H5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      <h2 className="mb-1 truncate text-base font-semibold tracking-tight text-fg">
        {input.projectName || 'Untitled project'}
      </h2>
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent-2">
        <span className="size-1.5 rounded-full bg-accent-2" />
        {modelLabel(input.model)}
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
        <Row label="Type" value={input.projectType} />
        <Row label="Scale" value={input.scale} />
        <Row label="Framework" value={input.framework} />
        {input.requirements.trim() && (
          <Row label="Requirements" value={input.requirements.trim()} />
        )}
      </div>
    </motion.aside>
  )
}
