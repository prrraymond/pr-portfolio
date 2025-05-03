"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { FileSpreadsheet, Youtube, BookOpen, Presentation, FileText, Briefcase } from "lucide-react"
import { getToolDisplayName } from "@/lib/tool-mappings"

interface ToolIconProps {
  name: string
  originalId?: string
  logo?: string
  size?: number
}

export default function ToolIcon({ name, originalId, logo, size = 48 }: ToolIconProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Get the display name using our helper function
  const displayName = getToolDisplayName({ name, originalId })

  // Reset error state when logo changes
  useEffect(() => {
    setImageError(false)
    setIsLoading(true)
  }, [logo])

  // Get the appropriate icon based on the tool name
  const getFallbackIcon = () => {
    const lowerName = displayName.toLowerCase()

    if (lowerName.includes("excel") || lowerName.includes("spreadsheet") || lowerName.includes("office")) {
      return <FileSpreadsheet className="h-8 w-8 text-green-600" />
    }

    if (lowerName.includes("youtube")) {
      return <Youtube className="h-8 w-8 text-red-600" />
    }

    if (lowerName.includes("quizlet") || lowerName.includes("khan")) {
      return <BookOpen className="h-8 w-8 text-blue-600" />
    }

    if (lowerName.includes("powerpoint") || lowerName.includes("presentation")) {
      return <Presentation className="h-8 w-8 text-orange-600" />
    }

    if (lowerName.includes("word") || lowerName.includes("document")) {
      return <FileText className="h-8 w-8 text-blue-600" />
    }

    // Default icon
    return <Briefcase className="h-8 w-8 text-gray-600" />
  }

  if (imageError || !logo) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">{getFallbackIcon()}</div>
    )
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      <Image
        src={logo || "/placeholder.svg"}
        alt={displayName}
        width={size}
        height={size}
        className="object-contain"
        onError={() => setImageError(true)}
        onLoad={() => setIsLoading(false)}
        style={{ opacity: isLoading ? 0 : 1 }}
        unoptimized={true}
      />
    </>
  )
}
