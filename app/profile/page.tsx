'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageCard } from "@/components/image-card"

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://picsum.photos/id/1005/400/400",
  bio: "AI art enthusiast and creator",
  images: Array.from({ length: 12 }).map((_, i) => ({
    id: `profile-${i}`,
    url: `https://picsum.photos/id/${i + 200}/800/600`,
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
    likes: Math.floor(Math.random() * 100),
  })),
}

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
  })

  const handleSave = () => {
    setUser({ ...user, ...formData })
    setEditing(false)
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
      <div className="container max-w-7xl space-y-8 p-6">
        <Card>
          <CardHeader className="space-y-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">{user.bio}</p>
              </div>
              <Button
                variant={editing ? "default" : "outline"}
                onClick={() => (editing ? handleSave() : setEditing(true))}
              >
                {editing ? "Save Profile" : "Edit Profile"}
              </Button>
            </div>
          </CardHeader>
          {editing && (
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>
            </CardContent>
          )}
        </Card>

        <Tabs defaultValue="images" className="space-y-6">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="images">
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              {user.images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onLike={handleLike}
                  onDownload={handleDownload}
                  onShare={handleShare}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="stats">
            <Card>
              <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Total Images</h3>
                  <p className="text-3xl font-bold">{user.images.length}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Total Likes</h3>
                  <p className="text-3xl font-bold">
                    {user.images.reduce((acc, img) => acc + img.likes, 0)}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Member Since</h3>
                  <p className="text-3xl font-bold">2024</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
