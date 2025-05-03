"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { TimePeriod } from "@/lib/types"
import { getEraStyles } from "@/lib/era-styles"

interface TimelineSelectorProps {
  timePeriods: TimePeriod[]
  selectedEra: string
  onSelectEra: (era: string) => void
}

export default function TimelineSelector({ timePeriods, selectedEra, onSelectEra }: TimelineSelectorProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (timelineRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (timelineRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        direction === "left"
          ? timelineRef.current.scrollLeft - scrollAmount
          : timelineRef.current.scrollLeft + scrollAmount

      timelineRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })

      setTimeout(checkScrollButtons, 500)
    }
  }

  // Scroll selected era into view
  useEffect(() => {
    if (timelineRef.current) {
      const selectedElement = timelineRef.current.querySelector(`[data-era="${selectedEra}"]`)
      if (selectedElement) {
        const { offsetLeft, offsetWidth } = selectedElement as HTMLElement
        const { scrollLeft, offsetWidth: containerWidth } = timelineRef.current

        // Center the selected element
        const targetScrollLeft = offsetLeft - containerWidth / 2 + offsetWidth / 2

        timelineRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: "smooth",
        })

        setTimeout(checkScrollButtons, 500)
      }
    }
  }, [selectedEra])

  return (
    <div className="relative px-4 md:px-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Explore By Era</h2>

      <div className="relative">
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

        <div ref={timelineRef} className="flex overflow-x-auto pb-4 scrollbar-hide" onScroll={checkScrollButtons}>
          <div className="flex gap-4 px-4">
            {timePeriods.map((period) => {
              const isSelected = selectedEra === period.id
              const eraStyles = getEraStyles(period.id)

              return (
                <div
                  key={period.id}
                  data-era={period.id}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    isSelected ? "scale-105" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Button
                    variant={isSelected ? "default" : "outline"}
                    className={`h-auto py-2 px-3 flex flex-col items-center ${
                      isSelected ? eraStyles.button : "border-gray-300"
                    }`}
                    onClick={() => onSelectEra(period.id)}
                  >
                    <span className="text-sm font-bold">{period.id}</span>
                    <span className="text-xs mt-1 max-w-[150px] text-center line-clamp-1">{period.name}</span>
                  </Button>
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

      <div className="mt-6 max-w-3xl mx-auto text-center">
        <h3 className="text-xl font-semibold mb-2">{timePeriods.find((p) => p.id === selectedEra)?.name}</h3>
        <p className="text-gray-600">{timePeriods.find((p) => p.id === selectedEra)?.aesthetic}</p>
      </div>
    </div>
  )
}
