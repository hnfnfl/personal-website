import { motion } from "framer-motion"

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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white dark:text-white light:text-black">About </span>
            <span className="gradient-text-cyan-blue">Me</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              こんにちは! I&apos;m Hanif, a backend developer with a strong background in 
              Go and native Android development using Kotlin for over 3 years of experience. 
              I enjoy building efficient, scalable systems and exploring new tools that make 
              development faster and cleaner. Currently, I&apos;m working at Samsung Research Indonesia, 
              where I help design and maintain backend systems for real-world business needs.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              I&apos;m passionate about automation, system architecture, and finding elegant solutions 
              to complex problems. Outside of work, I love learning languages (including Japanese!), 
              exploring open-source projects, and tinkering with Linux servers using my home-lab server 
              in my free time since I enjoy the challenge of managing my own infrastructure.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
