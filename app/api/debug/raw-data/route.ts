import { NextResponse } from "next/server"
import { fetchAirtableRecords } from "@/lib/airtable"

export async function GET() {
  try {
    // Get raw Airtable records
    const records = await fetchAirtableRecords()

    // Create a simplified view of all records
    const simplifiedRecords = records.map((record) => ({
      id: record.id,
      experience: record.fields.Experience || "",
      company: record.fields.Company || "",
      type: record.fields.Type || "",
      sortOrder: record.fields.SortOrder || 0,
      publishStatus: record.fields["Publish Status"] || "",
      hasCover: !!record.fields.Cover || !!record.fields["Cover CDN"],
      coverCDN: record.fields["Cover CDN"] || null,
      coverAttachment: record.fields.Cover ? record.fields.Cover[0]?.url : null,
    }))

    // Count records by type
    const typeCount: Record<string, number> = {}
    records.forEach((record) => {
      const type = record.fields.Type || "Unknown"
      typeCount[type] = (typeCount[type] || 0) + 1
    })

    // Find potential founder records - specifically looking for Experience = "Founder" with a Company
    const potentialFounders = simplifiedRecords.filter((r) => {
      return r.experience === "Founder" && r.company
    })

    return NextResponse.json({
      totalRecords: records.length,
      typeCount,
      records: simplifiedRecords,
      potentialFounders,
    })
  } catch (error) {
    console.error("Error in raw-data debug endpoint:", error)
    return NextResponse.json({ error: "Failed to fetch raw data" }, { status: 500 })
  }
}
