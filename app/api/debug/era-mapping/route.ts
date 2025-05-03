import { NextResponse } from "next/server"
import { fetchAirtableRecords, transformAirtableRecords } from "@/lib/airtable"

export async function GET() {
  try {
    // Get raw Airtable records
    const records = await fetchAirtableRecords()

    // Transform the records
    const transformedItems = transformAirtableRecords(records)

    // Create a mapping report
    const mappingReport = transformedItems.map((item) => ({
      id: item.id,
      title: item.title,
      company: item.company,
      startYear: item.startYear,
      era: item.era,
      type: item.type,
      location: item.location,
      locationSort: item.locationSort,
      sortOrder: item.sortOrder,
    }))

    // Group by era
    const groupedByEra = mappingReport.reduce(
      (acc, item) => {
        if (!acc[item.era]) {
          acc[item.era] = []
        }
        acc[item.era].push(item)
        return acc
      },
      {} as Record<string, any[]>,
    )

    return NextResponse.json({
      totalItems: transformedItems.length,
      byEra: groupedByEra,
      allItems: mappingReport,
    })
  } catch (error) {
    console.error("Error in era-mapping debug endpoint:", error)
    return NextResponse.json({ error: "Failed to analyze era mapping" }, { status: 500 })
  }
}
