'use client'

import { useState } from "react"
import { Heart, Download, Share2 } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { type Image as ImageType } from "@/types"
import { ImageModal } from "./image-modal"

interface ImageCardProps {
  image: ImageType
  onLike?: (imageId: string) => void
  onDownload?: (imageId: string) => void
  onShare?: (imageId: string) => void
}

export function ImageCard({ image, onLike, onDownload, onShare }: ImageCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    onLike?.(image.id)
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDownload?.(image.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShare?.(image.id)
  }

  return (
    <>
      <div
        className="group relative mb-4 break-inside-avoid cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.url}
            alt={image.prompt}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
              onClick={handleLike}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isLiked ? "fill-red-500 text-red-500" : "text-white"
                )}
              />
            </Button>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4 text-white" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ImageModal
        image={image}
        open={showModal}
        onOpenChange={setShowModal}
        onLike={handleLike}
        onDownload={handleDownload}
        onShare={handleShare}
        isLiked={isLiked}
      />
    </>
  )
}
