"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FounderCardV2 from "@/components/founder-card-v2"
import type { ContentItem } from "@/lib/types"

export default function FounderDebug() {
  const [isOpen, setIsOpen] = useState(false)
  const [founders, setFounders] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchFounders = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/debug/founder-cards")
      if (response.ok) {
        const data = await response.json()
        setFounders(data.transformedFounders)
      }
    } catch (error) {
      console.error("Error fetching founders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchFounders()
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsOpen(true)}>
        Debug Founder Cards
      </Button>
    )
  }

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Founder Cards Debug</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="text-center py-8">Loading founder data...</div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Displaying all {founders.length} founder cards side by side for comparison. Each card should have a
                different color based on its sort order.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              {founders.map((founder) => (
                <div key={founder.id} className="w-72">
                  <FounderCardV2 item={founder} />
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
