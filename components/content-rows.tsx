"use client"

import { useState, useEffect } from "react"
import { timePeriods } from "@/lib/time-periods"
import ContentRow from "@/components/content-row"
import TimelineSelector from "@/components/timeline-selector"
import { categories } from "@/lib/categories"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function ContentRows() {
  const [selectedEra, setSelectedEra] = useState(timePeriods[timePeriods.length - 1].id)
  // Add a key to force re-render
  const [refreshKey, setRefreshKey] = useState(Date.now())
  // Add state to track if we've refreshed
  const [hasRefreshed, setHasRefreshed] = useState(false)

  // Force a refresh on mount
  useEffect(() => {
    // Set a timeout to refresh after component mounts
    const timer = setTimeout(() => {
      setRefreshKey(Date.now())
      setHasRefreshed(true)
      console.log("ContentRows auto-refreshed")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter content to show only items from the selected era
  const filteredCategories = categories.map((category) => ({
    ...category,
    items: category.items.filter((item) => item.era === selectedEra),
  }))

  // Function to manually refresh
  const handleRefresh = () => {
    setRefreshKey(Date.now())
    setHasRefreshed(true)
    console.log("ContentRows manually refreshed")
  }

  return (
    <div id="content" className="pt-8 pb-16 bg-white" key={refreshKey}>
      <div className="px-4 md:px-8 flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Explore by Category</h2>

        {/* Add refresh button */}
        <Button variant="outline" size="sm" onClick={handleRefresh} className="mb-4 flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh Content
        </Button>
      </div>

      <TimelineSelector timePeriods={timePeriods} selectedEra={selectedEra} onSelectEra={setSelectedEra} />

      {/* Add a message to indicate refresh status */}
      {hasRefreshed && (
        <div className="mt-4 mb-8 px-4 md:px-12 text-sm text-green-600">
          Content refreshed at {new Date().toLocaleTimeString()}. Founder cards should now display with colored
          backgrounds.
        </div>
      )}

      <div className="mt-8 space-y-16">
        {filteredCategories.map(
          (category) =>
            category.items.length > 0 && (
              <ContentRow
                key={`${category.id}-${refreshKey}`}
                title={category.title}
                items={category.items}
                era={selectedEra}
              />
            ),
        )}
      </div>
    </div>
  )
}
