"use client"

import { Button } from "@workspace/ui/components/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { useThemeToggle } from "@/components/providers/theme-provider"

function ThemeToggle() {
  const toggleTheme = useThemeToggle()

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <HugeiconsIcon icon={Moon02Icon} className="dark:hidden" />
      <HugeiconsIcon icon={Sun03Icon} className="hidden dark:block" />
    </Button>
  )
}

export { ThemeToggle }
