"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { RefreshCw, X, CheckCircle, Trash2 } from "lucide-react"

export default function FounderFixBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  // Force a page refresh
  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1)
    // Use this approach to force a full page refresh in the v0 environment
    window.location.href = window.location.href.split("?")[0] + `?refresh=${Date.now()}`
  }

  // Force a hard refresh by clearing cache
  const handleHardRefresh = () => {
    // Clear localStorage
    localStorage.clear()
    // Clear sessionStorage
    sessionStorage.clear()
    // Force reload without cache
    window.location.href = window.location.href.split("?")[0] + `?hardRefresh=${Date.now()}`
  }

  // Log when the component mounts
  useEffect(() => {
    console.log("FounderFixBanner mounted at", new Date().toLocaleTimeString())

    // Check if we were redirected with a refresh parameter
    const urlParams = new URLSearchParams(window.location.search)
    const refreshParam = urlParams.get("refresh")
    const hardRefreshParam = urlParams.get("hardRefresh")

    if (refreshParam) {
      console.log(`Page refreshed at ${new Date(Number.parseInt(refreshParam)).toLocaleTimeString()}`)
    }

    if (hardRefreshParam) {
      console.log(`Page hard refreshed at ${new Date(Number.parseInt(hardRefreshParam)).toLocaleTimeString()}`)
    }
  }, [])

  if (!isVisible) return null

  return (
    <Alert className="mb-4 border-green-500 bg-green-50">
      <div className="flex justify-between items-start">
        <div>
          <AlertTitle className="text-green-700 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Fixed: Now Using Cover Attachment Images
          </AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              We've updated the code to prioritize the Cover Attachment field over the Cover CDN field for founder
              cards.
            </p>
            <p className="text-sm text-green-600">The system now:</p>
            <ul className="list-disc pl-5 mt-1 text-sm text-green-600">
              <li>Uses the unique Cover Attachment images for each founder</li>
              <li>Only falls back to Cover CDN if no attachment is available</li>
              <li>Adds client-side timestamps to prevent image caching</li>
              <li>Displays founder cards with their correct unique images</li>
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Normal Refresh ({refreshCount})
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleHardRefresh}
                className="bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Hard Refresh (Clear Cache)
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
