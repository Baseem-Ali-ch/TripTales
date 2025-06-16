"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Search,
  Grid,
  List,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Heart,
  Edit,
  FileEdit,
  ExternalLink,
  Archive,
  Trash2,
  Plus,
  X,
  Check,
  Upload,
  Calendar,
  Loader2,
} from "lucide-react"
import { AdminLayout } from "@/components/admin/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { BlogStepperForm } from "@/components/blog-stepper-form"

// Sample blog data
const BLOGS = [
  {
    id: 1,
    title: "10 Essential JavaScript Concepts Every Developer Should Know",
    slug: "essential-javascript-concepts",
    featuredImage: "/placeholder.svg?height=200&width=300&text=JavaScript",
    excerpt:
      "Master these fundamental JavaScript concepts to level up your development skills and write cleaner, more efficient code.",
    author: {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    },
    category: "Development",
    tags: ["JavaScript", "Web Development", "Programming"],
    status: "published",
    publishedAt: "2023-05-15T10:30:00",
    updatedAt: "2023-05-16T14:20:00",
    stats: {
      views: 1245,
      comments: 32,
      likes: 87,
    },
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in 2025",
    slug: "future-web-development-2025",
    featuredImage: "/placeholder.svg?height=200&width=300&text=Web+Future",
    excerpt:
      "Explore upcoming trends and technologies that will shape the landscape of web development in the coming years.",
    author: {
      id: 2,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
    },
    category: "Technology",
    tags: ["Web Development", "Future Tech", "Trends"],
    status: "published",
    publishedAt: "2023-05-10T09:15:00",
    updatedAt: "2023-05-12T11:45:00",
    stats: {
      views: 982,
      comments: 24,
      likes: 65,
    },
  },
  {
    id: 3,
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    slug: "accessible-web-applications-guide",
    featuredImage: "/placeholder.svg?height=200&width=300&text=Accessibility",
    excerpt:
      "Learn how to create inclusive web experiences that work for everyone, regardless of abilities or disabilities.",
    author: {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
    },
    category: "Accessibility",
    tags: ["Accessibility", "Web Development", "Inclusive Design"],
    status: "published",
    publishedAt: "2023-05-05T14:20:00",
    updatedAt: "2023-05-07T10:30:00",
    stats: {
      views: 756,
      comments: 18,
      likes: 42,
    },
  },
  {
    id: 4,
    title: "Optimizing React Applications for Performance",
    slug: "optimizing-react-applications",
    featuredImage: "/placeholder.svg?height=200&width=300&text=React",
    excerpt:
      "Practical strategies and techniques to improve the performance of your React applications and deliver better user experiences.",
    author: {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    },
    category: "Development",
    tags: ["React", "Performance", "JavaScript"],
    status: "draft",
    publishedAt: null,
    updatedAt: "2023-05-18T16:45:00",
    stats: {
      views: 0,
      comments: 0,
      likes: 0,
    },
  },
  {
    id: 5,
    title: "Introduction to Artificial Intelligence and Machine Learning",
    slug: "intro-ai-machine-learning",
    featuredImage: "/placeholder.svg?height=200&width=300&text=AI+ML",
    excerpt:
      "A beginner-friendly overview of AI and ML concepts, applications, and future potential in various industries.",
    author: {
      id: 4,
      name: "David Kumar",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
    },
    category: "Technology",
    tags: ["AI", "Machine Learning", "Technology"],
    status: "pending",
    publishedAt: null,
    updatedAt: "2023-05-20T09:30:00",
    stats: {
      views: 0,
      comments: 0,
      likes: 0,
    },
  },
  {
    id: 6,
    title: "The Complete Guide to CSS Grid Layout",
    slug: "complete-guide-css-grid",
    featuredImage: "/placeholder.svg?height=200&width=300&text=CSS+Grid",
    excerpt:
      "Master CSS Grid Layout with this comprehensive guide covering everything from basic concepts to advanced techniques.",
    author: {
      id: 2,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
    },
    category: "Development",
    tags: ["CSS", "Web Development", "Design"],
    status: "published",
    publishedAt: "2023-04-28T11:20:00",
    updatedAt: "2023-05-02T14:15:00",
    stats: {
      views: 1120,
      comments: 27,
      likes: 76,
    },
  },
  {
    id: 7,
    title: "Mastering TypeScript: Advanced Types and Patterns",
    slug: "mastering-typescript-advanced",
    featuredImage: "/placeholder.svg?height=200&width=300&text=TypeScript",
    excerpt:
      "Take your TypeScript skills to the next level with advanced types, patterns, and best practices for large-scale applications.",
    author: {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    },
    category: "Development",
    tags: ["TypeScript", "JavaScript", "Programming"],
    status: "archived",
    publishedAt: "2023-03-15T10:30:00",
    updatedAt: "2023-03-20T09:45:00",
    stats: {
      views: 890,
      comments: 15,
      likes: 42,
    },
  },
  {
    id: 8,
    title: "Sustainable Web Design: Reducing Your Digital Carbon Footprint",
    slug: "sustainable-web-design",
    featuredImage: "/placeholder.svg?height=200&width=300&text=Sustainable",
    excerpt:
      "Learn how to create environmentally friendly websites and reduce the carbon footprint of your digital products.",
    author: {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
    },
    category: "Design",
    tags: ["Sustainability", "Web Design", "Environment"],
    status: "pending",
    publishedAt: null,
    updatedAt: "2023-05-22T15:10:00",
    stats: {
      views: 0,
      comments: 0,
      likes: 0,
    },
  },
  {
    id: 9,
    title: "Getting Started with Next.js 13: App Router and Server Components",
    slug: "getting-started-nextjs-13",
    featuredImage: "/placeholder.svg?height=200&width=300&text=Next.js",
    excerpt: "A comprehensive guide to Next.js 13's new App Router, Server Components, and other exciting features.",
    author: {
      id: 4,
      name: "David Kumar",
      avatar: "/placeholder.svg?height=40&width=40&text=DK",
    },
    category: "Development",
    tags: ["Next.js", "React", "Web Development"],
    status: "draft",
    publishedAt: null,
    updatedAt: "2023-05-21T11:30:00",
    stats: {
      views: 0,
      comments: 0,
      likes: 0,
    },
  },
  {
    id: 10,
    title: "The Psychology of Color in Web Design",
    slug: "psychology-color-web-design",
    featuredImage: "/placeholder.svg?height=200&width=300&text=Color+Psychology",
    excerpt:
      "Explore how different colors affect user behavior and how to use this knowledge in your web design projects.",
    author: {
      id: 2,
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
    },
    category: "Design",
    tags: ["Web Design", "Psychology", "UX"],
    status: "published",
    publishedAt: "2023-05-08T13:45:00",
    updatedAt: "2023-05-10T09:20:00",
    stats: {
      views: 675,
      comments: 14,
      likes: 38,
    },
  },
]

