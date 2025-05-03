// Fallback skill categories in case we can't fetch from Airtable
export const FALLBACK_SKILL_CATEGORIES: Record<string, string[]> = {
  Analytics: [
    "Data Analysis",
    "Data Visualization",
    "Business Intelligence",
    "Machine Learning",
    "Statistical Analysis",
    "SQL",
    "Python",
    "R",
    "Tableau",
    "Power BI",
    "Excel",
    "Data Modeling",
  ],
  Business: [
    "Strategic Planning",
    "Project Management",
    "Business Development",
    "Market Research",
    "Financial Analysis",
    "Leadership",
    "Team Management",
    "Consulting",
    "Process Improvement",
  ],
  Media: [
    "Content Strategy",
    "Audience Analytics",
    "Media Planning",
    "Digital Marketing",
    "SEO",
    "Social Media",
    "Content Creation",
    "Video Production",
    "Streaming Analytics",
  ],
  Education: ["Teaching", "Research", "Curriculum Development", "Academic Writing", "Mentoring", "Public Speaking"],
  Sports: ["Sports Analytics", "Performance Analysis", "Team Management", "Athlete Development", "Sports Science"],
  Entrepreneurship: [
    "Startup Development",
    "Fundraising",
    "Venture Capital",
    "Business Strategy",
    "Product Development",
    "Innovation",
  ],
  Technology: [
    "JavaScript",
    "React",
    "Node.js",
    "AWS",
    "Cloud Computing",
    "Database Management",
    "API Development",
    "Web Development",
  ],
}

// Function to find the category for a skill using our fallback data
export function findCategoryForSkill(skill: string): string {
  const normalizedSkill = skill.toLowerCase().trim()

  for (const [category, skills] of Object.entries(FALLBACK_SKILL_CATEGORIES)) {
    if (skills.some((s) => s.toLowerCase() === normalizedSkill)) {
      return category
    }
  }

  return "Other"
}
