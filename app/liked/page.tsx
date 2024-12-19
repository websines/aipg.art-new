'use client'

import { useState } from "react"
import { ImageCard } from "@/components/image-card"
import { type Image } from "@/types"

// Mock data for testing - in a real app, this would come from an API
const mockLikedImages: Image[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `liked-${i}`,
  url: `https://picsum.photos/seed/${i + 100}/800/600`,
  prompt: "A beautiful landscape with mountains and lakes",
  seed: Math.floor(Math.random() * 1000000),
  size: "512x512",
  model: "SDXL 1.0",
  steps: 30,
  sampler: "Euler a",
  cfgScale: 7,
  width: 800,
  height: 600,
  clipSkip: 1,
  denoisingStrength: 0.7,
  karras: false,
  hiResFix: false,
  isPublic: true,
  createdAt: new Date(),
  userId: "1",
  likes: 1,
}))

export default function LikedImagesPage() {
  const [images, setImages] = useState<Image[]>(mockLikedImages)

  const handleLike = (imageId: string) => {
    // In a real app, this would be an API call
    setImages(images.filter((image) => image.id !== imageId))
  }

  const handleDownload = (imageId: string) => {
    // In a real app, this would be an API call
    console.log("Download image:", imageId)
  }

  const handleShare = (imageId: string) => {
    // In a real app, this would be an API call
    console.log("Share image:", imageId)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Liked Images</h1>
        <p className="text-muted-foreground">
          Images you've liked will appear here
        </p>
      </div>
      
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onLike={handleLike}
            onDownload={handleDownload}
            onShare={handleShare}
          />
        ))}
        {images.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No liked images yet</p>
          </div>
        )}
      </div>
    </div>
  )
}