// Sample categories
const CATEGORIES = [
  "All Categories",
  "Development",
  "Technology",
  "Design",
  "Accessibility",
  "UX/UI",
  "Business",
  "Marketing",
]

export default function BlogManagementPage() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [searchType, setSearchType] = useState("title")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [sortOption, setSortOption] = useState("newest")
  const [selectedBlogs, setSelectedBlogs] = useState<number[]>([])
  const [bulkAction, setBulkAction] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [visibleBlogs, setVisibleBlogs] = useState(8)
  const [isQuickEditOpen, setIsQuickEditOpen] = useState(false)
  const [currentBlog, setCurrentBlog] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  // Filter blogs based on search, status, category, and date range
  const filteredBlogs = BLOGS.filter((blog) => {
    // Search filter
    const matchesSearch = searchQuery
      ? searchType === "title"
        ? blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        : searchType === "author"
          ? blog.author.name.toLowerCase().includes(searchQuery.toLowerCase())
          : searchType === "content"
            ? blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            : true
      : true

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && blog.status === "published") ||
      (statusFilter === "draft" && blog.status === "draft") ||
      (statusFilter === "pending" && blog.status === "pending") ||
      (statusFilter === "archived" && blog.status === "archived")

    // Category filter
    const matchesCategory = categoryFilter === "All Categories" || blog.category === categoryFilter

    // Date range filter
    const matchesDateRange =
      !dateRange.from ||
      !dateRange.to ||
      !blog.publishedAt ||
      (new Date(blog.publishedAt) >= dateRange.from && new Date(blog.publishedAt) <= dateRange.to)

    return matchesSearch && matchesStatus && matchesCategory && matchesDateRange
  })

  // Sort filtered blogs
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    } else if (sortOption === "oldest") {
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    } else if (sortOption === "most-viewed") {
      return b.stats.views - a.stats.views
    } else if (sortOption === "most-commented") {
      return b.stats.comments - a.stats.comments
    }
    return 0
  })

  // Blogs to display
  const displayedBlogs = sortedBlogs.slice(0, visibleBlogs)

  // Handle select all blogs
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBlogs(displayedBlogs.map((blog) => blog.id))
    } else {
      setSelectedBlogs([])
    }
  }

  // Handle select individual blog
  const handleSelectBlog = (blogId: number, checked: boolean) => {
    if (checked) {
      setSelectedBlogs([...selectedBlogs, blogId])
    } else {
      setSelectedBlogs(selectedBlogs.filter((id) => id !== blogId))
    }
  }

  // Handle load more
  const handleLoadMore = () => {
    setIsLoading(true)
    // Simulate API call delay
    setTimeout(() => {
      setVisibleBlogs((prev) => prev + 5)
      setIsLoading(false)
    }, 1000)
  }

  // Handle bulk action
  const handleApplyBulkAction = () => {
    if (!bulkAction || selectedBlogs.length === 0) return

    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      // In a real app, you would update the blogs based on the bulk action
      console.log(`Applied ${bulkAction} to blogs:`, selectedBlogs)
      setIsLoading(false)
      setSelectedBlogs([])
      setBulkAction("")
    }, 1000)
  }

  // Handle quick edit
  const handleQuickEdit = (blog: any) => {
    setCurrentBlog({ ...blog })
    setIsQuickEditOpen(true)
  }

  // Handle save quick edit
  const handleSaveQuickEdit = () => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      // In a real app, you would update the blog
      console.log("Saved quick edit for blog:", currentBlog)
      setIsLoading(false)
      setIsQuickEditOpen(false)
      setCurrentBlog(null)
    }, 1000)
  }

  // Handle delete blog
  const handleDeleteBlog = (blog: any) => {
    setCurrentBlog(blog)
    setIsDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = () => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      // In a real app, you would delete the blog
      console.log("Deleted blog:", currentBlog)
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
      setCurrentBlog(null)
    }, 1000)
  }

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "published":
        return "success"
      case "draft":
        return "secondary"
      case "pending":
        return "warning"
      case "archived":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
              <p className="text-muted-foreground">Manage, edit and publish your blog content</p>
            </div>
            <Button
              size="sm"
              className="md:w-auto w-full"
              onClick={() => {
                setCurrentBlog(null)
                setIsAddBlogOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Blog
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="text-sm font-medium text-muted-foreground">Total Blogs</div>
                <div className="text-2xl font-bold">{BLOGS.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="text-sm font-medium text-muted-foreground">Published</div>
                <div className="text-2xl font-bold">{BLOGS.filter((blog) => blog.status === "published").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="text-sm font-medium text-muted-foreground">Drafts</div>
                <div className="text-2xl font-bold">{BLOGS.filter((blog) => blog.status === "draft").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className="text-sm font-medium text-muted-foreground">Pending Review</div>
                <div className="text-2xl font-bold">{BLOGS.filter((blog) => blog.status === "pending").length}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advanced Filter Bar */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Field */}
              <div className="flex-1 flex flex-col md:flex-row gap-2">
                <Select value={searchType} onValueChange={setSearchType} defaultValue="title">
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Search by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Search by Title</SelectItem>
                    <SelectItem value="author">Search by Author</SelectItem>
                    <SelectItem value="content">Search by Content</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search blogs..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-none rounded-l-md", viewMode === "table" && "bg-muted")}
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("rounded-none rounded-r-md", viewMode === "grid" && "bg-muted")}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter} defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter} defaultValue="All Categories">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Date Range Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full md:w-[240px] justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground",
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      "Filter by date"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                  <div className="flex items-center justify-between p-3 border-t">
                    <Button variant="ghost" size="sm" onClick={() => setDateRange({ from: undefined, to: undefined })}>
                      Clear
                    </Button>
                    <Button size="sm">Apply</Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Sort Options */}
              <Select value={sortOption} onValueChange={setSortOption} defaultValue="newest">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  <SelectItem value="most-commented">Most Commented</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={selectedBlogs.length > 0 && selectedBlogs.length === displayedBlogs.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="select-all" className="text-sm">
                  Select All
                </Label>
              </div>

              <div className="flex-1 flex items-center gap-2">
                <Select value={bulkAction} onValueChange={setBulkAction} disabled={selectedBlogs.length === 0}>
                  <SelectTrigger className={cn("w-full md:w-[180px]", selectedBlogs.length === 0 && "opacity-50")}>
                    <SelectValue placeholder="Bulk Actions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="publish">Publish</SelectItem>
                    <SelectItem value="draft">Move to Draft</SelectItem>
                    <SelectItem value="archive">Archive</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!bulkAction || selectedBlogs.length === 0}
                  onClick={handleApplyBulkAction}
                >
                  Apply
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                {selectedBlogs.length > 0 ? `${selectedBlogs.length} blogs selected` : "No blogs selected"}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Listing */}
        {viewMode === "table" ? (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={selectedBlogs.length > 0 && selectedBlogs.length === displayedBlogs.length}
                        onCheckedChange={handleSelectAll}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead className="w-[80px]">Image</TableHead>
                    <TableHead className="min-w-[200px]">Title</TableHead>
                    <TableHead className="hidden md:table-cell">Author</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Published</TableHead>
                    <TableHead className="hidden md:table-cell">Stats</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedBlogs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                        No blogs found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayedBlogs.map((blog) => (
                      <TableRow key={blog.id} className="group hover:bg-muted/50">
                        <TableCell>
                          <Checkbox
                            checked={selectedBlogs.includes(blog.id)}
                            onCheckedChange={(checked) => handleSelectBlog(blog.id, checked as boolean)}
                            aria-label={`Select ${blog.title}`}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="relative h-10 w-16 rounded-md overflow-hidden">
                            <img
                              src={blog.featuredImage || "/placeholder.svg"}
                              alt={blog.title}
                              className="object-cover h-full w-full"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium line-clamp-1">{blog.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1 md:hidden">
                            {blog.author.name} • {blog.category}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                              <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{blog.author.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{blog.category}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant={getStatusBadgeVariant(blog.status)} className="capitalize">
                            {blog.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {blog.publishedAt ? format(new Date(blog.publishedAt), "MMM d, yyyy") : "—"}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Eye className="mr-1 h-3 w-3" />
                              {blog.stats.views}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              {blog.stats.comments}
                            </span>
                            <span className="flex items-center">
                              <Heart className="mr-1 h-3 w-3" />
                              {blog.stats.likes}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleQuickEdit(blog)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Quick Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentBlog(blog)
                                  setIsAddBlogOpen(true)
                                }}
                              >
                                <FileEdit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentBlog(blog)
                                  setIsPreviewOpen(true)
                                }}
                              >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {blog.status === "published" ? (
                                <DropdownMenuItem>
                                  <Archive className="mr-2 h-4 w-4" />
                                  Unpublish
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Check className="mr-2 h-4 w-4" />
                                  Publish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteBlog(blog)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedBlogs.length === 0 ? (
              <div className="col-span-full h-24 flex items-center justify-center text-muted-foreground">
                No blogs found.
              </div>
            ) : (
              displayedBlogs.map((blog) => (
                <Card key={blog.id} className="group overflow-hidden">
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Checkbox
                        checked={selectedBlogs.includes(blog.id)}
                        onCheckedChange={(checked) => handleSelectBlog(blog.id, checked as boolean)}
                        aria-label={`Select ${blog.title}`}
                        className="bg-background/80 backdrop-blur-sm"
                      />
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant={getStatusBadgeVariant(blog.status)} className="capitalize">
                        {blog.status}
                      </Badge>
                    </div>
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={blog.featuredImage || "/placeholder.svg"}
                        alt={blog.title}
                        className="object-cover h-full w-full transition-transform group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{blog.category}</Badge>
                      <div className="text-xs text-muted-foreground">
                        {blog.publishedAt ? format(new Date(blog.publishedAt), "MMM d, yyyy") : "Not published"}
                      </div>
                    </div>
                    <h3 className="font-semibold line-clamp-1 mb-1">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{blog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                          <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{blog.author.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Eye className="mr-1 h-3 w-3" />
                          {blog.stats.views}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="mr-1 h-3 w-3" />
                          {blog.stats.comments}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="ghost" size="sm" onClick={() => handleQuickEdit(blog)}>
                      <Edit className="mr-2 h-3 w-3" />
                      Quick Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileEdit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {blog.status === "published" ? (
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Unpublish
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteBlog(blog)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Load More Section */}
        {displayedBlogs.length < filteredBlogs.length && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <Button variant="outline" onClick={handleLoadMore} disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              Showing {displayedBlogs.length} of {filteredBlogs.length} results
            </p>
          </div>
        )}

        {/* Quick Edit Panel */}
        <Sheet open={isQuickEditOpen} onOpenChange={setIsQuickEditOpen}>
          <SheetContent className="sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Quick Edit</SheetTitle>
              <SheetDescription>Make quick changes to the blog post.</SheetDescription>
            </SheetHeader>
            {currentBlog && (
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={currentBlog.title}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={currentBlog.category}
                    onValueChange={(value) =>
                      setCurrentBlog({
                        ...currentBlog,
                        category: value,
                      })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.filter((category) => category !== "All Categories").map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentBlog.status}
                    onValueChange={(value) =>
                      setCurrentBlog({
                        ...currentBlog,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {currentBlog.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                        <button
                          className="ml-1 text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            setCurrentBlog({
                              ...currentBlog,
                              tags: currentBlog.tags.filter((t: string) => t !== tag),
                            })
                          }
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.target as HTMLInputElement).value.trim()) {
                          e.preventDefault()
                          const newTag = (e.target as HTMLInputElement).value.trim()
                          if (!currentBlog.tags.includes(newTag) && currentBlog.tags.length < 5) {
                            setCurrentBlog({
                              ...currentBlog,
                              tags: [...currentBlog.tags, newTag],
                            })
                            ;(e.target as HTMLInputElement).value = ""
                          }
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const input = document.getElementById("tags") as HTMLInputElement
                        if (input.value.trim()) {
                          const newTag = input.value.trim()
                          if (!currentBlog.tags.includes(newTag) && currentBlog.tags.length < 5) {
                            setCurrentBlog({
                              ...currentBlog,
                              tags: [...currentBlog.tags, newTag],
                            })
                            input.value = ""
                          }
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="featured-image">Featured Image</Label>
                  <div className="border rounded-md p-4">
                    <div className="aspect-video w-full overflow-hidden rounded-md mb-4">
                      <img
                        src={currentBlog.featuredImage || "/placeholder.svg"}
                        alt={currentBlog.title}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Image
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={currentBlog.excerpt}
                    onChange={(e) =>
                      setCurrentBlog({
                        ...currentBlog,
                        excerpt: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
            )}
            <SheetFooter>
              <Button variant="outline" onClick={() => setIsQuickEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveQuickEdit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this blog post? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            {currentBlog && (
              <div className="py-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={currentBlog.featuredImage || "/placeholder.svg"}
                      alt={currentBlog.title}
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{currentBlog.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {currentBlog.author.name} • {currentBlog.category}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Blog
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Blog Stepper Form */}
        <BlogStepperForm
          isOpen={isAddBlogOpen}
          onClose={() => {
            setIsAddBlogOpen(false)
            setCurrentBlog(null)
          }}
          blog={currentBlog}
          onSave={(blogData) => {
            console.log("Blog saved:", blogData)
            // In a real app, you would save the blog data
            setIsAddBlogOpen(false)
            setCurrentBlog(null)
          }}
          isAdmin={true}
        />

        {/* Blog Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Blog Preview</DialogTitle>
              <DialogDescription>Preview how your blog post will appear to readers</DialogDescription>
            </DialogHeader>
            {currentBlog && (
              <div className="py-4">
                <div className="aspect-video w-full overflow-hidden rounded-md mb-6">
                  <img
                    src={currentBlog.featuredImage || "/placeholder.svg"}
                    alt={currentBlog.title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline">{currentBlog.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {currentBlog.publishedAt
                      ? format(new Date(currentBlog.publishedAt), "MMMM d, yyyy")
                      : "Not published yet"}
                  </span>
                </div>
                <h1 className="text-3xl font-bold mb-4">{currentBlog.title}</h1>
                <div className="flex items-center gap-2 mb-6">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentBlog.author.avatar || "/placeholder.svg"} alt={currentBlog.author.name} />
                    <AvatarFallback>{currentBlog.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{currentBlog.author.name}</span>
                </div>
                <p className="text-lg mb-6 italic text-muted-foreground">{currentBlog.excerpt}</p>
                <div className="prose max-w-none dark:prose-invert">
                  <p>
                    This is a preview of the blog content. In a real implementation, the actual formatted content would
                    appear here.
                  </p>
                  <p>
                    The blog discusses {currentBlog.title.toLowerCase()} in detail, providing valuable insights and
                    information for readers.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" />
                    {currentBlog.stats.views} views
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    {currentBlog.stats.comments} comments
                  </span>
                  <span className="flex items-center">
                    <Heart className="mr-1 h-4 w-4" />
                    {currentBlog.stats.likes} likes
                  </span>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close Preview
              </Button>
              <Button
                onClick={() => {
                  setIsPreviewOpen(false)
                  setIsAddBlogOpen(true)
                }}
              >
                Edit Blog
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
