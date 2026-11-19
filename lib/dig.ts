/**
 * dig, as far as a browser can: DNS-over-HTTPS lookups against 1.1.1.1,
 * printed in dig's own transcript format. Shared by the footer console and
 * the 404 page.
 */

export const RESOLVER = "https://cloudflare-dns.com/dns-query"
const SERVER = ";; SERVER: 1.1.1.1#443(cloudflare-dns.com) (HTTPS)"
export const TIMEOUT_MS = 5000


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

export type Line =
  | { kind: "comment"; text: string }
  | { kind: "blank" }
  | { kind: "record"; cols: [string, string, string, string]; data: string }

export type Result = { lines: Line[]; summary: string }

const fqdn = (name: string) => (name.endsWith(".") ? name : `${name}.`)
const typeName = (n: number) => TYPE_NAMES[n] ?? `TYPE${n}`

// dig prints e.g. "Thu Nov 19 10:12:03 WIB 2026"
export function whenStamp(d: Date) {
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

export function banner(domain: string, type: string): { kind: "comment"; text: string } {
  return { kind: "comment", text: `; <<>> DiG-in-the-browser <<>> ${domain} ${type} +https` }
}

function format(domain: string, type: string, res: DohResponse, ms: number): Line[] {
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

/** Resolve name/type over DoH and return dig's transcript, or dig's error. */
export async function lookup(name: string, type: string): Promise<Result> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  const t0 = performance.now()
  try {
    const res = await fetch(`${RESOLVER}?name=${encodeURIComponent(name)}&type=${type}`, {
      headers: { accept: "application/dns-json" },
      signal: ctrl.signal,
      cache: "no-store",
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = (await res.json()) as DohResponse
    const ms = Math.round(performance.now() - t0)
    const n = json.Answer?.length ?? 0
    const status = RCODES[json.Status] ?? `RCODE${json.Status}`
    return {
      lines: format(name, type, json, ms),
      summary:
        json.Status === 0
          ? `${n} ${type} ${n === 1 ? "record" : "records"} for ${name}, ${ms} milliseconds`
          : `${status} for ${name}, ${ms} milliseconds`,
    }
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "AbortError"
    const reason = timedOut
      ? "timed out"
      : err instanceof Error && err.message.startsWith("HTTP")
        ? err.message
        : "connection failed"
    return {
      lines: [
        banner(name, type),
        { kind: "comment", text: `;; communications error to 1.1.1.1#443: ${reason}` },
        { kind: "comment", text: ";; no servers could be reached" },
      ],
      summary: `Lookup failed: ${reason}. Run it again to retry.`,
    }
  } finally {
    clearTimeout(timer)
  }
}
