"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Bug } from "lucide-react"
import type { ContentItem } from "@/lib/types"

interface ToolIdDebugProps {
  item: ContentItem
}

export default function ToolIdDebug({ item }: ToolIdDebugProps) {
  const [isOpen, setIsOpen] = useState(true) // Open by default to help debug

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" className="mt-4 text-xs" onClick={() => setIsOpen(true)}>
        <Bug className="h-3 w-3 mr-1" />
        Debug Tool IDs
      </Button>
    )
  }

  // Check if tools array exists and has items
  const hasTools = Array.isArray(item.tools) && item.tools.length > 0

  return (
    <Card className="mt-4 mb-8 shadow-sm border-red-200">
      <CardHeader className="py-2 px-4 bg-red-50 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-red-800">Tool ID Debug Info</CardTitle>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 text-xs">
        <div className="space-y-4">
          <div>
            <strong>Total Tools: {hasTools ? item.tools.length : "0"}</strong>
          </div>

          {hasTools && (
            <div>
              <h3 className="font-medium mb-2">Raw Tool Data:</h3>
              <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-60">
                {JSON.stringify(item.tools, null, 2)}
              </pre>
            </div>
          )}

          <div>
            <h3 className="font-medium mb-2">Original Record ID:</h3>
            <div className="bg-gray-100 p-2 rounded">{item.recordId || "No record ID available"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
