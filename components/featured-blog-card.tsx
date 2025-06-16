import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FeaturedBlogCardProps {
  image: string
  category: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
  date: string
  readTime: string
  className?: string
}

export function FeaturedBlogCard({
  image,
  category,
  title,
  excerpt,
  author,
  date,
  readTime,
  className,
}: FeaturedBlogCardProps) {
  return (
    <Link href="/blog/post-slug">
      <Card
        className={cn(
          "overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          className,
        )}
      >
        <div className="aspect-[16/10] relative">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <Badge className="absolute top-4 left-4 z-10">{category}</Badge>
        </div>
        <CardContent className="p-6">
          <h3 className="font-bold text-xl mb-3 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground mb-5 line-clamp-3">{excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">{author.name}</p>
                <p className="text-xs text-muted-foreground">{date}</p>
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              {readTime}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
