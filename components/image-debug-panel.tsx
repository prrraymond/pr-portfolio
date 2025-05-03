"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw, ImageIcon } from "lucide-react"

export default function ImageDebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageInfo, setImageInfo] = useState<any[]>([])
  const [timestamp, setTimestamp] = useState(Date.now())

  // Collect information about images on the page
  const collectInfo = () => {
    setTimestamp(Date.now())

    // Get all images in founder cards
    const founderCardImages = document.querySelectorAll(".founder-card-container img")

    const info = Array.from(founderCardImages).map((img, index) => {
      const imgElement = img as HTMLImageElement
      const company = imgElement.getAttribute("data-company") || "Unknown"
      const founderId = imgElement.getAttribute("data-founder-id") || "Unknown"
      const recordId = imgElement.getAttribute("data-record-id") || "Unknown"

      return {
        index,
        company,
        founderId,
        recordId,
        src: imgElement.src,
        naturalWidth: imgElement.naturalWidth,
        naturalHeight: imgElement.naturalHeight,
        complete: imgElement.complete,
        timestamp: new Date().toLocaleTimeString(),
      }
    })

    setImageInfo(info)
  }

  // Run on mount and when opened
  useEffect(() => {
    if (isOpen) {
      // Wait a bit for images to load
      setTimeout(collectInfo, 500)
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-20 right-4 z-50 bg-blue-100 text-blue-700 border-blue-300"
        onClick={() => setIsOpen(true)}
      >
        <ImageIcon className="h-4 w-4 mr-1" />
        Debug Images
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-20 right-4 z-50 w-96 max-h-[60vh] overflow-auto shadow-xl">
      <CardHeader className="bg-blue-50 py-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-blue-700 text-lg flex items-center">
            <ImageIcon className="h-5 w-5 mr-2" />
            Image Debug
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={collectInfo}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Founder Card Images ({imageInfo.length})</h3>
            {imageInfo.length === 0 ? (
              <p className="text-sm text-amber-600">No founder card images found on the page!</p>
            ) : (
              <div className="space-y-2">
                {imageInfo.map((info, i) => (
                  <div key={i} className="p-2 bg-gray-50 rounded text-sm border border-gray-200">
                    <div className="mb-1">
                      <strong>Company:</strong> {info.company}
                    </div>
                    <div className="mb-1 text-xs truncate">
                      <strong>Image URL:</strong> {info.src}
                    </div>
                    <div className="mb-1">
                      <strong>Size:</strong> {info.naturalWidth}x{info.naturalHeight}
                    </div>
                    <div className="mb-1">
                      <strong>Loaded:</strong> {info.complete ? "Yes" : "No"}
                    </div>
                    <div className="text-xs text-gray-500">
                      ID: {info.founderId} (Record: {info.recordId})
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 text-right">
            Last updated: {new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
