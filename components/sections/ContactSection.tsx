"use client"

import { Reveal } from "@/components/Reveal"
import { profile } from "@/lib/data"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="py-24 md:py-40">
      <div className="page-x">
        <Reveal>
          <p className="eyebrow mb-8">
            <span className="text-accent">05</span> / Contact
          </p>
          <h2 className="max-w-4xl text-balance text-[clamp(2.5rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.04em]">
            Have a project in mind? <span className="text-muted-foreground">Let&apos;s build it.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-3 text-xl tracking-tight md:text-3xl"
            >
              <span className="link-underline">{profile.email}</span>
              <ArrowUpRight className="h-6 w-6 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground sm:ml-4"
              aria-live="polite"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-signal" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="mt-16 grid grid-cols-1 border-t sm:grid-cols-3">
            {[
              { label: "GitHub", value: `@${profile.handle}`, href: profile.github },
              { label: "LinkedIn", value: profile.handle, href: profile.linkedin },
              { label: "Email", value: "Say hello", href: `mailto:${profile.email}` },
            ].map((item) => (
              <li key={item.label} className="border-b sm:border-b-0 sm:border-r sm:last:border-r-0">
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between py-6 transition-colors hover:text-accent sm:px-6 sm:first:pl-0"
                >
                  <span>
                    <span className="eyebrow block">{item.label}</span>
                    <span className="mt-1 block text-lg">{item.value}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
