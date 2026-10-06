import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  "Hanif Naufal Ashari is a backend & cloud engineer at Samsung Research Indonesia, building DNS infrastructure, Go services and native Android apps.";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
