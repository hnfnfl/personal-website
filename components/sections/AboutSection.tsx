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
            <span className="text-theme dark:text-white light:text-black">About </span>
            <span className="gradient-text-cyan-blue">Me</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg subtext-theme mb-6">
              こんにちは! I&apos;m Hanif, a backend developer with over 3 years of experience specializing in Go and native Android development with Kotlin.
              I enjoy building efficient, scalable systems and exploring new tools that make development faster and cleaner.
              Currently, I work as a Cloud Engineer at Samsung Research Indonesia, where I help design and maintain backend systems for cloud-native, real-world business needs.
            </p>
            <p className="text-lg subtext-theme">
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
