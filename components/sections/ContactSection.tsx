import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="text-cyan-400">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.<br />
              Let&apos;s build something amazing together.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Contact Form */}
            <div className="bg-[#181A20] rounded-xl p-8 shadow-lg flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-6 text-white">Send me a message</h3>
              <form className="space-y-5">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-1/2 px-4 py-3 rounded-lg bg-[#23262F] text-white focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-1/2 px-4 py-3 rounded-lg bg-[#23262F] text-white focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Project inquiry, collaboration, etc."
                  className="w-full px-4 py-3 rounded-lg bg-[#23262F] text-white focus:outline-none"
                />
                <textarea
                  rows={5}
                  placeholder="Tell me about your project or what you have in mind..."
                  className="w-full px-4 py-3 rounded-lg bg-[#23262F] text-white focus:outline-none resize-none"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold flex items-center justify-center"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
            {/* Right: Contact Info, Socials, Stats */}
            <div className="flex flex-col space-y-6">
              {/* Let's connect */}
              <div className="bg-[#181A20] rounded-xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-4 text-white">Let&apos;s connect</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">hanifnfl.ashari@gmail.com</span>
                  </div>
                </div>
              </div>
              {/* Follow me */}
              <div className="bg-[#181A20] rounded-xl p-6 shadow">
                <h3 className="text-lg font-semibold mb-4 text-white">Follow me</h3>
                <div className="space-y-3">
                  <a href="https://github.com/hnfnfl" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-cyan-400 transition">
                    <Github className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">@hnfnfl</span>
                  </a>
                  <a href="https://linkedin.com/in/hnfnfl" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-cyan-400 transition">
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                    <span className="text-white">hnfnfl</span>
                  </a>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="bg-[#181A20] rounded-xl p-6 shadow mt-2">
                <h3 className="text-lg font-semibold mb-4 text-white">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="text-2xl font-bold text-cyan-400">5+</span>
                    <div className="text-gray-400 text-sm">Projects Completed</div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-cyan-400">3+</span>
                    <div className="text-gray-400 text-sm">Years Experience</div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-cyan-400">10+</span>
                    <div className="text-gray-400 text-sm">Technologies</div>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-cyan-400">99%</span>
                    <div className="text-gray-400 text-sm">Client Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
