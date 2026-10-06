import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { profile } from "@/lib/data"

const interests = ["Automation", "System architecture", "Home lab", "Open source", "日本語"]

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="page-x">
        <Reveal>
          <SectionHeading index="01" label="About" title="Simple, solid solutions to complex problems." />
        </Reveal>

        <div className="flex flex-col gap-12 md:flex-row md:gap-0">
          <Reveal className="md:w-1/4 md:pr-8">
            <p className="font-mono text-sm text-muted-foreground">
              Building software
              <br />
              since <span className="text-foreground">{profile.startYear}</span>
            </p>
          </Reveal>

          <div className="md:w-3/4">
            <Reveal delay={0.05}>
              <div className="max-w-2xl space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                <p>
                  <span className="text-foreground">こんにちは! I&apos;m Hanif</span>, a backend developer specializing in
                  Go and native Android with Kotlin. I&apos;m currently a Cloud Engineer at Samsung Research Indonesia,
                  where I help design and maintain backend systems for cloud-native, real-world business needs.
                </p>
                <p>
                  I&apos;m passionate about automation, system architecture, and tools that make development faster and
                  cleaner. Outside of work I&apos;m learning Japanese, diving into open source, and tinkering with my home
                  lab. <span className="text-foreground">This website runs on my own server.</span>
                </p>
                <p>
                  I enjoy tech meetups and online communities, because sharing knowledge is how we all get better. If
                  you&apos;d like to connect or collaborate, my inbox is open.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 flex flex-wrap gap-2">
                {interests.map((item) => (
                  <li key={item} className="rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
