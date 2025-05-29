"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MessageSquare,
  Heart,
  Download,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"

// Sample data
const pageViewsData = [
  { date: "2024-01-01", views: 1200, users: 800 },
  { date: "2024-01-02", views: 1400, users: 950 },
  { date: "2024-01-03", views: 1100, users: 750 },
  { date: "2024-01-04", views: 1600, users: 1100 },
  { date: "2024-01-05", views: 1800, users: 1250 },
  { date: "2024-01-06", views: 2100, users: 1400 },
  { date: "2024-01-07", views: 1900, users: 1300 },
]

const topPostsData = [
  { title: "Getting Started with React", views: 2500, comments: 45 },
  { title: "Advanced TypeScript Tips", views: 2100, comments: 32 },
  { title: "Building Modern UIs", views: 1800, comments: 28 },
  { title: "State Management Guide", views: 1600, comments: 24 },
  { title: "Performance Optimization", views: 1400, comments: 19 },
]

const trafficSourcesData = [
  { name: "Organic Search", value: 45, color: "#3b82f6" },
  { name: "Direct", value: 25, color: "#10b981" },
  { name: "Social Media", value: 20, color: "#f59e0b" },
  { name: "Referral", value: 10, color: "#ef4444" },
]

const engagementData = [
  { month: "Jan", comments: 120, likes: 450, shares: 89 },
  { month: "Feb", comments: 150, likes: 520, shares: 102 },
  { month: "Mar", comments: 180, likes: 610, shares: 125 },
  { month: "Apr", comments: 220, likes: 720, shares: 148 },
  { month: "May", comments: 280, likes: 850, shares: 175 },
  { month: "Jun", comments: 320, likes: 920, shares: 198 },
]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const stats = [
    {
      title: "Total Page Views",
      value: "12,345",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      color: "text-blue-600",
    },
    {
      title: "Unique Visitors",
      value: "8,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Total Comments",
      value: "1,456",
      change: "+15.3%",
      trend: "up",
      icon: MessageSquare,
      color: "text-purple-600",
    },
    {
      title: "Engagement Rate",
      value: "4.2%",
      change: "-2.1%",
      trend: "down",
      icon: Heart,
      color: "text-red-600",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground">Track your blog performance and user engagement</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                  )}
                  {stat.change} from last period
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Page Views Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Page Views & Users
                  </CardTitle>
                  <CardDescription>Daily page views and unique users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      views: {
                        label: "Page Views",
                        color: "hsl(var(--chart-1))",
                      },
                      users: {
                        label: "Users",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={pageViewsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="views"
                          stackId="1"
                          stroke="var(--color-views)"
                          fill="var(--color-views)"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="users"
                          stackId="2"
                          stroke="var(--color-users)"
                          fill="var(--color-users)"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    Traffic Sources
                  </CardTitle>
                  <CardDescription>Where your visitors are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      organic: {
                        label: "Organic Search",
                        color: "#3b82f6",
                      },
                      direct: {
                        label: "Direct",
                        color: "#10b981",
                      },
                      social: {
                        label: "Social Media",
                        color: "#f59e0b",
                      },
                      referral: {
                        label: "Referral",
                        color: "#ef4444",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={trafficSourcesData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {trafficSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Your most popular blog posts by views and engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPostsData.map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{post.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views.toLocaleString()} views
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {post.comments} comments
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Audience Demographics</CardTitle>
                  <CardDescription>Age and location breakdown of your readers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>18-24</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-1/4 h-full bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>25-34</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-2/5 h-full bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">40%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>35-44</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-1/5 h-full bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>45+</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-3/20 h-full bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm text-muted-foreground">15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                  <CardDescription>Geographic distribution of your audience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { country: "United States", percentage: 45, flag: "🇺🇸" },
                      { country: "United Kingdom", percentage: 20, flag: "🇬🇧" },
                      { country: "Canada", percentage: 15, flag: "🇨🇦" },
                      { country: "Germany", percentage: 10, flag: "🇩🇪" },
                      { country: "Australia", percentage: 10, flag: "🇦🇺" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.flag}</span>
                          <span>{item.country}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Engagement Metrics
                </CardTitle>
                <CardDescription>Comments, likes, and shares over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    comments: {
                      label: "Comments",
                      color: "hsl(var(--chart-1))",
                    },
                    likes: {
                      label: "Likes",
                      color: "hsl(var(--chart-2))",
                    },
                    shares: {
                      label: "Shares",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="comments" fill="var(--color-comments)" />
                      <Bar dataKey="likes" fill="var(--color-likes)" />
                      <Bar dataKey="shares" fill="var(--color-shares)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
