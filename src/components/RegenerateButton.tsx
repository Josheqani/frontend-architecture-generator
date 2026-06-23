import { motion } from 'motion/react'

/**
 * Fixed, floating "liquid glass" regenerate button — pinned to the bottom
 * center of the viewport. Base surface is the accent color (no white tint);
 * a white sheen only sweeps across on hover.
 */
export function RegenerateButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="fixed inset-x-0 bottom-6 z-30 flex justify-center px-4"
    >
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full
                   border border-accent/50 bg-gradient-to-br from-accent via-accent to-accent-2
                   px-6 py-3 text-sm font-medium text-white backdrop-blur-xl backdrop-saturate-150 outline-none
                   shadow-[0_10px_36px_-6px_rgba(124,92,255,0.65),inset_0_1px_0_0_rgba(255,255,255,0.25),inset_0_-10px_22px_-12px_rgba(0,0,0,0.55)]
                   transition-[filter] duration-200 hover:brightness-110
                   focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        {/* Glossy top-half highlight, accent-tinted (not white) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full
                     bg-gradient-to-b from-accent-2/40 to-transparent"
        />
        {/* Moving liquid sheen — only on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
                     from-transparent via-white/30 to-transparent transition-transform duration-700
                     ease-out group-hover:translate-x-full"
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="relative size-4"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9 9 0 0 0-6.4 2.6L3 8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="relative">Regenerate</span>
      </motion.button>
    </motion.div>
  )
}
