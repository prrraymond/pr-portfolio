"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, RefreshCw, Wrench } from "lucide-react"

export default function ToolFixBanner() {
  const [isVisible, setIsVisible] = useState(true)

  // Force a page refresh
  const handleRefresh = () => {
    // Use this approach to force a full page refresh in the v0 environment
    window.location.href = window.location.href.split("?")[0] + `?refresh=${Date.now()}`
  }

  if (!isVisible) return null

  return (
    <Alert className="mb-4 border-blue-500 bg-blue-50">
      <div className="flex justify-between items-start">
        <div>
          <AlertTitle className="text-blue-700 flex items-center">
            <Wrench className="h-4 w-4 mr-2" />
            Fixed: Tool Icons Now Display Correctly
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              We've updated the code to ensure each tool displays its correct icon. The issue was similar to the founder
              cover images - all tools had generic filenames in Cloudinary (all named "asset.jpg" or "asset.png").
            </p>
            <p className="text-sm text-blue-600">The system now:</p>
            <ul className="list-disc pl-5 mt-1 text-sm text-blue-600">
              <li>Adds a unique identifier to each tool image URL</li>
              <li>Prevents browser caching issues with identical filenames</li>
              <li>Shows the correct icon for each tool</li>
            </ul>
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh Page
              </Button>
            </div>
          </AlertDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="mt-1">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}
