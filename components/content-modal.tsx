"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ContentItem } from "@/lib/types"
import { getEraStyles } from "@/lib/era-styles"
import Image from "next/image"
import { ExternalLink, X } from "lucide-react"

interface ContentModalProps {
  item: ContentItem
  era: string
  isOpen: boolean
  onClose: () => void
}

export default function ContentModal({ item, era, isOpen, onClose }: ContentModalProps) {
  const eraStyles = getEraStyles(era)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] overflow-y-auto ${eraStyles.container}`}>
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className={`text-2xl md:text-3xl ${eraStyles.header}`}>{item.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <DialogDescription className={eraStyles.body}>{item.date}</DialogDescription>
        </DialogHeader>

        <div className="relative h-64 md:h-80 w-full my-4 rounded-md overflow-hidden">
          <Image
            src={item.image || `/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(item.title)}`}
            alt={item.title}
            fill
            className={`object-cover ${eraStyles.filter}`}
          />
        </div>

        <div className={`space-y-4 ${eraStyles.body}`}>
          <p className="text-lg">{item.description}</p>

          {item.content && (
            <div className="mt-4">
              <h4 className={`text-xl font-semibold mb-2 ${eraStyles.header}`}>Details</h4>
              <div className="prose max-w-none">{item.content}</div>
            </div>
          )}

          <div className="mt-6">
            <h4 className={`text-xl font-semibold mb-2 ${eraStyles.header}`}>Tags</h4>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline" className={eraStyles.badge}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {item.link && (
            <div className="mt-6">
              <Button className={eraStyles.button} asChild>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Project
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
