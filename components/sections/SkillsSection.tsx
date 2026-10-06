import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"

interface SkillsSectionProps {
  skills: { title: string; items: string[] }[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="toolkit" className="bg-surface py-24 md:py-32">
      <div className="page-x">
        <Reveal>
          <SectionHeading index="04" label="Toolkit" title="What I reach for." />
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05} className="bg-background p-6 md:p-8">
              <p className="eyebrow mb-6">
                <span className="text-accent">{String.fromCharCode(97 + i)}.</span> {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-[0.95rem]">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
