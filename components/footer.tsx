"use client"

import Link from "next/link"
import { Mail, Linkedin, Instagram, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  // Function to trigger revalidation
  const handleRevalidate = async () => {
    try {
      const response = await fetch("/api/revalidate", {
        method: "GET",
      })

      if (response.ok) {
        alert("Cache cleared successfully! Refresh the page to see changes.")
      } else {
        alert("Failed to clear cache. Check console for details.")
        console.error("Revalidation failed:", await response.text())
      }
    } catch (error) {
      console.error("Error during revalidation:", error)
      alert("Error clearing cache. Check console for details.")
    }
  }

  return (
    <footer className="bg-gray-100 py-12 mt-16 font-sans">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Paul-Renaud Raymond</h3>
          </div>

          <div className="flex space-x-4">
            <Link
              href="mailto:paulrenaud.raymond@gmail.com"
              className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/paulrenaud-raymond/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://www.instagram.com/p_rray/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600 transition-colors shadow-sm"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm font-normal">
            <p>&copy; {new Date().getFullYear()} Paul-Renaud Raymond. All rights reserved.</p>
            <p className="mt-2">
              Built with v0, Vercel, Cloudinary, and Airtable and inspired by Disney+ and WandaVision
            </p>
          </div>

          {/* Add revalidation button */}
          <Button
            variant="outline"
            size="sm"
            className="mt-4 md:mt-0 flex items-center gap-2"
            onClick={handleRevalidate}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Content
          </Button>
        </div>
      </div>
    </footer>
  )
}
