import { profile } from "@/lib/data"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date()
  return [
    { url: `${profile.url}/`, lastModified: built, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.url}/llms.txt`, lastModified: built, changeFrequency: "monthly", priority: 0.5 },
  ]
}
