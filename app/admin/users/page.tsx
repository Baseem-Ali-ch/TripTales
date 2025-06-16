"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import {
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  Download,
  Eye,
  Edit,
  Ban,
  Trash2,
  CalendarIcon,
  LayoutGrid,
  LayoutList,
  X,
  RefreshCw,
  UserPlus,
  Mail,
  FileText,
  Clock,
  Check,
  Copy,
  Users,
} from "lucide-react"

// Mock data for users
const users = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "alexj",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=AJ",
    role: "Admin",
    status: "Active",
    joined: "2023-01-15",
    lastLogin: "2023-05-20T08:30:00",
    blogCount: 24,
  },
  {
    id: 2,
    name: "Sarah Williams",
    username: "sarahw",
    email: "sarah.williams@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=SW",
    role: "Editor",
    status: "Active",
    joined: "2023-02-10",
    lastLogin: "2023-05-19T14:45:00",
    blogCount: 18,
  },
  {
    id: 3,
    name: "Michael Brown",
    username: "mikeb",
    email: "michael.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
    role: "Author",
    status: "Inactive",
    joined: "2023-03-05",
    lastLogin: "2023-04-30T11:20:00",
    blogCount: 7,
  },
  {
    id: 4,
    name: "Emily Davis",
    username: "emilyd",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=ED",
    role: "Author",
    status: "Active",
    joined: "2023-03-15",
    lastLogin: "2023-05-18T16:10:00",
    blogCount: 12,
  },
  {
    id: 5,
    name: "David Wilson",
    username: "davidw",
    email: "david.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
    role: "Reader",
    status: "Suspended",
    joined: "2023-04-02",
    lastLogin: "2023-05-01T09:15:00",
    blogCount: 0,
  },
  {
    id: 6,
    name: "Jessica Taylor",
    username: "jessicat",
    email: "jessica.taylor@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=JT",
    role: "Editor",
    status: "Active",
    joined: "2023-04-10",
    lastLogin: "2023-05-20T10:30:00",
    blogCount: 15,
  },
  {
    id: 7,
    name: "Robert Martinez",
    username: "robertm",
    email: "robert.martinez@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=RM",
    role: "Author",
    status: "Active",
    joined: "2023-04-15",
    lastLogin: "2023-05-19T13:45:00",
    blogCount: 9,
  },
  {
    id: 8,
    name: "Jennifer Anderson",
    username: "jennifera",
    email: "jennifer.anderson@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=JA",
    role: "Reader",
    status: "Inactive",
    joined: "2023-04-20",
    lastLogin: "2023-05-10T15:20:00",
    blogCount: 0,
  },
]

// Mock data for user blogs
const userBlogs = [
  {
    id: 1,
    title: "Getting Started with React",
    status: "Published",
    date: "2023-05-15",
    views: 1245,
    comments: 32,
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    status: "Published",
    date: "2023-05-01",
    views: 987,
    comments: 24,
  },
  {
    id: 3,
    title: "CSS Grid Layout Mastery",
    status: "Draft",
    date: "2023-05-18",
    views: 0,
    comments: 0,
  },
]

