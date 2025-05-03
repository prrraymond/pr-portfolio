"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, RefreshCw } from "lucide-react"

interface ImageQualityNoticeProps {
  imageUrl?: string
}

export default function ImageQualityNotice({ imageUrl }: ImageQualityNoticeProps) {
  const [isVisible, setIsVisible] = useState(true)

  const handleRefresh = () => {
    // Force reload the page to get fresh images
    window.location.reload()
  }

  if (!isVisible) return null

  return (
    <Alert className="mb-4 mt-4 border-amber-500 bg-amber-50">
      <div className="flex justify-between items-start">
        <div>
          <AlertTitle className="text-amber-700 flex items-center">Image Quality Information</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-2">
              If the cover image appears pixelated, it may be due to the source image quality in Cloudinary.
            </p>
            <p className="text-sm text-amber-600 mb-2">We've applied the following optimizations:</p>
            <ul className="list-disc pl-5 mt-1 text-sm text-amber-600">
              <li>Requested highest quality version from Cloudinary</li>
              <li>Bypassed Next.js image optimization</li>
              <li>Added cache-busting parameters</li>
            </ul>
            {imageUrl && <p className="text-xs text-amber-700 mt-2 break-all">Current image URL: {imageUrl}</p>}
            <div className="mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200"
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
