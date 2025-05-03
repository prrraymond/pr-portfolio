import { NextResponse } from "next/server"
import { fetchAirtableRecords, transformAirtableRecords } from "@/lib/airtable"

export async function GET() {
  try {
    // Get raw Airtable records
    const records = await fetchAirtableRecords()

    // Filter for Founder records
    const founderRecords = records.filter((r) => r.fields.Experience === "Founder")

    // Transform all records
    const transformedItems = transformAirtableRecords(records)

    // Filter for transformed Founder items
    const founderItems = transformedItems.filter((item) => item.title === "Founder")

    // Create a detailed report
    const report = {
      rawFounderCount: founderRecords.length,
      transformedFounderCount: founderItems.length,

      rawFounders: founderRecords.map((r) => ({
        id: r.id,
        experience: r.fields.Experience,
        company: r.fields.Company,
        coverCDN: r.fields["Cover CDN"],
        hasCoverAttachment: r.fields.Cover && r.fields.Cover.length > 0,
      })),

      transformedFounders: founderItems.map((item) => ({
        id: item.id,
        recordId: item.recordId,
        title: item.title,
        company: item.company,
        image: item.image,
      })),

      // Check for duplicate slugs
      slugCounts: founderItems.reduce(
        (acc, item) => {
          acc[item.id] = (acc[item.id] || 0) + 1
          return acc
        },
        {} as Record<string, number>,
      ),
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error in founder-issue debug endpoint:", error)
    return NextResponse.json({ error: "Failed to analyze founder issue" }, { status: 500 })
  }
}
