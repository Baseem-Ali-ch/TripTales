"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Folder,
  Tag,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Download,
  Upload,
  GripVertical,
  Eye,
  Hash,
  Users,
} from "lucide-react"

// Mock data for categories
const mockCategories = [
  {
    id: 1,
    name: "Technology",
    slug: "technology",
    description: "Articles about latest technology trends and innovations",
    color: "#3b82f6",
    blogCount: 15,
    parentId: null,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Web Development",
    slug: "web-development",
    description: "Frontend and backend development tutorials",
    color: "#10b981",
    blogCount: 8,
    parentId: 1,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: 3,
    name: "Design",
    slug: "design",
    description: "UI/UX design principles and best practices",
    color: "#f59e0b",
    blogCount: 6,
    parentId: null,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-13T09:20:00Z",
  },
  {
    id: 4,
    name: "Mobile Development",
    slug: "mobile-development",
    description: "iOS and Android app development",
    color: "#8b5cf6",
    blogCount: 4,
    parentId: 1,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-12T14:10:00Z",
  },
]

// Mock data for tags
const mockTags = [
  {
    id: 1,
    name: "React",
    slug: "react",
    description: "React.js library and ecosystem",
    color: "#61dafb",
    blogCount: 12,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "Next.js",
    slug: "nextjs",
    description: "Next.js framework for React",
    color: "#000000",
    blogCount: 8,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "TypeScript",
    slug: "typescript",
    description: "TypeScript programming language",
    color: "#3178c6",
    blogCount: 10,
    createdAt: "2024-01-03T00:00:00Z",
  },
  {
    id: 4,
    name: "CSS",
    slug: "css",
    description: "Cascading Style Sheets",
    color: "#1572b6",
    blogCount: 6,
    createdAt: "2024-01-04T00:00:00Z",
  },
  {
    id: 5,
    name: "JavaScript",
    slug: "javascript",
    description: "JavaScript programming language",
    color: "#f7df1e",
    blogCount: 15,
    createdAt: "2024-01-05T00:00:00Z",
  },
]

