"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Users,
  FileText,
  MessageSquare,
  Eye,
  TrendingUp,
  TrendingDown,
  Plus,
  UserPlus,
  MessageCircle,
  FileBarChart,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react"
import { format } from "date-fns"
import { AdminLayout } from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Sample data for charts
const viewsData = [
  { name: "Jan", views: 4000 },
  { name: "Feb", views: 3000 },
  { name: "Mar", views: 5000 },
  { name: "Apr", views: 4500 },
  { name: "May", views: 6000 },
  { name: "Jun", views: 5500 },
  { name: "Jul", views: 7000 },
  { name: "Aug", views: 8000 },
  { name: "Sep", views: 7500 },
  { name: "Oct", views: 9000 },
  { name: "Nov", views: 8500 },
  { name: "Dec", views: 10000 },
]

const userGrowthData = [
  { name: "Jan", current: 400, previous: 300 },
  { name: "Feb", current: 500, previous: 400 },
  { name: "Mar", current: 600, previous: 450 },
  { name: "Apr", current: 700, previous: 550 },
  { name: "May", current: 800, previous: 650 },
  { name: "Jun", current: 950, previous: 750 },
  { name: "Jul", current: 1100, previous: 850 },
  { name: "Aug", current: 1250, previous: 950 },
  { name: "Sep", current: 1400, previous: 1050 },
  { name: "Oct", current: 1600, previous: 1200 },
  { name: "Nov", current: 1800, previous: 1350 },
  { name: "Dec", current: 2000, previous: 1500 },
]

// Sample data for top performing blogs
const topBlogs = [
  {
    id: 1,
    title: "10 Essential JavaScript Concepts Every Developer Should Know",
    views: 12500,
    trend: 15,
  },
  {
    id: 2,
    title: "The Future of Web Development: What to Expect in 2025",
    views: 9800,
    trend: 8,
  },
  {
    id: 3,
    title: "Understanding Blockchain Technology: A Beginner's Guide",
    views: 8200,
    trend: -3,
  },
  {
    id: 4,
    title: "Mastering CSS Grid Layout: A Comprehensive Guide",
    views: 7500,
    trend: 5,
  },
  {
    id: 5,
    title: "Introduction to Artificial Intelligence and Machine Learning",
    views: 6900,
    trend: 12,
  },
]

// Sample data for recent activity
const recentActivity = [
  {
    id: 1,
    type: "blog_published",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32&text=AJ",
    },
    title: "The Future of Web Development: What to Expect in 2025",
    timestamp: "2023-05-15T10:30:00",
  },
  {
    id: 2,
    type: "comment_added",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32&text=SW",
    },
    title: "Great article! I especially liked the section on WebAssembly.",
    blogTitle: "The Future of Web Development: What to Expect in 2025",
    timestamp: "2023-05-15T11:15:00",
  },
  {
    id: 3,
    type: "user_registered",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32&text=MC",
    },
    timestamp: "2023-05-15T12:45:00",
  },
  {
    id: 4,
    type: "blog_updated",
    user: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32&text=ER",
    },
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    timestamp: "2023-05-15T14:20:00",
  },
  {
    id: 5,
    type: "comment_approved",
    user: {
      name: "David Kumar",
      avatar: "/placeholder.svg?height=32&width=32&text=DK",
    },
    title: "I've been implementing these techniques and they've really improved my workflow.",
    blogTitle: "10 Essential JavaScript Concepts Every Developer Should Know",
    timestamp: "2023-05-15T15:10:00",
  },
]

