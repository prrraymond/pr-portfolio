import type { ContentItem } from "@/lib/types"
import { getSkillsForDisplay } from "@/lib/skills-helper"
import { FALLBACK_SKILL_CATEGORIES, findCategoryForSkill } from "./skill-categories"

export interface SkillsByCategory {
  category: string
  skills: string[]
}

// Function to fetch skills data from our API
export async function fetchSkillsData() {
  try {
    const response = await fetch("/api/skills")
    if (!response.ok) {
      throw new Error(`Error fetching skills: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching skills data:", error)
    return { skills: {}, categories: Object.keys(FALLBACK_SKILL_CATEGORIES) }
  }
}

// Map of category abbreviations to full names
const CATEGORY_FULL_NAMES: Record<string, string> = {
  // Single letter abbreviations
  A: "Analytics",
  B: "Business Ops",
  M: "Media",
  E: "Education",
  S: "Sports & Coaching",
  T: "Technology",
  O: "Other",
  P: "Product & Design",
  I: "Instruction & Curriculum",
  Q: "Quant & Finance",
  D: "Data Eng / Analytics",
  C: "Coding & Libraries",

  // Common abbreviations
  AI: "AI & ML",
  ML: "AI & ML",
  Data: "Data Eng / Analytics",
  Design: "Product & Design",
  Product: "Product & Design",
  Business: "Business Ops",
  Quant: "Quant & Finance",
  Finance: "Quant & Finance",
  Instruction: "Instruction & Curriculum",
  Curriculum: "Instruction & Curriculum",
  Sports: "Sports & Coaching",
  Coaching: "Sports & Coaching",
  Coding: "Coding & Libraries",
  Libraries: "Coding & Libraries",
}

// Function to get the full category name
export function getFullCategoryName(category: string): string {
  // If it's already a full category name that matches our expected categories, return it
  const knownFullCategories = [
    "Product & Design",
    "Instruction & Curriculum",
    "Business Ops",
    "Quant & Finance",
    "Data Eng / Analytics",
    "AI & ML",
    "Sports & Coaching",
    "Coding & Libraries",
    "Data",
  ]

  if (knownFullCategories.includes(category)) {
    console.log(`Category "${category}" is already a full name, keeping as is`)
    return category
  }

  // If it's a single letter or known abbreviation, convert it
  if (CATEGORY_FULL_NAMES[category]) {
    console.log(`Converting category "${category}" to "${CATEGORY_FULL_NAMES[category]}"`)
    return CATEGORY_FULL_NAMES[category]
  }

  // Otherwise, return the original category
  console.log(`Unknown category "${category}", keeping as is`)
  return category
}

// Function to organize skills by category
export function organizeSkillsByCategory(
  skills: string[],
  skillsMap: Record<string, { name: string; category: string }> = {},
): SkillsByCategory[] {
  // Create a map to group skills by category
  const categoryMap: Record<string, string[]> = {}

  // For each skill, find its category and add it to the appropriate group
  skills.forEach((skill) => {
    // Try to find the skill in the map (it might be an ID or a name)
    const skillInfo = Object.values(skillsMap).find(
      (s) => s.id === skill || s.name?.toLowerCase() === skill.toLowerCase(),
    )

    // If we found the skill in the map, use its category
    // Otherwise, try to find the category using our fallback data
    let category = skillInfo?.category || findCategoryForSkill(skill) || "Other"

    // Ensure we're using the full category name
    category = getFullCategoryName(category)

    if (!categoryMap[category]) {
      categoryMap[category] = []
    }

    // Use the skill name from the map if available, otherwise use the original skill
    categoryMap[category].push(skillInfo?.name || skill)
  })

  // Convert the map to an array of SkillsByCategory objects
  return Object.entries(categoryMap)
    .map(([category, skills]) => ({
      category,
      skills: [...new Set(skills)], // Remove duplicates
    }))
    .sort((a, b) => a.category.localeCompare(b.category))
}

// Function to get skills organized by category for a content item
export async function getSkillsByCategoryForItem(item: ContentItem): Promise<SkillsByCategory[]> {
  // Get the display skills
  const displaySkills = getSkillsForDisplay(item)

  // Fetch the skills data
  const { skills: skillsMap } = await fetchSkillsData()

  // Organize the skills by category
  return organizeSkillsByCategory(displaySkills, skillsMap)
}
