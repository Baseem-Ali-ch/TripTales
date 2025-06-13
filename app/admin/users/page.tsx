"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "@/components/admin/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
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
} from "lucide-react";

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    newToday: 0
  });
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);

  const fetchUserData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/users");
      if (!response) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      
      // Calculate user statistics
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const stats = {
        total: data.length,
        active: data.filter((user: any) => user.isActive).length,
        inactive: data.filter((user: any) => !user.isActive).length,
        newToday: data.filter((user: any) => {
          const createdDate = new Date(user.createdAt);
          createdDate.setHours(0, 0, 0, 0);
          return createdDate.getTime() === today.getTime();
        }).length
      };
      
      setUserStats(stats);
    } catch (error) {
      setError("Failed to fetch users");
      console.log("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  

  // Toggle selection of all users
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  // Toggle selection of a single user
  const toggleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      setIsAllSelected(false);
    } else {
      setSelectedUsers([...selectedUsers, userId]);
      if (selectedUsers.length + 1 === users.length) {
        setIsAllSelected(true);
      }
    }
  };

  // Toggle user active status
  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    setUpdatingStatus(userId);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          isActive: !currentStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user status");
      }

      // Update the local state to reflect the change
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isActive: !currentStatus } : user
        )
      );

      // Update user stats
      setUserStats((prev) => ({
        ...prev,
        active: currentStatus ? prev.active - 1 : prev.active + 1,
        inactive: currentStatus ? prev.inactive + 1 : prev.inactive - 1,
      }));

      toast.success("User status updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update user status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Update user role
  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      setUpdatingRole(userId);
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          role: newRole,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update user role");
      }

      // Update the local state to reflect the change
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );

      toast.success("User role updated successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update user role");
    } finally {
      setUpdatingRole(null);
    }
  };

  // Delete user
  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete user");
      }

      // Update the local state to remove the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      
      // Update user stats
      setUserStats((prev) => ({
        ...prev,
        total: prev.total - 1,
        active: selectedUser.isActive ? prev.active - 1 : prev.active,
        inactive: !selectedUser.isActive ? prev.inactive - 1 : prev.inactive,
      }));
      
      // Close the detail panel if it's open
      setIsDetailOpen(false);

      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete user");
    }
  };

  // Open user detail panel
  const openUserDetail = (user: any) => {
    setSelectedUser(user);
    setIsDetailOpen(true);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format datetime for display
  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get time ago for display
  const getTimeAgo = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return formatDate(dateTimeString);
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "Suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  // Get role badge color
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "Editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Author":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Reader":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage user accounts, roles, and permissions
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Users
                  </p>
                  <p className="text-3xl font-bold">{isLoading ? "--" : userStats.total}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold">{isLoading ? "--" : userStats.active}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">
                    Inactive Users
                  </p>
                  <p className="text-3xl font-bold">{isLoading ? "--" : userStats.inactive}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">
                    New Today
                  </p>
                  <p className="text-3xl font-bold">{isLoading ? "--" : userStats.newToday}</p>
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
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
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
            </div>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
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

        {/* Error Message and Retry Button */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
            <div className="flex items-center gap-2">
              <X className="h-5 w-5 text-red-500" />
              <p className="text-red-500">{error}. Please try again.</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchUserData}
                className="ml-auto"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* User Listing */}
        <div className="rounded-md border bg-card">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center gap-4 p-8">
              <p className="text-muted-foreground">Could not load user data</p>
            </div>
          ) : viewMode === "table" ? (
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
                    <TableHead className="hidden md:table-cell">
                      Username
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Email
                    </TableHead>
                    <TableHead className="hidden md:table-cell">Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Joined
                    </TableHead>
                    <TableHead className="w-[100px] text-right">
                      Actions
                    </TableHead>
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
                          <AvatarImage
                            src={user.profilePicture || "/placeholder.svg"}
                            alt={user.name}
                          />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="link"
                          className="h-auto p-0 font-medium"
                          onClick={() => openUserDetail(user)}
                        >
                          {user.name}
                        </Button>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {user.username}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {user.email}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge
                          variant="outline"
                          className={`${getRoleColor(user.role)}`}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Badge
                            variant="outline"
                            className={`mr-2 ${getStatusColor(user.status)}`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Switch
                            id={`status-${user.id}`}
                            checked={user.isActive}
                            onCheckedChange={(checked) => toggleUserStatus(user.id, !checked)}
                            disabled={updatingStatus === user.id}
                            className="data-[state=checked]:bg-primary"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            onClick={() => openUserDetail(user)}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-100"
                            >
                              <Eye className=" h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
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
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback className="text-lg">
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      @{user.username}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Badge
                        variant="outline"
                        className={`${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(user.status)}`}
                      >
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openUserDetail(user)}
                    >
                      <Eye className="mr-1 h-3.5 w-3.5" />
                      View
                    </Button>
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
          <p className="text-sm text-muted-foreground">
            Showing 8 of 128 results
          </p>
        </div>
      </div>

      {/* User Detail Slide-in Panel */}
      <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>User Details</SheetTitle>
            <SheetDescription>
              View and manage user information
            </SheetDescription>
          </SheetHeader>
          {selectedUser && (
            <div className="mt-6 space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="mb-2 h-20 w-20">
                  <AvatarImage
                    src={selectedUser.profilePicture || "/placeholder.svg"}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback className="text-xl">
                    {selectedUser.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${getRoleColor(selectedUser.role)}`}
                  >
                    {selectedUser.role}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`${getStatusColor(
                      selectedUser.isActive ? "Active" : "Inactive"
                    )}`}
                  >
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Username
                    </h3>
                    <p>{selectedUser.username}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Email
                    </h3>
                    <div className="flex items-center gap-1">
                      <p className="truncate">{selectedUser.email}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Copy className="h-3.5 w-3.5" />
                        <span className="sr-only">Copy email</span>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Joined
                    </h3>
                    <p>{formatDate(selectedUser.createdAt)}</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="activity">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="blogs">Blogs</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                {/* <TabsContent value="blogs" className="space-y-4">
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
                </TabsContent> */}
                <TabsContent value="settings" className="space-y-4">
                  <h3 className="text-sm font-medium">User Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="user-role">User Role</Label>
                        <p className="text-xs text-muted-foreground">
                          Change the user's role
                        </p>
                      </div>
                      <div className="relative">
                        <Select 
                          defaultValue={selectedUser?.role?.toLowerCase()}
                          onValueChange={(value) => updateUserRole(selectedUser.id, value.charAt(0).toUpperCase() + value.slice(1))}
                          disabled={updatingRole === selectedUser.id}
                        >
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
                        {updatingRole === selectedUser.id && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <div className="h-3 w-3 animate-spin rounded-full border-b-2 border-primary"></div>
                          </div>
                        )}
                      </div>
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
                            <AlertDialogTitle>
                              Are you sure you want to delete this user?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the user account and remove all
                              associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-destructive text-destructive-foreground"
                              onClick={() => deleteUser(selectedUser.id)}
                            >
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
    </AdminLayout>
  );
}
