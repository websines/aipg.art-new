'use client'

import Image from "next/image"
import { Heart, Download, Share2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { ScrollArea } from "./ui/scroll-area"
import { cn } from "@/lib/utils"
import { type Image as ImageType } from "@/types"
import { ImageComments } from "./image-comments"

interface ImageModalProps {
  image: ImageType
  open: boolean
  onOpenChange: (open: boolean) => void
  onLike: (e: React.MouseEvent) => void
  onDownload: (e: React.MouseEvent) => void
  onShare: (e: React.MouseEvent) => void
  isLiked: boolean
}

export function ImageModal({
  image,
  open,
  onOpenChange,
  onLike,
  onDownload,
  onShare,
  isLiked,
}: ImageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl gap-0 p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Image Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square">
            <Image
              src={image.url}
              alt={image.prompt}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                  onClick={onLike}
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isLiked ? "fill-red-500 text-red-500" : ""
                    )}
                  />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                  onClick={onDownload}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full"
                  onClick={onShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Prompt</h3>
                  <p className="text-sm text-muted-foreground">{image.prompt}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Model</h3>
                    <p className="text-sm text-muted-foreground">{image.model}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Sampler</h3>
                    <p className="text-sm text-muted-foreground">
                      {image.sampler}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Size</h3>
                    <p className="text-sm text-muted-foreground">
                      {image.width} x {image.height}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Steps</h3>
                    <p className="text-sm text-muted-foreground">{image.steps}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">CFG Scale</h3>
                    <p className="text-sm text-muted-foreground">
                      {image.cfgScale}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Seed</h3>
                    <p className="text-sm text-muted-foreground">{image.seed}</p>
                  </div>
                </div>
                <Separator />
                <ImageComments imageId={image.id} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
