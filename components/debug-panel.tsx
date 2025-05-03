"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug, X, RefreshCw, ExternalLink } from "lucide-react"

export default function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [recordId, setRecordId] = useState("")
  const [founderReport, setFounderReport] = useState<any>(null)
  const [recordData, setRecordData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFounderReport = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/debug/founder-cards`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setFounderReport(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setFounderReport(null)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecord = async () => {
    if (!recordId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/record/${recordId}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      setRecordData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      setRecordData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const clearCache = async () => {
    try {
      const response = await fetch("/api/revalidate")

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      alert("Cache cleared successfully! Refresh the page to see changes.")
      window.location.reload() // Force reload the page
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to clear cache")
    }
  }

  // Automatically fetch the founder report when the panel is opened
  useEffect(() => {
    if (isOpen) {
      fetchFounderReport()
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 left-6 rounded-full h-10 w-10 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <Bug className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 w-96 z-50">
      <Card className="shadow-xl">
        <CardHeader className="p-4 bg-gray-50 border-b flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Debug Panel</CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <div className="flex gap-2">
            <Button onClick={fetchFounderReport} disabled={isLoading} className="flex-1">
              {isLoading ? "Loading..." : "Refresh Founder Report"}
            </Button>
            <Button onClick={clearCache} variant="outline" className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              Clear Cache
            </Button>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Record ID"
              value={recordId}
              onChange={(e) => setRecordId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={fetchRecord} disabled={isLoading}>
              {isLoading ? "Loading..." : "Fetch"}
            </Button>
          </div>

          <div className="flex justify-between">
            <a
              href="/api/debug/founder-cards"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm flex items-center hover:underline"
            >
              View Raw Founder Data <ExternalLink className="h-3 w-3 ml-1" />
            </a>
            <a
              href="/api/debug/founder-issue"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm flex items-center hover:underline"
            >
              View Founder Issue Report <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>

          {error && <div className="p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">{error}</div>}

          {recordData && (
            <div className="p-2 bg-gray-50 border border-gray-200 rounded">
              <h4 className="font-medium mb-1">Record: {recordData.id}</h4>
              <div className="max-h-60 overflow-y-auto">
                <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(recordData.fields, null, 2)}</pre>
              </div>
            </div>
          )}

          {founderReport && (
            <div className="space-y-4">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded">
                <h4 className="font-medium mb-1">Summary</h4>
                <p className="text-sm">Raw Founder Records: {founderReport.rawFounderCount}</p>
                <p className="text-sm">Transformed Founder Items: {founderReport.transformedFounderCount}</p>
              </div>

              {Object.keys(founderReport.slugCounts).some((slug) => founderReport.slugCounts[slug] > 1) && (
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <h4 className="font-medium mb-1 text-red-600">Duplicate Slugs Detected!</h4>
                  {Object.entries(founderReport.slugCounts)
                    .filter(([_, count]) => (count as number) > 1)
                    .map(([slug, count]) => (
                      <p key={slug} className="text-sm">
                        Slug "{slug}" is used {count} times
                      </p>
                    ))}
                </div>
              )}

              {Object.keys(founderReport.sortOrderCounts).some((order) => founderReport.sortOrderCounts[order] > 1) && (
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <h4 className="font-medium mb-1 text-red-600">Duplicate Sort Orders Detected!</h4>
                  {Object.entries(founderReport.sortOrderCounts)
                    .filter(([_, count]) => (count as number) > 1)
                    .map(([order, count]) => (
                      <p key={order} className="text-sm">
                        Sort Order "{order}" is used {count} times
                      </p>
                    ))}
                </div>
              )}

              <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                <h4 className="font-medium mb-1">Transformed Founder Items</h4>
                <div className="max-h-60 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b">
                        <th className="p-1 text-left">ID</th>
                        <th className="p-1 text-left">Company</th>
                        <th className="p-1 text-left">Sort Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {founderReport.transformedFounders.map((founder: any) => (
                        <tr key={founder.id} className="border-b">
                          <td className="p-1">{founder.id}</td>
                          <td className="p-1">{founder.company}</td>
                          <td className="p-1">{founder.sortOrder}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
