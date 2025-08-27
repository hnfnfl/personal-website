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
              こんにちは! I&apos;m Hanif, a backend developer with 3+ years of experience specializing in Go and native Android with Kotlin. I love building efficient, scalable systems and exploring tools that make development faster and cleaner. Currently, I work as a Cloud Engineer at Samsung Research Indonesia, where I help design and maintain backend systems for cloud-native, real-world business needs.
            </p>
            <p className="text-lg subtext-theme mb-6">
              I'm passionate about automation, system architecture, and crafting simple yet powerful solutions to complex problems. Outside of work, I spend my time learning new languages (currently Japanese), diving into open-source projects, or tinkering with my home lab. Running my own infrastructure is something I enjoy—this website even runs on my personal server!
            </p>
            <p className="text-lg subtext-theme">
              I believe in the power of community and collaboration, which is why I enjoy joining tech meetups and online forums. Sharing knowledge and learning from others is something I truly value. If you&apos;d like to connect or collaborate on a project, feel free to reach out!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
