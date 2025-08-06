import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Cloud, Code, Smartphone } from "lucide-react"
import React from "react"

interface SkillsSectionProps {
  skills: {
    fullstack: string[]
    cloud: string[]
    networking: string[]
    mobile: string[]
  }
}

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  description: string
  skills: string[]
  delay: number
}

function SkillCard({ icon, title, description, skills, delay }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="skill-card-background rounded-xl p-6 glow-card group"
    >
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 glow-icon">
          {icon}
        </div>
        <h3 className="text-theme text-xl font-semibold mb-2 group-hover:text-cyanBlueTheme-light-primary dark:group-hover:text-cyanBlueTheme-dark-primary transition-colors duration-300">{title}</h3>
        <p className="subtext-theme text-sm leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors duration-300">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="bg-blue-300/80 dark:bg-blue-500/20 text-blue-500 dark:text-blue-300 border-blue-500/30 glow-badge"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </motion.div>
  )
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 bg-slate-200/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-theme">Technical </span>
            <span className="gradient-text-cyan-blue">Skills</span>
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkillCard
            icon={<Code className="w-6 h-6 text-cyan-400" />}
            title="Backend & Frontend Development"
            description="Building scalable web applications with modern frameworks, APIs, and databases"
            skills={skills.fullstack}
            delay={0 * 0.1}
          />
          <SkillCard
            icon={<Cloud className="w-6 h-6 text-cyan-400" />}
            title="Cloud Engineering"
            description="Designing and deploying scalable cloud infrastructure"
            skills={skills.cloud}
            delay={1 * 0.1}
          />
          <SkillCard
            icon={
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v6m0 6v6" />
              </svg>
            }
            title="Network Engineering"
            description="Optimizing network architecture and ensuring secure connections"
            skills={skills.networking}
            delay={2 * 0.1}
          />
          <SkillCard
            icon={<Smartphone className="w-6 h-6 text-cyan-400" />}
            title="Mobile Development"
            description="Creating native Android applications with modern frameworks"
            skills={skills.mobile}
            delay={3 * 0.1}
          />
        </div>
      </div>
    </section>
  )
}
