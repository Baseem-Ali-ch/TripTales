"use client"

import { useState, useEffect } from "react"
import { Search, ChevronDown, Grid, List, Filter, X, Loader2, Heart, Bookmark } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample blog data
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Web Development: What to Expect in 2025",
    excerpt:
      "Explore the upcoming trends and technologies that will shape the future of web development in the coming years.",
    image: "/placeholder.svg?height=600&width=800&text=Web+Development",
    category: "Technology",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100&text=AJ",
    },
    date: "May 15, 2023",
    readTime: "8 min read",
    likes: 245,
    isFeatured: true,
    tags: ["webdev", "javascript", "react", "nextjs"],
  },
  {
    id: 2,
    title: "Exploring the Hidden Beaches of Thailand",
    excerpt:
      "Discover the most beautiful and secluded beaches that Thailand has to offer, away from the tourist crowds.",
    image: "/placeholder.svg?height=600&width=800&text=Thailand+Beaches",
    category: "Travel",
    author: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=100&width=100&text=SW",
    },
    date: "April 28, 2023",
    readTime: "6 min read",
    likes: 189,
    isFeatured: false,
    tags: ["travel", "thailand", "beaches", "vacation"],
  },
  {
    id: 3,
    title: "Mindfulness Practices for Busy Professionals",
    excerpt: "Learn how to incorporate mindfulness into your daily routine even with a packed schedule.",
    image: "/placeholder.svg?height=600&width=800&text=Mindfulness",
    category: "Lifestyle",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100&text=MC",
    },
    date: "May 5, 2023",
    readTime: "5 min read",
    likes: 132,
    isFeatured: false,
    tags: ["mindfulness", "wellness", "productivity", "health"],
  },
  {
    id: 4,
    title: "Understanding Blockchain Technology: A Beginner's Guide",
    excerpt:
      "A comprehensive introduction to blockchain technology and its potential applications beyond cryptocurrency.",
    image: "/placeholder.svg?height=600&width=800&text=Blockchain",
    category: "Technology",
    author: {
      name: "David Kumar",
      avatar: "/placeholder.svg?height=100&width=100&text=DK",
    },
    date: "May 10, 2023",
    readTime: "10 min read",
    likes: 210,
    isFeatured: true,
    tags: ["blockchain", "crypto", "technology", "web3"],
  },
  {
    id: 5,
    title: "Plant-Based Diet: Benefits and Getting Started",
    excerpt:
      "Discover the health and environmental benefits of a plant-based diet and tips for transitioning smoothly.",
    image: "/placeholder.svg?height=600&width=800&text=Plant+Based+Diet",
    category: "Health",
    author: {
      name: "Emma Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100&text=ER",
    },
    date: "April 22, 2023",
    readTime: "7 min read",
    likes: 178,
    isFeatured: false,
    tags: ["diet", "vegan", "health", "nutrition"],
  },
  {
    id: 6,
    title: "Mastering Photography with Your Smartphone",
    excerpt: "Professional tips and tricks to take stunning photos using just your smartphone camera.",
    image: "/placeholder.svg?height=600&width=800&text=Smartphone+Photography",
    category: "Photography",
    author: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=100&width=100&text=JW",
    },
    date: "May 8, 2023",
    readTime: "9 min read",
    likes: 156,
    isFeatured: false,
    tags: ["photography", "smartphone", "tips", "creative"],
  },
  {
    id: 7,
    title: "The Psychology of Color in Marketing",
    excerpt: "How different colors affect consumer behavior and how to use this knowledge in your marketing strategy.",
    image: "/placeholder.svg?height=600&width=800&text=Color+Psychology",
    category: "Marketing",
    author: {
      name: "Olivia Parker",
      avatar: "/placeholder.svg?height=100&width=100&text=OP",
    },
    date: "May 12, 2023",
    readTime: "8 min read",
    likes: 142,
    isFeatured: false,
    tags: ["marketing", "psychology", "design", "branding"],
  },
  {
    id: 8,
    title: "Sustainable Travel: Reducing Your Carbon Footprint",
    excerpt:
      "Practical ways to make your travel experiences more environmentally friendly without sacrificing enjoyment.",
    image: "/placeholder.svg?height=600&width=800&text=Sustainable+Travel",
    category: "Travel",
    author: {
      name: "Thomas Green",
      avatar: "/placeholder.svg?height=100&width=100&text=TG",
    },
    date: "April 30, 2023",
    readTime: "6 min read",
    likes: 124,
    isFeatured: false,
    tags: ["travel", "sustainability", "eco-friendly", "environment"],
  },
  {
    id: 9,
    title: "Introduction to Artificial Intelligence and Machine Learning",
    excerpt: "A beginner-friendly overview of AI and ML concepts, applications, and future potential.",
    image: "/placeholder.svg?height=600&width=800&text=AI+and+ML",
    category: "Technology",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=100&width=100&text=PS",
    },
    date: "May 18, 2023",
    readTime: "11 min read",
    likes: 267,
    isFeatured: true,
    tags: ["ai", "machinelearning", "technology", "datascience"],
  },
]

// All available categories
const CATEGORIES = ["All", "Technology", "Travel", "Lifestyle", "Health", "Photography", "Marketing"]

