"use client"

import { useState } from "react"
import { locationSortToEra } from "@/components/content-section"

export default function EraDebug() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg">
        {isOpen ? "Hide Debug" : "Show Era Debug"}
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-white rounded-md shadow-lg border border-gray-200 max-h-96 overflow-auto w-80">
          <h3 className="font-bold mb-2">Era Mapping Debug</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1">Location Sort</th>
                <th className="text-left py-1">Era</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(locationSortToEra).map(([sort, era]) => (
                <tr key={sort} className="border-b">
                  <td className="py-1">{sort}</td>
                  <td className="py-1">{era}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <p className="font-bold">Era Styles:</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="p-2 bg-yellow-100 border-l-4 border-yellow-500">2004-2007</div>
              <div className="p-2 bg-gray-100 border-l-4 border-gray-500">2008-2011</div>
              <div className="p-2 bg-amber-100 border-l-4 border-amber-700">2012-2016</div>
              <div className="p-2 bg-purple-100 border-l-4 border-purple-500">2017-2019</div>
              <div className="p-2 bg-gray-100 border-l-4 border-gray-400">2020-2022</div>
              <div className="p-2 bg-blue-100 border-l-4 border-blue-500">2023-2025</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
