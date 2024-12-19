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
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {comment.user[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{comment.user}</span>
                  <span className="text-xs text-muted-foreground">
                    {comment.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{comment.text}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </ScrollArea>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddComment(newComment)
        }}
        className="flex gap-2"
      >
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px] flex-1 resize-none"
        />
        <Button type="submit" className="shrink-0">
          Post
        </Button>
      </form>
    </div>
  )
}
