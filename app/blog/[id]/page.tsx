"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  ChevronUp,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  MoreHorizontal,
  Flag,
  Send,
  Clock,
  Eye,
  ChevronDown,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { BlogCard } from "@/components/blog-card"

// Sample blog post data
const BLOG_POST = {
  id: 1,
  title: "The Future of Web Development: What to Expect in 2025",
  excerpt:
    "Explore the upcoming trends and technologies that will shape the future of web development in the coming years.",
  image: "/placeholder.svg?height=800&width=1600&text=Web+Development+Future",
  category: "Technology",
  author: {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=200&width=200&text=AJ",
    bio: "Senior Frontend Developer with 10+ years of experience. Passionate about creating intuitive user experiences and exploring emerging web technologies.",
    role: "Senior Frontend Developer",
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  date: "May 15, 2023",
  readTime: "8 min read",
  views: 1245,
  likes: 245,
  comments: 32,
  content: `
    <h2>Introduction to Web Development in 2025</h2>
    <p>The landscape of web development is constantly evolving, with new technologies, frameworks, and methodologies emerging at a rapid pace. As we look ahead to 2025, several key trends are poised to reshape how we build and interact with web applications.</p>
    
    <p>From AI-driven development tools to the continued evolution of JavaScript frameworks, the next few years promise exciting advancements that will empower developers to create more powerful, accessible, and user-friendly web experiences.</p>
    
    <h2>AI-Assisted Development</h2>
    <p>Artificial intelligence is already making inroads into the development process, but by 2025, we expect AI to become an indispensable part of a developer's toolkit. AI-powered code completion, bug detection, and even automated testing will significantly increase productivity and code quality.</p>
    
    <blockquote>
      <p>"AI won't replace developers, but developers who use AI will replace those who don't." - This sentiment will become increasingly relevant as AI tools become more sophisticated and integrated into development workflows.</p>
    </blockquote>
    
    <p>We're already seeing the early stages of this with tools like GitHub Copilot, but future iterations will offer more context-aware suggestions and be able to understand project requirements at a deeper level.</p>
    
    <h2>WebAssembly Goes Mainstream</h2>
    <p>WebAssembly (Wasm) has been around for a few years, but by 2025, it will likely become a standard part of web development. As browsers continue to optimize their Wasm implementations and the ecosystem matures, we'll see more applications leveraging Wasm for performance-critical code.</p>
    
    <p>This will enable web applications to run complex computations that were previously only possible in native applications, from advanced graphics processing to scientific simulations.</p>
    
    <h2>The Rise of Edge Computing</h2>
    <p>Edge computing will continue to gain prominence in web development. By moving computation closer to the user, edge functions can significantly reduce latency and improve performance. Frameworks like Next.js are already embracing this approach, and by 2025, we expect edge computing to be a fundamental consideration in application architecture.</p>
    
    <h2>Continued Evolution of JavaScript Frameworks</h2>
    <p>The JavaScript ecosystem will continue to evolve, with frameworks focusing on performance, developer experience, and build optimization. React, Vue, Angular, and Svelte will likely still be major players, but with significant advancements in their capabilities.</p>
    
    <p>We'll also see increased adoption of meta-frameworks like Next.js, Nuxt, and SvelteKit, which provide opinionated solutions for common challenges in web development.</p>
    
    <h2>Accessibility as a Priority</h2>
    <p>Accessibility will no longer be an afterthought but a fundamental aspect of web development. Tools and frameworks will increasingly incorporate accessibility features by default, and developers will have better resources for creating inclusive web experiences.</p>
    
    <p>This shift will be driven both by ethical considerations and by regulatory requirements, as more countries implement strict accessibility standards for web content.</p>
    
    <h2>Conclusion</h2>
    <p>The future of web development is bright, with advancements in AI, WebAssembly, edge computing, and JavaScript frameworks set to empower developers to create faster, more capable, and more accessible web applications.</p>
    
    <p>By staying informed about these trends and continuously learning, developers can position themselves to take full advantage of the opportunities that lie ahead in the ever-evolving world of web development.</p>
  `,
  tags: ["webdev", "javascript", "react", "nextjs", "ai", "technology"],
  tableOfContents: [
    { id: "introduction", title: "Introduction to Web Development in 2025", level: 2 },
    { id: "ai-assisted", title: "AI-Assisted Development", level: 2 },
    { id: "webassembly", title: "WebAssembly Goes Mainstream", level: 2 },
    { id: "edge-computing", title: "The Rise of Edge Computing", level: 2 },
    { id: "javascript-frameworks", title: "Continued Evolution of JavaScript Frameworks", level: 2 },
    { id: "accessibility", title: "Accessibility as a Priority", level: 2 },
    { id: "conclusion", title: "Conclusion", level: 2 },
  ],
}

// Sample comments data
const COMMENTS = [
  {
    id: 1,
    author: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=100&width=100&text=SW",
    },
    content:
      "This is a really insightful article! I'm particularly excited about the potential of WebAssembly. Do you think it will completely replace JavaScript for certain use cases?",
    date: "May 16, 2023",
    likes: 12,
    dislikes: 0,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: 11,
        author: {
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=100&width=100&text=AJ",
          isAuthor: true,
        },
        content:
          "Thanks for your comment, Sarah! I don't think WebAssembly will replace JavaScript entirely, but rather complement it. JavaScript will still be the primary language for most web development, but WebAssembly will enable performance-critical parts of applications to run at near-native speed.",
        date: "May 16, 2023",
        likes: 8,
        dislikes: 0,
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
  {
    id: 2,
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
    },
    content:
      "Great article! I'm curious about your thoughts on the future of CSS. With the rise of utility-first frameworks like Tailwind, do you see traditional CSS methodologies becoming less relevant?",
    date: "May 17, 2023",
    likes: 8,
    dislikes: 1,
    isLiked: false,
    isDisliked: false,
    replies: [],
  },
  {
    id: 3,
    author: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100&text=ER",
    },
    content:
      "I'm skeptical about AI-assisted development. While it can certainly help with boilerplate code, I worry about developers becoming too reliant on these tools and losing a deeper understanding of the code they're writing. What are your thoughts on this potential downside?",
    date: "May 18, 2023",
    likes: 15,
    dislikes: 3,
    isLiked: false,
    isDisliked: false,
    replies: [
      {
        id: 31,
        author: {
          name: "David Kumar",
          avatar: "/placeholder.svg?height=100&width=100&text=DK",
        },
        content:
          "I share your concerns, Emily. I think it's important for developers to use AI as a tool to enhance their capabilities, not as a replacement for understanding fundamental concepts. Education will need to adapt to ensure developers still learn the core principles.",
        date: "May 18, 2023",
        likes: 10,
        dislikes: 0,
        isLiked: false,
        isDisliked: false,
      },
      {
        id: 32,
        author: {
          name: "Alex Johnson",
          avatar: "/placeholder.svg?height=100&width=100&text=AJ",
          isAuthor: true,
        },
        content:
          "That's a valid concern, Emily. I think the key is to use AI tools thoughtfully. They're great for handling repetitive tasks and suggesting optimizations, but developers should still understand what the code is doing and why. It's similar to how calculators didn't eliminate the need to understand math concepts.",
        date: "May 19, 2023",
        likes: 12,
        dislikes: 1,
        isLiked: false,
        isDisliked: false,
      },
    ],
  },
]

