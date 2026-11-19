"use client"

import { DigTranscript } from "@/components/DigTranscript"
import { whenStamp, type Line } from "@/lib/dig"
import { useEffect, useState } from "react"

const MAX_PATH = 72

function readPath() {
  let path = window.location.pathname
  try {
    path = decodeURI(path)
  } catch {}
  return path.length > MAX_PATH ? `${path.slice(0, MAX_PATH - 1)}…` : path
}

/**
 * A dig transcript for the missing page, made up on purpose: PAGE is not a
 * DNS type and nothing leaves the browser. Querying real DNS for the path
 * would turn this page into a subdomain oracle (and could print the IP of a
 * DNS-only host), so it stays a joke told in dig's format.
 */
function transcript(domain: string, path: string): Line[] {
  const name = `${domain}${path}.`
  const nameW = Math.max(name.length + 1, domain.length + 1) + 2
  return [
    { kind: "comment", text: `; <<>> DiG-in-the-browser <<>> ${domain}${path} PAGE` },
    { kind: "comment", text: ";; Got answer:" },
    { kind: "comment", text: ";; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 404" },
    { kind: "comment", text: ";; flags: qr aa; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 0" },
    { kind: "blank" },
    { kind: "comment", text: ";; QUESTION SECTION:" },
    { kind: "comment", text: `;${name}`.padEnd(nameW) + "".padEnd(6) + "IN  PAGE" },
    { kind: "blank" },
    { kind: "comment", text: ";; AUTHORITY SECTION:" },
    { kind: "record", cols: [`${domain}.`.padEnd(nameW), "3600  ", "IN  ", "PAGE   "], data: "/" },
    { kind: "blank" },
    { kind: "comment", text: ";; SERVER: this page (no packets were sent)" },
    { kind: "comment", text: `;; WHEN: ${whenStamp(new Date())}` },
  ]
}

export function NotFoundDig({ domain }: { domain: string }) {
  const [path, setPath] = useState<string | null>(null)

  useEffect(() => setPath(readPath()), [])

  const shown = `${domain}${path ?? "/…"}`

  return (
    <div className="dig" role="region" aria-label={`Lookup for ${shown}`}>
      <div className="dig-bar">
        <p className="min-w-0 truncate py-1">
          <span className="text-accent">$</span> dig <span className="text-foreground">{shown}</span> PAGE
        </p>
      </div>
      {path === null ? (
        <pre className="dig-out" aria-busy>
          <span className="dig-line dig-c">; &lt;&lt;&gt;&gt; DiG-in-the-browser &lt;&lt;&gt;&gt; {shown} PAGE</span>
        </pre>
      ) : (
        <DigTranscript lines={transcript(domain, path)} cascade />
      )}
    </div>
  )
}
