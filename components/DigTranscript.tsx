import type { Line } from "@/lib/dig"
import { cn } from "@/lib/utils"
import type { CSSProperties } from "react"

/** dig's output, coloured by role: comments muted, record types and data picked out. */
export function DigTranscript({ lines, cascade, busy }: { lines: Line[]; cascade?: boolean; busy?: boolean }) {
  return (
    <pre className="dig-out" aria-busy={busy}>
      {lines.map((line, i) => (
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
      ))}
    </pre>
  )
}
