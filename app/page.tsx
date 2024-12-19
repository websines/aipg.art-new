'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { ImageCard } from "@/components/image-card"
import { type Image } from "@/types"

// Mock data for testing
const mockImages: Image[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i.toString(),
  url: `https://picsum.photos/id/${i + 100}/800/600`,
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
  likes: 0,
}))

export default function HomePage() {
  const [images, setImages] = useState<Image[]>(mockImages)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // In a real app, this would be an API call
    const filtered = mockImages.filter((image) =>
      image.prompt.toLowerCase().includes(query.toLowerCase())
    )
    setImages(filtered)
  }

  const handleLike = (imageId: string) => {
    // In a real app, this would be an API call
    console.log("Like image:", imageId)
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
    <main className="flex-1 overflow-auto">
      <div className="container max-w-7xl space-y-6 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
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
        </div>
      </div>
    </main>
  )
}
