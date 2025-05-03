"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { RefreshCw, AlertTriangle, ImageIcon } from "lucide-react"

export default function FounderImageTester() {
  const [isOpen, setIsOpen] = useState(false)
  const [imageData, setImageData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImageData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/debug/founder-images")
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setImageData(data.items || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      console.error("Error fetching image data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchImageData()
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="mt-4 bg-purple-100 text-purple-700 border-purple-300"
        onClick={() => setIsOpen(true)}
      >
        <ImageIcon className="h-4 w-4 mr-1" />
        Test Founder Images
      </Button>
    )
  }

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader className="bg-purple-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Founder Image Tester</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchImageData} disabled={isLoading}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="text-center py-8">Loading image data...</div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : imageData.length === 0 ? (
          <div className="text-center py-8">No founder image data found</div>
        ) : (
          <div className="space-y-8">
            {imageData.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2">{item.company}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Image Data:</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Record ID:</strong> {item.id}
                      </p>
                      <p>
                        <strong>Cover CDN:</strong> {item.coverCDN || "Not set"}
                      </p>
                      <p>
                        <strong>Has Cover Attachment:</strong> {item.hasCoverAttachment ? "Yes" : "No"}
                      </p>
                    </div>

                    {/* Display all image fields */}
                    <div className="mt-4">
                      <h4 className="font-medium mb-1">All Image Fields:</h4>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                        {JSON.stringify(item.allImageFields, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Image Preview:</h4>
                    <div className="space-y-4">
                      {/* Cover CDN Image */}
                      {item.coverCDN && (
                        <div>
                          <p className="text-xs mb-1">Cover CDN Image:</p>
                          <div className="relative h-32 w-full border rounded overflow-hidden">
                            <Image
                              src={item.coverCDN || "/placeholder.svg"}
                              alt={`${item.company} Cover CDN`}
                              fill
                              className="object-cover"
                              unoptimized={true} // Skip Next.js image optimization
                            />
                          </div>
                        </div>
                      )}

                      {/* Cover Attachment Image */}
                      {item.coverAttachmentUrl && (
                        <div>
                          <p className="text-xs mb-1">Cover Attachment Image:</p>
                          <div className="relative h-32 w-full border rounded overflow-hidden">
                            <Image
                              src={item.coverAttachmentUrl || "/placeholder.svg"}
                              alt={`${item.company} Cover Attachment`}
                              fill
                              className="object-cover"
                              unoptimized={true} // Skip Next.js image optimization
                            />
                          </div>
                        </div>
                      )}

                      {/* Placeholder if no images */}
                      {!item.coverCDN && !item.coverAttachmentUrl && (
                        <div className="h-32 w-full border rounded flex items-center justify-center bg-gray-100">
                          <p className="text-gray-500">No images available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
