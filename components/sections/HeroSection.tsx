import { now, profile } from "@/lib/data"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div aria-hidden className="hero-paper pointer-events-none absolute inset-0" />

      <div className="page-x relative grid min-h-[min(calc(100svh-4rem),56rem)] items-end gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both [animation-duration:700ms] lg:col-span-7 lg:pb-2">
          <h1 className="hero-name font-medium">
            <span className="text-gradient">Hanif</span>
            <br />
            Naufal
            <br />
            Ashari.
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              See selected work
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-5 py-3 text-sm font-medium transition-colors hover:border-foreground/40"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="relative animate-in fade-in slide-in-from-bottom-4 fill-mode-both [animation-duration:700ms] delay-150 lg:col-span-5">
          <span aria-hidden className="hero-tick -left-2 -top-2 border-l border-t" />
          <span aria-hidden className="hero-tick -right-2 -top-2 border-r border-t" />
          <span aria-hidden className="hero-tick -bottom-2 -left-2 border-b border-l" />
          <span aria-hidden className="hero-tick -bottom-2 -right-2 border-b border-r" />

          <div className="hero-block rounded-[3px]">
            <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>~/now</span>
              <span className="normal-case tracking-normal text-accent">{profile.katakana}</span>
            </div>
            <p className="text-pretty px-4 py-4 text-base leading-relaxed text-muted-foreground">
              <span className="text-foreground">{profile.role}</span> who loves building efficient, scalable
              systems, from DNS infrastructure at Samsung Research to native Android apps.
            </p>
            <dl className="hero-rows">
              {now.map((row) => (
                <div key={row.label} className="hero-row">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse_dot rounded-full bg-signal" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                Online · served from my home lab
              </span>
              <span className="flex items-center gap-4">
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-foreground">
                  GitHub<ArrowUpRight className="ml-0.5 inline h-3 w-3" />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-foreground">
                  LinkedIn<ArrowUpRight className="ml-0.5 inline h-3 w-3" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
