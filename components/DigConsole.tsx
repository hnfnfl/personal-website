"use client"

import { cn } from "@/lib/utils"
import { CornerDownLeft, RotateCw, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

const RESOLVER = "https://cloudflare-dns.com/dns-query"
const SERVER = ";; SERVER: 1.1.1.1#443(cloudflare-dns.com) (HTTPS)"
const TIMEOUT_MS = 5000

const TYPES = ["A", "NS"] as const
type RecordType = (typeof TYPES)[number]

const TYPE_NAMES: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  15: "MX",
  16: "TXT",
  28: "AAAA",
  65: "HTTPS",
  257: "CAA",
}
const RCODES: Record<number, string> = {
  0: "NOERROR",
  1: "FORMERR",
  2: "SERVFAIL",
  3: "NXDOMAIN",
  4: "NOTIMP",
  5: "REFUSED",
}

type RR = { name: string; type: number; TTL: number; data: string }
type DohResponse = {
  Status: number
  TC: boolean
  RD: boolean
  RA: boolean
  AD: boolean
  CD: boolean
  Answer?: RR[]
  Authority?: RR[]
}

type Line =
  | { kind: "comment"; text: string }
  | { kind: "blank" }
  | { kind: "record"; cols: [string, string, string, string]; data: string }

type Result = { lines: Line[]; summary: string }

const fqdn = (name: string) => (name.endsWith(".") ? name : `${name}.`)
const typeName = (n: number) => TYPE_NAMES[n] ?? `TYPE${n}`

// dig prints e.g. "Thu Nov 19 10:12:03 WIB 2026"
function whenStamp(d: Date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
      year: "numeric",
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  )
  return `${parts.weekday} ${parts.month} ${parts.day} ${parts.hour}:${parts.minute}:${parts.second} ${parts.timeZoneName} ${parts.year}`
}

function banner(domain: string, type: RecordType): { kind: "comment"; text: string } {
  return { kind: "comment", text: `; <<>> DiG-in-the-browser <<>> ${domain} ${type} +https` }
}

function format(domain: string, type: RecordType, res: DohResponse, ms: number): Line[] {
  const answer = res.Answer ?? []
  const authority = res.Authority ?? []
  const all = [...answer, ...authority]
  const nameW = Math.max(fqdn(domain).length + 1, ...all.map((r) => fqdn(r.name).length)) + 2
  const ttlW = Math.max(6, ...all.map((r) => String(r.TTL).length + 2))

  const flags = ["qr", res.RD && "rd", res.RA && "ra", res.AD && "ad", res.CD && "cd", res.TC && "tc"]
    .filter(Boolean)
    .join(" ")
  const id = Math.floor(Math.random() * 65536)
  const record = (r: RR): Line => ({
    kind: "record",
    cols: [fqdn(r.name).padEnd(nameW), String(r.TTL).padEnd(ttlW), "IN  ", typeName(r.type).padEnd(7)],
    data: r.data,
  })

  const lines: Line[] = [
    banner(domain, type),
    { kind: "comment", text: ";; Got answer:" },
    {
      kind: "comment",
      text: `;; ->>HEADER<<- opcode: QUERY, status: ${RCODES[res.Status] ?? `RCODE${res.Status}`}, id: ${id}`,
    },
    {
      kind: "comment",
      text: `;; flags: ${flags}; QUERY: 1, ANSWER: ${answer.length}, AUTHORITY: ${authority.length}, ADDITIONAL: 0`,
    },
    { kind: "blank" },
    { kind: "comment", text: ";; QUESTION SECTION:" },
    { kind: "comment", text: `;${fqdn(domain)}`.padEnd(nameW) + "".padEnd(ttlW) + "IN  " + type },
  ]
  if (answer.length) {
    lines.push({ kind: "blank" }, { kind: "comment", text: ";; ANSWER SECTION:" }, ...answer.map(record))
  }
  if (authority.length) {
    lines.push({ kind: "blank" }, { kind: "comment", text: ";; AUTHORITY SECTION:" }, ...authority.map(record))
  }
  lines.push(
    { kind: "blank" },
    { kind: "comment", text: `;; Query time: ${ms} msec` },
    { kind: "comment", text: SERVER },
    { kind: "comment", text: `;; WHEN: ${whenStamp(new Date())}` },
  )
  return lines
}

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
      const ctrl = new AbortController()
      const timer = window.setTimeout(() => ctrl.abort(), TIMEOUT_MS)
      const t0 = performance.now()
      try {
        const res = await fetch(`${RESOLVER}?name=${encodeURIComponent(domain)}&type=${t}`, {
          headers: { accept: "application/dns-json" },
          signal: ctrl.signal,
          cache: "no-store",
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as DohResponse
        const ms = Math.round(performance.now() - t0)
        if (mine !== seq.current) return
        const n = json.Answer?.length ?? 0
        setResult({
          lines: format(domain, t, json, ms),
          summary: `${n} ${t} ${n === 1 ? "record" : "records"} for ${domain}, ${ms} milliseconds`,
        })
      } catch (err) {
        if (mine !== seq.current) return
        const timedOut = err instanceof DOMException && err.name === "AbortError"
        const reason = timedOut ? "timed out" : err instanceof Error && err.message.startsWith("HTTP") ? err.message : "connection failed"
        setResult({
          lines: [
            banner(domain, t),
            { kind: "comment", text: `;; communications error to 1.1.1.1#443: ${reason}` },
            { kind: "comment", text: ";; no servers could be reached" },
          ],
          summary: `Lookup failed: ${reason}. Run it again to retry.`,
        })
      } finally {
        window.clearTimeout(timer)
        if (mine === seq.current) setBusy(false)
      }
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

          <pre className="dig-out" aria-busy={busy}>
            {!result ? (
              <>
                <span className="dig-line dig-line-in dig-c">{banner(domain, type).text}</span>
                <span className="dig-line dig-line-in dig-c">
                  ;; querying 1.1.1.1#443<span className="dig-caret" />
                </span>
              </>
            ) : (
              result.lines.map((line, i) => (
                <span key={i} className={cn("dig-line", cascade && "dig-line-in")} style={{ "--i": i } as CSSProperties}>
                  {line.kind === "blank" ? (
                    " "
                  ) : line.kind === "comment" ? (
                    <span className="dig-c">{line.text}</span>
                  ) : (
                    <>
                      <span className="text-foreground">{line.cols[0]}</span>
                      <span className="dig-c">{line.cols[1] + line.cols[2]}</span>
                      <span className="dig-t">{line.cols[3]}</span>
                      <span className="dig-d">{line.data}</span>
                    </>
                  )}
                </span>
              ))
            )}
          </pre>
          <p className="sr-only" aria-live="polite">
            {result?.summary ?? ""}
          </p>
        </div>
      )}
    </>
  )
}
