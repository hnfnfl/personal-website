import { now, profile } from "@/lib/data"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      <div aria-hidden className="grid-paper pointer-events-none absolute inset-0" />

      <div className="page-x relative flex min-h-[min(calc(100svh-4rem),56rem)] flex-col justify-between gap-16 py-16 md:py-20">
        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
          <p className="eyebrow flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse_dot rounded-full bg-signal" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            Online · served from my home lab
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-75">
              <h1 className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.045em]">
                <span className="text-gradient">Hanif</span> Naufal
                <br />
                Ashari.
              </h1>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-150">
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                <span className="text-foreground">{profile.role}</span> who loves building efficient, scalable
                systems, from DNS infrastructure at Samsung Research to native Android apps.
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-200">
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
                  className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:border-foreground/40"
                >
                  Get in touch
                </a>
                <div className="ml-1 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-foreground">
                    GitHub<ArrowUpRight className="ml-0.5 inline h-3 w-3" />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-foreground">
                    LinkedIn<ArrowUpRight className="ml-0.5 inline h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-300 lg:col-span-4">
            <dl className="rounded-lg border bg-surface/70 p-5 font-mono text-sm backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between border-b pb-3 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                <span>~/now</span>
                <span className="text-accent">{profile.katakana}</span>
              </div>
              {now.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 py-1.5">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
