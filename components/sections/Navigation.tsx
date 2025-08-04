"use client"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, Moon, Sun, X } from "lucide-react"

interface NavigationProps {
  activeSection: string
  isDark: boolean
  setIsDark: (val: boolean) => void
  isMenuOpen: boolean
  setIsMenuOpen: (val: boolean) => void
  scrollToSection: (sectionId: string) => void
}

export function Navigation({ activeSection, isDark, setIsDark, isMenuOpen, setIsMenuOpen, scrollToSection }: NavigationProps) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold gradient-text-cyan-blue"
          >
            Hnfnfl
          </motion.div>
          <div className="hidden md:flex space-x-8">
            {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-colors duration-200 ${activeSection === item ? "text-cyan-400" : "text-gray-600 dark:text-gray-300 hover:text-cyan-400"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="text-gray-600 dark:text-gray-300"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
          >
            <div className="px-4 py-2 space-y-2">
              {["home", "about", "skills", "projects", "experience", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left py-2 capitalize text-gray-600 dark:text-gray-300 hover:text-cyan-400"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