export default function AdminDashboardPage() {
  const [chartPeriod, setChartPeriod] = useState("month")

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Admin! Today is {format(new Date(), "EEEE, MMMM do, yyyy")}
            </p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="mr-2 h-4 w-4" />
              {format(new Date(), "MMM yyyy")}
            </Button>
            <Button size="sm" className="h-9">
              <FileBarChart className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Blogs</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-bold">248</h3>
                    <span className="inline-flex items-center text-sm font-medium text-green-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      12%
                    </span>
                  </div>
                </div>
                <div className="rounded-full p-2 bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">+24 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-bold">2,841</h3>
                    <span className="inline-flex items-center text-sm font-medium text-green-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      8%
                    </span>
                  </div>
                </div>
                <div className="rounded-full p-2 bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">+156 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-bold">89.2k</h3>
                    <span className="inline-flex items-center text-sm font-medium text-green-600">
                      <ArrowUpRight className="mr-1 h-4 w-4" />
                      15%
                    </span>
                  </div>
                </div>
                <div className="rounded-full p-2 bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">+12.5k from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Comments</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-bold">482</h3>
                    <span className="inline-flex items-center text-sm font-medium text-red-600">
                      <ArrowDownRight className="mr-1 h-4 w-4" />
                      3%
                    </span>
                  </div>
                </div>
                <div className="rounded-full p-2 bg-primary/10">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">-15 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-6">
          {/* Charts Section */}
          <div className="md:col-span-4 space-y-6">
            {/* Blog Performance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle>Blog Performance</CardTitle>
                  <CardDescription>Views and engagement over time</CardDescription>
                </div>
                <Tabs defaultValue="month" value={chartPeriod} onValueChange={setChartPeriod}>
                  <TabsList className="grid grid-cols-4 w-[240px]">
                    <TabsTrigger value="day">Day</TabsTrigger>
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={viewsData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          borderColor: "var(--border)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* User Growth */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registrations over time</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userGrowthData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--background)",
                          borderColor: "var(--border)",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="previous"
                        stackId="1"
                        stroke="hsl(var(--muted-foreground))"
                        fill="hsl(var(--muted))"
                      />
                      <Area
                        type="monotone"
                        dataKey="current"
                        stackId="1"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary) / 0.3)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Blog
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New User
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Review Comments
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileBarChart className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Top Performing Blogs */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Blogs</CardTitle>
                <CardDescription>Based on views and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topBlogs.map((blog) => (
                    <div key={blog.id} className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none line-clamp-1">{blog.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Eye className="mr-1 h-3 w-3" />
                          {blog.views.toLocaleString()} views
                        </div>
                      </div>
                      <div className={`flex items-center ${blog.trend > 0 ? "text-green-600" : "text-red-600"}`}>
                        {blog.trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="ml-1 text-xs font-medium">{Math.abs(blog.trend)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex">
                  <div className="relative mr-4">
                    <Avatar className="h-9 w-9 border-4 border-background">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                      <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 border-2 border-background" />
                    <div className="absolute top-10 bottom-0 left-1/2 w-px -translate-x-1/2 bg-border" />
                  </div>
                  <div className="flex-1 space-y-1 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          <span className="font-semibold">{activity.user.name}</span>{" "}
                          {activity.type === "blog_published" && "published a new blog post"}
                          {activity.type === "comment_added" && "added a comment"}
                          {activity.type === "user_registered" && "registered as a new user"}
                          {activity.type === "blog_updated" && "updated a blog post"}
                          {activity.type === "comment_approved" && "had a comment approved"}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {activity.type.split("_").join(" ")}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {format(new Date(activity.timestamp), "h:mm a")}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            {(activity.type === "blog_published" || activity.type === "blog_updated") && (
                              <DropdownMenuItem>Edit Blog</DropdownMenuItem>
                            )}
                            {(activity.type === "comment_added" || activity.type === "comment_approved") && (
                              <DropdownMenuItem>Moderate Comment</DropdownMenuItem>
                            )}
                            {activity.type === "user_registered" && (
                              <DropdownMenuItem>View User Profile</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="text-sm">
                      {activity.type === "blog_published" || activity.type === "blog_updated" ? (
                        <p className="font-medium">{activity.title}</p>
                      ) : activity.type === "comment_added" || activity.type === "comment_approved" ? (
                        <>
                          <p className="italic">"{activity.title}"</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            On: <span className="font-medium">{activity.blogTitle}</span>
                          </p>
                        </>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                        View
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
