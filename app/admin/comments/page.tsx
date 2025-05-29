"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  MessageSquare,
  Search,
  MoreHorizontal,
  Check,
  Reply,
  Eye,
  Edit,
  Trash2,
  Download,
  Clock,
  Flag,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// Mock data for comments
const mockComments = [
  {
    id: 1,
    content:
      "This is a great article! I really enjoyed reading about the latest trends in web development. The examples you provided were very helpful.",
    author: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    blogPost: {
      id: 1,
      title: "Getting Started with Next.js 14",
    },
    status: "approved",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    replies: [
      {
        id: 2,
        content: "Thank you for the feedback! I'm glad you found it helpful.",
        author: {
          name: "Admin",
          email: "admin@blog.com",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        isAdmin: true,
        createdAt: "2024-01-15T11:00:00Z",
      },
    ],
  },
  {
    id: 3,
    content: "I disagree with some of the points made in this article. The approach seems outdated.",
    author: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    blogPost: {
      id: 2,
      title: "React vs Vue: A Comprehensive Comparison",
    },
    status: "pending",
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
    replies: [],
  },
  {
    id: 4,
    content: "Spam content here with suspicious links...",
    author: {
      name: "Spammer",
      email: "spam@spam.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    blogPost: {
      id: 1,
      title: "Getting Started with Next.js 14",
    },
    status: "spam",
    createdAt: "2024-01-13T09:20:00Z",
    updatedAt: "2024-01-13T09:20:00Z",
    replies: [],
  },
]

export default function CommentsPage() {
  const [comments, setComments] = useState(mockComments)
  const [selectedComments, setSelectedComments] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [blogFilter, setBlogFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState("table")
  const [showCommentDetail, setShowCommentDetail] = useState(false)
  const [selectedComment, setSelectedComment] = useState<any>(null)
  const [showReplyDialog, setShowReplyDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [editContent, setEditContent] = useState("")
  const [expandedComments, setExpandedComments] = useState<number[]>([])

  // Stats calculation
  const totalComments = comments.length
  const approvedComments = comments.filter((c) => c.status === "approved").length
  const pendingComments = comments.filter((c) => c.status === "pending").length
  const spamComments = comments.filter((c) => c.status === "spam").length

  // Filter and sort comments
  const filteredComments = comments
    .filter((comment) => {
      const matchesSearch =
        comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.author.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || comment.status === statusFilter
      const matchesBlog = blogFilter === "all" || comment.blogPost.id.toString() === blogFilter

      return matchesSearch && matchesStatus && matchesBlog
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        default:
          return 0
      }
    })

  const handleSelectComment = (commentId: number) => {
    setSelectedComments((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId],
    )
  }

  const handleSelectAll = () => {
    if (selectedComments.length === filteredComments.length) {
      setSelectedComments([])
    } else {
      setSelectedComments(filteredComments.map((c) => c.id))
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedComments.length === 0) return

    setComments((prev) =>
      prev.map((comment) => (selectedComments.includes(comment.id) ? { ...comment, status: action as any } : comment)),
    )
    setSelectedComments([])
  }

  const handleStatusChange = (commentId: number, newStatus: string) => {
    setComments((prev) =>
      prev.map((comment) => (comment.id === commentId ? { ...comment, status: newStatus as any } : comment)),
    )
  }

  const handleViewComment = (comment: any) => {
    setSelectedComment(comment)
    setShowCommentDetail(true)
  }

  const handleReplyToComment = (comment: any) => {
    setSelectedComment(comment)
    setReplyContent("")
    setShowReplyDialog(true)
  }

  const handleEditComment = (comment: any) => {
    setSelectedComment(comment)
    setEditContent(comment.content)
    setShowEditDialog(true)
  }

  const handleDeleteComment = (comment: any) => {
    setSelectedComment(comment)
    setShowDeleteDialog(true)
  }

  const submitReply = () => {
    if (!replyContent.trim()) return

    // Add reply to the comment
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === selectedComment.id
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  content: replyContent,
                  author: {
                    name: "Admin",
                    email: "admin@blog.com",
                    avatar: "/placeholder.svg?height=40&width=40",
                  },
                  isAdmin: true,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : comment,
      ),
    )

    setShowReplyDialog(false)
    setReplyContent("")
  }

  const submitEdit = () => {
    if (!editContent.trim()) return

    setComments((prev) =>
      prev.map((comment) => (comment.id === selectedComment.id ? { ...comment, content: editContent } : comment)),
    )

    setShowEditDialog(false)
    setEditContent("")
  }

  const confirmDelete = () => {
    setComments((prev) => prev.filter((comment) => comment.id !== selectedComment.id))
    setShowDeleteDialog(false)
  }

  const toggleCommentExpansion = (commentId: number) => {
    setExpandedComments((prev) =>
      prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId],
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "spam":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Spam</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Comments Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Moderate and manage user comments</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Comments</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalComments}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
                  <p className="text-2xl font-bold text-green-600">{approvedComments}</p>
                </div>
                <Check className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{pendingComments}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Spam</p>
                  <p className="text-2xl font-bold text-red-600">{spamComments}</p>
                </div>
                <Flag className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search comments, authors, or emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={blogFilter} onValueChange={setBlogFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Blog Post" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Posts</SelectItem>
                    <SelectItem value="1">Next.js 14</SelectItem>
                    <SelectItem value="2">React vs Vue</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
                {selectedComments.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Bulk Actions ({selectedComments.length})</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleBulkAction("approved")}>
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkAction("pending")}>
                        <Clock className="mr-2 h-4 w-4" />
                        Mark as Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkAction("spam")}>
                        <Flag className="mr-2 h-4 w-4" />
                        Mark as Spam
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Comments ({filteredComments.length})</CardTitle>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedComments.length === filteredComments.length && filteredComments.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Select All</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-4 p-6">
              {filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedComments.includes(comment.id)}
                      onCheckedChange={() => handleSelectComment(comment.id)}
                    />
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{comment.author.name}</span>
                          <span className="text-sm text-gray-500">{comment.author.email}</span>
                          {getStatusBadge(comment.status)}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewComment(comment)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditComment(comment)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleReplyToComment(comment)}>
                              <Reply className="mr-2 h-4 w-4" />
                              Reply
                            </DropdownMenuItem>
                            {comment.status !== "approved" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(comment.id, "approved")}>
                                <Check className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {comment.status !== "spam" && (
                              <DropdownMenuItem onClick={() => handleStatusChange(comment.id, "spam")}>
                                <Flag className="mr-2 h-4 w-4" />
                                Mark as Spam
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDeleteComment(comment)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        On: <span className="font-medium">{comment.blogPost.title}</span> •
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-gray-900 dark:text-white">
                        {expandedComments.includes(comment.id) || comment.content.length <= 200
                          ? comment.content
                          : `${comment.content.substring(0, 200)}...`}
                        {comment.content.length > 200 && (
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => toggleCommentExpansion(comment.id)}
                            className="p-0 h-auto ml-2"
                          >
                            {expandedComments.includes(comment.id) ? (
                              <>
                                Show Less <ChevronUp className="ml-1 h-3 w-3" />
                              </>
                            ) : (
                              <>
                                Show More <ChevronDown className="ml-1 h-3 w-3" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                      {comment.replies.length > 0 && (
                        <div className="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-2">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">{reply.author.name}</span>
                                  {reply.isAdmin && (
                                    <Badge variant="secondary" className="text-xs">
                                      Admin
                                    </Badge>
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline">Load More Comments</Button>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Showing {filteredComments.length} of {totalComments} comments
          </p>
        </div>
      </div>

      {/* Comment Detail Dialog */}
      <Dialog open={showCommentDetail} onOpenChange={setShowCommentDetail}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comment Details</DialogTitle>
            <DialogDescription>View and manage comment information</DialogDescription>
          </DialogHeader>
          {selectedComment && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedComment.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedComment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedComment.author.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedComment.author.email}</p>
                </div>
                {getStatusBadge(selectedComment.status)}
              </div>
              <div>
                <Label className="text-sm font-medium">Blog Post</Label>
                <p className="text-sm">{selectedComment.blogPost.title}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Comment</Label>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-md">{selectedComment.content}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Created</Label>
                  <p className="text-sm">{new Date(selectedComment.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Updated</Label>
                  <p className="text-sm">{new Date(selectedComment.updatedAt).toLocaleString()}</p>
                </div>
              </div>
              {selectedComment.replies.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Replies ({selectedComment.replies.length})</Label>
                  <div className="space-y-2 mt-2">
                    {selectedComment.replies.map((reply: any) => (
                      <div key={reply.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{reply.author.name}</span>
                          {reply.isAdmin && (
                            <Badge variant="secondary" className="text-xs">
                              Admin
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCommentDetail(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setShowCommentDetail(false)
                handleReplyToComment(selectedComment)
              }}
            >
              Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reply to Comment</DialogTitle>
            <DialogDescription>Add your response to this comment</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reply">Your Reply</Label>
              <Textarea
                id="reply"
                placeholder="Type your reply here..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReplyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitReply} disabled={!replyContent.trim()}>
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>Modify the comment content</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit">Comment Content</Label>
              <Textarea id="edit" value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitEdit} disabled={!editContent.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the comment and all its replies.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
