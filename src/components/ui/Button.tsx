import { motion, type HTMLMotionProps } from 'motion/react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'ghost' | 'subtle'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: Variant
}

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:brightness-110 shadow-[0_0_0_1px_rgba(124,92,255,0.4),0_8px_24px_-8px_rgba(124,92,255,0.5)]',
  ghost:
    'bg-transparent text-muted hover:text-fg hover:bg-surface-2 border border-border',
  subtle: 'bg-surface-2 text-fg hover:bg-border border border-border',
}

/** Animate UI style button — springy press + hover scale. */
export function Button({
  variant = 'primary',
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium',
        'transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
        'disabled:opacity-50 disabled:cursor-not-allowed select-none',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