// All available tags
const TAGS = [
  "webdev",
  "javascript",
  "react",
  "nextjs",
  "travel",
  "thailand",
  "beaches",
  "vacation",
  "mindfulness",
  "wellness",
  "productivity",
  "health",
  "blockchain",
  "crypto",
  "technology",
  "web3",
  "diet",
  "vegan",
  "nutrition",
  "photography",
  "smartphone",
  "tips",
  "creative",
  "marketing",
  "psychology",
  "design",
  "branding",
  "sustainability",
  "eco-friendly",
  "environment",
  "ai",
  "machinelearning",
  "datascience",
]

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("Latest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [visiblePosts, setVisiblePosts] = useState(6)
  const [loading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)

  // Filter posts based on search, category, and tags
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags.includes(tag))

    return matchesSearch && matchesCategory && matchesTags
  })

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortOption === "Latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else if (sortOption === "Oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else if (sortOption === "Most Popular") {
      return b.likes - a.likes
    }
    return 0
  })

  // Posts to display
  const displayedPosts = sortedPosts.slice(0, visiblePosts)

  // Load more posts
  const loadMorePosts = () => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const newVisiblePosts = visiblePosts + 3
      setVisiblePosts(newVisiblePosts)

      if (newVisiblePosts >= filteredPosts.length) {
        setAllPostsLoaded(true)
      }

      setLoading(false)
    }, 1000)
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSortOption("Latest")
    setSelectedTags([])
  }

  // Check if filters are active
  const filtersActive = searchQuery !== "" || selectedCategory !== "All" || selectedTags.length > 0

  // Update allPostsLoaded when filters change
  useEffect(() => {
    setAllPostsLoaded(visiblePosts >= filteredPosts.length)
  }, [filteredPosts.length, visiblePosts])

  // Reset visible posts when filters change
  useEffect(() => {
    setVisiblePosts(6)
    setAllPostsLoaded(false)
  }, [searchQuery, selectedCategory, selectedTags, sortOption])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover insightful articles, tutorials, and stories from our community of writers and experts.
            </p>
          </div>
        </section>

        {/* Quick Filter Tags */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center overflow-x-auto pb-2 scrollbar-hide">
              {TAGS.slice(0, 12).map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={cn(
                    "mr-2 cursor-pointer whitespace-nowrap",
                    selectedTags.includes(tag) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => toggleTag(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Filter and Search Section */}
        <section className="py-6 sticky top-16 z-30 bg-background border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-1 w-full md:w-auto items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-9 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearchQuery("")}>
                      <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>

                {filtersActive && (
                  <Button variant="ghost" size="sm" onClick={resetFilters} className="hidden md:flex">
                    Reset
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 md:flex-none justify-between">
                      <span className="flex items-center">
                        <Filter className="mr-2 h-4 w-4" />
                        {selectedCategory}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {CATEGORIES.map((category) => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={cn(selectedCategory === category && "bg-muted")}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex-1 md:flex-none justify-between">
                      <span>{sortOption}</span>
                      <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setSortOption("Latest")}>Latest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("Most Popular")}>Most Popular</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption("Oldest")}>Oldest</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-none rounded-l-md", viewMode === "grid" && "bg-muted")}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-none rounded-r-md", viewMode === "list" && "bg-muted")}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {filtersActive && (
              <div className="flex items-center mt-4 flex-wrap gap-2">
                {selectedCategory !== "All" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory("All")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    #{tag}
                    <button onClick={() => toggleTag(tag)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}

                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <button onClick={() => setSearchQuery("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                <Button variant="ghost" size="sm" onClick={resetFilters} className="md:hidden">
                  Reset All
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {displayedPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
                )}
              >
                {displayedPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Load More Section */}
            {!allPostsLoaded && displayedPosts.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button onClick={loadMorePosts} disabled={loading} size="lg" className="min-w-[150px]">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}

            {allPostsLoaded && displayedPosts.length > 0 && (
              <div className="text-center mt-12 text-muted-foreground">No more posts to load</div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

interface BlogPostCardProps {
  post: (typeof BLOG_POSTS)[0]
  viewMode: "grid" | "list"
}

function BlogPostCard({ post, viewMode }: BlogPostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  return (
    <Link href={`/blog/${post.id}`}>
      <article
        className={cn(
          "group relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
          post.isFeatured && viewMode === "grid" && "md:col-span-2",
          viewMode === "list" && "flex flex-col md:flex-row",
        )}
      >
        {post.isFeatured && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-primary text-primary-foreground">Featured</Badge>
          </div>
        )}

        <div className={cn("relative", viewMode === "grid" ? "aspect-video w-full" : "aspect-video w-full md:w-1/3")}>
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className={cn("flex flex-col p-5", viewMode === "list" && "md:w-2/3")}>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-card">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>

          <h3
            className={cn(
              "font-bold line-clamp-2 group-hover:text-primary transition-colors",
              viewMode === "grid" ? "text-lg" : "text-xl",
            )}
          >
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm mt-2 line-clamp-2 mb-4">{post.excerpt}</p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.readTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground",
                  )}
                />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsSaved(!isSaved)
                }}
                className="p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <Bookmark
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isSaved ? "fill-primary text-primary" : "text-muted-foreground",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