export default function CategoriesTagsPage() {
  const [categories, setCategories] = useState(mockCategories)
  const [tags, setTags] = useState(mockTags)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("categories")

  // Dialog states
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [showTagDialog, setShowTagDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [deleteItem, setDeleteItem] = useState<any>(null)

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#3b82f6",
    parentId: null,
  })

  const [tagForm, setTagForm] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#3b82f6",
  })

  // Stats calculation
  const totalCategories = categories.length
  const totalTags = tags.length
  const totalCategoryBlogs = categories.reduce((sum, cat) => sum + cat.blogCount, 0)
  const totalTagBlogs = tags.reduce((sum, tag) => sum + tag.blogCount, 0)

  // Filter functions
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Category functions
  const handleCreateCategory = () => {
    setCategoryForm({
      name: "",
      slug: "",
      description: "",
      color: "#3b82f6",
      parentId: null,
    })
    setEditingItem(null)
    setShowCategoryDialog(true)
  }

  const handleEditCategory = (category: any) => {
    setCategoryForm({
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      parentId: category.parentId,
    })
    setEditingItem(category)
    setShowCategoryDialog(true)
  }

  const handleDeleteCategory = (category: any) => {
    setDeleteItem(category)
    setShowDeleteDialog(true)
  }

  const submitCategory = () => {
    if (editingItem) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingItem.id ? { ...cat, ...categoryForm, updatedAt: new Date().toISOString() } : cat,
        ),
      )
    } else {
      const newCategory = {
        id: Date.now(),
        ...categoryForm,
        slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, "-"),
        blogCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      setCategories((prev) => [...prev, newCategory])
    }
    setShowCategoryDialog(false)
  }

  // Tag functions
  const handleCreateTag = () => {
    setTagForm({
      name: "",
      slug: "",
      description: "",
      color: "#3b82f6",
    })
    setEditingItem(null)
    setShowTagDialog(true)
  }

  const handleEditTag = (tag: any) => {
    setTagForm({
      name: tag.name,
      slug: tag.slug,
      description: tag.description,
      color: tag.color,
    })
    setEditingItem(tag)
    setShowTagDialog(true)
  }

  const handleDeleteTag = (tag: any) => {
    setDeleteItem(tag)
    setShowDeleteDialog(true)
  }

  const submitTag = () => {
    if (editingItem) {
      setTags((prev) => prev.map((tag) => (tag.id === editingItem.id ? { ...tag, ...tagForm } : tag)))
    } else {
      const newTag = {
        id: Date.now(),
        ...tagForm,
        slug: tagForm.slug || tagForm.name.toLowerCase().replace(/\s+/g, "-"),
        blogCount: 0,
        createdAt: new Date().toISOString(),
      }
      setTags((prev) => [...prev, newTag])
    }
    setShowTagDialog(false)
  }

  const confirmDelete = () => {
    if (activeTab === "categories") {
      setCategories((prev) => prev.filter((cat) => cat.id !== deleteItem.id))
    } else {
      setTags((prev) => prev.filter((tag) => tag.id !== deleteItem.id))
    }
    setShowDeleteDialog(false)
  }

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleSelectTag = (tagId: number) => {
    setSelectedTags((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]))
  }

  const getParentCategory = (parentId: number | null) => {
    if (!parentId) return null
    return categories.find((cat) => cat.id === parentId)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories & Tags</h1>
            <p className="text-gray-600 dark:text-gray-400">Organize your blog content with categories and tags</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalCategories}</p>
                </div>
                <Folder className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTags}</p>
                </div>
                <Tag className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Category Posts</p>
                  <p className="text-2xl font-bold text-purple-600">{totalCategoryBlogs}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tagged Posts</p>
                  <p className="text-2xl font-bold text-orange-600">{totalTagBlogs}</p>
                </div>
                <Hash className="h-8 w-8 text-orange-600" />
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
                    placeholder="Search categories and tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Categories ({filteredCategories.length})</CardTitle>
                  <Button onClick={handleCreateCategory}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2 p-6">
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleSelectCategory(category.id)}
                        />
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{category.name}</h3>
                            {getParentCategory(category.parentId) && (
                              <Badge variant="outline" className="text-xs">
                                {getParentCategory(category.parentId)?.name}
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-xs">
                              {category.blogCount} posts
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{category.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                            <span>Slug: {category.slug}</span>
                            <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                            <span>Updated: {new Date(category.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Posts
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteCategory(category)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tags Tab */}
          <TabsContent value="tags" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tags ({filteredTags.length})</CardTitle>
                  <Button onClick={handleCreateTag}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Tag
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {filteredTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedTags.includes(tag.id)}
                            onCheckedChange={() => handleSelectTag(tag.id)}
                          />
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }} />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditTag(tag)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Posts
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteTag(tag)} className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="mt-3">
                        <h3 className="font-medium text-lg">{tag.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tag.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <Badge variant="secondary" className="text-xs">
                            {tag.blogCount} posts
                          </Badge>
                          <span className="text-xs text-gray-500">{new Date(tag.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Category" : "Create New Category"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update category information" : "Add a new category to organize your blog posts"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category-name">Name</Label>
              <Input
                id="category-name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Category name"
              />
            </div>
            <div>
              <Label htmlFor="category-slug">Slug</Label>
              <Input
                id="category-slug"
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="category-slug (auto-generated if empty)"
              />
            </div>
            <div>
              <Label htmlFor="category-description">Description</Label>
              <Textarea
                id="category-description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Category description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="category-parent">Parent Category</Label>
              <Select
                value={categoryForm.parentId?.toString() || "none"}
                onValueChange={(value) =>
                  setCategoryForm((prev) => ({
                    ...prev,
                    parentId: value === "none" ? null : Number.parseInt(value),
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Parent</SelectItem>
                  {categories
                    .filter((cat) => !editingItem || cat.id !== editingItem.id)
                    .map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category-color">Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="category-color"
                  type="color"
                  value={categoryForm.color}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, color: e.target.value }))}
                  className="w-16 h-10"
                />
                <Input
                  value={categoryForm.color}
                  onChange={(e) => setCategoryForm((prev) => ({ ...prev, color: e.target.value }))}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitCategory} disabled={!categoryForm.name.trim()}>
              {editingItem ? "Update" : "Create"} Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tag Dialog */}
      <Dialog open={showTagDialog} onOpenChange={setShowTagDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Tag" : "Create New Tag"}</DialogTitle>
            <DialogDescription>
              {editingItem ? "Update tag information" : "Add a new tag to label your blog posts"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tag-name">Name</Label>
              <Input
                id="tag-name"
                value={tagForm.name}
                onChange={(e) => setTagForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Tag name"
              />
            </div>
            <div>
              <Label htmlFor="tag-slug">Slug</Label>
              <Input
                id="tag-slug"
                value={tagForm.slug}
                onChange={(e) => setTagForm((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="tag-slug (auto-generated if empty)"
              />
            </div>
            <div>
              <Label htmlFor="tag-description">Description</Label>
              <Textarea
                id="tag-description"
                value={tagForm.description}
                onChange={(e) => setTagForm((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Tag description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="tag-color">Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="tag-color"
                  type="color"
                  value={tagForm.color}
                  onChange={(e) => setTagForm((prev) => ({ ...prev, color: e.target.value }))}
                  className="w-16 h-10"
                />
                <Input
                  value={tagForm.color}
                  onChange={(e) => setTagForm((prev) => ({ ...prev, color: e.target.value }))}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTagDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitTag} disabled={!tagForm.name.trim()}>
              {editingItem ? "Update" : "Create"} Tag
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
              This action cannot be undone. This will permanently delete the {activeTab.slice(0, -1)}"{deleteItem?.name}
              " and remove it from all associated blog posts.
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
