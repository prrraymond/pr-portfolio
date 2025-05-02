"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ContentCard from "@/components/content-card"
import type { Category } from "@/lib/types"

interface ContentSectionProps {
  initialCategories: Category[]
}

// Helper function to get display name for locations
function getLocationDisplayName(locationId: string): string {
  // Map location IDs to display names
  const locationDisplayNames: Record<string, string> = {
    providence: "Providence",
    "nyc-det-cle": "NYC / Detroit / Cleveland",
    miami: "Miami",
    "new-haven": "New Haven",
    nyc: "New York City",
  }

  return (
    locationDisplayNames[locationId] ||
    locationId
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  )
}

// Map locationSort to era for styling
const locationSortToEra: Record<number, string> = {
  1: "2004-2007", // Providence
  2: "2008-2011", // NYC/Detroit/Cleveland
  3: "2012-2015", // First Miami
  4: "2016-2019", // New Haven
  5: "2016-2019", // Second Miami
  6: "2020-2022", // Third Miami (if exists)
  7: "2020-2022", // Another location if exists
  8: "2023-2025", // NYC
}

// Get era-specific background color for selected state
function getEraBackgroundColor(era: string): string {
  switch (era) {
    case "2004-2007": // Providence - Gold/Yellow
      return "bg-yellow-100 border-l-4 border-yellow-500"
    case "2008-2011": // NYC/Detroit/Cleveland - Neutral Gray
      return "bg-gray-100 border-l-4 border-gray-500"
    case "2012-2015": // First Miami - Amber/Brown
      return "bg-amber-100 border-l-4 border-amber-700"
    case "2016-2019": // New Haven, Second Miami - Purple
      return "bg-purple-100 border-l-4 border-purple-500"
    case "2020-2022": // Third Miami - Light Gray
      return "bg-gray-100 border-l-4 border-gray-400"
    case "2023-2025": // NYC - Light Blue
      return "bg-blue-100 border-l-4 border-blue-500"
    default:
      return "bg-blue-100" // Default
  }
}

// Get era-specific hover background color
function getEraHoverColor(era: string): string {
  switch (era) {
    case "2004-2007": // Providence - Gold/Yellow
      return "hover:bg-yellow-50"
    case "2008-2011": // NYC/Detroit/Cleveland - Neutral Gray
      return "hover:bg-gray-50"
    case "2012-2015": // First Miami - Amber/Brown
      return "hover:bg-amber-50"
    case "2016-2019": // New Haven, Second Miami - Purple
      return "hover:bg-purple-50"
    case "2020-2022": // Third Miami - Light Gray
      return "hover:bg-gray-50"
    case "2023-2025": // NYC - Light Blue
      return "hover:bg-blue-50"
    default:
      return "hover:bg-gray-100" // Default
  }
}

