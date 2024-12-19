'use client'

import Image from "next/image"
import { Heart, Download, Share2, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
      <DialogContent className="max-h-[95vh] max-w-5xl gap-0 overflow-hidden p-0 md:h-[80vh]">
        <DialogHeader className="absolute right-4 top-4 z-50 flex-row justify-end space-y-0 bg-transparent p-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="grid h-full grid-cols-1 md:grid-cols-[1.2fr,1fr]">
          <div className="relative flex aspect-square items-center justify-center bg-muted md:aspect-auto">
            <Image
              src={image.url}
              alt={image.prompt}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex max-h-[50vh] flex-col overflow-hidden border-t md:max-h-full md:border-l md:border-t-0">
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
            <ScrollArea className="flex-1">
              <div className="space-y-6 p-6">
                <div>
                  <h3 className="mb-2 font-semibold">Prompt</h3>
                  <p className="text-sm text-muted-foreground">{image.prompt}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Model</h3>
                    <p className="text-sm text-muted-foreground">{image.model}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Sampler</h3>
                    <p className="text-sm text-muted-foreground">
                      {image.sampler}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Size</h3>
                    <p className="text-sm text-muted-foreground">
                      {image.width} × {image.height}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Steps</h3>
                    <p className="text-sm text-muted-foreground">{image.steps}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">CFG Scale</h3>
                    <p className="text-sm text-muted-foreground">
                      {image.cfgScale}
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">Seed</h3>
                    <p className="text-sm text-muted-foreground">{image.seed}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <h3 className="mb-4 font-semibold">Comments</h3>
                  <ImageComments />
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
