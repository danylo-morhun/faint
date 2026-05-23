import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { Container } from "@/components/shared/Container"
import { Logo } from "@/components/shared/Logo"
import { homeRoute, headerRoutes } from "@/config/routes"
import {
  HeaderSearchProvider,
  HeaderSearchMobileTrigger,
  HeaderSearchBar,
} from "./HeaderSearch"
import { ThemeToggle } from "./ThemeToggle"

function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className
      )}
    >
      <HeaderSearchProvider>
        <Container className="flex items-center gap-2 py-2 sm:gap-3 md:gap-4">
          <Link
            href={homeRoute.href}
            aria-label="faint home"
            className="inline-flex shrink-0 items-center md:flex-1 md:justify-start"
          >
            <Logo className="h-10 w-auto" />
          </Link>

          <div className="hidden flex-1 justify-center md:flex">
            <div className="w-full max-w-md">
              <HeaderSearchBar />
            </div>
          </div>

          <nav
            aria-label="Main"
            className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:ml-0 md:flex-1 md:justify-end"
          >
            <HeaderSearchMobileTrigger />
            <ThemeToggle />

            <div className="hidden items-center gap-1 sm:gap-2 md:flex">
              {headerRoutes.map((route) => (
                <Button
                  key={route.href}
                  variant={route.variant}
                  size="icon"
                  className="md:h-9 md:w-auto md:gap-1.5 md:px-3"
                  asChild
                >
                  <Link href={route.href} aria-label={route.title}>
                    <HugeiconsIcon icon={route.icon} />
                    <span className="hidden md:inline">{route.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </nav>
        </Container>
      </HeaderSearchProvider>
    </header>
  )
}

export { Header }
