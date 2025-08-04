import { motion } from "framer-motion"
import React from "react"

export function AboutSection() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              I'm a detail-oriented and innovative software engineer with a passion for building robust, scalable systems. My collaborative approach and diverse technical expertise allow me to tackle complex challenges across the full technology stack.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From architecting cloud-native backend services to developing intuitive mobile applications, I bring a comprehensive understanding of modern software development practices and a commitment to delivering exceptional results.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
