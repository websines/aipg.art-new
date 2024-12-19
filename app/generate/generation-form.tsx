'use client'

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { GenerationType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Upload, Image as ImageIcon } from "lucide-react"

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  seed: z.number().int().min(-1),
  model: z.string().min(1, "Model is required"),
  steps: z.number().int().min(1).max(150),
  sampler: z.string().min(1, "Sampler is required"),
  cfgScale: z.number().min(1).max(30),
  width: z.number().int().min(64).max(2048),
  height: z.number().int().min(64).max(2048),
  clipSkip: z.number().int().min(1).max(12),
  denoisingStrength: z.number().min(0).max(1),
  karras: z.boolean(),
  hiResFix: z.boolean(),
  isPublic: z.boolean(),
  postProcessing: z.array(z.string()),
})

const models = ["SDXL 1.0", "SD 1.5"]
const samplers = ["Euler a", "DPM++ 2M Karras"]

interface GenerationFormProps {
  type: GenerationType
  onSubmit: (data: z.infer<typeof formSchema> & { sourceImage?: File }) => void
}

export function GenerationForm({ type, onSubmit }: GenerationFormProps) {
  const [sourceImage, setSourceImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      seed: -1,
      model: models[0],
      steps: 30,
      sampler: samplers[0],
      cfgScale: 7,
      width: 1024,
      height: 1024,
      clipSkip: 1,
      denoisingStrength: 0.7,
      karras: false,
      hiResFix: false,
      isPublic: true,
      postProcessing: [],
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({ ...data, sourceImage: sourceImage || undefined })
  }

  const handleImageDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setSourceImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }, [])

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSourceImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {(type === "img2img" || type === "controlnet") && (
          <Card className="p-6">
            <FormItem>
              <FormLabel>Source Image</FormLabel>
              <FormDescription>
                {type === "img2img"
                  ? "Upload an image to use as a starting point"
                  : "Upload an image to use as a control reference"}
              </FormDescription>
              <div
                className={cn(
                  "mt-2 flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed",
                  "hover:bg-accent/50",
                  sourceImage ? "bg-accent/20" : "bg-background"
                )}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleImageDrop}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {previewUrl ? (
                  <div className="relative aspect-square w-full max-w-[200px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Source"
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="absolute right-2 top-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSourceImage(null)
                        setPreviewUrl(null)
                      }}
                    >
                      ×
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-4 text-center">
                    {type === "img2img" ? (
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                    <p className="text-sm text-muted-foreground">
                      Drag and drop an image here, or click to select
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </FormItem>
          </Card>
        )}

        <Card className="p-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prompt</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your prompt here..."
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {models.map((model) => (
                          <SelectItem key={model} value={model}>
                            {model}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sampler"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sampler</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a sampler" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {samplers.map((sampler) => (
                          <SelectItem key={sampler} value={sampler}>
                            {sampler}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="steps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Steps ({field.value})</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={150}
                      step={1}
                      value={[field.value]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cfgScale"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CFG Scale ({field.value})</FormLabel>
                  <FormControl>
                    <Slider
                      min={1}
                      max={30}
                      step={0.5}
                      value={[field.value]}
                      onValueChange={([value]) => field.onChange(value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {type === "img2img" && (
              <FormField
                control={form.control}
                name="denoisingStrength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Denoising Strength ({field.value})</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={1}
                        step={0.01}
                        value={[field.value]}
                        onValueChange={([value]) => field.onChange(value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="karras"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Karras</FormLabel>
                      <FormDescription>
                        Enable Karras noise scheduling
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hiResFix"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Hi-Res Fix</FormLabel>
                      <FormDescription>
                        Enable high resolution fix
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={
              (type !== "text2img" && !sourceImage) ||
              form.formState.isSubmitting
            }
          >
            Generate
          </Button>
        </div>
      </form>
    </Form>
  )
}
