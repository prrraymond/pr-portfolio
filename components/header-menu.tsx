"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ContentItem } from "@/lib/types"

interface HeaderMenuProps {
  projects: ContentItem[]
}

export default function HeaderMenu({ projects = [] }: HeaderMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Sort projects by sortOrder
  const sortedProjects = [...projects].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm font-sans">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-blue-600 font-bold text-xl tracking-tight">
          Paul-Renaud Raymond
        </Link>
        <nav className="flex space-x-6">
          <Link href="/" className="text-gray-800 font-medium">
            Home
          </Link>

          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none font-medium">
              Experiences <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 font-sans p-1 max-h-[70vh] overflow-y-auto">
              {sortedProjects.length > 0 ? (
                sortedProjects.map((project) => (
                  <DropdownMenuItem key={project.id} className="py-1.5 pl-2 hover:bg-gray-50">
                    <Link
                      href={`/experience/${project.id}`}
                      className="flex justify-between items-center w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="truncate mr-2 font-medium">{project.title}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{project.startYear}</span>
                    </Link>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem disabled>No projects available</DropdownMenuItem>
              )}
              <DropdownMenuItem className="border-t mt-1 pt-2">
                <Link href="#content" className="w-full text-blue-600 font-medium" onClick={() => setIsOpen(false)}>
                  View All Experiences
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}
