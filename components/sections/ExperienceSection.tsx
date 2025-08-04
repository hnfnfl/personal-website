import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  achievements: string[]
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 bg-gray-100/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Experience
          </h2>
        </motion.div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <CardTitle className="text-xl text-cyan-400">{exp.title}</CardTitle>
                      <CardDescription className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        {exp.company}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 mt-2 md:mt-0">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-cyan-400">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
