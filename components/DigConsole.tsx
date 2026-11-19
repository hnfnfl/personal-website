"use client"

import { DigTranscript } from "@/components/DigTranscript"
import { banner, lookup, type Result } from "@/lib/dig"
import { cn } from "@/lib/utils"
import { CornerDownLeft, RotateCw, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

const TYPES = ["A", "NS"] as const
type RecordType = (typeof TYPES)[number]

/**
 * A real `dig` for the site's own domain, resolved in the visitor's browser
 * over DNS-over-HTTPS and printed the way dig prints it.
 */
export function DigConsole({ domain, children }: { domain: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<RecordType>("A")
  // The last answer stays on screen while the next query is in flight, then
  // gets replaced in place: no blank frame, no height collapse between types.
  const [result, setResult] = useState<Result | null>(null)
  const [busy, setBusy] = useState(false)
  // Lines cascade in only for the first answer after opening
  const [cascade, setCascade] = useState(true)
  const seq = useRef(0)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const query = useCallback(
    async (t: RecordType) => {
      const mine = ++seq.current
      setBusy(true)
      const result = await lookup(domain, t)
      if (mine !== seq.current) return
      setResult(result)
      setBusy(false)
    },
    [domain],
  )

  const toggle = () => {
    if (open) {
      setOpen(false)
      return
    }
    setResult(null)
    setCascade(true)
    setOpen(true)
    query(type)
  }

  const rerun = (t: RecordType) => {
    setType(t)
    setCascade(false)
    query(t)
  }

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  const hasResult = result !== null

  // The panel opens at the very bottom of the page: bring it into view
  useEffect(() => {
    if (!open) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    panelRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" })
  }, [open, hasResult])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close])

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-8">
        {children}
        <button
          ref={toggleRef}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="dig-panel"
          className="group inline-flex items-center gap-1.5 self-start rounded-[2px] text-left transition-colors hover:text-foreground sm:self-auto"
        >
          <span className="text-accent">$</span>
          <span>
            dig <span className="link-underline text-foreground">{domain}</span>
          </span>
          <CornerDownLeft className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" aria-hidden />
        </button>
      </div>

      {open && (
        <div
          ref={panelRef}
          id="dig-panel"
          role="region"
          aria-label={`DNS lookup for ${domain}`}
          className="dig mt-6 animate-in fade-in slide-in-from-bottom-2 [animation-duration:400ms]"
        >
          <div className="dig-bar">
            <p className="min-w-0 truncate">
              <span className="text-accent">$</span> dig {domain}{" "}
              <span className="text-foreground">{type}</span> +https
            </p>
            <div className="flex items-center gap-3">
              <div role="group" aria-label="Record type" className="dig-types">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={t === type}
                    disabled={busy && t === type}
                    onClick={() => rerun(t)}
                    className="dig-type"
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => rerun(type)}
                disabled={busy}
                className="dig-icon"
                aria-label="Run the lookup again"
              >
                <RotateCw className={cn("h-3.5 w-3.5", busy && "animate-spin")} aria-hidden />
              </button>
              <button type="button" onClick={close} className="dig-icon" aria-label="Close the lookup">
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            </div>
          </div>

          {result ? (
            <DigTranscript lines={result.lines} cascade={cascade} busy={busy} />
          ) : (
            <pre className="dig-out" aria-busy>
              <span className="dig-line dig-line-in dig-c">{banner(domain, type).text}</span>
              <span className="dig-line dig-line-in dig-c">
                ;; querying 1.1.1.1#443<span className="dig-caret" />
              </span>
            </pre>
          )}
          <p className="sr-only" aria-live="polite">
            {result?.summary ?? ""}
          </p>
        </div>
      )}
    </>
  )
}
