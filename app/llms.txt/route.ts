import { education, experiences, now, presence, profile, projects, skills, summary } from "@/lib/data"

export const dynamic = "force-static"

// The canonical machine-readable profile (https://llmstxt.org). nginx also
// serves it for `curl hanifnaufal.com`, so it has to read well in a terminal.
function render() {
  const link = (label: string, href?: string) => (href ? `[${label}](${href})` : label)
  const out: string[] = [
    `# ${profile.name}`,
    "",
    `> ${summary}`,
    "",
    `- Role: ${profile.role}`,
    `- Location: ${profile.location} (${presence.zoneLabel}, UTC+7)`,
    `- Email: ${profile.email}`,
    `- Website: ${profile.url}`,
    `- GitHub: ${profile.github}`,
    `- LinkedIn: ${profile.linkedin}`,
  ]

  out.push("", "## Now", "", ...now.map((row) => `- ${row.label}: ${row.value}`))

  out.push("", "## Experience")
  for (const e of experiences) {
    out.push("", `### ${e.title}, ${e.company} (${e.period})`, "", e.description)
    if (e.highlights?.length) out.push("", ...e.highlights.map((h) => `- ${h}`))
    out.push("", `Stack: ${e.stack.join(", ")}`)
    if (e.link) out.push(`Link: ${e.link}`)
  }

  out.push("", "## Projects", "")
  for (const p of projects) {
    const refs = [p.github && `source: ${p.github}`].filter(Boolean).join("; ")
    out.push(
      `- ${link(p.title, p.link ?? p.github)}: ${p.description}` +
        (p.stack?.length ? ` Stack: ${p.stack.join(", ")}.` : "") +
        (refs && p.link ? ` (${refs})` : ""),
    )
  }

  out.push("", "## Skills", "", ...skills.map((s) => `- ${s.title}: ${s.items.join(", ")}`))

  out.push(
    "",
    "## Education",
    "",
    `- ${education.degree}, ${education.school}, ${education.place} (${education.period})`,
    "",
  )
  return out.join("\n")
}

export function GET() {
  return new Response(render(), { headers: { "content-type": "text/plain; charset=utf-8" } })
}
