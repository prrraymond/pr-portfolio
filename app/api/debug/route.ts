import { NextResponse } from "next/server"
import { fetchAirtableRecords } from "@/lib/airtable"

export async function GET() {
  try {
    // Get raw Airtable records
    const records = await fetchAirtableRecords()

    // Extract just the relevant fields for debugging
    const debugData = records
      .filter((record) => record.fields.Type === "Founders")
      .map((record) => ({
        id: record.id,
        title: record.fields.Experience,
        type: record.fields.Type,
        cover: record.fields.Cover,
        coverCDN: record.fields["Cover CDN"],
        // Include all fields for inspection
        allFields: Object.keys(record.fields),
      }))

    // Return the debug data
    return NextResponse.json({
      count: debugData.length,
      items: debugData,
    })
  } catch (error) {
    console.error("Error in debug endpoint:", error)
    return NextResponse.json({ error: "Failed to fetch debug data" }, { status: 500 })
  }
}
