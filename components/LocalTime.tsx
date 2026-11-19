"use client"

import { presence } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type Clock = {
  iso: string
  time: string
  /** minutes the configured zone is ahead of the visitor (negative = behind) */
  delta: number
  state: "online" | "off" | "asleep"
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function read(date: Date): Clock {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: presence.timeZone,
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      timeZoneName: "longOffset",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )

  // "GMT+07:00" → 420; plain "GMT" → 0
  const m = /GMT([+-])(\d{2}):?(\d{2})?/.exec(parts.timeZoneName ?? "")
  const zoneOffset = m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0)) : 0
  const visitorOffset = -date.getTimezoneOffset()

  const hour = Number(parts.hour)
  const day = WEEKDAYS.indexOf(parts.weekday)
  const [workStart, workEnd] = presence.workHours
  const [wake, sleep] = presence.awakeHours
  const working = (presence.workDays as readonly number[]).includes(day) && hour >= workStart && hour < workEnd
  const awake = hour >= wake && hour < sleep

  return {
    iso: date.toISOString(),
    time: `${parts.hour}:${parts.minute}`,
    delta: zoneOffset - visitorOffset,
    state: working ? "online" : awake ? "off" : "asleep",
  }
}

/** Ticks on the minute boundary, and catches up when the tab returns. */
function useClock() {
  const [clock, setClock] = useState<Clock | null>(null)

  useEffect(() => {
    let timer = 0
    const tick = () => {
      const now = new Date()
      setClock(read(now))
      timer = window.setTimeout(tick, 60_000 - (now.getTime() % 60_000) + 50)
    }
    const onVisible = () => {
      if (document.visibilityState !== "visible") return
      window.clearTimeout(timer)
      tick()
    }
    tick()
    document.addEventListener("visibilitychange", onVisible)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [])

  return clock
}

function formatDelta(minutes: number) {
  const abs = Math.abs(minutes)
  const h = Math.floor(abs / 60)
  const m = abs % 60
  const span = [h && `${h}h`, m && `${m}m`].filter(Boolean).join(" ")
  return `${span} ${minutes > 0 ? "ahead of" : "behind"} you`
}

export function LocalTimeValue() {
  const clock = useClock()

  return (
    <span className="tabular-nums">
      {clock ? <time dateTime={clock.iso}>{clock.time}</time> : <span aria-hidden>--:--</span>}{" "}
      {presence.zoneLabel}
      {clock && clock.delta !== 0 && (
        <span className="block text-muted-foreground sm:inline">
          <span className="hidden sm:inline"> · </span>
          {formatDelta(clock.delta)}
        </span>
      )}
    </span>
  )
}

// Kept as short as "Online" so the status line never wraps differently
// depending on the time of day
const LABELS: Record<Clock["state"], string> = {
  online: "Online",
  off: "Away",
  asleep: "Asleep",
}

export function PresenceStatus() {
  const clock = useClock()
  const state = clock?.state

  return (
    <span className="flex items-center gap-2">
      <span className={cn("presence", !state && "opacity-0")} data-state={state} aria-hidden>
        {state === "online" && <span className="presence-ping animate-pulse_dot" />}
        <span className="presence-dot" />
      </span>
      <span className={cn("transition-opacity duration-300", !state && "opacity-0")}>
        {state ? LABELS[state] : LABELS.online}
      </span>
      · served from my home lab
    </span>
  )
}
