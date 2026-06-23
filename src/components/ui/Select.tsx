import { cn } from '../../lib/cn'

type Option = string | { value: string; label: string }

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]
}

function normalize(opt: Option): { value: string; label: string } {
  return typeof opt === 'string' ? { value: opt, label: opt } : opt
}

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          'w-full appearance-none rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 pr-9',
          'text-sm text-fg outline-none backdrop-blur-sm transition-all duration-150',
          'focus:border-accent/70 focus:ring-2 focus:ring-accent/25 cursor-pointer',
          className,
        )}
        {...props}
      >
        {options.map((opt) => {
          const { value, label } = normalize(opt)
          return (
            <option key={value} value={value} className="bg-surface-2 text-fg">
              {label}
            </option>
          )
        })}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-faint"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
