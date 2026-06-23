import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/** Styled markdown for section bodies — tight, developer-focused typography. */
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        ul: (props) => (
          <ul className="space-y-1.5 text-sm text-muted" {...props} />
        ),
        ol: (props) => (
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-muted" {...props} />
        ),
        li: ({ children }) => (
          <li className="flex gap-2 leading-relaxed">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-accent/70" />
            <span className="min-w-0 flex-1">{children}</span>
          </li>
        ),
        p: (props) => (
          <p className="text-sm leading-relaxed text-muted [&:not(:first-child)]:mt-2" {...props} />
        ),
        strong: (props) => <strong className="font-semibold text-fg" {...props} />,
        code: (props) => (
          <code
            className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[12.5px] text-accent-2"
            {...props}
          />
        ),
        a: (props) => (
          <a className="text-accent-2 underline underline-offset-2" {...props} />
        ),
        h3: (props) => <h3 className="mt-3 text-sm font-semibold text-fg" {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
