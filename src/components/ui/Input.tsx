import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const base =
  'w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-fg ' +
  'placeholder:text-faint outline-none backdrop-blur-sm transition-all duration-150 ' +
  'focus:border-accent/70 focus:ring-2 focus:ring-accent/25'

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(base, className)} {...props} />
))
Input.displayName = 'Input'

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(base, 'resize-none leading-relaxed', className)}
    {...props}
  />
))
Textarea.displayName = 'Textarea'
