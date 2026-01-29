"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/src/lib/utils"
import type { BlogPost } from "@/src/types/blog.type" 

interface BlogCardProps {
  post: BlogPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <div>
    <Link
      href={`/blogs/${post.id}`}
      className={cn(
        "group block rounded-xl border bg-card shadow-sm overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden">
        {post.thumbnail? ( <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />) : null}
       
      </div>
   </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h2>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.content}
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag:string) => (
              <span
                key={tag}
                className="text-xs bg-muted px-2 py-1 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span>👁️ {post.views} views</span>
          <span>💬 {post.count?.comments ?? 0} comments</span>
        </div>

        {/* Featured Badge */}
        {post.isFeatured && (
          <span className="inline-block text-[10px] font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
            ⭐ Featured
          </span>
        )}
      </div>
      <Link href={`/blogs/${post.id}`}> <button className="btn bg-teal-600 p-2 rounded-2xl">Read More</button></Link>
    
    </div>
  )
}