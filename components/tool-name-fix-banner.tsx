"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, RefreshCw, Check } from "lucide-react"

export default function ToolNameFixBanner() {
  const [isVisible, setIsVisible] = useState(true)

  // Force a page refresh
  const handleRefresh = () => {
    // Use this approach to force a full page refresh in the v0 environment
    window.location.href = window.location.href.split("?")[0] + `?refresh=${Date.now()}`
  }

  if (!isVisible) return null

  return (
    <Alert className="mb-4 border-green-500 bg-green-50">
      <div className="flex justify-between items-start">
        <div>
          <AlertTitle className="text-green-700 flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Tool Names and Icons Fixed (Updated)
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              We've updated the code to display proper tool names and provide fallback icons when Cloudinary images fail
              to load.
            </p>
            <p className="text-sm text-green-600">The system now:</p>
            <ul className="list-disc pl-5 mt-1 text-sm text-green-600">
              <li>Maps Airtable tool IDs directly to human-readable names</li>
              <li>Uses hardcoded mappings for known tool IDs</li>
              <li>Provides appropriate fallback icons based on tool type</li>
              <li>Handles image loading errors gracefully</li>
            </ul>
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
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
