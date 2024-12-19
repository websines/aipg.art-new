'use client'

import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ScrollArea } from "./ui/scroll-area"

interface Comment {
  id: string
  content: string
  user: {
    name: string
    image?: string
  }
  createdAt: Date
}

export function ImageComments({ imageId }: { imageId: string }) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    // In a real app, this would be an API call
    setComments([
      ...comments,
      {
        id: Math.random().toString(),
        content: newComment,
        user: {
          name: "User",
        },
        createdAt: new Date(),
      },
    ])
    setNewComment("")
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Comments</h3>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.user.image} />
                <AvatarFallback>
                  {comment.user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
        />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  )
}
