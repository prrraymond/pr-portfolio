"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { RefreshCw, Bug, AlertTriangle } from "lucide-react"

export default function FounderDebugPanel() {
  const [isOpen, setIsOpen] = useState(true)
  const [founderInfo, setFounderInfo] = useState<any[]>([])
  const [browserInfo, setBrowserInfo] = useState<any>({})
  const [timestamp, setTimestamp] = useState(Date.now())

  // Collect information about the page
  const collectInfo = () => {
    setTimestamp(Date.now())

    // Get all founder card containers
    const founderCards = document.querySelectorAll(".founder-card-container")

    const info = Array.from(founderCards).map((card, index) => {
      const company = card.getAttribute("data-company")
      const renderKey = card.getAttribute("data-render-key")
      const cardIndex = card.getAttribute("data-index")

      return {
        index,
        company,
        renderKey,
        cardIndex,
        uniqueId: `${company}-${cardIndex}-${renderKey}`,
        timestamp: new Date().toLocaleTimeString(),
      }
    })

    setFounderInfo(info)

    // Collect browser info
    setBrowserInfo({
      userAgent: navigator.userAgent,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      timestamp: new Date().toLocaleTimeString(),
      url: window.location.href,
      hasLocalStorage: !!window.localStorage,
      hasSessionStorage: !!window.sessionStorage,
    })
  }

  // Run on mount and when opened
  useEffect(() => {
    if (isOpen) {
      collectInfo()
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-red-100 text-red-700 border-red-300"
        onClick={() => setIsOpen(true)}
      >
        <Bug className="h-4 w-4 mr-1" />
        Debug Founder Cards
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-96 max-h-[80vh] overflow-auto shadow-xl">
      <CardHeader className="bg-red-50 py-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-red-700 text-lg flex items-center">
            <Bug className="h-5 w-5 mr-2" />
            Founder Cards Debug
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
        <Alert className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Debug Information</AlertTitle>
          <AlertDescription>This panel shows real-time information about founder cards on the page.</AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Founder Cards ({founderInfo.length})</h3>
            {founderInfo.length === 0 ? (
              <p className="text-sm text-red-600">No founder cards found on the page!</p>
            ) : (
              <div className="space-y-2">
                {founderInfo.map((info, i) => (
                  <div key={i} className="p-2 bg-gray-50 rounded text-sm">
                    <div>
                      <strong>Company:</strong> {info.company}
                    </div>
                    <div>
                      <strong>Unique ID:</strong> {info.uniqueId}
                    </div>
                    <div>
                      <strong>Render Key:</strong> {info.renderKey}
                    </div>
                    <div>
                      <strong>Timestamp:</strong> {info.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Browser Information</h3>
            <div className="p-2 bg-gray-50 rounded text-xs">
              <pre className="whitespace-pre-wrap">{JSON.stringify(browserInfo, null, 2)}</pre>
            </div>
          </div>

          <div className="text-xs text-gray-500 text-right">
            Last updated: {new Date(timestamp).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
