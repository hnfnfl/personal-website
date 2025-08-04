import { Badge } from "@/components/ui/badge"
import { Cloud, Code, Smartphone } from "lucide-react"
import { motion } from "framer-motion"
import React from "react"

interface SkillsSectionProps {
  skills: {
    backend: string[]
    cloud: string[]
    networking: string[]
    mobile: string[]
  }
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20 bg-gray-100/50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-cyan-blue">
            Technical Skills
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Backend Development */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0 * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Backend Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Building robust APIs and microservices with Node.js, Python, and Java
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.backend.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
          {/* Cloud Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Cloud Engineering</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Designing and deploying scalable cloud infrastructure
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.cloud.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
          {/* Network Engineering */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                {/* Custom SVG for networking */}
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Network Engineering</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Optimizing network architecture and ensuring secure connections
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.networking.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
          {/* Mobile Development */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-800/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300"
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mobile Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Creating native Android applications with modern frameworks
              </p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.mobile.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
