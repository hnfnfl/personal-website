import { NotFoundDig } from "@/components/NotFoundDig"
import { profile } from "@/lib/data"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NXDOMAIN | Hanif Naufal Ashari",
  robots: { index: false },
}

export default function NotFound() {
  return (
    <main className="relative min-h-svh overflow-hidden">
      <div aria-hidden className="hero-paper pointer-events-none absolute inset-0" />
      <div className="page-x relative flex min-h-svh flex-col justify-center gap-10 py-16">
        <div className="max-w-3xl">
          <h1 className="text-balance text-[clamp(2.75rem,1.5rem+5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.04em]">
            Nothing resolves here.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            <span className="font-mono text-base text-foreground">404</span>: this page doesn&apos;t exist. Asked
            the way a DNS engineer would ask:
          </p>
        </div>

        <div className="max-w-3xl">
          <NotFoundDig domain={profile.domain} />
        </div>

        <a
          href="/"
          className="group inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden />
          Back to {profile.domain}
        </a>
      </div>
    </main>
  )
}
