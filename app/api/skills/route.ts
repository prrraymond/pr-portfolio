import { NextResponse } from "next/server"

interface SkillRecord {
  id: string
  fields: {
    Name?: string
    Category?: string[]
    Description?: string
    [key: string]: any
  }
}

// Import the getFullCategoryName function to ensure consistent category naming
import { getFullCategoryName } from "@/lib/skills-category-helper"

export async function GET() {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY
    const baseId = process.env.AIRTABLE_BASE_ID
    const token = process.env.AIRTABLE_TOKEN
    const skillsTableName = "Skills" // The name of your Skills table

    if (!apiKey && !token) {
      return NextResponse.json({ error: "No Airtable authentication credentials found" }, { status: 500 })
    }

    if (!baseId) {
      return NextResponse.json({ error: "Airtable Base ID is missing" }, { status: 500 })
    }

    // Use the token if available, otherwise use the API key
    const authHeader = token ? `Bearer ${token}` : `Bearer ${apiKey}`

    // Properly encode the table name for the URL
    const encodedTableName = encodeURIComponent(skillsTableName)

    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodedTableName}`, {
      headers: {
        Authorization: authHeader,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Airtable API error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Transform the data to a more usable format
    const skillsMap = data.records.reduce((acc: Record<string, any>, record: SkillRecord) => {
      if (record.fields.Name) {
        // Get the category from Airtable
        const rawCategory = record.fields.Category?.[0] || "Other"

        // Ensure we're using the full category name
        const fullCategory = getFullCategoryName(rawCategory)

        console.log(`API: Category for ${record.fields.Name}: ${rawCategory} -> ${fullCategory}`)

        acc[record.id] = {
          id: record.id,
          name: record.fields.Name,
          category: fullCategory,
          description: record.fields.Description || "",
        }
      }
      return acc
    }, {})

    // Extract unique categories
    const categories = [...new Set(Object.values(skillsMap).map((skill: any) => skill.category))].sort()

    console.log("API: All categories:", categories)

    return NextResponse.json({
      skills: skillsMap,
      categories: categories,
    })
  } catch (error) {
    console.error("Error fetching Skills data:", error)
    return NextResponse.json({ error: "Failed to fetch Skills data" }, { status: 500 })
  }
}
