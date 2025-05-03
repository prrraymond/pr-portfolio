"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Bug, AlertTriangle } from "lucide-react"
import Image from "next/image"
import type { ContentItem } from "@/lib/types"

interface ToolsDebugProps {
  item: ContentItem
}

export default function ToolsDebug({ item }: ToolsDebugProps) {
  const [isOpen, setIsOpen] = useState(true) // Open by default to help debug
  const [showRawData, setShowRawData] = useState(false)

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" className="mt-4 text-xs" onClick={() => setIsOpen(true)}>
        <Bug className="h-3 w-3 mr-1" />
        Debug Tools
      </Button>
    )
  }

  // Check if tools array exists and has items
  const hasTools = Array.isArray(item.tools) && item.tools.length > 0

  return (
    <Card className="mt-4 mb-8 shadow-sm border-red-200">
      <CardHeader className="py-2 px-4 bg-red-50 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-red-800">Tools Debug Info</CardTitle>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 text-xs">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <strong>Total Tools: {hasTools ? item.tools.length : "0 (tools array is missing or empty)"}</strong>
            <Button variant="outline" size="sm" onClick={() => setShowRawData(!showRawData)}>
              {showRawData ? "Hide Raw Data" : "Show Raw Data"}
            </Button>
          </div>

          {!hasTools && (
            <div className="bg-red-50 p-3 rounded border border-red-200 flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium">No tools found!</p>
                <p className="text-red-600 mt-1">
                  The tools array is either missing, not an array, or empty. Check the Airtable data and make sure:
                </p>
                <ul className="list-disc pl-5 mt-1 text-red-600">
                  <li>The "Tools" field in Airtable has values</li>
                  <li>The "Logo CDN (from Tools)" field has corresponding logo URLs</li>
                  <li>The data is being correctly transformed in the airtable.ts file</li>
                </ul>
              </div>
            </div>
          )}

          {hasTools &&
            item.tools.map((tool, index) => (
              <div key={index} className="border rounded p-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    {tool.logo ? (
                      <Image
                        src={
                          tool.logo
                            ? `${tool.logo}${tool.logo.includes("?") ? "&" : "?"}toolId=${index}-${encodeURIComponent(tool.name || "tool")}`
                            : "/placeholder.svg"
                        }
                        alt={tool.name || "Unnamed Tool"}
                        width={24}
                        height={24}
                        className="object-contain"
                        unoptimized={true}
                      />
                    ) : (
                      <span className="text-sm">No logo</span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{tool.name || "Unnamed Tool"}</div>
                  </div>
                </div>
                {tool.logo && (
                  <div className="text-xs break-all">
                    <strong>Logo URL:</strong> {tool.logo}
                  </div>
                )}
              </div>
            ))}

          {showRawData && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Raw Item Data:</h4>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-60">
                {JSON.stringify(item, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
