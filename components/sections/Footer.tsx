import { profile } from "@/lib/data"

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="page-x flex flex-col gap-2 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Next.js · Tailwind · self-hosted with Docker &amp; Traefik</p>
      </div>
    </footer>
  )
}
