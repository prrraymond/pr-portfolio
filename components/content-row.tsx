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
    if (title === "Founders") {
      console.log("Founder items:", items)
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

  // Check if this is the Founders row
  const isFoundersRow = title === "Founders"

  // Log when rendering
  console.log(`Rendering ContentRow: ${title} (key: ${renderKey})`)
  if (isFoundersRow) {
    console.log(`Using FounderCardV2 for ${items.length} items`)
  }

  return (
    <section className="px-4 md:px-8 relative" key={renderKey}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${eraStyles.header}`}>{title}</h2>

      {/* Add a special indicator for Founders row */}
      {isFoundersRow && (
        <div className="mb-4 text-sm text-blue-600 font-medium">
          Using new Founder card style (v2) - {items.length} founders
        </div>
      )}

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
          className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
          onScroll={checkScrollButtons}
        >
          <div className="flex gap-4">
            {items.map((item) => {
              // Log each item in Founders row
              if (isFoundersRow) {
                console.log(`Rendering Founder item: ${item.id} (${item.company})`)
              }

              return (
                <div key={`${item.id}-${renderKey}`} className="snap-start">
                  {/* Use FounderCardV2 for Founder items, ContentCard for others */}
                  {isFoundersRow || item.type === "Founders" ? (
                    <FounderCardV2 item={item} isHomePage={true} />
                  ) : (
                    <ContentCard item={item} isHomePage={true} />
                  )}
                </div>
              )
            })}
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
    </section>
  )
}
