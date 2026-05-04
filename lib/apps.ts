export type App = {
  slug: string
  name: string
  tagline: string
  url: string
  category: "productivity" | "finance" | "creator" | "utility" | "entertainment"
  status: "live" | "coming_soon" | "archived"
  emoji: string
}

export const apps: App[] = [
  // Empty for now. Add spoke apps here as they launch.
  // Example entry:
  // {
  //   slug: "whattoeat",
  //   name: "What To Eat",
  //   tagline: "Decide what to eat in seconds.",
  //   url: "https://whattoeat.oschoices.com",
  //   category: "utility",
  //   status: "live",
  //   emoji: "🍽️",
  // },
]
