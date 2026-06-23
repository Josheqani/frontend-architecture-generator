import { motion } from 'motion/react'

/** Subtle three-dot pulse shown while the AI is responding. */
export function StreamingIndicator({ label = 'Generating' }: { label?: string }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-medium text-muted">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block size-1.5 rounded-full bg-accent"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      {label}
    </div>
  )
}
