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
    "miami-1": "Miami",
    "new-haven": "New Haven",
    "miami-2": "Miami",
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

// Define direct style objects for each location
const locationStyles: Record<string, React.CSSProperties> = {
  providence: {
    fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    fontWeight: "bold",
    letterSpacing: "-0.5px",
    textTransform: "uppercase",
    color: "#ca8a04", // Gold/yellow color
  },
  "nyc-det-cle": {
    fontFamily: "Georgia, 'Times New Roman', Times, serif",
    fontStyle: "normal",
    color: "#374151", // Dark gray color
  },
  "miami-1": {
    fontFamily: "'Times New Roman', Times, serif",
    fontStyle: "italic",
    color: "#92400e", // Amber/brown color
  },
  "new-haven": {
    fontFamily: "'Courier New', Courier, monospace",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#9333ea", // Purple color
  },
  "miami-2": {
    fontFamily: "'Courier New', Courier, monospace",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#9333ea", // Purple color
  },
  nyc: {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "300",
    letterSpacing: "0.5px",
    color: "#4b5563", // Medium gray color
  },
}

export default function ContentSection({ initialCategories }: ContentSectionProps) {
  const [categories] = useState<Category[]>(initialCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const [selectedLocationSort, setSelectedLocationSort] = useState<number | null>(null)

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

  return (
    <section className="bg-white pt-4 pb-8" id="content">
      <div className="flex">
        {/* Left sidebar - Journey navigation */}
        <div className="hidden md:block w-48 lg:w-56 flex-shrink-0 border-r border-gray-200 pr-4">
          <h3 className="text-xl font-bold mb-6 text-gray-800 font-sans">Journey</h3>
          <ul className="space-y-2">
            {locationFilters.map((location) => {
              const isSelected = selectedLocationSort === location.locationSort
              // Get the style for this location
              const style = locationStyles[location.location] || {}

              return (
                <li key={`location-${location.locationSort}`}>
                  <button
                    className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                      isSelected ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                    onClick={() => selectLocation(location.locationSort)}
                    data-location-sort={location.locationSort}
                    data-location={location.location}
                  >
                    {/* Apply styles directly inline */}
                    <span style={style}>{location.name}</span>
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
            {locationFilters.map((location) => (
              <option key={`location-${location.locationSort}`} value={location.locationSort}>
                {location.name} ({location.count})
              </option>
            ))}
          </select>
        </div>

        {/* Main content area */}
        <div className="flex-1 pl-0 md:pl-6 overflow-hidden">
          {/* Filter buttons */}
          <div className="mb-6 flex overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              className="mr-2 whitespace-nowrap"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="mr-2 whitespace-nowrap"
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

                  return (
                    <div
                      key={item.id}
                      id={`card-${item.id}`}
                      className="flex-shrink-0 w-72 md:w-80"
                      data-index={index}
                      data-location-sort={item.locationSort}
                    >
                      <div className={isSelectedPhase ? "ring-2 ring-blue-400 rounded-lg" : ""}>
                        <ContentCard item={item} />
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
                return (
                  <button
                    key={`dot-${location.locationSort}`}
                    className={`w-2 h-2 rounded-full transition-all ${isActive ? "bg-blue-600 w-4" : "bg-gray-300"}`}
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
