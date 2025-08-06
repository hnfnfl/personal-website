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
      title: "Masterprima Attendance System",
      description:
        "Attendance system for Masterprima, integrating RFID technology for precise attendance tracking and reporting.",
      tech: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Redis", "Docker", "Grafana", "InfluxDB", "Prometheus"],
      category: "web",
      link: "https://attendance.masterprima.com",
      github: "#",
    },
    {
      title: "JM Network Website",
      description: "Corporate website for JM Network, showcasing services and company information.",
      tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "JavaScript"],
      category: "web",
      link: "https://jaylangkung.co.id/",
      github: "https://github.com/CV-JM-Network/jaylangkung-web",
    },
    {
      title: "BeliMang!",
      description: "Backend for BeliMang! is a food delivery app that user can use to buy food and drinks!",
      tech: ["Golang", "PostgreSQL", "Gin Framework"],
      category: "backend",
      link: "#",
      github: "https://github.com/hnfnfl/beli-mang-be",
    },
    {
      title: "Simple Anime List Android App",
      description: "Android app for list latest, popular, and top anime with search functionality.",
      tech: ["Kotlin", "Room", "Retrofit", "Material Design"],
      category: "mobile",
      link: "#",
      github: "https://github.com/hnfnfl/Sanbercode-Final_Project_Android",
    },
    {
      title: "Brainnet Staff Android App",
      description: "Android app for JM Network staff with features like attendance, todo list, and customer management.",
      tech: ["Kotlin", "Retrofit", "Material Design", "PHP", "MySQL", "CodeIgniter"],
      category: "mobile",
      link: "#",
      github: "https://github.com/CV-JM-Network/BrainNet",
    },
    {
      title: "CITOR (Cuci Motor)",
      description: "CITOR is a mobile app for ordering motorcycle washing services, allowing users to book and manage their wash appointments easily with integration with local service providers, and payment gateways.",
      tech: ["Kotlin", "Room", "Retrofit", "Material Design", "PHP", "MySQL", "CodeIgniter"],
      category: "mobile",
      link: "#",
      github: "#",
    },
    {
      title: "ICA Apps Surabaya",
      description: "ICA (Indonesian Cat Association) mobile app for managing cat health records, grooming, and breeding.",
      tech: ["Kotlin", "Room", "Retrofit", "Material Design", "PHP", "MySQL", "CodeIgniter"],
      category: "mobile",
      link: "#",
      github: "#",
    },
    {
      title: "SISFOKESREM 083",
      description: "SISFOKESREM(Sistem Informasi Kesehatan Korem) 083 is a mobile app for managing health records of soldiers Korem 083, including medical history and tracking.",
      tech: ["Kotlin", "Room", "Retrofit", "Material Design", "Firebase"],
      category: "mobile",
      link: "#",
      github: "#",
    },
    {
      title: "Sistem Informasi Pencatatan IKM Disperindag Jombang",
      description: "Web application for recording and managing data of Small and Medium Enterprises (IKM) in Jombang.",
      tech: ["CodeIgniter", "Bootstrap", "jQuery", "MySQL", "HTML", "CSS"],
      category: "web",
      link: "https://perindustrianjombangkab.com/",
      github: "#",
    },
  ]

  const experiences = [
    {
      title: "Cloud Engineer",
      company: "Samsung Research Indonesia",
      period: "2022 - Present",
      description:
        "Led backend development for DNS management applications, mentored junior developers, and implemented DevOps practices.",
      techStack: [
        "AWS",
        "CI/CD",
        "Docker",
        "Docker Swarm",
        "Golang",
        "HashiCorp Vault",
        "Jenkins",
        "PDNS",
        "Terraform",
        "Apache Kafka",
      ].sort(),
    },
    {
      title: "Android Developer",
      company: "JM Network",
      period: "2021 - 2022",
      description:
        "Designed and maintained cloud infrastructure, automated deployment processes, and ensured system reliability.",
      techStack: [
        "CodeIgniter",
        "Firebase",
        "Kotlin",
        "Material Design",
        "MySQL",
        "PHP",
        "Retrofit",
        "Room",
      ].sort(),
    },
    {
      title: "Web Application Developer",
      company: "Dinas Perindustrian dan Perdagangan Kabupaten Jombang (Disperindag Jombang)",
      period: "2020 - 2020",
      description: "Developed web applications with focus on performance optimization and user experience.",
      techStack: [
        "Bootstrap",
        "CSS",
        "CodeIgniter",
        "HTML",
        "JavaScript",
        "MySQL",
        "PHP",
        "jQuery",
      ].sort(),
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
