export interface TimePeriod {
  id: string
  name: string
  aesthetic: string
  colorPalette: string
  inspirations: string[]
  visualElements: string
  content?: string
}

export interface ProjectImage {
  url: string
  caption: string
}

export interface ToolItem {
  name: string
  logo?: string
}

export interface ContentItem {
  id: string
  recordId?: string
  title: string
  company: string
  description: string
  image?: string
  logo?: string
  type: string
  era: string
  eraCss?: string
  startYear: string
  sortOrder: number
  locationSort?: number // Changed from locationOrder to locationSort
  isHero: boolean
  content?: string
  link?: string
  location: string
  skills: string[]
  skillNames?: string // Added skillNames field for comma-separated skills
  skillCategories: string[]
  tools: ToolItem[]
  projectImages: ProjectImage[]
  hideAll: boolean
}

export interface Category {
  id: string
  title: string
  items: ContentItem[]
}

export interface EraStyles {
  container: string
  header: string
  body: string
  panel: string
  accent: string
  button: string
  badge: string
  filter: string
}
