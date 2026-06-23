import { AnimatePresence, motion } from 'motion/react'
import { useCopy } from '../lib/useCopy'
import { cn } from '../lib/cn'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

/** Icon button that swaps to a check + "Copied" on success. */
export function CopyButton({ text, label = 'Copy', className }: CopyButtonProps) {
  const { copied, copy } = useCopy()

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 backdrop-blur-sm',
        'text-xs font-medium text-muted transition-colors hover:text-fg hover:border-white/20',
        'outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        className,
      )}
      aria-label={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="done"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5 text-accent-2"
          >
            <CheckIcon />
            Copied
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1.5"
          >
            <CopyIcon />
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

function CopyIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
