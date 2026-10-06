import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import type { Experience } from "@/lib/data"

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="bg-surface py-24 md:py-32">
      <div className="page-x">
        <Reveal>
          <SectionHeading index="02" label="Experience" title="Where I've been shipping." />
        </Reveal>

        <ol>
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.05}>
              <li className="group flex flex-col gap-4 border-t py-10 md:flex-row md:gap-0">
                <p className="font-mono text-sm text-muted-foreground md:w-1/4 md:pt-1.5">
                  {i === 0 && <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />}
                  {exp.period}
                </p>
                <div className="md:w-3/4">
                  <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                    {exp.title}
                    <span className="text-muted-foreground"> at {exp.company}</span>
                  </h3>
                  <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{exp.description}</p>
                  <p className="mt-5 font-mono text-xs leading-relaxed text-muted-foreground">
                    {exp.stack.map((tech, j) => (
                      <span key={tech}>
                        <span className="text-foreground/80">{tech}</span>
                        {j < exp.stack.length - 1 && <span className="mx-2 text-accent">/</span>}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
