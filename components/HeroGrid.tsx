"use client"

import { useEffect, useRef, type CSSProperties } from "react"

// Must match the minor cell in .hero-paper (globals.css)
const CELL = 48
// The fixed nav covers the top of the hero; keep the readout below it
const NAV = 64

/**
 * Ordinate dimensioning on the hero's drawing sheet: the cursor snaps to the
 * nearest grid node, with extension lines to the top and left edges carrying
 * its coordinates. Mouse-only; touch and pen never see it.
 */
export function HeroGrid() {
  const layerRef = useRef<HTMLDivElement>(null)
  const xRef = useRef<HTMLSpanElement>(null)
  const yRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    const host = layer?.parentElement
    if (!layer || !host) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let frame = 0
    let last = ""

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect()
        const maxX = Math.floor((r.width - CELL) / CELL) * CELL
        const maxY = Math.floor((r.height - CELL) / CELL) * CELL
        const x = Math.min(maxX, Math.max(CELL, Math.round((e.clientX - r.left) / CELL) * CELL))
        const y = Math.min(maxY, Math.max(NAV + CELL, Math.round((e.clientY - r.top) / CELL) * CELL))
        const key = `${x},${y}`
        if (key === last) return
        last = key

        layer.style.setProperty("--gx", `${x}px`)
        layer.style.setProperty("--gy", `${y}px`)
        if (xRef.current) xRef.current.textContent = String(x)
        if (yRef.current) yRef.current.textContent = String(y)
        layer.dataset.active = "true"
      })
    }
    const leave = () => {
      cancelAnimationFrame(frame)
      last = ""
      layer.dataset.active = "false"
    }

    host.addEventListener("pointermove", move)
    host.addEventListener("pointerleave", leave)
    return () => {
      cancelAnimationFrame(frame)
      host.removeEventListener("pointermove", move)
      host.removeEventListener("pointerleave", leave)
    }
  }, [])

  return (
    <div
      ref={layerRef}
      aria-hidden
      data-active="false"
      className="hero-dim pointer-events-none absolute inset-0"
      style={{ "--nav": `${NAV}px` } as CSSProperties}
    >
      <span className="hero-dim-v" />
      <span className="hero-dim-h" />
      <span className="hero-dim-tag hero-dim-tag-x">
        X <span ref={xRef}>0</span>
      </span>
      <span className="hero-dim-tag hero-dim-tag-y">
        Y <span ref={yRef}>0</span>
      </span>
      <svg className="hero-dim-node" width="23" height="23" viewBox="0 0 23 23" fill="none">
        <circle cx="11.5" cy="11.5" r="4.5" stroke="currentColor" />
        <path d="M11.5 0v7M11.5 16v7M0 11.5h7M16 11.5h7" stroke="currentColor" />
      </svg>
    </div>
  )
}
