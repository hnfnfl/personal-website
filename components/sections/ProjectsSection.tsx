"use client"

import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import type { Project, ProjectCategory } from "@/lib/data"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import { useState } from "react"

interface ProjectsSectionProps {
  projects: Project[]
}

const filters: { id: "all" | ProjectCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
]

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all")
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="page-x">
        <Reveal>
          <SectionHeading index="03" label="Work" title="Selected projects, from APIs to app stores." />
        </Reveal>

        <div className="flex flex-col gap-8 md:flex-row md:gap-0">
          <div className="md:w-1/4 md:pr-8">
            <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-2 md:sticky md:top-24 md:flex-col md:items-start md:gap-1">
              {filters.map((f) => {
                const count = f.id === "all" ? projects.length : projects.filter((p) => p.category === f.id).length
                const selected = filter === f.id
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setFilter(f.id)}
                    className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors md:rounded-none md:border-0 md:px-0 md:py-1 md:text-sm ${
                      selected
                        ? "border-foreground bg-foreground text-background md:bg-transparent md:text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`hidden md:inline ${selected ? "text-accent" : "text-transparent"}`}>→ </span>
                    {f.label} <span className="opacity-60">({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          <ul className="md:w-3/4">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project.title}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-t last:border-b"
                >
                  <ProjectRow project={project} index={projects.indexOf(project) + 1} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group grid grid-cols-[2.5rem_1fr] gap-x-4 py-7 transition-colors md:grid-cols-[3rem_1fr_auto] md:gap-x-6">
      <span className="pt-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-accent">
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-xl font-medium tracking-tight md:text-2xl">{project.title}</h3>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
            {project.category}
          </span>
        </div>
        <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
        <p className="mt-3 font-mono text-xs text-muted-foreground">{project.stack.join(" · ")}</p>
      </div>
      <div className="col-start-2 mt-4 flex items-start gap-2 md:col-start-3 md:mt-1">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent hover:text-accent"
          >
            Live <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Source code for ${project.title}`}
            className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent hover:text-accent"
          >
            <Github className="h-3.5 w-3.5" /> Code
          </a>
        )}
        {!project.link && !project.github && (
          <span className="px-1 py-1.5 font-mono text-xs text-muted-foreground/70">No public link</span>
        )}
      </div>
    </article>
  )
}
