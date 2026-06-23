import { motion } from 'motion/react'

/** Clean inline error — no alerts, no popups. */
export function ErrorBanner({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3.5"
    >
      <svg
        className="mt-0.5 size-4 shrink-0 text-danger"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      </svg>
      <div className="min-w-0">
        <p className="text-sm font-medium text-fg">Generation failed</p>
        <p className="mt-0.5 break-words text-xs text-muted">{message}</p>
      </div>
    </motion.div>
  )
}
