import type { ContentItem, Category, ProjectImage, ToolItem } from "@/lib/types"

// Define the Airtable record structure based on your schema
interface AirtableRecord {
  id: string
  fields: {
    Experience?: string
    Company?: string
    Type?: string
    StartYear?: number
    SortOrder?: number
    LocationSort?: number
    Hero?: string // "Y" for hero items
    "Publish Status"?: string
    Description?: string
    Overview?: string
    Link?: string
    Eras?: string[]
    EraCSS?: string
    Era?: string
    Location?: string
    Logo?: Array<{ url: string; filename: string; size: number; type: string }>
    "Logo CDN"?: string
    Cover?: Array<{ url: string; filename: string; size: number; type: string }>
    "Cover CDN"?: string
    Skills?: string[]
    SkillNames?: string | string[] // Could be string or array depending on lookup field
    "Skill Names"?: string | string[] // Alternative field name
    SkillsConcat?: string // New formula field that concatenates skills
    Category?: string[]
    Tools?: string[]
    "Logo CDN (from Tools)"?: string[] // Tool logos from CDN
    "Project Image 1"?: Array<{ url: string; filename: string; size: number; type: string }>
    "PIMG1 CDN"?: string
    "Image 1 Caption"?: string
    "Project Image 2"?: Array<{ url: string; filename: string; size: number; type: string }>
    "PIMG2 CDN"?: string
    "Image 2 Caption"?: string
    "Project Image 3"?: Array<{ url: string; filename: string; size: number; type: string }>
    "PIMG3 CDN"?: string
    "Image 3 Caption"?: string
    "Project Image 4"?: Array<{ url: string; filename: string; size: number; type: string }>
    "PIMG4 CDN"?: string
    "Hide all"?: boolean
  }
}

