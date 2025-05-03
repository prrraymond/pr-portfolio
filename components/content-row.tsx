"use client"

import { useState, useRef, useEffect } from "react"
import ContentCard from "@/components/content-card"
import FounderCardV2 from "@/components/founder-card-v2"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ContentItem } from "@/lib/types"
import { getEraStyles } from "@/lib/era-styles"

interface ContentRowProps {
  title: string
  items: ContentItem[]
  era: string
}

export default function ContentRow({ title, items, era }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  // Add a key to force re-render
  const [renderKey, setRenderKey] = useState(Date.now())

  const eraStyles = getEraStyles(era)

  // Force a re-render on mount
  useEffect(() => {
    // Set a new key to force re-render after component mounts
    setRenderKey(Date.now())

    // Log that the component has mounted with the current items
    console.log(`ContentRow mounted: ${title}`)
    console.log(`Items count: ${items.length}`)

    // Check for founder items
    const founderItems = items.filter((item) => item.isFounder)
    if (founderItems.length > 0) {
      console.log(`Found ${founderItems.length} founder items in ${title} row:`)
      founderItems.forEach((item) => {
        console.log(`- ${item.title} at ${item.company} (ID: ${item.id}, RecordID: ${item.recordId})`)
        console.log(`  Image URL: ${item.image}`)
      })
    }
  }, [title, items])

  const checkScrollButtons = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.8
      const newScrollLeft =
        direction === "left" ? rowRef.current.scrollLeft - scrollAmount : rowRef.current.scrollLeft + scrollAmount

      rowRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })

      // Update button states after scrolling
      setTimeout(checkScrollButtons, 500)
    }
  }

  // Count how many founder items we have
  const founderItems = items.filter((item) => item.isFounder)
  const founderCount = founderItems.length

  // Log when rendering
  console.log(`Rendering ContentRow: ${title} (key: ${renderKey})`)
  if (founderCount > 0) {
    console.log(`Row contains ${founderCount} founder items`)
  }

  // Create a special section for founder items
  const createFounderSection = () => {
    if (founderCount === 0) return null

    return (
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3 text-blue-600">Founder Experiences ({founderCount})</h3>
        <div className="flex flex-wrap gap-4">
          {founderItems.map((item, index) => (
            <div
              key={`founder-${item.company}-${index}-${renderKey}`}
              className="founder-card-container"
              data-company={item.company}
              data-index={index}
              data-render-key={renderKey}
            >
              <FounderCardV2 item={item} isHomePage={true} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Filter out founder items from the main display
  const regularItems = items.filter((item) => !item.isFounder)

  return (
    <section className="px-4 md:px-8 relative" key={renderKey}>
      <h2 className={`text-xl md:text-2xl font-bold mb-4 ${eraStyles.header}`}>{title}</h2>

      {/* Display founder items in a special section */}
      {createFounderSection()}

      {/* Only show the scrollable row if there are regular items */}
      {regularItems.length > 0 && (
        <div className="relative group">
          {canScrollLeft && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm opacity-90 hover:opacity-100 -ml-4 shadow-lg"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          <div
            ref={rowRef}
            className="flex overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
            onScroll={checkScrollButtons}
          >
            <div className="flex gap-3">
              {regularItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}-${renderKey}`}
                  className="snap-start regular-card"
                  data-id={item.id}
                  data-index={index}
                >
                  <ContentCard item={item} isHomePage={true} />
                </div>
              ))}
            </div>
          </div>

          {canScrollRight && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm opacity-90 hover:opacity-100 -mr-4 shadow-lg"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
