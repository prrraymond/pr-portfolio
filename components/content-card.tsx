"use client"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/lib/types"
import { getEraStyles } from "@/lib/era-styles"
import Link from "next/link"

interface ContentCardProps {
  item: ContentItem
}

export default function ContentCard({ item }: ContentCardProps) {
  // Use the item's own era for styling
  const eraStyles = getEraStyles(item.era)

  return (
    <Link href={`/experience/${item.id}`}>
      <Card
        className={`w-72 md:w-80 h-96 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl netflix-card`}
        style={{
          background: eraStyles.container.includes("bg-") ? undefined : eraStyles.container,
          color: eraStyles.body.includes("text-") ? undefined : eraStyles.body,
          borderLeft: `4px solid ${eraStyles.accent.includes("bg-") ? "var(--primary)" : eraStyles.accent.replace("bg-", "")}`,
        }}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.image || `/placeholder.svg?height=480&width=640&query=${encodeURIComponent(item.title)}`}
            alt={item.title}
            fill
            className={`object-cover transition-transform duration-700 hover:scale-110 ${eraStyles.filter}`}
          />
        </div>
        <CardContent className="p-4">
          <h3 className={`text-xl font-bold mb-2 ${eraStyles.header}`}>{item.title}</h3>
          <p className={`text-sm mb-4 line-clamp-3 ${eraStyles.body}`}>{item.description}</p>
          <div className="flex flex-wrap gap-2">
            {item.skills && item.skills.length > 0 ? (
              <>
                {item.skills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="outline" className={eraStyles.badge}>
                    {skill}
                  </Badge>
                ))}
                {item.skills.length > 3 && (
                  <Badge variant="outline" className={eraStyles.badge}>
                    +{item.skills.length - 3}
                  </Badge>
                )}
              </>
            ) : (
              <Badge variant="outline" className={eraStyles.badge}>
                {item.type}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
