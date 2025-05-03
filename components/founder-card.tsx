"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/lib/types"
import { getEraStyles } from "@/lib/era-styles"
import Link from "next/link"
import { getSkillsForDisplay } from "@/lib/skills-helper"

interface FounderCardProps {
  item: ContentItem
  isHomePage?: boolean
}

// Hardcoded images for founders - these are completely different images
const FOUNDER_IMAGES = [
  "/placeholder.svg?key=d5ldq",
  "/placeholder.svg?key=vfr7p",
  "/placeholder.svg?key=b7hgd",
  "/placeholder.svg?key=xx2qq",
  "/placeholder.svg?key=e4n0w",
  "/placeholder.svg?height=480&width=640&query=business-person-6",
  "/placeholder.svg?height=480&width=640&query=business-person-7",
  "/placeholder.svg?height=480&width=640&query=business-person-8",
  "/placeholder.svg?height=480&width=640&query=business-person-9",
  "/placeholder.svg?height=480&width=640&query=business-person-10",
]

export default function FounderCard({ item, isHomePage = false }: FounderCardProps) {
  const eraStyles = getEraStyles(item.era)
  const displaySkills = getSkillsForDisplay(item)

  // Use a simple index based on the sortOrder to select an image
  // This ensures each founder gets a different image
  const imageIndex = (item.sortOrder || 0) % FOUNDER_IMAGES.length
  const imageUrl = FOUNDER_IMAGES[imageIndex]

  // Add a timestamp to prevent caching
  const finalImageUrl = `${imageUrl}&t=${Date.now()}`

  // Log for debugging
  console.log(`FounderCard rendered for ${item.title} at ${item.company}`)
  console.log(`- ID: ${item.id}`)
  console.log(`- Record ID: ${item.recordId}`)
  console.log(`- Sort Order: ${item.sortOrder}`)
  console.log(`- Image Index: ${imageIndex}`)
  console.log(`- Using image: ${imageUrl}`)

  return (
    <Link href={`/experience/${item.id}`}>
      <Card
        className={`w-72 md:w-80 h-96 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl netflix-card ${
          isHomePage ? "font-sans" : ""
        }`}
        style={{
          background: eraStyles.container.includes("bg-") ? undefined : eraStyles.container,
          color: eraStyles.body.includes("text-") ? undefined : eraStyles.body,
          borderLeft: `4px solid ${eraStyles.accent.includes("bg-") ? "var(--primary)" : eraStyles.accent.replace("bg-", "")}`,
        }}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={finalImageUrl || "/placeholder.svg"}
            alt={`${item.title} at ${item.company}`}
            fill
            className={`object-cover transition-transform duration-700 hover:scale-110 ${eraStyles.filter}`}
            priority={true} // Force priority loading
            data-founder-id={item.id}
            data-record-id={item.recordId}
            data-sort-order={item.sortOrder}
            data-image-index={imageIndex}
          />

          {/* Add a visual indicator with the sort order to help identify each founder */}
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            #{item.sortOrder}
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            {item.logo && (
              <div className="h-6 w-6 relative mr-2 flex-shrink-0">
                <Image src={item.logo || "/placeholder.svg"} alt={item.company || ""} fill className="object-contain" />
              </div>
            )}
            <h3 className={`text-xl ${isHomePage ? "font-bold font-sans" : eraStyles.header}`}>
              {item.title} {item.company && `at ${item.company}`}
            </h3>
          </div>

          <p className={`text-sm mb-4 line-clamp-3 ${isHomePage ? "font-normal font-sans" : eraStyles.body}`}>
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {displaySkills.length > 0 ? (
              <>
                {displaySkills.slice(0, 3).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className={isHomePage ? "bg-gray-100 text-gray-800 hover:bg-gray-200 font-sans" : eraStyles.badge}
                  >
                    {skill}
                  </Badge>
                ))}
                {displaySkills.length > 3 && (
                  <Badge
                    variant="outline"
                    className={isHomePage ? "bg-gray-100 text-gray-800 hover:bg-gray-200 font-sans" : eraStyles.badge}
                  >
                    +{displaySkills.length - 3}
                  </Badge>
                )}
              </>
            ) : (
              <Badge
                variant="outline"
                className={isHomePage ? "bg-gray-100 text-gray-800 hover:bg-gray-200 font-sans" : eraStyles.badge}
              >
                {item.type}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
