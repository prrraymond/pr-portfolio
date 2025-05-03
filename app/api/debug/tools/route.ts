import { NextResponse } from "next/server"
import { fetchAirtableRecords } from "@/lib/airtable"

export async function GET() {
  try {
    // Get raw Airtable records
    const records = await fetchAirtableRecords()

    // Extract just the tools-related fields for debugging
    const toolsData = records
      .filter((record) => record.fields.Tools && record.fields.Tools.length > 0)
      .map((record) => ({
        id: record.id,
        experience: record.fields.Experience,
        tools: record.fields.Tools,
        toolLogos: record.fields["Logo CDN (from Tools)"] || [],
        // Include all fields for inspection
        allFields: {
          Tools: record.fields.Tools,
          "Logo CDN (from Tools)": record.fields["Logo CDN (from Tools)"],
        },
      }))

    // Return the debug data
    return NextResponse.json({
      count: toolsData.length,
      items: toolsData,
    })
  } catch (error) {
    console.error("Error in tools debug endpoint:", error)
    return NextResponse.json({ error: "Failed to fetch tools debug data" }, { status: 500 })
  }
}
