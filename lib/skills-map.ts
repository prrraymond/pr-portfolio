// This file provides a mapping from skill IDs to human-readable skill names

// Define a type for the skill map
type SkillMap = Record<string, string>

// Create a mapping of skill IDs to their display names
export function getSkillNameMap(): SkillMap {
  return {
    // Common skills in analytics and data
    rec1: "Data Analysis",
    rec2: "Data Visualization",
    rec3: "Business Intelligence",
    rec4: "Machine Learning",
    rec5: "Statistical Analysis",
    rec6: "SQL",
    rec7: "Python",
    rec8: "R",
    rec9: "Tableau",
    rec10: "Power BI",
    rec11: "Excel",
    rec12: "Data Modeling",

    // Business and strategy skills
    rec20: "Strategic Planning",
    rec21: "Project Management",
    rec22: "Business Development",
    rec23: "Market Research",
    rec24: "Financial Analysis",
    rec25: "Leadership",
    rec26: "Team Management",
    rec27: "Consulting",
    rec28: "Process Improvement",

    // Media and entertainment specific
    rec30: "Content Strategy",
    rec31: "Audience Analytics",
    rec32: "Media Planning",
    rec33: "Digital Marketing",
    rec34: "SEO",
    rec35: "Social Media",
    rec36: "Content Creation",
    rec37: "Video Production",
    rec38: "Streaming Analytics",

    // Education and research
    rec40: "Teaching",
    rec41: "Research",
    rec42: "Curriculum Development",
    rec43: "Academic Writing",
    rec44: "Mentoring",
    rec45: "Public Speaking",

    // Sports related
    rec50: "Sports Analytics",
    rec51: "Performance Analysis",
    rec52: "Team Management",
    rec53: "Athlete Development",
    rec54: "Sports Science",

    // Entrepreneurship
    rec60: "Startup Development",
    rec61: "Fundraising",
    rec62: "Venture Capital",
    rec63: "Business Strategy",
    rec64: "Product Development",
    rec65: "Innovation",

    // General professional skills
    rec70: "Communication",
    rec71: "Problem Solving",
    rec72: "Critical Thinking",
    rec73: "Collaboration",
    rec74: "Presentation",
    rec75: "Negotiation",

    // Technical skills
    rec80: "JavaScript",
    rec81: "React",
    rec82: "Node.js",
    rec83: "AWS",
    rec84: "Cloud Computing",
    rec85: "Database Management",
    rec86: "API Development",
    rec87: "Web Development",

    // Add more mappings as needed
    // The key is the ID from Airtable, the value is the human-readable name
  }
}

// Function to get a skill name from an ID, with fallback
export function getSkillName(skillId: string): string {
  const skillMap = getSkillNameMap()
  return skillMap[skillId] || skillId // Return the ID itself if no mapping exists
}

// Function to map an array of skill IDs to their names
export function mapSkillsToNames(skillIds: string[]): string[] {
  const skillMap = getSkillNameMap()
  return skillIds.map((id) => skillMap[id] || id)
}
