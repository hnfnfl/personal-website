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
      link: "https://example.com/e-commerce",
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
    {
      title: "Personal Portfolio Website",
      description: "Modern portfolio built with Next.js, Tailwind CSS, and Framer Motion animations.",
      tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
      category: "frontend",
      link: "#",
      github: "#",
    },
    {
      title: "Chat Application",
      description: "Real-time chat app with WebSocket, authentication, and group messaging.",
      tech: ["Node.js", "Socket.io", "React", "MongoDB"],
      category: "fullstack",
      link: "#",
      github: "#",
    },
    {
      title: "DevOps Monitoring Tool",
      description: "Dashboard for monitoring CI/CD pipelines and cloud resources.",
      tech: ["Golang", "Prometheus", "Grafana", "Docker"],
      category: "devops",
      link: "#",
      github: "#",
    },
    {
      title: "Recipe Sharing Platform",
      description: "Social platform for sharing and discovering recipes, with user profiles and comments.",
      tech: ["Django", "React", "PostgreSQL"],
      category: "web",
      link: "#",
      github: "#",
    },
  ]

  const experiences = [
    {
      title: "Cloud Engineer",
      company: "Samsung Research Indonesia",
      period: "2022 - Present",
      description:
        "Led backend development for cloud-native applications, mentored junior developers, and implemented DevOps practices.",
      techStack: ["Golang", "PDNS", "AWS", "CI/CD", "Docker", "Docker Swarm", "Terraform", "HashiCorp Vault", "Jenkins"],
    },
    {
      title: "Android Developer",
      company: "JM Network",
      period: "2021 - 2022",
      description:
        "Designed and maintained cloud infrastructure, automated deployment processes, and ensured system reliability.",
      techStack: ["Kotlin", "Room", "Retrofit", "Material Design", "Firebase", "PHP", "CodeIgniter", "MySQL"],
    },
    {
      title: "Web Application Developer",
      company: "Dinas Perindustrian dan Perdagangan Kabupaten Jombang (Disperindag Jombang)",
      period: "2020 - 2020",
      description: "Developed web applications with focus on performance optimization and user experience.",
      techStack: ["PHP", "CodeIgniter", "MySQL", "HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"],
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
