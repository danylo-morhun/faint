"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { cn } from "@workspace/ui/lib/utils"
import { getRouteLabel, mobileNavRoutes } from "@/config/routes"

function MobileNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-5 pb-[max(0.625rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <ul className="inline-flex items-center gap-0.5 rounded-full border border-border/70 bg-card/95 p-1 shadow-sm backdrop-blur-md">
        {mobileNavRoutes.map((route) => {
          const isActive = pathname === route.href
          const label = getRouteLabel(route)

          return (
            <li key={route.href}>
              <Link
                href={route.href}
                aria-current={isActive ? "page" : undefined}
                aria-label={isActive ? undefined : label}
                className={cn(
                  "flex items-center rounded-full transition-[color,background-color,padding,gap] duration-200",
                  "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none",
                  isActive
                    ? "gap-1.5 bg-primary/15 px-3 py-1.5 text-primary"
                    : "p-2 text-muted-foreground hover:text-foreground"
                )}
              >
                <HugeiconsIcon icon={route.icon} className="size-4.5" />
                {isActive ? (
                  <span className="text-sm leading-none font-medium">
                    {label}
                  </span>
                ) : null}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { MobileNav }
