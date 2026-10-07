"use client"

import { ThemeToggle } from "@/components/ThemeToggle"
import { profile } from "@/lib/data"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "toolkit", label: "Toolkit" },
  { id: "contact", label: "Contact" },
]

export function Navigation() {
  const [active, setActive] = useState<string>("")
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    ;["home", ...sections.map((s) => s.id)].forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        open
          ? "border-b bg-background"
          : scrolled
            ? "border-b bg-background/80 backdrop-blur-md"
            : "border-b border-transparent"
      }`}
    >
      <nav className="page-x flex h-16 items-center justify-between" aria-label="Main">
        <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-accent text-[0.6rem] font-semibold tracking-tight text-accent-foreground">
            {profile.katakana}
          </span>
          <span className="font-mono text-sm tracking-tight">
            hanifnaufal
            <span className="text-muted-foreground transition-colors group-hover:text-accent">.com</span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <ul className="mr-4 hidden items-center gap-7 md:flex">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`group flex items-baseline gap-1.5 text-sm transition-colors ${
                    active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.65rem] transition-colors ${
                      active === s.id ? "text-accent" : "text-muted-foreground/70"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border text-muted-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="page-x flex flex-col pb-6">
              {sections.map((s, i) => (
                <li key={s.id} className="border-t first:border-t-0">
                  <a
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-3 py-4 text-2xl tracking-tight"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
