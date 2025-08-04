"use client"

import { AboutSection } from "@/components/sections/AboutSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { ExperienceSection } from "@/components/sections/ExperienceSection"
import { Footer } from "@/components/sections/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { Navigation } from "@/components/sections/Navigation"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { SkillsSection } from "@/components/sections/SkillsSection"
import { useEffect, useState } from "react"

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const skills = {
    fullstack: ["Node.js", "Golang", "MySQL", "PostgreSQL", "REST APIs", "Docker", "Next.js", "React", "Tailwind CSS"],
    cloud: ["AWS", "CI/CD", "Terraform", "Microservices", "DNS Management"],
    networking: ["Load Balancing", "VPN", "High Availability", "Virtualization"],
    mobile: ["Android Native", "Kotlin", "Java", "Room Database", "Retrofit", "Material Design"],
  }

  const projects = [
    {
      title: "E-Commerce Microservices Platform",
      description:
        "Scalable backend system handling 10k+ concurrent users with Docker containerization and AWS deployment.",
      tech: ["Node.js", "PostgreSQL", "Docker", "AWS", "Redis"],
      category: "backend",
      link: "",
      github: "#",
    },
    {
      title: "Cloud Infrastructure Automation",
      description: "Terraform-based infrastructure as code solution reducing deployment time by 80%.",
      tech: ["Terraform", "AWS", "Kubernetes", "Jenkins", "Monitoring"],
      category: "cloud",
      link: "",
      github: "#",
    },
    {
      title: "Network Security Dashboard",
      description: "Real-time network monitoring system with threat detection and automated response capabilities.",
      tech: ["Python", "React", "WebSocket", "Network Protocols"],
      category: "networking",
      link: "#",
      github: "#",
    },
    {
      title: "Task Management Android App",
      description: "Native Android application with offline sync, push notifications, and material design.",
      tech: ["Kotlin", "Room", "Retrofit", "Material Design", "Firebase"],
      category: "mobile",
      link: "",
      github: "#",
    },
  ]

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description:
        "Led backend development for cloud-native applications, mentored junior developers, and implemented DevOps practices.",
      achievements: ["Reduced system latency by 40%", "Implemented CI/CD pipeline", "Led team of 5 developers"],
    },
    {
      title: "Cloud Engineer",
      company: "CloudTech Corp",
      period: "2020 - 2022",
      description:
        "Designed and maintained cloud infrastructure, automated deployment processes, and ensured system reliability.",
      achievements: ["99.9% uptime achievement", "Cost optimization of 30%", "Automated 80% of deployments"],
    },
    {
      title: "Mobile Developer",
      company: "Mobile Innovations",
      period: "2018 - 2020",
      description: "Developed Android applications with focus on performance optimization and user experience.",
      achievements: ["Published 5 apps on Play Store", "4.5+ star ratings", "100k+ downloads"],
    },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <Navigation
        activeSection={activeSection}
        isDark={isDark}
        setIsDark={setIsDark}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
      />
      <HeroSection />
      <AboutSection />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ContactSection />
      <Footer />
    </div>
  )
}
