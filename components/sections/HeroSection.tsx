import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer', 
  'Cloud Engineer',
  'Mobile Developer'
];

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-theme">
              Hi, I&apos;m
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text-cyan-blue">
              Hanif Naufal Ashari
            </h1>
            <div className="text-2xl md:text-3xl font-semibold mb-6 text-theme flex justify-center items-baseline">
              I&apos;m a
              <span className="ml-2 relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="gradient-text-cyan-blue font-bold"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            <p className="text-md md:text-lg subtext-theme mb-8 max-w-2xl mx-auto">
              Passionate about building fullstack systems, cloud infrastructure, and mobile applications. I turn complex problems into elegant solutions.
            </p>
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  className="gradient-background-cyan-blue text-theme-inverse px-8 py-3 rounded-[1.5rem] font-semibold shadow-none transition-all flex items-center"
                  onClick={() => {
                    const el = document.getElementById("about");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  View My Work
                  <ChevronDown className="w-5 h-5 ml-2 text-theme-inverse" />
                </Button>
                <a
                  href="https://github.com/hnfnfl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-cyan-blue-primary-theme text-cyan-300 bg-transparent rounded-[1rem] hover:bg-cyan-400/10 transition-all w-12 h-12 flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-cyan-blue-primary-theme" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hnfnfl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-cyan-blue-primary-theme text-cyan-300 bg-transparent rounded-[1rem] hover:bg-cyan-400/10 transition-all w-12 h-12 flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-cyan-blue-primary-theme" />
                </a>
                <a
                  href="mailto:hanifnfl.ashari@gmail.com"
                  className="border-2 border-cyan-blue-primary-theme text-cyan-300 bg-transparent rounded-[1rem] hover:bg-cyan-400/10 transition-all w-12 h-12 flex items-center justify-center"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-cyan-blue-primary-theme" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
