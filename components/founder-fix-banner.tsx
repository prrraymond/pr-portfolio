"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw, X } from "lucide-react"

export default function FounderFixBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  // Force a page refresh
  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1)
    // Use this approach to force a full page refresh in the v0 environment
    window.location.href = window.location.href.split("?")[0] + `?refresh=${Date.now()}`
  }

  // Log when the component mounts
  useEffect(() => {
    console.log("FounderFixBanner mounted")

    // Check if we were redirected with a refresh parameter
    const urlParams = new URLSearchParams(window.location.search)
    const refreshParam = urlParams.get("refresh")

    if (refreshParam) {
      console.log(`Page refreshed at ${new Date(Number.parseInt(refreshParam)).toLocaleTimeString()}`)
    }
  }, [])

  if (!isVisible) return null

  return (
    <Alert className="mb-4 border-blue-500 bg-blue-50">
      <div className="flex justify-between items-start">
        <div>
          <AlertTitle className="text-blue-700">Founder Cards Fix</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              We've updated how Founder cards are displayed. They should now appear with colored backgrounds and company
              initials instead of images.
            </p>
            <p className="text-sm text-blue-600">
              If you're still seeing the same images for all Founder cards, please click the refresh button below.
            </p>
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200 mr-2"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Force Refresh ({refreshCount})
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
