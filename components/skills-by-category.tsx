"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/lib/types"
import { getSkillsForDisplay } from "@/lib/skills-helper"
import {
  organizeSkillsByCategory,
  fetchSkillsData,
  type SkillsByCategory,
  getFullCategoryName,
} from "@/lib/skills-category-helper"

interface SkillsByCategoryProps {
  item: ContentItem
  badgeClassName?: string
}

export default function SkillsByCategory({ item, badgeClassName = "" }: SkillsByCategoryProps) {
  const [skillsByCategory, setSkillsByCategory] = useState<SkillsByCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCategoryNames, setShowCategoryNames] = useState(true) // Control whether to show category names

  useEffect(() => {
    async function loadSkillsData() {
      try {
        setIsLoading(true)
        // Get the display skills
        const displaySkills = getSkillsForDisplay(item)
        console.log("Display skills:", displaySkills)

        // Fetch the skills data
        const { skills: skillsMap, categories } = await fetchSkillsData()
        console.log("Skills map:", skillsMap)
        console.log("Available categories:", categories)

        // Organize the skills by category
        const organized = organizeSkillsByCategory(displaySkills, skillsMap)

        // Ensure all categories are using full names
        const organizedWithFullNames = organized.map((cat) => ({
          category: getFullCategoryName(cat.category),
          skills: cat.skills,
        }))

        console.log("Original organized skills:", organized)
        console.log("Organized with full names:", organizedWithFullNames)

        // If we only have one category called "Other", don't show category names
        if (organizedWithFullNames.length === 1 && organizedWithFullNames[0].category === "Other") {
          setShowCategoryNames(false)
        }

        setSkillsByCategory(organizedWithFullNames)
      } catch (error) {
        console.error("Error loading skills data:", error)
        // Fallback: Just display skills without categories
        setSkillsByCategory([
          {
            category: "Skills",
            skills: getSkillsForDisplay(item),
          },
        ])
        setShowCategoryNames(false)
      } finally {
        setIsLoading(false)
      }
    }

    loadSkillsData()
  }, [item])

  if (isLoading) {
    return <div className="animate-pulse h-20 bg-gray-100 rounded-md"></div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillsByCategory.map((category) => (
        <div key={category.category} className="space-y-2">
          {showCategoryNames && (
            <h4 className="text-sm font-medium text-gray-500">
              {category.category}
              {/* Add this for debugging */}
              {process.env.NODE_ENV === "development" && (
                <span className="text-xs text-red-400 ml-1">(Raw: {category.category})</span>
              )}
            </h4>
          )}
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, index) => (
              <Badge key={`${category.category}-${index}`} variant="secondary" className={badgeClassName}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
