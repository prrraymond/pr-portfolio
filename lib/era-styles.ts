// Define the era styles for different time periods
// These styles are used to give each era a distinct visual identity

// Function to get era-specific styles
export function getEraStyles(era: string | undefined) {
  // Default styles
  const defaultStyles = {
    container: "bg-gray-50",
    header: "font-sans font-bold text-gray-900",
    body: "text-gray-700",
    accent: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    filter: "",
  }

  // Log the era for debugging
  console.log(`Getting styles for era: ${era}`)

  // Return era-specific styles
  switch (era) {
    case "2004-2007": // Providence - Gold/Yellow theme
      return {
        container: "bg-yellow-50",
        header: "font-impact font-bold uppercase text-yellow-900",
        body: "text-yellow-800",
        accent: "bg-yellow-500",
        badge: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        filter: "contrast-125",
      }

    case "2008-2011": // NYC/Detroit/Cleveland - Neutral Gray theme
      return {
        container: "bg-gray-50",
        header: "font-georgia text-gray-900",
        body: "text-gray-700",
        accent: "bg-gray-500",
        badge: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        filter: "grayscale-[30%]",
      }

    case "2012-2016": // First Miami, New Haven, Second Miami - Prestige Drama - Amber/Brown theme
      return {
        container: "bg-amber-50",
        header: "font-times italic text-amber-900",
        body: "text-amber-800",
        accent: "bg-amber-700",
        badge: "bg-amber-100 text-amber-800 hover:bg-amber-200",
        filter: "sepia-[30%]",
      }

    case "2017-2019": // Third Miami - Afrofuturism - Purple theme
      return {
        container: "bg-purple-50",
        header: "font-mono uppercase tracking-wide text-purple-900",
        body: "text-purple-800",
        accent: "bg-purple-500",
        badge: "bg-purple-100 text-purple-800 hover:bg-purple-200",
        filter: "hue-rotate-15",
      }

    case "2020-2022": // Fourth Miami - Light Gray theme
      return {
        container: "bg-slate-50",
        header: "font-helvetica font-light tracking-tight text-slate-900",
        body: "text-slate-700",
        accent: "bg-slate-400",
        badge: "bg-slate-100 text-slate-800 hover:bg-slate-200",
        filter: "brightness-105",
      }

    case "2023-2025": // NYC - Light Blue theme
      return {
        container: "bg-blue-50",
        header: "font-inter tracking-tight text-blue-900",
        body: "text-blue-700",
        accent: "bg-blue-500",
        badge: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        filter: "saturate-110",
      }

    default:
      return defaultStyles
  }
}
