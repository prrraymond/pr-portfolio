"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/lib/types"
import { getEraStyles } from "@/lib/era-styles"
import Link from "next/link"
import { getSkillsForDisplay } from "@/lib/skills-helper"
import { useState, useEffect } from "react"

interface ContentCardProps {
  item: ContentItem
  isHomePage?: boolean // Add this prop to determine if it's the home page
}

export default function ContentCard({ item, isHomePage = false }: ContentCardProps) {
  // Use the item's own era for styling
  const eraStyles = getEraStyles(item.era)

  // State to track image loading errors
  const [imageError, setImageError] = useState(false)

  // State to hold the image URL with cache-busting
  const [imageUrl, setImageUrl] = useState<string>("")

  // Get skills for display using our helper function
  const displaySkills = getSkillsForDisplay(item)

  // Set up the image URL with cache busting
  useEffect(() => {
    // For Founder cards or when the title is "Founder", add a unique identifier
    if (item.title === "Founder") {
      // Use the record ID to make the URL unique
      const uniqueParam = `&id=${item.recordId || item.id}`
      setImageUrl(
        item.image
          ? `${item.image}${item.image.includes("?") ? uniqueParam : `?${uniqueParam.substring(1)}`}`
          : `/placeholder.svg?height=480&width=640&query=${encodeURIComponent(item.title)}-${item.id}`,
      )

      // Log for debugging
      console.log(`Founder card image URL: ${imageUrl} (ID: ${item.id}, Record ID: ${item.recordId})`)
    } else {
      // For non-Founder cards, use the image as is
      setImageUrl(item.image || `/placeholder.svg?height=480&width=640&query=${encodeURIComponent(item.title)}`)
    }
  }, [item.image, item.title, item.id, item.recordId])

  return (
    <Card
      className={`w-full h-80 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl netflix-card ${
        isHomePage ? "font-sans" : ""
      }`}
      style={{
        background: eraStyles.container.includes("bg-") ? undefined : eraStyles.container,
        color: eraStyles.body.includes("text-") ? undefined : eraStyles.body,
        borderLeft: `4px solid ${eraStyles.accent.includes("bg-") ? "var(--primary)" : eraStyles.accent.replace("bg-", "")}`,
      }}
    >
      <Link href={`/experience/${item.id}`} className="block h-full">
        <div className="relative h-40 w-full overflow-hidden">
          {imageUrl && (
            <Image
              src={
                imageError
                  ? `/placeholder.svg?height=480&width=640&query=${encodeURIComponent(item.title)}&error=true`
                  : imageUrl
              }
              alt={item.title}
              fill
              className={`object-cover transition-transform duration-700 hover:scale-110 ${eraStyles.filter}`}
              onError={(e) => {
                console.error(`Image error for ${item.title}:`, e)
                setImageError(true)
              }}
              data-type={item.type}
              data-id={item.id}
              data-record-id={item.recordId}
              data-title={item.title}
              data-company={item.company}
            />
          )}

          {/* Add a visual indicator for Founder cards to help with debugging */}
          {item.title === "Founder" && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
              {item.company || item.id}
            </div>
          )}
        </div>
        <CardContent className="p-3">
          {/* Company logo and title row */}
          <div className="flex items-center mb-2">
            {item.logo && (
              <div className="h-6 w-6 relative mr-2 flex-shrink-0">
                <Image src={item.logo || "/placeholder.svg"} alt={item.company || ""} fill className="object-contain" />
              </div>
            )}
            <h3 className={`text-lg ${isHomePage ? "font-bold font-sans" : eraStyles.header}`}>
              {item.title}
              {item.title === "Founder" && item.company ? ` at ${item.company}` : ""}
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
      </Link>
    </Card>
  )
}
