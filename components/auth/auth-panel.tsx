import { type ReactNode } from "react"

const FEATURES = [
  "Describe a system in plain English — AI maps it to the canvas",
  "Collaborate in real time with live cursors and shared nodes",
  "Import prebuilt starter designs for common architectures",
  "Export the final graph as a Markdown technical specification",
]

interface AuthPanelProps {
  children: ReactNode
}

export function AuthPanel({ children }: AuthPanelProps) {
  return (
    <div className="flex min-h-screen bg-base">
      {/* Left panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-[44%] xl:w-[40%] flex-col justify-center px-12 xl:px-16 border-r border-surface-border">
        <div className="max-w-sm">
          {/* Logo */}
          <div className="mb-8">
            <span className="text-xl font-semibold tracking-tight text-copy-primary">
              Ghost{" "}
              <span className="text-brand">AI</span>
            </span>
          </div>

          {/* Tagline */}
          <p className="text-2xl font-medium leading-snug text-copy-primary mb-3">
            System design,{" "}
            <br />
            done collaboratively.
          </p>
          <p className="text-sm text-copy-muted mb-8">
            Describe your architecture in plain English. Ghost turns it into a
            live, editable canvas — instantly.
          </p>

          {/* Feature list */}
          <ul className="space-y-3">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-copy-muted">
                <span className="mt-0.5 h-4 w-4 shrink-0 text-brand">›</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right panel — Clerk form */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        {children}
      </div>
    </div>
  )
}
