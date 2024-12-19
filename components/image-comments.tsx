'use client'

import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: string
  text: string
  user: string
  createdAt: Date
}

export function ImageComments() {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])

  const handleAddComment = (comment: string) => {
    if (!comment.trim()) return
    setComments([
      ...comments,
      {
        id: Math.random().toString(),
        text: comment,
        user: "John Doe",
        createdAt: new Date(),
      },
    ])
    setNewComment("")
  }

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarFallback>
                  {comment.user[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{comment.user}</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={(e) => { e.preventDefault(); handleAddComment(newComment); }} className="flex gap-2">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Post</Button>
      </form>
    </div>
  )
}
