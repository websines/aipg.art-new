'use client'

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { type Collection } from "@/types"

// Mock data for testing
const mockCollections: Collection[] = [
  {
    id: "1",
    name: "Landscapes",
    userId: "1",
    images: Array.from({ length: 4 }).map((_, i) => ({
      id: `landscape-${i}`,
      url: `https://picsum.photos/seed/${i + 200}/800/600`,
      prompt: "A beautiful landscape",
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
    })),
  },
  {
    id: "2",
    name: "Portraits",
    userId: "1",
    images: Array.from({ length: 3 }).map((_, i) => ({
      id: `portrait-${i}`,
      url: `https://picsum.photos/seed/${i + 300}/800/600`,
      prompt: "A portrait",
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
    })),
  },
]

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(mockCollections)
  const [showNewCollectionDialog, setShowNewCollectionDialog] = useState(false)
  const [newCollectionName, setNewCollectionName] = useState("")

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return

    // In a real app, this would be an API call
    const newCollection: Collection = {
      id: Math.random().toString(),
      name: newCollectionName,
      userId: "1",
      images: [],
    }

    setCollections([...collections, newCollection])
    setNewCollectionName("")
    setShowNewCollectionDialog(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Collections</h1>
          <p className="text-muted-foreground">
            Organize your images into collections
          </p>
        </div>
        <Button onClick={() => setShowNewCollectionDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Collection
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Card key={collection.id}>
            <CardHeader>
              <CardTitle>{collection.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                {collection.images[0] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={collection.images[0].url}
                    alt={collection.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                {collection.images.length} images
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={showNewCollectionDialog}
        onOpenChange={setShowNewCollectionDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
            <DialogDescription>
              Give your collection a name to get started
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Collection name"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewCollectionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCollection}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
