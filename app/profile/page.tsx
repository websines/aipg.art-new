'use client'

import { useState } from "react"
import { type Image } from "@/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageCard } from "@/components/image-card"
import { PageHeader } from "@/components/page-header"

// Mock user data
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "",
}

// Mock images
const mockImages: Image[] = []

export default function ProfilePage() {
  const [user] = useState(mockUser)
  const [images] = useState<Image[]>(mockImages)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        description="Manage your account settings and view your images"
        breadcrumbs={[{ title: "Profile" }]}
      />
      <div className="flex flex-col gap-8">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Edit Profile
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="images" className="space-y-6">
          <TabsList>
            <TabsTrigger value="images">Your Images</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="images" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onLike={() => {}}
                  onDownload={() => {}}
                  onShare={() => {}}
                />
              ))}
              {images.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-sm text-muted-foreground">
                    You haven&apos;t created any images yet
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Account settings coming soon...
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
