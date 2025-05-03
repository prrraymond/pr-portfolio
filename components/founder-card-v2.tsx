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

export default function FounderCardV2({ item, isHomePage = false }: FounderCardProps) {
  const eraStyles = getEraStyles(item.era)
  const displaySkills = getSkillsForDisplay(item)

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
          <Image
            src={
              item.image ||
              `/placeholder.svg?height=480&width=640&query=${encodeURIComponent(item.company || "Founder")}`
            }
            alt={`${item.title} at ${item.company}`}
            fill
            className={`object-cover transition-transform duration-700 hover:scale-110 ${eraStyles.filter}`}
            priority={true}
          />

          {/* Add a visual indicator with the company name */}
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            {item.company}
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex items-center mb-2">
            {item.logo && (
              <div className="h-6 w-6 relative mr-2 flex-shrink-0">
                <Image src={item.logo || "/placeholder.svg"} alt={item.company || ""} fill className="object-contain" />
              </div>
            )}
            <h3 className={`text-lg ${isHomePage ? "font-bold font-sans" : eraStyles.header}`}>
              {item.title} {item.company && `at ${item.company}`}
            </h3>
          </div>

          <p className={`text-sm mb-4 line-clamp-3 ${isHomePage ? "font-normal font-sans" : eraStyles.body}`}>
            {item.description || `Founder experience at ${item.company}`}
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
                {item.type || "Entrepreneurship"}
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
