'use client'

import { useState } from "react"
import { ImageCard } from "@/components/image-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { type Image } from "@/types"

// Mock data for testing
const mockGeneratedImages: Image[] = Array.from({ length: 15 }).map((_, i) => ({
  id: `generated-${i}`,
  url: `https://picsum.photos/id/${i + 400}/800/600`,
  prompt: "A futuristic cityscape at night",
  seed: Math.floor(Math.random() * 1000000),
  size: "512x512",
  model: i % 2 === 0 ? "SDXL 1.0" : "SD 1.5",
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
  createdAt: new Date(Date.now() - Math.random() * 10000000000),
  userId: "1",
  likes: Math.floor(Math.random() * 50),
}))

const sortOptions = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Most Liked", value: "likes" },
]

const modelOptions = ["All Models", "SDXL 1.0", "SD 1.5"]

export default function GeneratedPage() {
  const [images, setImages] = useState<Image[]>(mockGeneratedImages)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [selectedModel, setSelectedModel] = useState("All Models")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterAndSortImages(query, sortBy, selectedModel)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    filterAndSortImages(searchQuery, value, selectedModel)
  }

  const handleModelChange = (value: string) => {
    setSelectedModel(value)
    filterAndSortImages(searchQuery, sortBy, value)
  }

  const filterAndSortImages = (query: string, sort: string, model: string) => {
    let filtered = [...mockGeneratedImages]

    // Apply search filter
    if (query) {
      filtered = filtered.filter((image) =>
        image.prompt.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Apply model filter
    if (model !== "All Models") {
      filtered = filtered.filter((image) => image.model === model)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sort) {
        case "oldest":
          return a.createdAt.getTime() - b.createdAt.getTime()
        case "likes":
          return b.likes - a.likes
        case "newest":
        default:
          return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })

    setImages(filtered)
  }

  const handleLike = (imageId: string) => {
    console.log("Like image:", imageId)
  }

  const handleDownload = (imageId: string) => {
    console.log("Download image:", imageId)
  }

  const handleShare = (imageId: string) => {
    console.log("Share image:", imageId)
  }

  return (
    <main className="flex-1 overflow-auto">
      <div className="container max-w-7xl space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold">Generated Images</h1>
          <p className="text-muted-foreground">
            View and manage your AI-generated images
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search images..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Select value={selectedModel} onValueChange={handleModelChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
              <p className="text-muted-foreground">No images found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
