"use client"

import { useTheme } from "next-themes"
import { useEffect, useId, useState } from "react"
import { flushSync } from "react-dom"

type Theme = "light" | "dark"

const EASING = "cubic-bezier(0.65, 0, 0.35, 1)"

// next-themes applies the class in an effect; a view transition needs the DOM
// updated inside its callback, so apply it directly as well.
function applyThemeClass(theme: Theme) {
  const root = document.documentElement
  root.classList.remove("light", "dark")
  root.classList.add(theme)
  root.style.colorScheme = theme
}

// Like next-themes' disableTransitionOnChange, but leaves the icon morph ([data-morph]) running.
function suppressTransitions() {
  const style = document.createElement("style")
  style.textContent = "*:not([data-morph]),*::before,*::after{transition:none!important}"
  document.head.appendChild(style)
  return () => {
    void getComputedStyle(document.body).opacity
    setTimeout(() => style.remove(), 1)
  }
}

// A glowing line that only exists in the "new" snapshot, so it renders above the root.
function createScanline() {
  const line = document.createElement("div")
  line.setAttribute("aria-hidden", "true")
  Object.assign(line.style, {
    position: "fixed",
    left: "0",
    top: "-1px",
    width: "100%",
    height: "2px",
    pointerEvents: "none",
    background: "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--accent-2)))",
    boxShadow: "0 0 18px 3px hsl(var(--accent-2) / 0.55)",
    viewTransitionName: "theme-scanline",
  })
  document.body.appendChild(line)
  return line
}

function animateScan() {
  const timing = { duration: 750, easing: EASING }
  const h = innerHeight
  // Animate `top` rather than transform: clip-path runs on the main thread, and a
  // compositor-driven transform would drift a frame ahead of the wipe edge.
  document.documentElement.animate(
    { clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"] },
    { ...timing, pseudoElement: "::view-transition-new(root)" },
  )
  document.documentElement.animate(
    [
      { top: "0px", opacity: 1 },
      { top: `${h * 0.92}px`, opacity: 1, offset: 0.92 },
      { top: `${h}px`, opacity: 0 },
    ],
    { ...timing, pseudoElement: "::view-transition-new(theme-scanline)" },
  )
}

const rays = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4
  return { x1: 12 + 7 * Math.cos(a), y1: 12 + 7 * Math.sin(a), x2: 12 + 9.5 * Math.cos(a), y2: 12 + 9.5 * Math.sin(a) }
})

// Dark theme shows the sun (switch to light), light theme shows the moon.
function SunMoonIcon({ sun }: { sun: boolean }) {
  const maskId = useId()
  const t = "transform 500ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 300ms ease"
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 overflow-visible" aria-hidden>
      <mask id={maskId}>
        <rect width="24" height="24" fill="white" />
        <circle
          cx="18"
          cy="6"
          r="7"
          fill="black"
          data-morph
          style={{ transition: t, transform: sun ? "translate(8px, -8px)" : "translate(0, 0)" }}
        />
      </mask>
      <circle
        cx="12"
        cy="12"
        r="8"
        fill="currentColor"
        mask={`url(#${maskId})`}
        data-morph
        style={{ transition: t, transformBox: "fill-box", transformOrigin: "center", transform: sun ? "scale(0.55)" : "scale(1)" }}
      />
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        data-morph
        style={{
          transition: t,
          transformOrigin: "12px 12px",
          transform: sun ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0)",
          opacity: sun ? 1 : 0,
        }}
      >
        {rays.map((r, i) => (
          <line key={i} {...r} />
        ))}
      </g>
    </svg>
  )
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  const toggle = () => {
    const next: Theme = isDark ? "light" : "dark"
    const apply = () => {
      const restore = suppressTransitions()
      flushSync(() => setTheme(next))
      applyThemeClass(next)
      restore()
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (typeof document.startViewTransition !== "function" || reduceMotion) {
      apply()
      return
    }

    let scanline: HTMLElement | undefined
    const transition = document.startViewTransition(() => {
      apply()
      scanline = createScanline()
    })
    transition.ready.then(animateScan)
    transition.finished.finally(() => scanline?.remove())
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 place-items-center rounded-full border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      {mounted ? <SunMoonIcon sun={isDark} /> : <span className="h-4 w-4" />}
    </button>
  )
}