// Mock data for user activity
const userActivity = [
  {
    id: 1,
    action: "Published a new blog post",
    target: "Getting Started with React",
    date: "2023-05-15T10:30:00",
  },
  {
    id: 2,
    action: "Commented on",
    target: "The Future of Web Development",
    date: "2023-05-14T15:45:00",
  },
  {
    id: 3,
    action: "Updated profile information",
    target: "",
    date: "2023-05-12T09:15:00",
  },
  {
    id: 4,
    action: "Created a draft post",
    target: "CSS Grid Layout Mastery",
    date: "2023-05-10T14:20:00",
  },
]

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Toggle selection of all users
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map((user) => user.id))
    }
    setIsAllSelected(!isAllSelected)
  }

  // Toggle selection of a single user
  const toggleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
      setIsAllSelected(false)
    } else {
      setSelectedUsers([...selectedUsers, userId])
      if (selectedUsers.length + 1 === users.length) {
        setIsAllSelected(true)
      }
    }
  }

  // Open user detail panel
  const openUserDetail = (user: any) => {
    setSelectedUser(user)
    setIsDetailOpen(true)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Format datetime for display
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get time ago for display
  const getTimeAgo = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        return `${diffMinutes} minutes ago`
      }
      return `${diffHours} hours ago`
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return formatDate(dateTimeString)
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "Suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  // Get role badge color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Author":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Reader":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground">Manage user accounts, roles, and permissions</p>
          </div>
          <Button
            onClick={() => {
              setIsEditMode(false)
              setIsAddUserOpen(true)
            }}
            className="md:w-auto"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">128</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-3xl font-bold">98</p>
                </div>
                <div className="rounded-full bg-green-500/10 p-3 text-green-500">
                  <Check className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Inactive Users</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="rounded-full bg-gray-500/10 p-3 text-gray-500">
                  <Ban className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Today</p>
                  <p className="text-3xl font-bold">6</p>
                </div>
                <div className="rounded-full bg-blue-500/10 p-3 text-blue-500">
                  <UserPlus className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="pl-8 md:w-[300px] lg:w-[400px]" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="absolute right-1 top-1 h-7">
                    <Filter className="mr-2 h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Search by</span>
                    <ChevronDown className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Name</DropdownMenuItem>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Username</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all-roles">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-roles">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="reader">Reader</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all-status">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-status">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Registration date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="most-active">Most Active</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center rounded-md border bg-background">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none rounded-l-md ${viewMode === "table" ? "bg-muted" : ""}`}
                  onClick={() => setViewMode("table")}
                >
                  <LayoutList className="h-4 w-4" />
                  <span className="sr-only">Table view</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none rounded-r-md ${viewMode === "grid" ? "bg-muted" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-9">
                    <span>Bulk Actions</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Activate</DropdownMenuItem>
                  <DropdownMenuItem>Deactivate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="h-9">
                <span>Apply</span>
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9">
                  <Download className="mr-2 h-4 w-4" />
                  <span>Export</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* User Listing */}
        <div className="rounded-md border bg-card">
          {viewMode === "table" ? (
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={isAllSelected}
                        onCheckedChange={toggleSelectAll}
                        aria-label="Select all users"
                      />
                    </TableHead>
                    <TableHead className="w-[60px]">Avatar</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Username</TableHead>
                    <TableHead className="hidden lg:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Joined</TableHead>
                    <TableHead className="hidden xl:table-cell">Activity</TableHead>
                    <TableHead className="w-[100px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="group">
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleSelectUser(user.id)}
                          aria-label={`Select ${user.name}`}
                        />
                      </TableCell>
                      <TableCell>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="h-auto p-0 font-medium" onClick={() => openUserDetail(user)}>
                          {user.name}
                        </Button>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{user.username}</TableCell>
                      <TableCell className="hidden lg:table-cell">{user.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className={`${getRoleColor(user.role)}`}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge variant="outline" className={`mr-2 ${getStatusColor(user.status)}`}>
                            {user.status}
                          </Badge>
                          <Switch checked={user.status === "Active"} aria-label={`Toggle status for ${user.name}`} />
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{formatDate(user.joined)}</TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            Last login: {getTimeAgo(user.lastLogin)}
                          </span>
                          <span className="text-xs text-muted-foreground">Blogs: {user.blogCount}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openUserDetail(user)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user)
                                setIsEditMode(true)
                                setIsAddUserOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === "Active" ? (
                              <DropdownMenuItem>
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem>
                                <Check className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user account and
                                    remove all associated data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="group relative rounded-lg border bg-card p-4 transition-all hover:shadow-md"
                >
                  <div className="absolute right-2 top-2">
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleSelectUser(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </div>
                  <div className="mb-4 flex flex-col items-center text-center">
                    <Avatar className="mb-2 h-16 w-16">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="text-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">@{user.username}</p>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="outline" className={`${getRoleColor(user.role)}`}>
                        {user.role}
                      </Badge>
                      <Badge variant="outline" className={`${getStatusColor(user.status)}`}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-4 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Joined {formatDate(user.joined)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Last login {getTimeAgo(user.lastLogin)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{user.blogCount} blogs</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => openUserDetail(user)}>
                      <Eye className="mr-1 h-3.5 w-3.5" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <span>Actions</span>
                          <ChevronDown className="ml-1 h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {user.status === "Active" ? (
                          <DropdownMenuItem>
                            <Ban className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <Check className="mr-2 h-4 w-4" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the user account and remove
                                all associated data.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-destructive text-destructive-foreground">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Section */}
        <div className="flex flex-col items-center gap-4">
          <Button variant="outline" className="w-full md:w-auto">
            <RefreshCw className="mr-2 h-4 w-4" />
            Load More
          </Button>
          <p className="text-sm text-muted-foreground">Showing 8 of 128 results</p>
        </div>
      </div>

      {/* User Detail Slide-in Panel */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
            <SheetDescription>View and manage user information</SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <div className="mt-6 space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-2 h-20 w-20">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  <AvatarFallback className="text-xl">
                    {selectedUser.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`${getRoleColor(selectedUser.role)}`}>
                    {selectedUser.role}
                  </Badge>
                  <Badge variant="outline" className={`${getStatusColor(selectedUser.status)}`}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
                    <p>{selectedUser.username}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <div className="flex items-center gap-1">
                      <p className="truncate">{selectedUser.email}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3.5 w-3.5" />
                        <span className="sr-only">Copy email</span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Joined</h3>
                    <p>{formatDate(selectedUser.joined)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Last Login</h3>
                    <p>{formatDateTime(selectedUser.lastLogin)}</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="activity">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="blogs">Blogs</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="activity" className="space-y-4">
                  <h3 className="text-sm font-medium">Recent Activity</h3>
                  <div className="space-y-4">
                    {userActivity.map((activity) => (
                      <div key={activity.id} className="flex gap-4">
                        <div className="relative mt-1">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 top-8 flex justify-center">
                            <div className="w-px bg-border" />
                          </div>
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm">
                            <span className="font-medium">{activity.action}</span>
                            {activity.target && <span className="font-medium"> {activity.target}</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatDateTime(activity.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="blogs" className="space-y-4">
                  <h3 className="text-sm font-medium">User's Blogs</h3>
                  <div className="space-y-4">
                    {userBlogs.map((blog) => (
                      <div key={blog.id} className="flex flex-col gap-2 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{blog.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              blog.status === "Published"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                            }
                          >
                            {blog.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(blog.date)}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>{blog.views} views</span>
                          <span>{blog.comments} comments</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-4">
                  <h3 className="text-sm font-medium">User Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="user-status">User Status</Label>
                        <p className="text-xs text-muted-foreground">Enable or disable this user account</p>
                      </div>
                      <Switch id="user-status" checked={selectedUser.status === "Active"} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="user-role">User Role</Label>
                        <p className="text-xs text-muted-foreground">Change the user's role and permissions</p>
                      </div>
                      <Select defaultValue={selectedUser.role.toLowerCase()}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="author">Author</SelectItem>
                          <SelectItem value="reader">Reader</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setIsEditMode(true)
                          setIsAddUserOpen(true)
                          setIsDetailOpen(false)
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit User
                      </Button>
                    </div>
                    <div className="pt-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the user account and remove all
                              associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <div className="absolute right-4 top-4">
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      {/* Add/Edit User Modal */}
      <Dialog
        open={isAddUserOpen}
        onOpenChange={(open) => {
          setIsAddUserOpen(open)
          if (!open) setIsEditMode(false)
        }}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit User" : "Add New User"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update user account details, role, and permissions."
                : "Create a new user account with the appropriate role and permissions."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input
                  id="first-name"
                  placeholder="Enter first name"
                  defaultValue={isEditMode && selectedUser ? selectedUser.name.split(" ")[0] : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  placeholder="Enter last name"
                  defaultValue={isEditMode && selectedUser ? selectedUser.name.split(" ")[1] || "" : ""}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                defaultValue={isEditMode && selectedUser ? selectedUser.email : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                defaultValue={isEditMode && selectedUser ? selectedUser.username : ""}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder={isEditMode ? "Leave blank to keep current" : "Enter password"}
                  />
                  <Button variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-1 text-xs">
                    Generate
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue={isEditMode && selectedUser ? selectedUser.role.toLowerCase() : ""}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="reader">Reader</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Avatar</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  {isEditMode && selectedUser && selectedUser.avatar ? (
                    <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                  ) : null}
                  <AvatarFallback>
                    {isEditMode && selectedUser
                      ? selectedUser.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "?"}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  Upload Image
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="send-email" />
                <Label htmlFor="send-email">
                  {isEditMode
                    ? "Send email notification about account changes"
                    : "Send welcome email with login details"}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditMode ? "Save Changes" : "Create User"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