// Function to fetch all records from Airtable
export async function fetchAirtableRecords(): Promise<AirtableRecord[]> {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Experiences"
  const token = process.env.AIRTABLE_TOKEN // Try alternative token if available

  if (!apiKey && !token) {
    console.error("No Airtable authentication credentials found")
    return getMockData() // Return mock data if no credentials
  }

  if (!baseId) {
    console.error("Airtable Base ID is missing")
    return getMockData() // Return mock data if no base ID
  }

  try {
    // Use the token if available, otherwise use the API key
    const authHeader = token ? `Bearer ${token}` : `Bearer ${apiKey}`

    // Properly encode the table name for the URL
    const encodedTableName = encodeURIComponent(tableName)

    const response = await fetch(`https://api.airtable.com/v0/${baseId}/${encodedTableName}`, {
      headers: {
        Authorization: authHeader,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      console.error(`Airtable API error: ${response.status} ${response.statusText}`)
      return getMockData() // Return mock data on error
    }

    const data = await response.json()
    return data.records as AirtableRecord[]
  } catch (error) {
    console.error("Error fetching Airtable data:", error)
    return getMockData() // Return mock data on exception
  }
}

// Fallback mock data function with correct location names and order
function getMockData(): AirtableRecord[] {
  console.log("Using mock data as fallback")

  // Create mock records with proper LocationSort values
  return [
    {
      id: "rec1",
      fields: {
        Experience: "Brown University",
        Company: "Brown University",
        Type: "Education",
        StartYear: 2004,
        SortOrder: 1,
        LocationSort: 1, // Providence
        "Publish Status": "Active",
        Description: "Bachelor's degree in Economics and Political Science",
        Location: "providence",
        Skills: ["Economics", "Political Science", "Research"],
        SkillNames: "Economics, Political Science, Research",
        SkillsConcat: "Economics, Political Science, Research",
        Eras: ["2004-2007"],
        Category: ["Education"],
      },
    },
    {
      id: "rec2",
      fields: {
        Experience: "Management Consultant",
        Company: "Consulting Firm",
        Type: "Professional",
        StartYear: 2008,
        SortOrder: 2,
        LocationSort: 2, // NYC / Detroit / Cleveland
        "Publish Status": "Active",
        Description: "Strategic consulting for Fortune 500 companies",
        Location: "nyc-det-cle",
        Skills: ["Strategy", "Analysis", "Leadership"],
        SkillNames: "Strategy, Analysis, Leadership",
        SkillsConcat: "Strategy, Analysis, Leadership",
        Eras: ["2008-2011"],
        Category: ["Consulting"],
      },
    },
    // Other mock records...
  ]
}

// Function to normalize location IDs
export function normalizeLocationId(locationId: string): string {
  // Map similar locations to a consistent ID
  const locationMap: Record<string, string> = {
    "new-haven-1": "new-haven",
    "new-haven-2": "new-haven",
    "miami-1": "miami-1",
    "miami-2": "miami-2",
    "miami-3": "miami-3",
  }

  return locationMap[locationId] || locationId
}

// Helper function to handle various formats of SkillNames
function processSkillNames(skillNames: unknown): string {
  // If it's a string, return it directly
  if (typeof skillNames === "string") {
    return skillNames
  }

  // If it's an array, join it with commas
  if (Array.isArray(skillNames)) {
    return skillNames.join(", ")
  }

  // Otherwise, return an empty string
  return ""
}

// Function to create a unique slug for a record
function createUniqueSlug(record: AirtableRecord): string {
  // Start with the Experience field
  let baseSlug = record.fields.Experience
    ? record.fields.Experience.toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")
    : "item"

  // For records with "Founder" as Experience, make them unique by adding:
  // 1. Company name if available
  // 2. Record ID as a fallback
  if (record.fields.Experience === "Founder") {
    // If we have a company name, add it to the slug
    if (record.fields.Company) {
      baseSlug = `${baseSlug}-at-${record.fields.Company.toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-")}`
    } else {
      // Otherwise, use the record ID to ensure uniqueness
      baseSlug = `${baseSlug}-${record.id.toLowerCase()}`
    }
  }

  return baseSlug
}

// Update the transformAirtableRecords function to use normalized location IDs
export function transformAirtableRecords(records: AirtableRecord[]): ContentItem[] {
  // First, log all Founder records to help with debugging
  const founderRecords = records.filter((r) => r.fields.Experience === "Founder")
  console.log(`Found ${founderRecords.length} Founder records:`)
  founderRecords.forEach((r) => {
    console.log(`- ID: ${r.id}, Company: ${r.fields.Company}, Cover: ${r.fields["Cover CDN"] || "(attachment)"}`)
  })

  // Track used slugs to ensure uniqueness
  const usedSlugs = new Set<string>()

  const transformedItems = records
    .filter((record) => record.fields["Publish Status"] === "Active") // Only include active records
    .map((record) => {
      // Create a unique slug for this record
      let slug = createUniqueSlug(record)

      // If this slug is already used, make it unique by appending the record ID
      if (usedSlugs.has(slug)) {
        slug = `${slug}-${record.id.toLowerCase()}`
      }

      // Add this slug to the used slugs set
      usedSlugs.add(slug)

      // Get the era from the Eras field (assuming it's an array with one item)
      const era = record.fields.Eras && record.fields.Eras.length > 0 ? record.fields.Eras[0] : "2023-2025" // Default to latest era

      // Get image URLs, with special handling for Founder records
      let coverImage: string | undefined

      // Get the cover image
      coverImage =
        record.fields["Cover CDN"] ||
        (record.fields.Cover && record.fields.Cover.length > 0 ? record.fields.Cover[0].url : undefined)

      // If no image is found, use a placeholder
      if (!coverImage) {
        coverImage = `/placeholder.svg?height=480&width=640&query=${encodeURIComponent(record.fields.Experience || "Content")}`
      }

      const logoImage =
        record.fields["Logo CDN"] ||
        (record.fields.Logo && record.fields.Logo.length > 0 ? record.fields.Logo[0].url : undefined)

      // Process project images
      const projectImages: ProjectImage[] = []

      // Image 1
      if (
        record.fields["PIMG1 CDN"] ||
        (record.fields["Project Image 1"] && record.fields["Project Image 1"].length > 0)
      ) {
        projectImages.push({
          url: record.fields["PIMG1 CDN"] || record.fields["Project Image 1"]![0].url,
          caption: record.fields["Image 1 Caption"] || "",
        })
      }

      // Image 2
      if (
        record.fields["PIMG2 CDN"] ||
        (record.fields["Project Image 2"] && record.fields["Project Image 2"].length > 0)
      ) {
        projectImages.push({
          url: record.fields["PIMG2 CDN"] || record.fields["Project Image 2"]![0].url,
          caption: record.fields["Image 2 Caption"] || "",
        })
      }

      // Image 3
      if (
        record.fields["PIMG3 CDN"] ||
        (record.fields["Project Image 3"] && record.fields["Project Image 3"].length > 0)
      ) {
        projectImages.push({
          url: record.fields["PIMG3 CDN"] || record.fields["Project Image 3"]![0].url,
          caption: record.fields["Image 3 Caption"] || "",
        })
      }

      // Image 4
      if (
        record.fields["PIMG4 CDN"] ||
        (record.fields["Project Image 4"] && record.fields["Project Image 4"].length > 0)
      ) {
        projectImages.push({
          url: record.fields["PIMG4 CDN"] || record.fields["Project Image 4"]![0].url,
          caption: "",
        })
      }

      // Process tools with their logos
      const tools: ToolItem[] = []
      if (record.fields.Tools && record.fields.Tools.length > 0) {
        record.fields.Tools.forEach((tool, index) => {
          const logoUrl =
            record.fields["Logo CDN (from Tools)"] && record.fields["Logo CDN (from Tools)"][index]
              ? record.fields["Logo CDN (from Tools)"][index]
              : undefined

          tools.push({
            name: tool,
            logo: logoUrl,
          })
        })
      }

      // Normalize the location ID
      const normalizedLocation = normalizeLocationId(
        record.fields.Location?.toLowerCase().replace(/\s+/g, "-") || "other",
      )

      // Get skills and skillNames directly from the record
      // PRIORITY ORDER:
      // 1. Use SkillsConcat (new formula field) if available
      // 2. Fall back to SkillNames or "Skill Names" if SkillsConcat is not available
      // 3. Process the field value appropriately based on its type
      const skillNames =
        record.fields.SkillsConcat ||
        processSkillNames(record.fields.SkillNames) ||
        processSkillNames(record.fields["Skill Names"]) ||
        ""

      // Create the transformed item
      const item: ContentItem = {
        id: slug,
        recordId: record.id,
        title: record.fields.Experience || "Untitled Experience",
        company: record.fields.Company || "",
        description: record.fields.Description || "",
        image: coverImage,
        logo: logoImage,
        type: record.fields.Type || "Other",
        era: era,
        eraCss: record.fields.EraCSS || "",
        startYear: record.fields.StartYear?.toString() || "",
        sortOrder: record.fields.SortOrder || 999,
        locationSort: record.fields.LocationSort || 999,
        isHero: record.fields.Hero === "Y",
        content: record.fields.Overview || "",
        link: record.fields.Link || "",
        location: normalizedLocation,
        skills: record.fields.Skills || [],
        skillNames: skillNames,
        skillCategories: record.fields.Category || [],
        tools: tools,
        projectImages: projectImages,
        hideAll: record.fields["Hide all"] || false,
      }

      // Log for Founder records
      if (record.fields.Experience === "Founder") {
        console.log(`Transformed Founder record:`)
        console.log(`- Original ID: ${record.id}`)
        console.log(`- Slug: ${slug}`)
        console.log(`- Company: ${record.fields.Company}`)
        console.log(`- Image: ${coverImage}`)
      }

      return item
    })
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return transformedItems
}

// Function to group content items by type
export function groupContentByType(items: ContentItem[]): Category[] {
  const typeMap = new Map<string, ContentItem[]>()

  // Group items by type
  items.forEach((item) => {
    if (!typeMap.has(item.type)) {
      typeMap.set(item.type, [])
    }
    typeMap.get(item.type)?.push(item)
  })

  // Convert map to array of Category objects
  return Array.from(typeMap.entries()).map(([id, items]) => ({
    id,
    title: id, // Use the type as the title
    items,
  }))
}

// Function to get hero content
export function getHeroContent(items: ContentItem[]): ContentItem | null {
  return items.find((item) => item.isHero) || null
}

// Main function to get all content from Airtable
export async function getAllContent(): Promise<{
  items: ContentItem[]
  categories: Category[]
  hero: ContentItem | null
}> {
  try {
    const records = await fetchAirtableRecords()
    const items = transformAirtableRecords(records)
    const categories = groupContentByType(items)
    const hero = getHeroContent(items)

    return { items, categories, hero }
  } catch (error) {
    console.error("Error in getAllContent:", error)

    // Return minimal fallback data if everything fails
    const fallbackItem: ContentItem = {
      id: "fallback",
      title: "Media & Entertainment Analytics",
      company: "Portfolio",
      description: "Fallback content due to data loading error",
      type: "Professional",
      era: "2023-2025",
      startYear: "2023",
      sortOrder: 1,
      locationSort: 1,
      isHero: true,
      location: "nyc",
      skills: ["Data Analysis"],
      skillNames: "Data Analysis",
      skillCategories: ["Analytics"],
      tools: [],
      projectImages: [],
      hideAll: false,
    }

    return {
      items: [fallbackItem],
      categories: [{ id: "Professional", title: "Professional", items: [fallbackItem] }],
      hero: fallbackItem,
    }
  }
}

// Function to get a specific content item by ID
export async function getContentById(id: string): Promise<ContentItem | null> {
  try {
    const { items } = await getAllContent()
    return items.find((item) => item.id === id) || null
  } catch (error) {
    console.error(`Error getting content by ID ${id}:`, error)
    return null
  }
}
