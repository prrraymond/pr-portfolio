"use client"

import { useState, useEffect } from "react"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertTriangle, Bug, CheckCircle } from "lucide-react"

interface DiagnosticData {
  totalRecords: number
  typeCount: Record<string, number>
  founderCount: number
  potentialFounders: Array<{
    id: string
    type: string
    experience: string
    company: string
  }>
}

export default function DataDiagnostic() {
  const [isOpen, setIsOpen] = useState(true)
  const [data, setData] = useState<DiagnosticData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDiagnosticData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/debug/raw-data")
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      const rawData = await response.json()

      // Process the data
      // Find potential founder records - specifically looking for Experience = "Founder" with a Company
      const potentialFounders = rawData.records
        .filter((r: any) => {
          return r.experience === "Founder" && r.company
        })
        .map((r: any) => ({
          id: r.id,
          type: r.type,
          experience: r.experience,
          company: r.company,
        }))

      setData({
        totalRecords: rawData.totalRecords,
        typeCount: rawData.typeCount,
        founderCount: potentialFounders.length,
        potentialFounders,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      console.error("Error fetching diagnostic data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchDiagnosticData()
  }, [])

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="fixed top-20 right-4 z-50 bg-white shadow-md"
        onClick={() => setIsOpen(true)}
      >
        <Bug className="h-4 w-4 mr-1" />
        Show Diagnostics
      </Button>
    )
  }

  return (
    <Card className="mb-6 border-blue-500">
      <CardHeader className="bg-blue-50 py-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-blue-700 text-lg flex items-center">
            <Bug className="h-5 w-5 mr-2" />
            Data Diagnostics
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchDiagnosticData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Hide
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        {isLoading ? (
          <div className="text-center py-2">Loading diagnostic data...</div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : data ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-500">Total Records</div>
                <div className="text-xl font-bold">{data.totalRecords}</div>
              </div>

              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-500">Record Types</div>
                <div className="text-xl font-bold">{Object.keys(data.typeCount).length}</div>
              </div>

              <div className="p-3 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-500">Founder Records</div>
                <div className="text-xl font-bold">{data.founderCount}</div>
              </div>
            </div>

            {data.founderCount === 0 ? (
              <Alert className="bg-amber-50 border-amber-200">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertTitle className="text-amber-800">No Founder Records Found</AlertTitle>
                <AlertDescription className="text-amber-700">
                  We couldn't find any records with Experience = "Founder" and a Company name in your Airtable data.
                  <div className="mt-2">
                    <strong>Solution:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      <li>Update your Airtable to add records with Experience = "Founder"</li>
                      <li>Make sure these records also have a Company name</li>
                      <li>Ensure these records have "Publish Status" set to "Active"</li>
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Founder Records Found</AlertTitle>
                <AlertDescription className="text-green-700">
                  We found {data.founderCount} records with Experience = "Founder" and a Company name.
                  <div className="mt-2">
                    <strong>These records will be displayed as founders:</strong>
                    <ul className="list-disc pl-5 mt-1">
                      {data.potentialFounders.map((founder) => (
                        <li key={founder.id}>
                          Founder at {founder.company} (Type: {founder.type})
                        </li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div>
              <h4 className="text-sm font-medium mb-2">Record Types in Airtable:</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(data.typeCount).map(([type, count]) => (
                  <Badge key={type} variant="outline">
                    {type}: {count}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-2">No diagnostic data available</div>
        )}
      </CardContent>
    </Card>
  )
}
