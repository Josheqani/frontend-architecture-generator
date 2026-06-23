import { motion } from 'motion/react'
import { cn } from '../../lib/cn'

/** Animate UI style skeleton — soft pulsing shimmer. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      className={cn('rounded-md bg-border-strong/60', className)}
    />
  )
}

/** A card-shaped cluster of skeleton lines, used while the AI warms up. */
export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <Skeleton className="mb-4 h-4 w-32" />
      <div className="space-y-2.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[92%]" />
        <Skeleton className="h-3 w-[78%]" />
        <Skeleton className="h-3 w-[85%]" />
      </div>
    </div>
  )
}
