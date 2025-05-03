"use client"

import { useState, useRef, useEffect } from "react"
import ContentCardWrapper from "@/components/content-card-wrapper"
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
        console.log(`- ${item.title} at ${item.company} (ID: ${item.id})`)
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

  // Check if this is the Founders row
  const isFoundersRow = title === "Founders"

  // Count how many founder items we have
  const founderCount = items.filter((item) => item.isFounder).length

  // Log when rendering
  console.log(`Rendering ContentRow: ${title} (key: ${renderKey})`)
  if (isFoundersRow || founderCount > 0) {
    console.log(`Row contains ${founderCount} founder items`)
  }

  return (
    <section className="px-4 md:px-8 relative" key={renderKey}>
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${eraStyles.header}`}>{title}</h2>

      {/* Add a special indicator for rows with founder items */}
      {(isFoundersRow || founderCount > 0) && (
        <div className="mb-4 text-sm text-blue-600 font-medium">
          Using new Founder card style (v2) - {founderCount} founders
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
              // Log each founder item
              if (item.isFounder) {
                console.log(`Rendering founder item in row: ${item.title} at ${item.company} (ID: ${item.id})`)
              }

              return (
                <div key={`${item.id}-${renderKey}`} className="snap-start">
                  <ContentCardWrapper item={item} isHomePage={true} />
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
