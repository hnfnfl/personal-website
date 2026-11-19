import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import { education, experiences, profile, skills, summary } from "@/lib/data";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const description =
  "Hanif Naufal Ashari is a backend & cloud engineer at Samsung R&D Institute Indonesia and founder of PT Nuraya Digital Nusantara, building DNS infrastructure, Go services and native Android apps.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hanifnaufal.com"),
  title: "Hanif Naufal Ashari | Backend & Cloud Engineer",
  description,
  openGraph: {
    title: "Hanif Naufal Ashari | Backend & Cloud Engineer",
    description,
    url: "/",
    siteName: "Hanif Naufal Ashari",
    type: "website",
  },
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/llms.txt" },
  },
  twitter: {
    card: "summary",
    title: "Hanif Naufal Ashari | Backend & Cloud Engineer",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

// schema.org Person: ties the name, roles and profiles together for search
// engines and AI answer engines. Same facts as /llms.txt, no phone number.
const current = experiences.filter((e) => /now/i.test(e.period))
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: [profile.handle, profile.katakana],
  url: profile.url,
  email: `mailto:${profile.email}`,
  jobTitle: profile.role,
  description: summary,
  address: { "@type": "PostalAddress", addressLocality: "Jakarta", addressCountry: "ID" },
  worksFor: current.map((e) => ({ "@type": "Organization", name: e.company, ...(e.link ? { url: e.link } : {}) })),
  hasOccupation: current.map((e) => ({ "@type": "Occupation", name: e.title })),
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  knowsAbout: Array.from(new Set(skills.flatMap((s) => s.items))),
  knowsLanguage: ["id", "en"],
  sameAs: [profile.github, profile.linkedin],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
