import { DigConsole } from "@/components/DigConsole"
import { profile } from "@/lib/data"

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="page-x font-mono text-xs text-muted-foreground">
        <DigConsole domain={profile.domain}>
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="sm:ml-auto">Next.js · Tailwind · self-hosted with Docker &amp; Traefik</p>
        </DigConsole>
      </div>
    </footer>
  )
}
