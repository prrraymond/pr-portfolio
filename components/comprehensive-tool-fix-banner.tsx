"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, Check } from "lucide-react"

export default function ComprehensiveToolFixBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <Alert className="mb-4 bg-green-50 border-green-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Check className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <AlertTitle className="text-green-800 font-medium">Tool Display Names Fixed</AlertTitle>
            <AlertDescription className="text-green-700 text-sm mt-1">
              All tool IDs have been mapped to their proper display names. The comprehensive mapping includes all tools
              from your Airtable database.
            </AlertDescription>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 text-green-700 hover:text-green-900 hover:bg-green-100"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  )
}
