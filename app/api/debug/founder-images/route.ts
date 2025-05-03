import { NextResponse } from "next/server"
import { fetchAirtableRecords } from "@/lib/airtable"

export async function GET() {
  try {
    // Get raw Airtable records
    const records = await fetchAirtableRecords()

    // Filter for Founder records
    const founderRecords = records.filter((r) => r.fields.Experience === "Founder" && r.fields.Company)

    // Extract just the relevant image fields for debugging
    const imageData = founderRecords.map((record) => ({
      id: record.id,
      company: record.fields.Company,
      coverCDN: record.fields["Cover CDN"] || null,
      hasCoverAttachment: record.fields.Cover && record.fields.Cover.length > 0,
      coverAttachmentUrl: record.fields.Cover && record.fields.Cover.length > 0 ? record.fields.Cover[0].url : null,
      // Include all fields for inspection
      allImageFields: {
        "Cover CDN": record.fields["Cover CDN"],
        Cover: record.fields.Cover ? "Present" : "Not present",
        "Logo CDN": record.fields["Logo CDN"],
        Logo: record.fields.Logo ? "Present" : "Not present",
      },
    }))

    // Return the debug data
    return NextResponse.json({
      count: imageData.length,
      items: imageData,
    })
  } catch (error) {
    console.error("Error in founder-images debug endpoint:", error)
    return NextResponse.json({ error: "Failed to fetch founder image data" }, { status: 500 })
  }
}
