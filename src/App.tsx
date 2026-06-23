import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArchitectureForm } from './components/ArchitectureForm'
import { SectionCard } from './components/SectionCard'
import { SummaryCard } from './components/SummaryCard'
import { SkeletonCard } from './components/ui/Skeleton'
import { ErrorBanner } from './components/ErrorBanner'
import { StreamingIndicator } from './components/StreamingIndicator'
import { CopyButton } from './components/CopyButton'
import { RegenerateButton } from './components/RegenerateButton'
import {
  streamArchitecture,
  DEFAULT_MODEL,
  type ArchitectureInput,
} from './lib/openrouter'
import { parseSections } from './lib/sections'

type Status = 'idle' | 'streaming' | 'done' | 'error'
type Phase = 'form' | 'result'

const INITIAL_INPUT: ArchitectureInput = {
  projectName: '',
  projectType: 'SPA',
  scale: 'Medium',
  framework: 'Suggest one',
  requirements: '',
  model: DEFAULT_MODEL,
}

export default function App() {
  const [input, setInput] = useState<ArchitectureInput>(INITIAL_INPUT)
  // Snapshot of the inputs used for the current generation (drives the summary).
  const [submitted, setSubmitted] = useState<ArchitectureInput>(INITIAL_INPUT)
  const [output, setOutput] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [phase, setPhase] = useState<Phase>('form')
  const [error, setError] = useState('')
  const abortRef = useRef<AbortController | null>(null)

  const sections = useMemo(() => parseSections(output), [output])

  async function generate(req: ArchitectureInput) {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setSubmitted(req)
    setPhase('result')
    setStatus('streaming')
    setError('')
    setOutput('')

    try {
      await streamArchitecture(
        req,
        (chunk) => setOutput((prev) => prev + chunk),
        controller.signal,
      )
      if (!controller.signal.aborted) setStatus('done')
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError((err as Error).message || 'Something went wrong.')
      setStatus('error')
    }
  }

  function back() {
    abortRef.current?.abort()
    setPhase('form')
    setStatus('idle')
    setOutput('')
    setError('')
  }

  const isStreaming = status === 'streaming'
  const showSkeleton = isStreaming && sections.length === 0
  const hasOutput = sections.length > 0

  return (
    <div className="mx-auto min-h-full w-full max-w-5xl px-4 py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="flex items-center gap-2.5 text-xl font-semibold tracking-tight text-fg">
          <span className="grid size-7 place-items-center rounded-lg bg-accent/15 text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
              <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </span>
          Frontend Architecture Generator
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Describe a project, get a structured architecture — streamed live.
        </p>
      </header>

      <AnimatePresence mode="wait">
        {phase === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className="mx-auto max-w-3xl"
          >
            <ArchitectureForm
              value={input}
              onChange={setInput}
              onSubmit={() => generate(input)}
              loading={isStreaming}
            />
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 240, damping: 26 }}
            className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]"
          >
            <SummaryCard input={submitted} onBack={back} />

            <main className="min-w-0 pb-24">
              <div className="mb-4 flex h-7 items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Architecture
                  </h2>
                  {isStreaming && <StreamingIndicator label="Streaming" />}
                </div>
                {hasOutput && <CopyButton text={output.trim()} label="Copy All" />}
              </div>

              {status === 'error' ? (
                <ErrorBanner message={error} />
              ) : showSkeleton ? (
                <div className="space-y-4">
                  <SkeletonCard />
                  <SkeletonCard />
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence initial={false}>
                    {sections.map((section, i) => (
                      <SectionCard key={section.title} section={section} index={i} />
                    ))}
                  </AnimatePresence>
                </div>
              )}

            </main>

            <AnimatePresence>
              {(status === 'done' || status === 'error') && (
                <RegenerateButton onClick={() => generate(submitted)} />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
