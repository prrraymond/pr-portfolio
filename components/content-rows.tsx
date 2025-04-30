"use client"

import { useState } from "react"
import { timePeriods } from "@/lib/time-periods"
import ContentRow from "@/components/content-row"
import TimelineSelector from "@/components/timeline-selector"
import { categories } from "@/lib/categories"

export default function ContentRows() {
  const [selectedEra, setSelectedEra] = useState(timePeriods[timePeriods.length - 1].id)

  // Filter content to show only items from the selected era
  const filteredCategories = categories.map((category) => ({
    ...category,
    items: category.items.filter((item) => item.era === selectedEra),
  }))

  return (
    <div id="content" className="pt-8 pb-16 bg-white">
      <div className="px-4 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Explore by Category</h2>
      </div>

      <TimelineSelector timePeriods={timePeriods} selectedEra={selectedEra} onSelectEra={setSelectedEra} />

      <div className="mt-12 space-y-20">
        {filteredCategories.map(
          (category) =>
            category.items.length > 0 && (
              <ContentRow key={category.id} title={category.title} items={category.items} era={selectedEra} />
            ),
        )}
      </div>
    </div>
  )
}