// Sample related posts
const RELATED_POSTS = [
  {
    id: 2,
    title: "Getting Started with WebAssembly in 2023",
    excerpt: "A beginner-friendly guide to incorporating WebAssembly into your web projects.",
    image: "/placeholder.svg?height=400&width=600&text=WebAssembly",
    category: "Technology",
    author: {
      name: "David Kumar",
      avatar: "/placeholder.svg?height=100&width=100&text=DK",
    },
    date: "April 28, 2023",
    readTime: "10 min read",
  },
  {
    id: 3,
    title: "The State of JavaScript Frameworks in 2023",
    excerpt: "An overview of the most popular JavaScript frameworks and their current status.",
    image: "/placeholder.svg?height=400&width=600&text=JS+Frameworks",
    category: "Technology",
    author: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=100&width=100&text=SW",
    },
    date: "May 5, 2023",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    excerpt: "Best practices and tools for ensuring your web applications are accessible to all users.",
    image: "/placeholder.svg?height=400&width=600&text=Accessibility",
    category: "Technology",
    author: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100&text=ER",
    },
    date: "May 10, 2023",
    readTime: "9 min read",
  },
  {
    id: 5,
    title: "Edge Computing for Web Developers",
    excerpt: "How to leverage edge computing to improve the performance of your web applications.",
    image: "/placeholder.svg?height=400&width=600&text=Edge+Computing",
    category: "Technology",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
    },
    date: "May 12, 2023",
    readTime: "8 min read",
  },
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(COMMENTS)
  const [commentSort, setCommentSort] = useState<"newest" | "oldest" | "popular">("newest")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")
  const [showShareOptions, setShowShareOptions] = useState(false)

  const articleRef = useRef<HTMLElement>(null)
  const commentsRef = useRef<HTMLDivElement>(null)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button after scrolling down
      setShowBackToTop(window.scrollY > 500)

      // Calculate reading progress
      if (articleRef.current) {
        const totalHeight = articleRef.current.scrollHeight - window.innerHeight
        const scrollPosition = window.scrollY
        const progress = Math.min((scrollPosition / totalHeight) * 100, 100)
        setReadingProgress(progress)
      }

      // Update active section based on scroll position
      if (articleRef.current) {
        const headings = articleRef.current.querySelectorAll("h2")

        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i]
          const rect = heading.getBoundingClientRect()

          if (rect.top <= 100) {
            setActiveSection(heading.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section when clicking on table of contents
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Scroll to comments
  const scrollToComments = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: comments.length + 1,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=100&width=100&text=You",
      },
      content: commentText,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisliked: false,
      replies: [],
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  // Handle reply submission
  const handleReplySubmit = (commentId: number) => {
    if (!replyText.trim()) return

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              author: {
                name: "You",
                avatar: "/placeholder.svg?height=100&width=100&text=You",
              },
              content: replyText,
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              likes: 0,
              dislikes: 0,
              isLiked: false,
              isDisliked: false,
            },
          ],
        }
      }
      return comment
    })

    setComments(updatedComments)
    setReplyText("")
    setReplyingTo(null)
  }

  // Handle comment like/dislike
  const handleCommentReaction = (commentId: number, replyId: number | null, action: "like" | "dislike") => {
    const updatedComments = comments.map((comment) => {
      if (replyId === null && comment.id === commentId) {
        // Handle main comment reaction
        if (action === "like") {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes,
            isLiked: !comment.isLiked,
            isDisliked: false,
          }
        } else {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes,
            dislikes: comment.isDisliked ? comment.dislikes - 1 : comment.dislikes + 1,
            isLiked: false,
            isDisliked: !comment.isDisliked,
          }
        }
      } else if (replyId !== null) {
        // Handle reply reaction
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id === replyId) {
              if (action === "like") {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                  dislikes: reply.isDisliked ? reply.dislikes - 1 : reply.dislikes,
                  isLiked: !reply.isLiked,
                  isDisliked: false,
                }
              } else {
                return {
                  ...reply,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes,
                  dislikes: reply.isDisliked ? reply.dislikes - 1 : reply.dislikes + 1,
                  isLiked: false,
                  isDisliked: !reply.isDisliked,
                }
              }
            }
            return reply
          }),
        }
      }
      return comment
    })

    setComments(updatedComments)
  }

  // Sort comments
  const sortedComments = [...comments].sort((a, b) => {
    if (commentSort === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (commentSort === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else {
      return b.likes - a.likes
    }
  })

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setShowShareOptions(false)
    // You could add a toast notification here
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Article Header */}
        <header className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <Image
            src={BLOG_POST.image || "/placeholder.svg"}
            alt={BLOG_POST.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Badge className="mb-4">{BLOG_POST.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-4xl">{BLOG_POST.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {BLOG_POST.readTime}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {BLOG_POST.views} views
                </div>
                <time dateTime="2023-05-15">{BLOG_POST.date}</time>
              </div>

              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={BLOG_POST.author.avatar || "/placeholder.svg"} alt={BLOG_POST.author.name} />
                  <AvatarFallback>{BLOG_POST.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{BLOG_POST.author.name}</div>
                  <div className="text-sm text-muted-foreground">{BLOG_POST.author.role}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Desktop */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-24 self-start">
              <div className="border rounded-lg p-5">
                <h3 className="font-medium mb-3">Table of Contents</h3>
                <nav>
                  <ul className="space-y-2 text-sm">
                    {BLOG_POST.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={cn(
                            "text-left w-full hover:text-primary transition-colors",
                            activeSection === item.id ? "text-primary font-medium" : "text-muted-foreground",
                            item.level === 3 && "pl-4",
                          )}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Article Content */}
            <article
              ref={articleRef}
              className="lg:col-span-7 prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: BLOG_POST.content }}
            />

            {/* Interaction Sidebar */}
           <aside className="hidden lg:block lg:col-span-2 sticky top-24 self-start">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className="bg-primary h-1 rounded-full transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>

                <div className="flex items-center gap-2 ml-7">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "rounded-full transition-all duration-300",
                            isLiked && "text-primary bg-primary/10"
                          )}
                          onClick={() => setIsLiked(!isLiked)}
                        >
                          <Heart className={cn(isLiked && "fill-primary")} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isLiked ? "Unlike" : "Like"} this article</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-sm text-muted-foreground">
                    {BLOG_POST.likes}
                  </span>
                </div>

                <div className="flex items-center gap-2 ml-6">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={scrollToComments}
                        >
                          <MessageSquare />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View comments</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-sm text-muted-foreground">
                    {BLOG_POST.comments}
                  </span>
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "rounded-full transition-all duration-300",
                          isSaved && "text-primary bg-primary/10"
                        )}
                        onClick={() => setIsSaved(!isSaved)}
                      >
                        <Bookmark className={cn(isSaved && "fill-primary")} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isSaved ? "Remove from" : "Save to"} bookmarks</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="relative">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() => setShowShareOptions(!showShareOptions)}
                        >
                          <Share2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share this article</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {showShareOptions && (
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover border rounded-lg shadow-lg p-2 w-40">
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                        >
                          <Facebook className="w-4 h-4 mr-2" />
                          Facebook
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="justify-start"
                          onClick={copyLinkToClipboard}
                        >
                          <Link2 className="w-4 h-4 mr-2" />
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {BLOG_POST.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Mobile Interaction Bar */}
          <div className="lg:hidden flex justify-between items-center mt-8 border-t border-b py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full", isLiked && "text-primary")}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={cn(isLiked && "fill-primary")} />
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full" onClick={scrollToComments}>
                <MessageSquare />
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-full", isSaved && "text-primary")}
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark className={cn(isSaved && "fill-primary")} />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Share2 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copyLinkToClipboard}>
                    <Link2 className="w-4 h-4 mr-2" />
                    Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Author Bio Card */}
          <div className="mt-12 border rounded-lg p-6 bg-muted/30">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={BLOG_POST.author.avatar || "/placeholder.svg"} alt={BLOG_POST.author.name} />
                <AvatarFallback>{BLOG_POST.author.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-1">{BLOG_POST.author.name}</h3>
                <p className="text-muted-foreground mb-3">{BLOG_POST.author.role}</p>
                <p className="mb-4">{BLOG_POST.author.bio}</p>

                <div className="flex justify-center md:justify-start items-center gap-4">
                  <Link href={BLOG_POST.author.social.twitter} className="text-muted-foreground hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link href={BLOG_POST.author.social.github} className="text-muted-foreground hover:text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </Link>
                  <Link href={BLOG_POST.author.social.linkedin} className="text-muted-foreground hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              <Button className="md:self-center">Follow Author</Button>
            </div>
          </div>

          {/* Comments Section */}
          <div ref={commentsRef} className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    Sort by: {commentSort === "newest" ? "Newest" : commentSort === "oldest" ? "Oldest" : "Most Liked"}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setCommentSort("newest")}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCommentSort("oldest")}>Oldest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCommentSort("popular")}>Most Liked</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Comment Composer */}
            <div className="mb-8">
              <Textarea
                placeholder="Add a comment..."
                className="mb-4 min-h-24"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end">
                <Button onClick={handleCommentSubmit} disabled={!commentText.trim()}>
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {sortedComments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-5">
                  <div className="flex justify-between">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{comment.author.name}</div>
                        <div className="text-xs text-muted-foreground">{comment.date}</div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Flag className="w-4 h-4 mr-2" />
                          Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <p className="mb-4">{comment.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn("text-xs gap-1", comment.isLiked && "text-primary")}
                        onClick={() => handleCommentReaction(comment.id, null, "like")}
                      >
                        <ThumbsUp className={cn("h-3.5 w-3.5", comment.isLiked && "fill-primary")} />
                        {comment.likes}
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn("text-xs gap-1", comment.isDisliked && "text-destructive")}
                        onClick={() => handleCommentReaction(comment.id, null, "dislike")}
                      >
                        <ThumbsDown className={cn("h-3.5 w-3.5", comment.isDisliked && "fill-destructive")} />
                        {comment.dislikes}
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      Reply
                    </Button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 pl-4 border-l-2">
                      <Textarea
                        placeholder="Write a reply..."
                        className="mb-2 min-h-20"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleReplySubmit(comment.id)} disabled={!replyText.trim()}>
                          <Send className="h-3.5 w-3.5 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 pl-4 border-l-2 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="pt-4">
                          <div className="flex justify-between">
                            <div className="flex items-center mb-2">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={reply.author.avatar || "/placeholder.svg"} alt={reply.author.name} />
                                <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium flex items-center">
                                  {reply.author.name}
                                  {reply.author.isAuthor && (
                                    <Badge variant="outline" className="ml-2 text-xs py-0">
                                      Author
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">{reply.date}</div>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Flag className="w-4 h-4 mr-2" />
                                  Report
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <p className="mb-2">{reply.content}</p>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn("text-xs gap-1", reply.isLiked && "text-primary")}
                              onClick={() => handleCommentReaction(comment.id, reply.id, "like")}
                            >
                              <ThumbsUp className={cn("h-3.5 w-3.5", reply.isLiked && "fill-primary")} />
                              {reply.likes}
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn("text-xs gap-1", reply.isDisliked && "text-destructive")}
                              onClick={() => handleCommentReaction(comment.id, reply.id, "dislike")}
                            >
                              <ThumbsDown className={cn("h-3.5 w-3.5", reply.isDisliked && "fill-destructive")} />
                              {reply.dislikes}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also enjoy</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {RELATED_POSTS.map((post) => (
                <BlogCard
                  key={post.id}
                  image={post.image}
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.date}
                  readTime={post.readTime}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg transition-all duration-300 hover:bg-primary/90 z-50"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}

      <Footer />
    </div>
  )
}
