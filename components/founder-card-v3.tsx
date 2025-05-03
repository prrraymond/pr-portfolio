"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/lib/types"
import { getEraStyles } from "@/lib/era-styles"
import Link from "next/link"
import { getSkillsForDisplay } from "@/lib/skills-helper"
import { Briefcase } from "lucide-react"

interface FounderCardProps {
  item: ContentItem
  isHomePage?: boolean
}

// Completely different design patterns for each company
const COMPANY_PATTERNS = {
  Braingrove: {
    bgColor: "bg-gradient-to-br from-green-600 to-blue-600",
    icon: "🧠",
    textColor: "text-white",
    borderColor: "border-green-400",
  },
  "Adult PE": {
    bgColor: "bg-gradient-to-tr from-purple-700 to-pink-500",
    icon: "🏋️",
    textColor: "text-white",
    borderColor: "border-purple-400",
  },
  "All Staff": {
    bgColor: "bg-gradient-to-r from-amber-500 to-red-500",
    icon: "👥",
    textColor: "text-white",
    borderColor: "border-amber-400",
  },
  // Default pattern
  default: {
    bgColor: "bg-gradient-to-r from-blue-600 to-indigo-600",
    icon: "🚀",
    textColor: "text-white",
    borderColor: "border-blue-400",
  },
}

export default function FounderCardV3({ item, isHomePage = false }: FounderCardProps) {
  const eraStyles = getEraStyles(item.era)
  const displaySkills = getSkillsForDisplay(item)

  // Get the specific pattern for this company, or use default
  const pattern = COMPANY_PATTERNS[item.company as keyof typeof COMPANY_PATTERNS] || COMPANY_PATTERNS.default

  // Generate a timestamp to ensure uniqueness
  const timestamp = Date.now()

  // Log for debugging
  console.log(`FounderCardV3 rendered for ${item.company} at ${timestamp}`)
  console.log(`- ID: ${item.id}`)
  console.log(`- Record ID: ${item.recordId}`)
  console.log(`- Using pattern:`, pattern)

  return (
    <Link href={`/experience/${item.id}`}>
      <Card
        className={`w-72 md:w-80 h-96 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl netflix-card border-2 ${pattern.borderColor}`}
        data-company={item.company}
        data-timestamp={timestamp}
      >
        {/* Completely different header design */}
        <div
          className={`relative h-48 w-full overflow-hidden ${pattern.bgColor} flex flex-col items-center justify-center`}
        >
          {/* Company icon */}
          <div className="text-6xl mb-2">{pattern.icon}</div>

          {/* Company name */}
          <div className={`text-xl font-bold ${pattern.textColor}`}>{item.company}</div>

          {/* Timestamp for debugging */}
          <div className="absolute bottom-1 right-1 text-xs text-white/50">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>

        <CardContent className="p-4 bg-white">
          <div className="flex items-center mb-2">
            <div className={`h-8 w-8 rounded-full ${pattern.bgColor} flex items-center justify-center text-white mr-2`}>
              <Briefcase className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-bold">Founder at {item.company}</h3>
          </div>

          <p className="text-sm mb-4 line-clamp-3 text-gray-700">
            {item.description || `Entrepreneurial experience as founder of ${item.company}`}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Founder</Badge>
            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Entrepreneurship</Badge>
            {item.type && <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{item.type}</Badge>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
