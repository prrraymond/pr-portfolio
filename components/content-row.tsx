"use client"

import { useState, useRef } from "react"
import ContentCard from "@/components/content-card"
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

  const eraStyles = getEraStyles(era)

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

  return (
    <section className="px-4 md:px-8 relative">
      <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${eraStyles.header}`}>{title}</h2>

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
            {items.map((item) => (
              <div key={item.id} className="snap-start">
                <ContentCard item={item} era={era} />
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
    </section>
  )
}
