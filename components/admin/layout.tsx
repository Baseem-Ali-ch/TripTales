"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Bell,
  MessageSquare,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  LayoutDashboard,
  FileText,
  Users,
  MessageCircle,
  Tag,
  BarChart,
  Settings,
  LogOut,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "Blog Management",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/blogs",
    },
    {
      title: "User Management",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
    },
    {
      title: "Comments",
      icon: <MessageCircle className="h-5 w-5" />,
      href: "/admin/comments",
      badge: "12",
    },
    {
      title: "Categories & Tags",
      icon: <Tag className="h-5 w-5" />,
      href: "/admin/categories",
    },
    {
      title: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
      href: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-all duration-300 lg:relative",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20",
        )}
      >
        {/* Sidebar Header with Logo */}
        <div className="flex h-16 items-center justify-between px-4 py-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            {isSidebarOpen && <span className="text-xl font-bold">BlogFolio</span>}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:flex hidden"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <ChevronRight className={cn("h-5 w-5 transition-transform", !isSidebarOpen && "rotate-180")} />
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Admin User Card */}
        <div className={cn("px-4 py-4", !isSidebarOpen && "flex justify-center")}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40&text=AJ" alt="Admin" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Alex Johnson</span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            </div>
          ) : (
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=AJ" alt="Admin" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.icon}
                  {isSidebarOpen && <span className="flex-1 text-sm font-medium">{item.title}</span>}
                  {isSidebarOpen && item.badge && (
                    <Badge variant="outline" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto border-t px-4 py-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start text-muted-foreground hover:text-foreground",
              !isSidebarOpen && "justify-center px-0",
            )}
          >
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleSidebar}
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="relative hidden md:block w-64 lg:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-full bg-background pl-8 md:w-64 lg:w-80" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute -mt-5 -mr-5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground" aria-label="Messages">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -mt-5 -mr-5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                5
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32&text=AJ" alt="Admin" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && isMobile && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden" onClick={toggleSidebar} />
      )}
    </div>
  )
}
