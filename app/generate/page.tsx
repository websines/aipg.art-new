'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GenerationForm } from "./generation-form"
import { ImageCard } from "@/components/image-card"
import { Loader2, RefreshCw } from "lucide-react"
import { type Image } from "@/types"

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentImages, setCurrentImages] = useState<Image[]>([])
  const [generationHistory, setGenerationHistory] = useState<Image[]>([])

  const handleGenerate = async (formData: {
    prompt: string
    seed: number
    model: string
    steps: number
    sampler: string
    cfgScale: number
    width: number
    height: number
    clipSkip: number
    denoisingStrength: number
    karras: boolean
    hiResFix: boolean
    isPublic: boolean
    sourceImage?: File
  }) => {
    setIsGenerating(true)
    // Simulate API call
    setTimeout(() => {
      const newImage: Image = {
        id: Math.random().toString(),
        url: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800/600`,
        prompt: formData.prompt,
        seed: formData.seed,
        size: `${formData.width}x${formData.height}`,
        model: formData.model,
        steps: formData.steps,
        sampler: formData.sampler,
        cfgScale: formData.cfgScale,
        width: formData.width,
        height: formData.height,
        clipSkip: formData.clipSkip,
        denoisingStrength: formData.denoisingStrength,
        karras: formData.karras,
        hiResFix: formData.hiResFix,
        isPublic: formData.isPublic,
        createdAt: new Date(),
        userId: "1",
        likes: 0,
      }
      setCurrentImages([newImage, ...currentImages])
      setGenerationHistory([newImage, ...generationHistory])
      setIsGenerating(false)
    }, 2000)
  }

  const handleRegenerate = (imageId: string) => {
    const image = [...currentImages, ...generationHistory].find(
      (img) => img.id === imageId
    )
    if (image) {
      handleGenerate({
        prompt: image.prompt,
        seed: Math.floor(Math.random() * 1000000),
        model: image.model,
        steps: image.steps,
        sampler: image.sampler,
        cfgScale: image.cfgScale,
        width: image.width,
        height: image.height,
        clipSkip: image.clipSkip,
        denoisingStrength: image.denoisingStrength,
        karras: image.karras,
        hiResFix: image.hiResFix,
        isPublic: image.isPublic,
      })
    }
  }

  return (
    <main className="flex-1 overflow-hidden">
      <div className="container h-full max-w-7xl">
        <div className="grid h-full gap-6 lg:grid-cols-[1fr,400px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Generate Images</h1>
                <p className="text-muted-foreground">
                  Create AI-generated images using different methods
                </p>
              </div>
              <Button
                variant="outline"
                className="lg:hidden"
                onClick={() => document.getElementById("preview-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Preview
              </Button>
            </div>

            <Tabs defaultValue="text2img" className="space-y-6">
              <TabsList className="w-full">
                <TabsTrigger value="text2img" className="flex-1">Text to Image</TabsTrigger>
                <TabsTrigger value="img2img" className="flex-1">Image to Image</TabsTrigger>
                <TabsTrigger value="controlnet" className="flex-1">ControlNet</TabsTrigger>
              </TabsList>
              <TabsContent value="text2img">
                <GenerationForm type="text2img" onSubmit={handleGenerate} />
              </TabsContent>
              <TabsContent value="img2img">
                <GenerationForm type="img2img" onSubmit={handleGenerate} />
              </TabsContent>
              <TabsContent value="controlnet">
                <GenerationForm type="controlnet" onSubmit={handleGenerate} />
              </TabsContent>
            </Tabs>
          </div>

          <Card id="preview-section" className="order-last lg:order-none">
            <div className="sticky top-0">
              <div className="border-b p-4">
                <h2 className="font-semibold">Preview</h2>
              </div>
              <ScrollArea className="h-[calc(100vh-10rem)]">
                <div className="space-y-4">
                  {isGenerating && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  {currentImages.map((image) => (
                    <div key={image.id} className="relative">
                      <ImageCard
                        image={image}
                        onLike={() => {}}
                        onDownload={() => {}}
                        onShare={() => {}}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute right-2 top-2"
                        onClick={() => handleRegenerate(image.id)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {!isGenerating && currentImages.length === 0 && (
                    <div className="flex items-center justify-center py-8">
                      <p className="text-sm text-muted-foreground">
                        Generated images will appear here
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
