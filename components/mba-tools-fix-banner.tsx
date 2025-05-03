"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, RefreshCw, Check } from "lucide-react"

export default function MbaToolsFixBanner() {
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
            MBA Tools Fixed
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              We've added specific mappings for the MBA experience page tools. The tools that were previously showing as
              generic IDs (recGg251S6HVAziXt and recr9nVnigk1QK4WP) now display as Excel and PowerPoint.
            </p>
            <p className="text-sm text-green-600">
              If these names are incorrect, you can update them in the tool-mappings.ts file.
            </p>
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
