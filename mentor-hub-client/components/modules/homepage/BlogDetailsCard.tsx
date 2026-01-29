"use client"


import { Badge } from "@/src/components/ui/badge"
import { Card, CardContent } from "@/src/components/ui/card"
import { Separator } from "@/src/components/ui/separator"
import { cn } from "@/src/lib/utils"
import { BlogDetailsTypes } from "@/src/types"
import Image from "next/image"

export function BlogDetailsCard({ post, className }: BlogDetailsTypes) {
  return (
    <Card className={cn("w-full max-w-3xl mx-auto p-6 space-y-6", className)}>
     {/* Thumbnail */}
      {post.thumbanail ? (
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          
          <Image
            src={post.thumbanail }
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      ): null}

      {/* Title + Featured */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{post.title}</h1>

        {post.isFeatured && (
          <Badge className="bg-primary/15 text-primary font-semibold">
            ⭐ Featured
          </Badge>
        )}
      </div>

      {/* Meta Info */}
      <div className="text-sm text-muted-foreground flex items-center gap-4">
        <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
        <span>👁️ {post.views} views</span>
        <span>💬 {post._count.comments} comments</span>
      </div>

      <Separator />

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-1">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Content */}
      <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
        <p>{post.content}</p>
      </CardContent>

      <Separator />

      {/* Comments */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Comments ({post._count.comments})</h2>

        {post.comments.length === 0 && (
          <p className="text-muted-foreground text-sm">No comments yet.</p>
        )}

        {post.comments.map((comment) => (
          <div
            key={comment.id}
            className="border rounded-lg p-3 bg-muted/30"
          >
            <p className="text-sm">{comment.content}</p>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}