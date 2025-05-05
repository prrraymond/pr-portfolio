import { NextResponse } from "next/server"
import { getAllContent } from "@/lib/airtable"
import { locationSortToEra } from "@/components/content-section"

export async function GET() {
  try {
    const { items } = await getAllContent()

    // Group items by locationSort
    const locationGroups = items.reduce(
      (acc, item) => {
        const locationSort = item.locationSort || 999

        if (!acc[locationSort]) {
          acc[locationSort] = []
        }

        acc[locationSort].push({
          id: item.id,
          title: item.title,
          location: item.location,
          locationSort: item.locationSort,
          era: item.era,
          mappedEra: locationSortToEra[locationSort] || "unknown",
        })

        return acc
      },
      {} as Record<number, any[]>,
    )

    // Find all Miami locations
    const miamiLocations = items
      .filter((item) => item.location && item.location.toLowerCase().includes("miami"))
      .map((item) => ({
        id: item.id,
        title: item.title,
        location: item.location,
        locationSort: item.locationSort,
        era: item.era,
        mappedEra: locationSortToEra[item.locationSort || 999] || "unknown",
      }))
      .sort((a, b) => a.locationSort - b.locationSort)

    return NextResponse.json({
      locationGroups,
      locationSortToEra,
      miamiLocations,
      totalItems: items.length,
    })
  } catch (error) {
    console.error("Error in debug locations route:", error)
    return NextResponse.json({ error: "Failed to fetch location data" }, { status: 500 })
  }
}
