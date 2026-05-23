"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"
import { routes, SEARCH_PLACEHOLDER } from "@/config/routes"
import { isTypingTarget } from "@/lib/keyboard"
import { Button } from "@workspace/ui/components/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { SearchIcon } from "@hugeicons/core-free-icons"
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@workspace/ui/components/command"

const HeaderSearchContext = createContext<(() => void) | null>(null)

function useOpenSearch() {
  const openSearch = useContext(HeaderSearchContext)
  if (!openSearch) {
    throw new Error("useOpenSearch must be used within HeaderSearchProvider")
  }
  return openSearch
}

function HeaderSearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const openSearch = useCallback(() => {
    setOpen(true)
  }, [])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        if (isTypingTarget(event.target)) {
          return
        }
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  function navigate(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <HeaderSearchContext.Provider value={openSearch}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder={SEARCH_PLACEHOLDER} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {routes.map((route) => (
                <CommandItem
                  key={route.href}
                  value={route.title}
                  onSelect={() => navigate(route.href)}
                  className="cursor-pointer"
                >
                  {route.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </HeaderSearchContext.Provider>
  )
}

function HeaderSearchMobileTrigger() {
  const openSearch = useOpenSearch()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="md:hidden"
      aria-label="Search"
      onClick={openSearch}
    >
      <HugeiconsIcon icon={SearchIcon} />
    </Button>
  )
}

function HeaderSearchBar() {
  const openSearch = useOpenSearch()

  return (
    <Button
      type="button"
      variant="ghost"
      aria-label="Open search"
      className="hidden h-9 w-full min-w-0 cursor-text items-center justify-start gap-2 border bg-muted/50 px-3 text-sm text-muted-foreground md:flex"
      onClick={openSearch}
    >
      <HugeiconsIcon icon={SearchIcon} />
      {SEARCH_PLACEHOLDER}
      <CommandShortcut className="ml-auto hidden lg:inline">⌘K</CommandShortcut>
    </Button>
  )
}

export { HeaderSearchProvider, HeaderSearchMobileTrigger, HeaderSearchBar }
