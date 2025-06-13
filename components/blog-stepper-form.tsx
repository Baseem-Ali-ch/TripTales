"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Save,
  Eye,
  Check,
  Loader2,
  Plus,
  X,
  ImageIcon,
  Calendar,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// Sample blog categories
const BLOG_CATEGORIES = [
  "Technology",
  "Design",
  "Productivity",
  "Lifestyle",
  "Health",
  "Travel",
  "Finance",
  "Education",
  "Marketing",
  "Career",
]

interface BlogStepperFormProps {
  isOpen: boolean
  onClose: () => void
  blog?: any
  onSave: (blogData: any) => void
  isAdmin?: boolean
}

export function BlogStepperForm({ isOpen, onClose, blog, onSave, isAdmin = false }: BlogStepperFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>(blog?.tags || [])
  const [tagInput, setTagInput] = useState("")
  const featuredImageRef = useRef<HTMLInputElement>(null)
  const additionalImagesRef = useRef<HTMLInputElement>(null)

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: blog?.title || "",
    category: blog?.category || "",
    content: blog?.content || "",
    excerpt: blog?.excerpt || "",
    status: blog?.status || "draft",
    featuredImage: blog?.featuredImage || null,
    additionalImages: blog?.additionalImages || [],
  })

  // Form validation state
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    content: "",
    featuredImage: "",
  })

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBlogForm({ ...blogForm, [name]: value })

    // Clear error when user types
    setErrors({
      ...errors,
      [name]: "",
    })

    // Simulate autosave
    triggerAutosave()
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setBlogForm({ ...blogForm, [name]: value })
    setErrors({
      ...errors,
      [name]: "",
    })
    triggerAutosave()
  }

  // Handle featured image upload
  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogForm({ ...blogForm, featuredImage: e.target.files[0] })
      setErrors({
        ...errors,
        featuredImage: "",
      })
      triggerAutosave()
    }
  }

  // Handle additional images upload
  const handleAdditionalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setBlogForm({
        ...blogForm,
        additionalImages: [...blogForm.additionalImages, ...newImages],
      })
      triggerAutosave()
    }
  }

  // Remove additional image
  const removeAdditionalImage = (index: number) => {
    const updatedImages = [...blogForm.additionalImages]
    updatedImages.splice(index, 1)
    setBlogForm({ ...blogForm, additionalImages: updatedImages })
    triggerAutosave()
  }

  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value)
  }

  // Add tag
  const addTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim()) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tagInput.trim()])
      setTagInput("")
      triggerAutosave()
    }
  }

  // Remove tag
  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
    triggerAutosave()
  }

  // Handle key press for tag input
  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  // Trigger autosave
  const triggerAutosave = () => {
    setLastSaved(new Date())
  }

  // Format time for autosave indicator
  const formatLastSaved = () => {
    if (!lastSaved) return ""
    return lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Validate form for current step
  const validateFormStep = (step: number) => {
    let valid = true
    const newErrors = { ...errors }

    if (step === 1) {
      if (!blogForm.title.trim()) {
        newErrors.title = "Title is required"
        valid = false
      }

      if (!blogForm.category) {
        newErrors.category = "Category is required"
        valid = false
      }
    } else if (step === 2) {
      if (!blogForm.content.trim() || blogForm.content.length < 100) {
        newErrors.content = "Content should be at least 100 characters"
        valid = false
      }
    } else if (step === 3) {
      if (!blogForm.featuredImage && !blog?.featuredImage) {
        newErrors.featuredImage = "Featured image is required"
        valid = false
      }
    }

    setErrors(newErrors)
    return valid
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateFormStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Handle form submission
  const handleSubmit = () => {
    setShowConfirmDialog(false)
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const blogData = {
        ...blogForm,
        tags: selectedTags,
        id: blog?.id || Date.now(),
      }

      onSave(blogData)
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form after success
      setTimeout(() => {
        setBlogForm({
          title: "",
          category: "",
          content: "",
          excerpt: "",
          status: "draft",
          featuredImage: null,
          additionalImages: [],
        })
        setSelectedTags([])
        setCurrentStep(1)
        setSubmitSuccess(null)
        setLastSaved(null)
        onClose()
      }, 2000)
    }, 1500)
  }

  // Toggle preview
  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  // Format text editor buttons
  const formatText = (command: string) => {
    document.execCommand(command, false)
    const editor = document.getElementById("blog-content")
    if (editor) {
      editor.focus()
    }
  }

  // Handle close
  const handleClose = () => {
    setBlogForm({
      title: "",
      category: "",
      content: "",
      excerpt: "",
      status: "draft",
      featuredImage: null,
      additionalImages: [],
    })
    setSelectedTags([])
    setCurrentStep(1)
    setErrors({
      title: "",
      category: "",
      content: "",
      featuredImage: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{blog ? "Edit Blog" : "Create New Blog"}</DialogTitle>
          <DialogDescription>
            {blog ? "Make changes to your blog post." : "Create a new blog post step by step."}
          </DialogDescription>
        </DialogHeader>

        {/* Multi-step Form Progress */}
        <div className="mb-8">
          <div className="flex justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex flex-col items-center relative w-full">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium z-10",
                    currentStep === step
                      ? "bg-primary text-primary-foreground"
                      : currentStep > step
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {currentStep > step ? <Check className="h-5 w-5" /> : step}
                </div>
                <div className="text-xs mt-2 text-center">
                  {step === 1 && "Basic Info"}
                  {step === 2 && "Content"}
                  {step === 3 && "Media"}
                  {step === 4 && "Review"}
                </div>
                {step < 4 && (
                  <div
                    className={cn(
                      "absolute top-5 left-1/2 w-full h-0.5",
                      currentStep > step ? "bg-primary" : "bg-muted",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Autosave Indicator */}
        {lastSaved && (
          <div className="flex items-center text-xs text-muted-foreground mb-4">
            <Save className="h-3 w-3 mr-1" />
            Draft saved at {formatLastSaved()}
          </div>
        )}

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>

            <div className="space-y-2">
              <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>
                Blog Title
              </Label>
              <Input
                id="title"
                name="title"
                value={blogForm.title}
                onChange={handleInputChange}
                className={errors.title ? "border-destructive" : ""}
                placeholder="Enter a compelling title for your blog"
              />
              {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className={errors.category ? "text-destructive" : ""}>
                  Category
                </Label>
                <Select value={blogForm.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-destructive text-sm">{errors.category}</p>}
              </div>

              {isAdmin && (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={blogForm.status} onValueChange={(value) => handleSelectChange("status", value)}>
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
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={blogForm.excerpt}
                onChange={handleInputChange}
                rows={3}
                placeholder="Write a brief description of your blog post"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (up to 5)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagKeyPress}
                  placeholder="Add a tag and press Enter"
                  disabled={selectedTags.length >= 5}
                />
                <Button type="button" onClick={addTag} disabled={!tagInput.trim() || selectedTags.length >= 5}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Tags help readers find your content. Press Enter or click the plus button to add a tag.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Content */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Write Your Content</h2>

            <div className="space-y-2">
              <Label htmlFor="blog-content" className={errors.content ? "text-destructive" : ""}>
                Content
              </Label>

              {/* Text Editor Toolbar */}
              <div className="flex flex-wrap gap-1 p-1 border rounded-t-md bg-muted">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => formatText("bold")}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => formatText("italic")}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => formatText("underline")}
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1 self-center" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => formatText("insertUnorderedList")}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => formatText("insertOrderedList")}
                  title="Numbered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1 self-center" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => formatText("justifyLeft")}
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => formatText("justifyCenter")}
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => formatText("justifyRight")}
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1 self-center" />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    const url = prompt("Enter URL:")
                    if (url) document.execCommand("createLink", false, url)
                  }}
                  title="Insert Link"
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>

              {/* Content Editable Div */}
              <Textarea
                id="blog-content"
                name="content"
                value={blogForm.content}
                onChange={handleInputChange}
                className={cn("min-h-[300px]", errors.content ? "border-destructive" : "")}
                placeholder="Write your blog content here..."
              />

              {errors.content && <p className="text-destructive text-sm">{errors.content}</p>}
              <p className="text-xs text-muted-foreground">
                Write your blog content here. Minimum 100 characters required.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Media */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Add Media</h2>

            <div className="space-y-2">
              <Label htmlFor="featured-image" className={errors.featuredImage ? "text-destructive" : ""}>
                Featured Image
              </Label>
              {blogForm.featuredImage || blog?.featuredImage ? (
                <div className="relative aspect-video w-full rounded-md overflow-hidden border">
                  <img
                    src={
                      blogForm.featuredImage
                        ? typeof blogForm.featuredImage === "string"
                          ? blogForm.featuredImage
                          : URL.createObjectURL(blogForm.featuredImage)
                        : blog?.featuredImage || "/placeholder.svg"
                    }
                    alt="Featured Image"
                    className="object-cover w-full h-full"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => setBlogForm({ ...blogForm, featuredImage: null })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className={cn(
                    "border-2 border-dashed rounded-md p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors",
                    errors.featuredImage ? "border-destructive" : "border-muted",
                  )}
                  onClick={() => featuredImageRef.current?.click()}
                >
                  <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-1">Click to upload your featured image</p>
                  <p className="text-xs text-muted-foreground">Recommended size: 1200 x 630 pixels</p>
                </div>
              )}
              <input
                ref={featuredImageRef}
                id="featured-image"
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageUpload}
                className="hidden"
              />
              {errors.featuredImage && <p className="text-destructive text-sm">{errors.featuredImage}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional-images">Additional Images (optional)</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {blogForm.additionalImages.map((image: any, index: number) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                    <img
                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                      alt={`Additional Image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeAdditionalImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                <div
                  className="border-2 border-dashed rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => additionalImagesRef.current?.click()}
                >
                  <Plus className="h-8 w-8 text-muted-foreground mb-1" />
                  <p className="text-xs text-muted-foreground text-center px-2">Add more images</p>
                </div>
              </div>
              <input
                ref={additionalImagesRef}
                id="additional-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesUpload}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">
                You can add multiple images to include in your blog content.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review & Submit</h2>

            <div className="space-y-6">
              {/* Preview Toggle */}
              <div className="flex justify-end">
                <Button type="button" variant="outline" onClick={togglePreview} className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
              </div>

              {showPreview ? (
                <div className="border rounded-md p-6">
                  {/* Blog Preview */}
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <h1>{blogForm.title}</h1>

                    {(blogForm.featuredImage || blog?.featuredImage) && (
                      <div className="relative aspect-video w-full rounded-md overflow-hidden mb-6">
                        <img
                          src={
                            blogForm.featuredImage
                              ? typeof blogForm.featuredImage === "string"
                                ? blogForm.featuredImage
                                : URL.createObjectURL(blogForm.featuredImage)
                              : blog?.featuredImage || "/placeholder.svg"
                          }
                          alt="Featured Image"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge>
                        {BLOG_CATEGORIES.find((c) => c.toLowerCase() === blogForm.category) || blogForm.category}
                      </Badge>
                      {selectedTags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>

                    {blogForm.excerpt && (
                      <p className="text-lg italic text-muted-foreground mb-6">{blogForm.excerpt}</p>
                    )}

                    <div dangerouslySetInnerHTML={{ __html: blogForm.content }} />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="border rounded-md p-6">
                    <h3 className="font-bold mb-4">Blog Summary</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium">Title</p>
                          <p className="text-muted-foreground">{blogForm.title}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Category</p>
                          <p className="text-muted-foreground">
                            {BLOG_CATEGORIES.find((c) => c.toLowerCase() === blogForm.category) || blogForm.category}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Tags</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedTags.length > 0 ? (
                            selectedTags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                #{tag}
                              </Badge>
                            ))
                          ) : (
                            <p className="text-muted-foreground">No tags added</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Content Length</p>
                        <p className="text-muted-foreground">
                          {blogForm.content.replace(/<[^>]*>/g, "").length} characters
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium">Media</p>
                        <p className="text-muted-foreground">
                          {blogForm.featuredImage || blog?.featuredImage
                            ? "Featured image uploaded"
                            : "No featured image"}{" "}
                          • {blogForm.additionalImages.length} additional images
                        </p>
                      </div>

                      {isAdmin && (
                        <div>
                          <p className="text-sm font-medium">Status</p>
                          <Badge variant="outline" className="capitalize">
                            {blogForm.status}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submission Guidelines */}
                  <div className="border rounded-md p-6 bg-muted/30">
                    <h3 className="font-bold mb-4">{isAdmin ? "Publishing Guidelines" : "Submission Guidelines"}</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>
                          {isAdmin
                            ? "Your blog post will be published immediately if status is set to 'Published'."
                            : "Your submission will be reviewed by our editorial team within 3-5 business days."}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>
                          {isAdmin
                            ? "You can save as draft and publish later if needed."
                            : "We may suggest edits or revisions to improve clarity, formatting, or content."}
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>
                          By {isAdmin ? "publishing" : "submitting"}, you confirm this is your original work and you
                          have the rights to all content.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>
                          {isAdmin
                            ? "Published content will be visible to all users and shared on social media channels."
                            : "If published, your content will be shared on our platform and social media channels."}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Form Navigation */}
        <DialogFooter className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <Button type="button" variant="outline" onClick={handlePrevStep}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNextStep}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button type="button" onClick={() => setShowConfirmDialog(true)} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {blog ? "Saving..." : "Submitting..."}
                </>
              ) : blog ? (
                "Save Changes"
              ) : (
                "Submit Blog"
              )}
            </Button>
          )}
        </DialogFooter>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">{blog ? "Confirm Changes" : "Confirm Submission"}</h3>
              <p className="mb-6">
                {blog
                  ? "Are you sure you want to save these changes to your blog post?"
                  : isAdmin
                    ? "Are you sure you want to create this blog post?"
                    : "Are you sure you want to submit your blog? Once submitted, it will be reviewed by our editorial team."}
              </p>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setShowConfirmDialog(false)}>
                  Cancel
                </Button>
                <Button type="button" onClick={handleSubmit}>
                  {blog ? "Save Changes" : "Confirm Submission"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess === true && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card border rounded-lg p-6 max-w-md w-full text-center">
              <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">{blog ? "Changes Saved!" : "Blog Submitted!"}</h3>
              <p className="text-muted-foreground">
                {blog
                  ? "Your blog post has been updated successfully."
                  : isAdmin
                    ? "Your blog post has been created successfully."
                    : "Thank you for your submission. Our editorial team will review your blog and get back to you soon."}
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