export default function ContentSection({ initialCategories }: ContentSectionProps) {
  const [categories] = useState<Category[]>(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const [selectedLocationSort, setSelectedLocationSort] = useState<number | null>(null)
  const [debug, setDebug] = useState(false) // Disabled debug mode

  // Get all items sorted by sortOrder
  const allItemsSorted = categories
    .flatMap((category) => category.items)
    .filter((item) => selectedCategory === "all" || item.type === selectedCategory)
    .sort((a, b) => a.sortOrder - b.sortOrder)

  // Group items by locationSort and create filter buttons
  // This time we'll ensure unique location entries
  const locationGroups = allItemsSorted.reduce(
    (acc, item) => {
      const locationSort = item.locationSort || 999

      // Only add if this locationSort doesn't exist yet
      if (!acc[locationSort]) {
        acc[locationSort] = {
          locationSort,
          name: getLocationDisplayName(item.location),
          location: item.location,
          firstItemIndex: 0, // Will be calculated later
          count: 0,
        }
      }

      acc[locationSort].count++
      return acc
    },
    {} as Record<
      number,
      { locationSort: number; name: string; location: string; firstItemIndex: number; count: number }
    >,
  )

  // Convert to array and sort by locationSort
  const locationFilters = Object.values(locationGroups).sort((a, b) => a.locationSort - b.locationSort)

  // Calculate first item index for each location group
  useEffect(() => {
    for (const filter of locationFilters) {
      filter.firstItemIndex = allItemsSorted.findIndex((item) => (item.locationSort || 999) === filter.locationSort)
    }

    // Set default selected location if not already selected
    if (selectedLocationSort === null && locationFilters.length > 0) {
      setSelectedLocationSort(locationFilters[0].locationSort)
    }
  }, [allItemsSorted, locationFilters, selectedLocationSort])

  // Handle location selection
  const selectLocation = (locationSort: number) => {
    setSelectedLocationSort(locationSort)

    const selectedLocation = locationFilters.find((loc) => loc.locationSort === locationSort)
    if (!selectedLocation) return

    const firstItemIndex = selectedLocation.firstItemIndex

    if (contentContainerRef.current && firstItemIndex >= 0) {
      // Using a fixed card width + gap
      const cardWidth = 320

      // Calculate the position of the first card
      const cardPosition = firstItemIndex * cardWidth

      // Add a small offset (16px) to account for padding
      const scrollPosition = cardPosition - 16

      // Ensure we don't scroll past the beginning
      const finalScrollPosition = Math.max(0, scrollPosition)

      // Scroll to position with smooth behavior
      setTimeout(() => {
        if (contentContainerRef.current) {
          contentContainerRef.current.scrollTo({
            left: finalScrollPosition,
            behavior: "smooth",
          })
        }
      }, 100)
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
  }

  const scroll = (direction: "left" | "right") => {
    if (contentContainerRef.current) {
      const scrollAmount = 600
      const newScrollLeft =
        direction === "left"
          ? contentContainerRef.current.scrollLeft - scrollAmount
          : contentContainerRef.current.scrollLeft + scrollAmount

      contentContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  // Function to render location text with appropriate styling based on locationSort
  const renderLocationText = (locationSort: number, name: string) => {
    // Get the era for this locationSort
    const era = locationSortToEra[locationSort] || "2023-2025"

    switch (era) {
      case "2004-2007": // Providence
        return (
          <span
            style={{
              fontFamily: "Impact, sans-serif",
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "#ca8a04",
            }}
          >
            {name}
          </span>
        )
      case "2008-2011": // NYC/Detroit/Cleveland
        return <span style={{ fontFamily: "Georgia, serif", color: "#374151" }}>{name}</span>
      case "2012-2015": // First Miami
        return (
          <span style={{ fontFamily: "Times New Roman, serif", fontStyle: "italic", color: "#92400e" }}>{name}</span>
        )
      case "2016-2019": // New Haven and Second Miami
        return (
          <span
            style={{
              fontFamily: "Courier New, monospace",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#9333ea",
            }}
          >
            {name}
          </span>
        )
      case "2020-2022": // Third Miami
        return (
          <span
            style={{ fontFamily: "Helvetica, sans-serif", fontWeight: 300, letterSpacing: "0.5px", color: "#4b5563" }}
          >
            {name}
          </span>
        )
      case "2023-2025": // NYC
        return (
          <span
            style={{
              fontFamily: "Inter, system-ui, sans-serif",
              fontWeight: 400,
              letterSpacing: "-0.3px",
              color: "#2563eb",
            }}
          >
            {name}
          </span>
        )
      default:
        return <span>{name}</span>
    }
  }

  return (
    <section className="bg-white pt-4 pb-8" id="content">
      <div className="flex">
        {/* Left sidebar - Journey navigation */}
        <div className="hidden md:block w-48 lg:w-56 flex-shrink-0 border-r border-gray-200 pr-4">
          <h3 className="text-xl font-bold mb-6 text-gray-800 font-sans">Journey</h3>

          {/* Debug toggle - only shown when debug is true */}
          {debug && (
            <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
              <button onClick={() => setDebug(!debug)} className="text-blue-600 underline mb-2">
                Hide Debug
              </button>
              <div>Debug mode enabled</div>
            </div>
          )}

          <ul className="space-y-2">
            {locationFilters.map((location) => {
              const isSelected = selectedLocationSort === location.locationSort
              const era = locationSortToEra[location.locationSort] || "unknown"

              // Get era-specific background color for selected state
              const selectedBgClass = getEraBackgroundColor(era)

              // Get era-specific hover color
              const hoverBgClass = getEraHoverColor(era)

              return (
                <li key={`location-${location.locationSort}`}>
                  <button
                    className={`w-full text-left py-2 px-3 rounded-md transition-all duration-300 ${
                      isSelected ? selectedBgClass : hoverBgClass
                    }`}
                    onClick={() => selectLocation(location.locationSort)}
                    data-location-sort={location.locationSort}
                    data-location={location.location}
                  >
                    {/* Use the renderLocationText function to apply styling based on locationSort */}
                    {renderLocationText(location.locationSort, location.name)}

                    {/* Debug information - only shown when debug is true */}
                    {debug && (
                      <div className="mt-1 text-xs text-gray-500">
                        Sort: {location.locationSort}, Era: {era}
                      </div>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Mobile location selector */}
        <div className="md:hidden w-full mb-4 px-4">
          <label className="block text-xl font-bold mb-2 font-sans">Journey</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedLocationSort || ""}
            onChange={(e) => {
              const value = e.target.value
              if (value) {
                selectLocation(Number(value))
              }
            }}
          >
            {locationFilters.map((location) => {
              const era = locationSortToEra[location.locationSort] || "unknown"

              return (
                <option
                  key={`location-${location.locationSort}`}
                  value={location.locationSort}
                  style={{
                    // Apply era-specific styling to dropdown options
                    fontFamily:
                      era === "2004-2007"
                        ? "Impact, sans-serif"
                        : era === "2008-2011"
                          ? "Georgia, serif"
                          : era === "2012-2015"
                            ? "Times New Roman, serif"
                            : era === "2016-2019"
                              ? "Courier New, monospace"
                              : era === "2020-2022"
                                ? "Helvetica, sans-serif"
                                : "Inter, system-ui, sans-serif",
                  }}
                >
                  {location.name} ({location.count})
                </option>
              )
            })}
          </select>
        </div>

        {/* Main content area */}
        <div className="flex-1 pl-0 md:pl-6 overflow-hidden">
          {/* Filter buttons */}
          <div className="mb-6 flex overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="mr-2 whitespace-nowrap font-sans font-medium"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="mr-2 whitespace-nowrap font-sans font-medium"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title}
              </Button>
            ))}
          </div>

          {/* Content cards with horizontal scrolling */}
          <div className="relative w-full">
            {canScrollLeft && (
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-lg p-2 text-gray-800"
                onClick={() => scroll("left")}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            <div
              ref={contentContainerRef}
              className="w-full overflow-x-auto pb-8 pt-2 scrollbar-hide"
              onScroll={handleScroll}
            >
              <div className="flex gap-6 pl-2 pr-8 w-max">
                {allItemsSorted.map((item, index) => {
                  const isSelectedPhase = (item.locationSort || 999) === selectedLocationSort
                  const era = locationSortToEra[item.locationSort || 999] || "2023-2025"

                  // Get era-specific border color for selected cards
                  let borderClass = ""
                  if (isSelectedPhase) {
                    switch (era) {
                      case "2004-2007":
                        borderClass = "ring-yellow-500"
                        break
                      case "2008-2011":
                        borderClass = "ring-gray-500"
                        break
                      case "2012-2015":
                        borderClass = "ring-amber-700"
                        break
                      case "2016-2019":
                        borderClass = "ring-purple-500"
                        break
                      case "2020-2022":
                        borderClass = "ring-gray-400"
                        break
                      case "2023-2025":
                        borderClass = "ring-blue-500"
                        break
                      default:
                        borderClass = "ring-blue-400"
                    }
                  }

                  return (
                    <div
                      key={item.id}
                      id={`card-${item.id}`}
                      className="flex-shrink-0 w-72 md:w-80"
                      data-index={index}
                      data-location-sort={item.locationSort}
                    >
                      <div className={isSelectedPhase ? `ring-2 ${borderClass} rounded-lg` : ""}>
                        <ContentCard item={item} isHomePage={true} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {canScrollRight && (
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-lg p-2 text-gray-800"
                onClick={() => scroll("right")}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Phase indicator dots */}
          <div className="mt-4 flex justify-center">
            <div className="flex gap-2">
              {locationFilters.map((location) => {
                const isActive = selectedLocationSort === location.locationSort
                const era = locationSortToEra[location.locationSort] || "unknown"

                // Get era-specific color for indicator dots
                let dotColor = "bg-blue-600"
                if (isActive) {
                  switch (era) {
                    case "2004-2007":
                      dotColor = "bg-yellow-500"
                      break
                    case "2008-2011":
                      dotColor = "bg-gray-500"
                      break
                    case "2012-2015":
                      dotColor = "bg-amber-700"
                      break
                    case "2016-2019":
                      dotColor = "bg-purple-500"
                      break
                    case "2020-2022":
                      dotColor = "bg-gray-400"
                      break
                    case "2023-2025":
                      dotColor = "bg-blue-500"
                      break
                  }
                }

                return (
                  <button
                    key={`dot-${location.locationSort}`}
                    className={`w-2 h-2 rounded-full transition-all ${isActive ? `${dotColor} w-4` : "bg-gray-300"}`}
                    onClick={() => selectLocation(location.locationSort)}
                    aria-label={`Go to ${location.name}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
