import type { EraStyles } from "@/lib/types"

const eraStyles: Record<string, EraStyles> = {
  // 2004-2007: Hip-Hop & Reality TV Golden Age
  "2004-2007": {
    container: "bg-black text-white",
    header: "text-yellow-400 font-bold tracking-tight",
    body: "font-sans text-gray-200",
    panel: "bg-gray-900 border-2 border-yellow-400 shadow-lg",
    accent: "bg-gradient-to-r from-yellow-500 to-yellow-300",
    button:
      "bg-yellow-400 text-black font-bold uppercase tracking-wider shadow-lg transform hover:scale-105 transition duration-300",
    badge: "bg-yellow-900/50 text-yellow-300 hover:bg-yellow-800/50",
    filter: "brightness-110 contrast-125",
  },

  // 2008-2011: Premium Cable & Comedy Renaissance
  "2008-2011": {
    container: "bg-gray-800 text-gray-200",
    header: "text-white font-medium tracking-wide",
    body: "font-serif text-gray-300",
    panel: "bg-gray-900 border border-gray-700 shadow-md",
    accent: "bg-gray-600",
    button: "bg-gray-700 text-white hover:bg-gray-600 transition duration-300",
    badge: "bg-gray-700 text-gray-300 hover:bg-gray-600",
    filter: "sepia-[0.25] grayscale-[0.1]",
  },

  // 2012-2015: Prestige Drama & Social Media Influence
  "2012-2015": {
    container: "bg-neutral-100 text-gray-800",
    header: "text-amber-800 font-serif italic",
    body: "font-light text-gray-700",
    panel: "bg-white border border-gray-300 shadow-md",
    accent: "bg-amber-800",
    button: "bg-amber-800 text-white uppercase tracking-wider hover:bg-amber-900 transition duration-300",
    badge: "bg-amber-100 text-amber-800 hover:bg-amber-200",
    filter: "contrast-110 saturate-110",
  },

  // 2016-2019: Afrofuturism & Nostalgic Revival
  "2016-2019": {
    container: "bg-purple-900 text-pink-200",
    header: "text-pink-300 font-bold tracking-widest uppercase",
    body: "font-mono text-purple-100",
    panel: "bg-gradient-to-br from-purple-800 to-blue-800 border border-pink-500 shadow-lg",
    accent: "bg-gradient-to-r from-pink-500 to-blue-500",
    button: "bg-pink-500 text-white font-bold rounded-full shadow-lg hover:bg-pink-600 transition duration-300",
    badge: "bg-blue-900/70 text-pink-300 hover:bg-blue-800/70",
    filter: "saturate-150 brightness-110",
  },

  // 2020-2022: Pandemic Intimacy & Escapism
  "2020-2022": {
    container: "bg-gray-100 text-gray-600",
    header: "text-gray-700 font-light tracking-wide",
    body: "font-sans text-gray-600",
    panel: "bg-white rounded-xl shadow-sm border border-gray-200",
    accent: "bg-green-100",
    button: "bg-white text-gray-800 border border-gray-300 rounded-full hover:bg-gray-50 transition duration-300",
    badge: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    filter: "brightness-105 contrast-95 saturate-90",
  },

  // 2023-2025: Psychological Complexity & High Concept
  "2023-2025": {
    container: "bg-white text-black",
    header: "text-blue-600 font-sans font-light tracking-tight",
    body: "font-sans text-gray-800",
    panel: "bg-white border-l-4 border-blue-500 shadow-md",
    accent: "bg-blue-500",
    button: "bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 transition duration-300",
    badge: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    filter: "contrast-110 brightness-105",
  },
}

export function getEraStyles(era: string): EraStyles {
  return eraStyles[era] || eraStyles["2023-2025"] // Default to latest era if not found
}
