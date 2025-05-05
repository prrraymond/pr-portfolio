"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { locationSortToEra } from "@/components/content-section"
import { getEraStyles } from "@/lib/era-styles"

export default function LocationDebug() {
  const [isOpen, setIsOpen] = useState(false)
  const [locationData, setLocationData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLocationData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/debug/locations")
      if (!response.ok) {
        throw new Error(`Error fetching location data: ${response.status}`)
      }
      const data = await response.json()
      setLocationData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
      console.error("Error fetching location data:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && !locationData && !loading) {
      fetchLocationData()
    }
  }, [isOpen, locationData, loading])

  const toggleDebug = () => {
    setIsOpen(!isOpen)
  }

  const refreshData = () => {
    setLocationData(null)
    fetchLocationData()
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={toggleDebug} variant="outline" className="bg-white shadow-lg">
          {isOpen ? "Hide Location Debug" : "Show Location Debug"}
        </Button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-auto flex justify-center">
          <div className="bg-white m-4 p-4 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Location Debug</h2>
              <div className="flex gap-2">
                <Button onClick={refreshData} variant="outline" size="sm">
                  Refresh Data
                </Button>
                <Button onClick={toggleDebug} variant="outline" size="sm">
                  Close
                </Button>
              </div>
            </div>

            {loading && <p>Loading location data...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {locationData && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold mb-2">Location Sort to Era Mapping</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Location Sort</th>
                        <th className="border p-2 text-left">Era</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(locationSortToEra).map(([sort, era]) => (
                        <tr key={sort}>
                          <td className="border p-2">{sort}</td>
                          <td className="border p-2">{era}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="font-bold mb-2">Locations and Items</h3>
                  {Object.entries(locationData.locationGroups)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([locationSort, items]: [string, any[]]) => {
                      const mappedEra = locationSortToEra[Number(locationSort)] || "unknown"
                      const eraStyles = getEraStyles(mappedEra)

                      return (
                        <div key={locationSort} className="mb-4">
                          <h4 className="font-bold">
                            Location Sort: {locationSort} - Era: {mappedEra}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                            {items.map((item) => (
                              <Card
                                key={item.id}
                                className="p-3"
                                style={{
                                  borderLeft: `4px solid ${eraStyles.accent.includes("bg-") ? "var(--primary)" : eraStyles.accent.replace("bg-", "")}`,
                                }}
                              >
                                <p className="font-bold">{item.title}</p>
                                <p>Location: {item.location}</p>
                                <p>Location Sort: {item.locationSort}</p>
                                <p>Original Era: {item.era}</p>
                                <p>Mapped Era: {item.mappedEra}</p>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                </div>

                <div>
                  <h3 className="font-bold mb-2">Miami Locations</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-2 text-left">Title</th>
                        <th className="border p-2 text-left">Location</th>
                        <th className="border p-2 text-left">Location Sort</th>
                        <th className="border p-2 text-left">Original Era</th>
                        <th className="border p-2 text-left">Mapped Era</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(locationData.locationGroups)
                        .flat()
                        .filter((item: any) => item.location.toLowerCase().includes("miami"))
                        .sort((a: any, b: any) => a.locationSort - b.locationSort)
                        .map((item: any) => (
                          <tr key={item.id}>
                            <td className="border p-2">{item.title}</td>
                            <td className="border p-2">{item.location}</td>
                            <td className="border p-2">{item.locationSort}</td>
                            <td className="border p-2">{item.era}</td>
                            <td className="border p-2">{item.mappedEra}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
