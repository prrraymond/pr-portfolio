import { NextResponse } from "next/server"
import { fetchAirtableRecords } from "@/lib/airtable"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Get all records
    const records = await fetchAirtableRecords()

    // Find the specific record
    const record = records.find((r) => r.id === id)

    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 })
    }

    // Return the record data
    return NextResponse.json({
      id: record.id,
      fields: {
        ...record.fields,
        // Convert attachments to URLs for easier inspection
        Cover: record.fields.Cover ? record.fields.Cover.map((a) => a.url) : null,
        Logo: record.fields.Logo ? record.fields.Logo.map((a) => a.url) : null,
      },
    })
  } catch (error) {
    console.error("Error fetching record:", error)
    return NextResponse.json({ error: "Failed to fetch record" }, { status: 500 })
  }
}
