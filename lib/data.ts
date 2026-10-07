export const profile = {
  name: "Hanif Naufal Ashari",
  handle: "hnfnfl",
  katakana: "ハニフ",
  role: "Backend & Cloud Engineer",
  email: "hanifnfl.ashari@gmail.com",
  github: "https://github.com/hnfnfl",
  linkedin: "https://www.linkedin.com/in/hnfnfl/",
  startYear: 2020,
}

export const now = [
  { label: "Role", value: "Cloud Engineer" },
  { label: "At", value: "Samsung Research Indonesia" },
  { label: "Founder", value: "PT Nuraya Digital Nusantara" },
  { label: "Focus", value: "Go · DNS · DevOps" },
  { label: "Learning", value: "日本語" },
]

export type Experience = {
  title: string
  company: string
  period: string
  description: string
  stack: string[]
  link?: string
}

export const experiences: Experience[] = [
  {
    title: "Founder",
    company: "PT Nuraya Digital Nusantara",
    period: "2026 - Now",
    description:
      "Founded a software engineering studio in Malang that builds custom web applications, advises on IT and system architecture, and automates data workflows for businesses. It also runs Project Nuraya, its own line of web products for communities, small businesses and organizations, hosted on Indonesia-based infrastructure.",
    stack: ["Custom web apps", "System architecture", "Data automation", "Proxmox"],
    link: "https://projectnuraya.id",
  },
  {
    title: "Cloud Engineer",
    company: "Samsung Research Indonesia",
    period: "2022 - Now",
    description:
      "Lead backend development for DNS management applications, mentor junior developers, and drive DevOps practices across the team.",
    stack: ["Golang", "AWS", "Terraform", "Docker Swarm", "Jenkins", "HashiCorp Vault", "Apache Kafka", "PowerDNS"],
  },
  {
    title: "Android Developer",
    company: "JM Network",
    period: "2021 - 2022",
    description:
      "Built and shipped native Android apps in Kotlin for JM Network and its clients, along with the PHP / CodeIgniter APIs behind them.",
    stack: ["Kotlin", "Room", "Retrofit", "Material Design", "Firebase", "PHP", "CodeIgniter", "MySQL"],
  },
  {
    title: "Web Application Developer",
    company: "Disperindag Kabupaten Jombang",
    period: "2020",
    description:
      "Developed a web application for recording and managing small and medium enterprise (IKM) data for the regional trade & industry office.",
    stack: ["PHP", "CodeIgniter", "MySQL", "jQuery", "Bootstrap"],
  },
]

export type ProjectCategory = "web" | "backend" | "mobile"

export type Project = {
  title: string
  description: string
  stack?: string[]
  category: ProjectCategory
  link?: string
  github?: string
}

export const projects: Project[] = [
  {
    title: "Project Nuraya",
    description:
      "Digital product line of PT Nuraya Digital Nusantara: a bike rental system (Sewa Sepeda), Catat Servis, Tilawah Tracker for coordinating group tilawah, and a letter administration system for RT/RW neighborhood associations.",
    category: "web",
    link: "https://projectnuraya.id",
  },
  {
    title: "Masterprima Attendance System",
    description: "Attendance system for Masterprima, using RFID for precise attendance tracking and reporting.",
    stack: ["Next.js", "PostgreSQL", "Redis", "Docker", "Grafana", "Prometheus"],
    category: "web",
    link: "https://attendance.masterprima.com",
  },
  {
    title: "BeliMang!",
    description: "Backend for a food delivery app where users order food and drinks.",
    stack: ["Golang", "Gin", "PostgreSQL"],
    category: "backend",
    github: "https://github.com/hnfnfl/beli-mang-be",
  },
  {
    title: "JM Network Website",
    description: "Corporate website presenting JM Network's services and company profile.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "web",
    link: "https://jaylangkung.co.id/",
    github: "https://github.com/CV-JM-Network/jaylangkung-web",
  },
  {
    title: "Brainnet Staff",
    description: "Staff app for JM Network with attendance, to-do lists and customer management.",
    stack: ["Kotlin", "Retrofit", "PHP", "CodeIgniter", "MySQL"],
    category: "mobile",
    github: "https://github.com/CV-JM-Network/BrainNet",
  },
  {
    title: "CITOR (Cuci Motor)",
    description: "Book and manage motorcycle wash appointments with local providers and payment gateway integration.",
    stack: ["Kotlin", "Room", "Retrofit", "PHP", "MySQL"],
    category: "mobile",
  },
  {
    title: "SISFOKESREM 083",
    description: "Health information system for Korem 083 personnel: medical history and tracking.",
    stack: ["Kotlin", "Room", "Retrofit", "Firebase"],
    category: "mobile",
  },
  {
    title: "ICA Apps Surabaya",
    description: "Indonesian Cat Association app for health records, grooming and breeding.",
    stack: ["Kotlin", "Room", "Retrofit", "PHP", "MySQL"],
    category: "mobile",
  },
  {
    title: "SI Pencatatan IKM Jombang",
    description: "Recording and management system for small & medium enterprises in Jombang.",
    stack: ["CodeIgniter", "MySQL", "jQuery", "Bootstrap"],
    category: "web",
    link: "https://perindustrianjombangkab.com/",
  },
  {
    title: "Simple Anime List",
    description: "Android client for latest, popular and top anime, with search.",
    stack: ["Kotlin", "Room", "Retrofit"],
    category: "mobile",
    github: "https://github.com/hnfnfl/Sanbercode-Final_Project_Android",
  },
]

export const skills = [
  {
    title: "Backend",
    items: ["Golang", "Node.js", "PostgreSQL", "MySQL", "Redis", "REST APIs", "Apache Kafka"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS", "Terraform", "Docker / Swarm", "CI/CD · Jenkins", "HashiCorp Vault", "Prometheus · Grafana"],
  },
  {
    title: "Networking",
    items: ["DNS / PowerDNS", "Load Balancing", "VPN", "High Availability", "Virtualization"],
  },
  {
    title: "Frontend & Mobile",
    items: ["Next.js · React", "TypeScript", "Tailwind CSS", "Android · Kotlin", "Room · Retrofit"],
  },
]
