import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { Input, Textarea } from './ui/Input'
import { Select } from './ui/Select'
import { StreamingIndicator } from './StreamingIndicator'
import { MODELS, type ArchitectureInput } from '../lib/openrouter'

const PROJECT_TYPES = ['SPA', 'Dashboard', 'E-commerce', 'Blog', 'Other']
const SCALES = ['Small', 'Medium', 'Large']
const FRAMEWORKS = ['Suggest one', 'React', 'Vue', 'Angular']
const MODEL_OPTIONS = MODELS.map((m) => ({ value: m.id, label: m.label }))

interface ArchitectureFormProps {
  value: ArchitectureInput
  onChange: (next: ArchitectureInput) => void
  onSubmit: () => void
  loading: boolean
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  )
}

export function ArchitectureForm({
  value,
  onChange,
  onSubmit,
  loading,
}: ArchitectureFormProps) {
  const set = <K extends keyof ArchitectureInput>(
    key: K,
    v: ArchitectureInput[K],
  ) => onChange({ ...value, [key]: v })

  const canSubmit = value.projectName.trim().length > 0 && !loading

  return (
    <Card>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (canSubmit) onSubmit()
        }}
        className="p-5 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Project name">
              <Input
                value={value.projectName}
                onChange={(e) => set('projectName', e.target.value)}
                placeholder="e.g. Acme Analytics Dashboard"
                autoFocus
              />
            </Field>
          </div>

          <Field label="Project type">
            <Select
              options={PROJECT_TYPES}
              value={value.projectType}
              onChange={(e) => set('projectType', e.target.value)}
            />
          </Field>

          <Field label="Scale">
            <Select
              options={SCALES}
              value={value.scale}
              onChange={(e) => set('scale', e.target.value)}
            />
          </Field>

          <Field label="Framework preference">
            <Select
              options={FRAMEWORKS}
              value={value.framework}
              onChange={(e) => set('framework', e.target.value)}
            />
          </Field>

          <div className="sm:col-span-2">
            <Field label="Model">
              <Select
                options={MODEL_OPTIONS}
                value={value.model}
                onChange={(e) => set('model', e.target.value)}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <Field label="Special requirements (optional)">
              <Textarea
                value={value.requirements}
                onChange={(e) => set('requirements', e.target.value)}
                placeholder="auth, SSR, i18n, real-time, offline-first…"
                rows={3}
              />
            </Field>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          {loading ? (
            <StreamingIndicator />
          ) : (
            <span className="text-xs text-faint">
              Structured architecture only — no fluff.
            </span>
          )}
          <Button type="submit" disabled={!canSubmit}>
            {loading ? 'Generating…' : 'Generate Architecture'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
