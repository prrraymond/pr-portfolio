"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/lib/types"
import { getEraStyles } from "@/lib/era-styles"
import Link from "next/link"
import { getSkillsForDisplay } from "@/lib/skills-helper"
import { User, Building } from "lucide-react"

interface FounderCardProps {
  item: ContentItem
  isHomePage?: boolean
}

// Color palette for founder cards
const FOUNDER_COLORS = [
  "bg-blue-600",
  "bg-purple-600",
  "bg-green-600",
  "bg-red-600",
  "bg-yellow-600",
  "bg-pink-600",
  "bg-indigo-600",
  "bg-teal-600",
  "bg-orange-600",
  "bg-cyan-600",
]

export default function FounderCardV2({ item, isHomePage = false }: FounderCardProps) {
  const eraStyles = getEraStyles(item.era)
  const displaySkills = getSkillsForDisplay(item)

  // Use a simple index based on the sortOrder to select a color
  const colorIndex = (item.sortOrder || 0) % FOUNDER_COLORS.length
  const bgColor = FOUNDER_COLORS[colorIndex]

  // Generate initials for the founder
  const getInitials = () => {
    if (item.company) {
      const words = item.company.split(" ")
      if (words.length >= 2) {
        return `${words[0][0]}${words[1][0]}`.toUpperCase()
      } else if (words.length === 1 && words[0].length >= 2) {
        return `${words[0][0]}${words[0][1]}`.toUpperCase()
      } else if (words.length === 1) {
        return `${words[0][0]}`.toUpperCase()
      }
    }
    return "F"
  }

  // Log for debugging
  console.log(`FounderCardV2 rendered for ${item.title} at ${item.company}`)
  console.log(`- ID: ${item.id}`)
  console.log(`- Record ID: ${item.recordId}`)
  console.log(`- Sort Order: ${item.sortOrder}`)
  console.log(`- Color Index: ${colorIndex}`)
  console.log(`- Using color: ${bgColor}`)

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
        {/* Instead of an image, use a colored div with initials */}
        <div className={`relative h-48 w-full overflow-hidden ${bgColor} flex items-center justify-center`}>
          <div className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 text-xs rounded-full font-bold">
            #{item.sortOrder}
          </div>

          <div className="text-white text-6xl font-bold">{getInitials()}</div>

          <div className="absolute bottom-2 left-2 flex items-center text-white">
            <Building className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{item.company}</span>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center mb-2">
            <div className={`h-8 w-8 rounded-full ${bgColor} flex items-center justify-center text-white mr-2`}>
              <User className="h-5 w-5" />
            </div>
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
