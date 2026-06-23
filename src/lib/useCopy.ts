import { useCallback, useRef, useState } from 'react'

/** Copies text to the clipboard and exposes a transient `copied` flag. */
export function useCopy(timeout = 1600) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        if (timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), timeout)
      } catch {
        /* clipboard blocked — fail silently, no popups by design */
      }
    },
    [timeout],
  )

  return { copied, copy }
}
