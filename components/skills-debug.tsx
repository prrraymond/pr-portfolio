"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Bug } from "lucide-react"
import type { ContentItem } from "@/lib/types"

interface SkillsDebugProps {
  item: ContentItem
}

export default function SkillsDebug({ item }: SkillsDebugProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" className="mt-4 text-xs" onClick={() => setIsOpen(true)}>
        <Bug className="h-3 w-3 mr-1" />
        Debug Skills
      </Button>
    )
  }

  return (
    <Card className="mt-4 mb-8 shadow-sm">
      <CardHeader className="py-2 px-4 bg-gray-50 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Skills Debug Info</CardTitle>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 text-xs">
        <div className="space-y-2">
          <div>
            <strong>Skills Array:</strong>
            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{JSON.stringify(item.skills, null, 2)}</pre>
          </div>

          <div>
            <strong>skillNames (string):</strong>
            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{item.skillNames || "Not available"}</pre>
          </div>

          <div>
            <strong>skillCategories:</strong>
            <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">
              {JSON.stringify(item.skillCategories, null, 2)}
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
