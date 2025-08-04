import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Server, Cloud, Smartphone, Github, Linkedin } from "lucide-react"
import React from "react"

export function HeroSection() {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Software Engineer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Crafting scalable backend systems, cloud infrastructure, and mobile applications with precision and innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                <Server className="w-4 h-4 mr-2" />
                Backend Development
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-blue-500/10 text-blue-400 border-blue-500/20">
                <Cloud className="w-4 h-4 mr-2" />
                Cloud Engineering
              </Badge>
              <Badge variant="secondary" className="text-lg py-2 px-4 bg-purple-500/10 text-purple-400 border-purple-500/20">
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Development
              </Badge>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center space-x-6"
          >
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 bg-transparent">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
