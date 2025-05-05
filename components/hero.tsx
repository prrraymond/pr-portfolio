"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import HeaderMenu from "@/components/header-menu"
import type { ContentItem } from "@/lib/types"

interface HeroProps {
  heroContent?: ContentItem | null
  allProjects?: ContentItem[]
}

export default function Hero({ heroContent, allProjects = [] }: HeroProps) {
  // Default content if no hero content is provided
  const title = heroContent?.title || "Media & Entertainment Analytics"
  const company = heroContent?.company || "Portfolio"
  const description =
    heroContent?.description ||
    "Intellectually curious & strategic athlete with a passion for analytics, design, and driving positive impact."
  const image = heroContent?.image || "/media-analytics-dashboard-enhanced.png"
  const startYear = heroContent?.startYear ? `${heroContent.startYear}` : "2023"
  const slug = heroContent?.id || ""

  return (
    <>
      {/* Menu Bar - Now using HeaderMenu component */}
      <HeaderMenu projects={allProjects} />

      {/* Hero Section */}
      <section className="relative bg-gray-50 py-8 md:py-12 font-sans">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start">
            {/* Left side - Text content */}
            <div className="w-full md:w-2/5 mb-8 md:mb-0 md:pr-8">
              <p className="text-base text-gray-600 mb-6 font-normal">
                Intellectually curious & strategic athlete with a passion for analytics, design, and driving positive
                impact. My professional experience spans media & entertainment, management consulting, education,
                professional sports, and entrepreneurship.
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    const contentSection = document.getElementById("content")
                    if (contentSection) {
                      contentSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                  className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
                >
                  View Experiences
                </button>
                <Button variant="outline" className="font-medium" asChild>
                  <a href="mailto:paulrenaud.raymond@gmail.com">Contact Me</a>
                </Button>
              </div>
            </div>

            {/* Right side - Featured project - shifted left */}
            <div className="w-full md:w-3/5 md:pl-0 md:-ml-8">
              <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-lg">
                {/* Project image with frame */}
                <div className="relative aspect-[16/8.5] w-full">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>

                {/* Project info overlay */}
                <div className="bg-white p-4 border-t border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="mb-1">
                        <span className="bg-blue-600 text-white px-2 py-0.5 text-xs font-medium rounded">
                          Featured Project
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 font-normal">
                        {company} • {startYear}
                      </p>
                      <h3 className="font-bold text-lg">{title}</h3>
                    </div>

                    {slug && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-medium" asChild>
                        <Link href={`/experience/${slug}`}>Visit Page</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section - Moved below hero */}
      <div className="container mx-auto px-4 py-4 bg-white border-t border-gray-100 font-sans">
        <div className="flex items-center space-x-4">
          <div className="h-1 w-12 bg-blue-600"></div>
          <p className="text-sm text-gray-600 font-normal">
            Originally from Miami, Manhattan is now my home base, and Panther Coffee remains my favorite cafe.
          </p>
        </div>
      </div>
    </>
  )
}
