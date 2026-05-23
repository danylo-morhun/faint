import type { IconSvgElement } from "@hugeicons/react"

import {
  CalendarAnalysisIcon,
  House01Icon,
  WorkoutStretchingIcon,
} from "@hugeicons/core-free-icons"

export type AppRoute = {
  title: string
  href: string
  icon?: IconSvgElement
  searchable?: boolean
  shortTitle?: string
}

export const SEARCH_PLACEHOLDER = "Search pages, exercises..."

export const routes = [
  {
    title: "Home",
    href: "/",
    icon: House01Icon,
    searchable: true,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: WorkoutStretchingIcon,
    searchable: true,
  },
  {
    title: "Today's Plan",
    href: "/today",
    icon: CalendarAnalysisIcon,
    shortTitle: "Plan",
    searchable: true,
  },
] as const satisfies readonly AppRoute[]

function getRoute(href: (typeof routes)[number]["href"]) {
  const route = routes.find((entry) => entry.href === href)
  if (!route) {
    throw new Error(`Route not found: ${href}`)
  }
  return route
}

export function getRouteLabel(route: Pick<AppRoute, "title" | "shortTitle">) {
  return route.shortTitle ?? route.title
}

export const homeRoute = getRoute("/")

export const headerRoutes = [
  {
    ...getRoute("/profile"),
    variant: "outline",
  },
  {
    ...getRoute("/today"),
    variant: "default",
  },
] as const satisfies readonly (AppRoute & {
  variant: "default" | "outline"
})[]

export const mobileNavRoutes = [
  getRoute("/"),
  getRoute("/today"),
  getRoute("/profile"),
] as const satisfies readonly (AppRoute & { icon: IconSvgElement })[]
