"use client"

import { memo } from "react"
import ContentCard from "@/components/content-card"
import FounderCardV2 from "@/components/founder-card-v2"
import type { ContentItem } from "@/lib/types"

interface ContentCardWrapperProps {
  item: ContentItem
  isHomePage?: boolean
}

// Use memo to prevent unnecessary re-renders
const ContentCardWrapper = memo(function ContentCardWrapper({ item, isHomePage = false }: ContentCardWrapperProps) {
  // Log which component is being rendered
  console.log(`Rendering card for: ${item.title} (isFounder: ${item.isFounder}, type: ${item.type})`)

  // Use the isFounder flag to determine which component to render
  if (item.isFounder) {
    return <FounderCardV2 item={item} isHomePage={isHomePage} />
  }

  // For all other items, use the regular ContentCard
  return <ContentCard item={item} isHomePage={isHomePage} />
})

export default ContentCardWrapper
