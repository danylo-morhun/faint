import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Header } from "@/components/shared/Header"
import { MobileNav } from "@/components/shared/MobileNav"
import { Container } from "@/components/shared/Container"
import { cn } from "@workspace/ui/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: "faint",
  description: "I can't FAINT the way I did before",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Header className="mb-4" />
          <Container>
            <main className="min-h-screen pb-[calc(3.75rem+env(safe-area-inset-bottom))] md:pb-0">
              {children}
            </main>
          </Container>
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
