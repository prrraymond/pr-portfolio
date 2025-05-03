"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"

interface RawRecord {
  id: string
  experience: string
  company: string
  type: string
  sortOrder: number
  publishStatus: string
  hasCover: boolean
  coverCDN: string | null
  coverAttachment: string | null
}

export default function FounderDebug() {
  const [isOpen, setIsOpen] = useState(false)
  const [rawData, setRawData] = useState<{
    totalRecords: number
    typeCount: Record<string, number>
    records: RawRecord[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRawData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/debug/raw-data")
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      setRawData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      console.error("Error fetching raw data:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchRawData()
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" className="mt-4" onClick={() => setIsOpen(true)}>
        Debug Data
      </Button>
    )
  }

  // Filter for founder records
  const founderRecords = rawData?.records.filter((record) => record.type === "Founders") || []

  return (
    <Card className="mt-8 shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Data Debug</CardTitle>
            <CardDescription>Inspect raw data from Airtable</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchRawData} disabled={isLoading}>
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
          <div className="text-center py-8">Loading data...</div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : rawData ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Total Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{rawData.totalRecords}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Records by Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {Object.entries(rawData.typeCount).map(([type, count]) => (
                    <div key={type} className="flex justify-between items-center">
                      <Badge variant={type === "Founders" ? "default" : "outline"}>{type}</Badge>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Founder Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{founderRecords.length}</p>
                  {founderRecords.length === 0 && (
                    <Alert className="mt-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>No Founder Records Found</AlertTitle>
                      <AlertDescription>Check if any records have Type = "Founders" in Airtable</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>

            {founderRecords.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Founder Records</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Sort Order</TableHead>
                      <TableHead>Has Cover</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {founderRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-mono text-xs">{record.id}</TableCell>
                        <TableCell>{record.experience}</TableCell>
                        <TableCell>{record.company}</TableCell>
                        <TableCell>{record.sortOrder}</TableCell>
                        <TableCell>
                          {record.hasCover ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium mb-2">All Records</h3>
              <div className="max-h-96 overflow-y-auto border rounded">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rawData.records.map((record) => (
                      <TableRow key={record.id} className={record.type === "Founders" ? "bg-blue-50" : ""}>
                        <TableCell>
                          <Badge variant={record.type === "Founders" ? "default" : "outline"}>{record.type}</Badge>
                        </TableCell>
                        <TableCell>{record.experience}</TableCell>
                        <TableCell>{record.company}</TableCell>
                        <TableCell>{record.publishStatus}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">No data available</div>
        )}
      </CardContent>
    </Card>
  )
}
