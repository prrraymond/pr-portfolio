import { NextResponse } from "next/server"
import { fetchAirtableRecords, transformAirtableRecords } from "@/lib/airtable"

export async function GET() {
  try {
    // Get raw Airtable records
    const records = await fetchAirtableRecords()

    // Get transformed items
    const transformedItems = transformAirtableRecords(records)

    // Filter for Founders only
    const founderRecords = records.filter((record) => record.fields.Type === "Founders")
    const founderItems = transformedItems.filter((item) => item.type === "Founders")

    // Create detailed debug info
    const debugInfo = founderRecords.map((record) => {
      // Find the corresponding transformed item
      const transformedItem = founderItems.find((item) => item.recordId === record.id)

      return {
        // Raw Airtable data
        id: record.id,
        title: record.fields.Experience,
        coverCDN: record.fields["Cover CDN"],
        coverAttachment: record.fields.Cover ? record.fields.Cover[0]?.url : null,

        // Transformed data
        transformedId: transformedItem?.id,
        transformedImage: transformedItem?.image,

        // Full record for inspection
        rawFields: {
          ...record.fields,
          // Remove large attachments for readability
          Cover: record.fields.Cover ? "Attachment present" : null,
          Logo: record.fields.Logo ? "Attachment present" : null,
        },
      }
    })

    return NextResponse.json({
      count: founderRecords.length,
      items: debugInfo,
    })
  } catch (error) {
    console.error("Error in founders debug endpoint:", error)
    return NextResponse.json({ error: "Failed to fetch founder debug data" }, { status: 500 })
  }
}
