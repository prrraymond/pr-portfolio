import type { ContentItem } from "@/lib/types"

// Hardcoded skill mappings for common skills
const SKILL_MAPPINGS: Record<string, string> = {
  // Analytics skills
  recA1: "Data Analysis",
  recA2: "Data Visualization",
  recA3: "Business Intelligence",
  recA4: "Machine Learning",
  recA5: "Statistical Analysis",
  recA6: "SQL",
  recA7: "Python",
  recA8: "R",
  recA9: "Tableau",
  recA10: "Power BI",
  recA11: "Excel",
  recA12: "Data Modeling",

  // Business skills
  recB1: "Strategic Planning",
  recB2: "Project Management",
  recB3: "Business Development",
  recB4: "Market Research",
  recB5: "Financial Analysis",
  recB6: "Leadership",
  recB7: "Team Management",
  recB8: "Consulting",

  // Media skills
  recC1: "Content Strategy",
  recC2: "Audience Analytics",
  recC3: "Media Planning",
  recC4: "Digital Marketing",
  recC5: "Social Media",
  recC6: "Content Creation",
  recC7: "Video Production",

  // Education skills
  recD1: "Teaching",
  recD2: "Research",
  recD3: "Curriculum Development",
  recD4: "Academic Writing",
  recD5: "Mentoring",

  // Sports skills
  recE1: "Sports Analytics",
  recE2: "Performance Analysis",
  recE3: "Team Management",
  recE4: "Athlete Development",

  // Technology skills
  recF1: "JavaScript",
  recF2: "React",
  recF3: "Node.js",
  recF4: "AWS",
  recF5: "Cloud Computing",
  recF6: "Database Management",
  recF7: "Web Development",

  // Common Airtable prefixes with generic names
  rec: "Skill",
  recX: "Expertise",
  recY: "Knowledge",
  recZ: "Capability",
}

// Function to get a display name for a skill ID
function getSkillDisplayName(skillId: string): string {
  // Check if we have a direct mapping
  if (SKILL_MAPPINGS[skillId]) {
    return SKILL_MAPPINGS[skillId]
  }

  // Check if it matches any of our prefixes
  for (const prefix of Object.keys(SKILL_MAPPINGS)) {
    if (skillId.startsWith(prefix) && prefix.length > 2) {
      return SKILL_MAPPINGS[prefix]
    }
  }

  // If it looks like an Airtable ID (starts with 'rec' followed by alphanumeric chars)
  if (skillId.match(/^rec[a-zA-Z0-9]+$/)) {
    return "Skill" // Generic fallback
  }

  // Otherwise, return the original ID as it might be a real skill name
  return skillId
}

// Main function to get skills for display from a content item
export function getSkillsForDisplay(item: ContentItem): string[] {
  // First try: Use skillNames if it exists and is a string (now prioritizing the SkillsConcat field)
  if (typeof item.skillNames === "string" && item.skillNames.trim()) {
    const skills = item.skillNames
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)

    if (skills.length > 0) {
      return skills
    }
  }

  // Second try: Use skillCategories if available
  if (Array.isArray(item.skillCategories) && item.skillCategories.length > 0) {
    return item.skillCategories
  }

  // Third try: Use skills array if it exists and items don't look like IDs
  if (Array.isArray(item.skills) && item.skills.length > 0) {
    const nonIdSkills = item.skills.filter((skill) => !skill.match(/^rec[a-zA-Z0-9]+$/))
    if (nonIdSkills.length > 0) {
      return nonIdSkills
    }
  }

  // Fallback: Use the item type
  return [item.type]
}
