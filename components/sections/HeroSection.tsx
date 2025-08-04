import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const roles = [
  'Software Engineer',
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              Hi, I'm
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              John Developer
            </h1>
            <div className="text-2xl md:text-3xl font-semibold mb-6 text-white flex justify-center items-baseline">
              I'm a
              <span className="ml-2 relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
            <p className="text-md md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Passionate about building scalable backend systems, cloud infrastructure, and mobile applications. I turn complex problems into elegant solutions.
            </p>
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-400 to-blue-400 text-black px-8 py-3 rounded-[1.5rem] font-semibold shadow-none hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center"
                  onClick={() => {
                    const el = document.getElementById("about");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  View My Work
                  <ChevronDown className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-2 border-cyan-300 text-cyan-300 bg-transparent rounded-[1rem] hover:bg-cyan-400/10 transition-all w-12 h-12 flex items-center justify-center"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-2 border-cyan-300 text-cyan-300 bg-transparent rounded-[1rem] hover:bg-cyan-400/10 transition-all w-12 h-12 flex items-center justify-center"
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-2 border-cyan-300 text-cyan-300 bg-transparent rounded-[1rem] hover:bg-cyan-400/10 transition-all w-12 h-12 flex items-center justify-center"
                >
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
