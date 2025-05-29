import Image from "next/image"
import Link from "next/link"
import { Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  image: string
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

export function BlogCard({ image, title, excerpt, author, date, readTime, className }: BlogCardProps) {
  return (
    <Link href="/blog/post-slug">
      <Card
        className={cn(
          "overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          className,
        )}
      >
        <div className="aspect-video relative">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <CardContent className="p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium">{author.name}</p>
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
