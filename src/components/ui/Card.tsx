import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '../../lib/cn'

/** Animate UI style card — fades + lifts into place on mount. */
export function Card({ className, children, ...props }: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      className={cn(
        'rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-xl',
        'shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_16px_48px_-20px_rgba(0,0,0,0.7)]',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
