import { NextResponse } from "next/server"
import { fetchAirtableRecords } from "@/lib/airtable"

export async function GET() {
  try {
    // Get raw Airtable records
    const records = await fetchAirtableRecords()

    // Extract just the relevant fields for debugging
    const debugData = records.map((record) => ({
      id: record.id,
      title: record.fields.Experience,
      skills: record.fields.Skills,
      skillNames: record.fields.SkillNames,
      // Include all fields for inspection
      allFields: Object.keys(record.fields),
    }))

    // Return the debug data
    return NextResponse.json({
      count: records.length,
      items: debugData,
    })
  } catch (error) {
    console.error("Error in debug endpoint:", error)
    return NextResponse.json({ error: "Failed to fetch debug data" }, { status: 500 })
  }
}
