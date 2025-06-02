"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Camera,
  Edit,
  Trash2,
  Eye,
  Heart,
  Clock,
  X,
  Check,
  Loader2,
  AlertCircle,
  Twitter,
  Github,
  Linkedin,
  Instagram,
  PenSquare,
  Save,
  CheckIcon,
  Bookmark,
  EyeOff,
  Lock,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Sample saved blogs data
const SAVED_BLOGS = [
  {
    id: 1,
    title: "The Future of Web Development: What to Expect in 2025",
    image: "/placeholder.svg?height=400&width=600&text=Web+Development",
    author: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=100&width=100&text=SW",
    },
    savedDate: "May 20, 2023",
  },
  {
    id: 2,
    title: "Understanding Blockchain Technology: A Beginner's Guide",
    image: "/placeholder.svg?height=400&width=600&text=Blockchain",
    author: {
      name: "David Kumar",
      avatar: "/placeholder.svg?height=100&width=100&text=DK",
    },
    savedDate: "May 18, 2023",
  },
  {
    id: 3,
    title: "Mastering Photography with Your Smartphone",
    image: "/placeholder.svg?height=400&width=600&text=Smartphone+Photography",
    author: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=100&width=100&text=JW",
    },
    savedDate: "May 15, 2023",
  },
  {
    id: 4,
    title: "Introduction to Artificial Intelligence and Machine Learning",
    image: "/placeholder.svg?height=400&width=600&text=AI+and+ML",
    author: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=100&width=100&text=PS",
    },
    savedDate: "May 10, 2023",
  },
];

// Sample user blogs data
const MY_BLOGS = [
  {
    id: 1,
    title: "10 Essential JavaScript Concepts Every Developer Should Know",
    image: "/placeholder.svg?height=400&width=600&text=JavaScript+Concepts",
    publishedDate: "May 15, 2023",
    views: 1245,
    likes: 245,
    status: "published",
  },
  {
    id: 2,
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    image: "/placeholder.svg?height=400&width=600&text=Accessibility",
    publishedDate: "April 28, 2023",
    views: 982,
    likes: 189,
    status: "published",
  },
  {
    id: 3,
    title: "The Complete Guide to CSS Grid Layout",
    image: "/placeholder.svg?height=400&width=600&text=CSS+Grid",
    publishedDate: "",
    views: 0,
    likes: 0,
    status: "draft",
  },
  {
    id: 4,
    title: "Optimizing React Applications for Performance",
    image: "/placeholder.svg?height=400&width=600&text=React+Performance",
    publishedDate: "",
    views: 0,
    likes: 0,
    status: "under-review",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("saved");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState(SAVED_BLOGS);
  const [myBlogs, setMyBlogs] = useState(MY_BLOGS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    profilePicture: "",
    coverPhoto: "",
    followers: 0,
    following: 0,
    isPublic: true,
    socialLinks: {
      twitter: "",
      github: "",
      linkedin: "",
      instagram: "",
    },
  });
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    twitter: "",
    github: "",
    linkedin: "",
    instagram: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    publicProfile: true,
  });
  const fileInputCoverRef = useRef<HTMLInputElement>(null);
  const fileInputProfileRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState({
    profile: false,
    cover: false,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        if (!response) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError("Failed to load profile data");
        console.log("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Initialize form data with user data
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        username: userData.username || "",
        email: userData.email || "",
        bio: userData?.bio || "",
        twitter: userData.socialLinks?.twitter || "",
        github: userData.socialLinks?.github || "",
        linkedin: userData.socialLinks?.linkedin || "",
        instagram: userData.socialLinks?.instagram || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        publicProfile: userData?.isPublic ?? true,
      });
    }
  }, [userData]);

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 mx-auto text-destructive" />
          <p className="mt-2 text-destructive">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Handle remove saved blog
  const handleRemoveSaved = (id: number) => {
    setSavedBlogs(savedBlogs.filter((blog) => blog.id !== id));
  };

  // Handle delete blog
  const handleDeleteBlog = (id: number) => {
    setMyBlogs(myBlogs.filter((blog) => blog.id !== id));
  };

  const handleFileUpload = async (file: File, type: "profile" | "cover") => {
    try {
      // Validate file size (max 5MB)
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
      if (file.size > MAX_FILE_SIZE) {
        throw new Error("File size too large. Maximum size is 5MB.");
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error(
          "Invalid file type. Please upload a JPEG, PNG, or WebP image."
        );
      }

      setIsUploading((prev) => ({ ...prev, [type]: true }));

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);

      const uploadResponse = await fetch("/api/user/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image");
      }

      const { url } = await uploadResponse.json();

      // Update user profile with new image URL
      const updateResponse = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [type === "profile" ? "profilePicture" : "coverPhoto"]: url,
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update profile");
      }

      // Update local state
      setUserData((prev: any) => ({
        ...prev,
        [type === "profile" ? "profilePicture" : "coverPhoto"]: url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(
        error instanceof Error ? error.message : "Failed to upload image"
      );
    } finally {
      setIsUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // Update the existing handlers
  const handleProfilePictureUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0], "profile");
    }
  };

  const handleCoverPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0], "cover");
    }
  };

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check password strength
    if (name === "newPassword") {
      checkPasswordStrength(value);
    }
  };

  // Handle switch change
  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, publicProfile: checked });
  };

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    setPasswordRequirements(requirements);

    // Calculate strength percentage
    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const strengthPercentage = (metRequirements / 5) * 100;
    setPasswordStrength(strengthPercentage);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // Validate password if changing
      if (formData.newPassword || formData.currentPassword) {
        if (!formData.currentPassword) {
          throw new Error("Current password is required");
        }
        if (!formData.newPassword) {
          throw new Error("New password is required");
        }
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        // Check password requirements
        if (passwordStrength < 80) {
          throw new Error("Password does not meet security requirements");
        }
      }

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setUserData(data);
      setSaveSuccess(true);

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(null);
        setIsEditingProfile(false);
      }, 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setSaveSuccess(false);
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  // Reset form when canceling edit
  const handleCancelEdit = () => {
    setFormData({
      name: userData.name || "",
      username: userData.username || "",
      email: userData.email || "",
      bio: userData?.bio || "",
      twitter: userData.socialLinks?.twitter || "",
      github: userData.socialLinks?.github || "",
      linkedin: userData.socialLinks?.linkedin || "",
      instagram: userData.socialLinks?.instagram || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      publicProfile: userData?.isPublic ?? true,
    });
    setIsEditingProfile(false);
    setSaveSuccess(null);
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Profile Header */}
        <section className="relative">
          {/* Cover Photo */}
          <div className="relative h-48 md:h-64 lg:h-80 overflow-hidden">
            <Image
              src={userData.coverPhoto || "/placeholder.svg"}
              alt="Cover Photo"
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={() => fileInputCoverRef.current?.click()}
              className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-colors"
              disabled={isUploading.cover}
            >
              {isUploading.cover ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Camera className="h-5 w-5" />
              )}
            </button>
            <input
              ref={fileInputCoverRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverPhotoUpload}
              aria-label="Upload cover photo"
            />
          </div>

          <div className="container mx-auto mt-10">
            <div className="relative -mt-16 md:-mt-20 flex flex-col md:flex-row md:items-end md:justify-between mb-8">
              {/* Profile Picture */}
              <div className="flex flex-col md:flex-row md:items-end">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage
                      src={userData.profilePicture || "/placeholder.svg"}
                      alt={userData.name}
                    />
                    <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <button
                    onClick={() => fileInputProfileRef.current?.click()}
                    className="absolute bottom-1 right-1 bg-background p-1.5 rounded-full hover:bg-muted transition-colors"
                    disabled={isUploading.cover}
                  >
                    {isUploading.profile ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Camera className="h-5 w-5" />
                    )}
                  </button>
                  <input
                    ref={fileInputProfileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureUpload}
                    aria-label="Upload profile picture"
                  />
                </div>

                <div className="mt-4 md:mt-0 md:ml-6">
                  <h1 className="text-2xl md:text-3xl font-bold">
                    {userData.name}
                  </h1>
                  <p className="text-muted-foreground">@{userData.username}</p>
                </div>
              </div>

              {/* Stats and Edit Button */}
              <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="font-bold">{userData.followers}</p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold">{userData.following}</p>
                    <p className="text-sm text-muted-foreground">Following</p>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  variant={isEditingProfile ? "outline" : "default"}
                  className="md:ml-4"
                >
                  {isEditingProfile ? "Cancel Edit" : "Edit Profile"}
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="md:ml-4"
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    "Logout"
                  )}
                </Button>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <p className="text-muted-foreground">{userData.bio}</p>
            </div>

            {/* Profile Settings Section */}
            {isEditingProfile && (
              <div className="mb-8 border rounded-lg p-6 bg-card animate-in fade-in-50 duration-300">
                <h2 className="text-xl font-bold mb-6">Edit Profile</h2>

                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="links">Links</TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Details Tab */}
                    <TabsContent value="details" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>
                      </div>

                      {/* Profile Visibility */}
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                          Profile Visibility
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="publicProfile"
                            checked={formData.publicProfile}
                            onCheckedChange={handleSwitchChange}
                          />
                          <Label htmlFor="publicProfile">
                            Make my profile public
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          When your profile is public, anyone can see your
                          published blogs and profile information.
                        </p>
                      </div>
                    </TabsContent>

                    {/* Password Tab */}
                    <TabsContent value="password" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">
                            Current Password
                          </Label>

                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="currentPassword"
                              name="currentPassword"
                              type={showPassword ? "text" : "password"}
                              value={formData.currentPassword}
                              onChange={handleInputChange}
                              className="pl-10"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              onClick={() => setShowPassword(!showPassword)}
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="newPassword"
                                name="newPassword"
                                type={showPassword ? "text" : "password"}
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className="pl-10"
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            {formData.newPassword && (
                              <div className="mt-2 space-y-2">
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Password strength</span>
                                    <span>
                                      {passwordStrength < 40
                                        ? "Weak"
                                        : passwordStrength < 80
                                        ? "Medium"
                                        : "Strong"}
                                    </span>
                                  </div>
                                  <Progress
                                    value={passwordStrength}
                                    className={cn(
                                      passwordStrength < 40
                                        ? "text-destructive"
                                        : passwordStrength < 80
                                        ? "text-amber-500"
                                        : "text-green-500"
                                    )}
                                  />
                                </div>
                                <ul className="space-y-1 text-xs">
                                  <li
                                    className={cn(
                                      "flex items-center gap-1",
                                      passwordRequirements.length
                                        ? "text-green-500"
                                        : "text-muted-foreground"
                                    )}
                                  >
                                    {passwordRequirements.length ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <X className="h-3 w-3" />
                                    )}
                                    At least 8 characters
                                  </li>
                                  <li
                                    className={cn(
                                      "flex items-center gap-1",
                                      passwordRequirements.uppercase
                                        ? "text-green-500"
                                        : "text-muted-foreground"
                                    )}
                                  >
                                    {passwordRequirements.uppercase ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <X className="h-3 w-3" />
                                    )}
                                    One uppercase letter
                                  </li>
                                  <li
                                    className={cn(
                                      "flex items-center gap-1",
                                      passwordRequirements.lowercase
                                        ? "text-green-500"
                                        : "text-muted-foreground"
                                    )}
                                  >
                                    {passwordRequirements.lowercase ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <X className="h-3 w-3" />
                                    )}
                                    One lowercase letter
                                  </li>
                                  <li
                                    className={cn(
                                      "flex items-center gap-1",
                                      passwordRequirements.number
                                        ? "text-green-500"
                                        : "text-muted-foreground"
                                    )}
                                  >
                                    {passwordRequirements.number ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <X className="h-3 w-3" />
                                    )}
                                    One number
                                  </li>
                                  <li
                                    className={cn(
                                      "flex items-center gap-1",
                                      passwordRequirements.special
                                        ? "text-green-500"
                                        : "text-muted-foreground"
                                    )}
                                  >
                                    {passwordRequirements.special ? (
                                      <Check className="h-3 w-3" />
                                    ) : (
                                      <X className="h-3 w-3" />
                                    )}
                                    One special character
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">
                              Confirm New Password
                            </Label>

                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="pl-10"
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                            {formData.newPassword &&
                              formData.confirmPassword && (
                                <p
                                  className={cn(
                                    "text-xs mt-1",
                                    formData.newPassword ===
                                      formData.confirmPassword
                                      ? "text-green-500"
                                      : "text-destructive"
                                  )}
                                >
                                  {formData.newPassword ===
                                  formData.confirmPassword ? (
                                    <span className="flex items-center gap-1">
                                      <Check className="h-3 w-3" /> Passwords
                                      match
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1">
                                      <X className="h-3 w-3" /> Passwords do not
                                      match
                                    </span>
                                  )}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Links Tab */}
                    <TabsContent value="links" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="twitter"
                            className="flex items-center gap-2"
                          >
                            <Twitter className="h-4 w-4" /> Twitter
                          </Label>
                          <Input
                            id="twitter"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            placeholder="https://twitter.com/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="github"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-4 w-4" /> GitHub
                          </Label>
                          <Input
                            id="github"
                            name="github"
                            value={formData.github}
                            onChange={handleInputChange}
                            placeholder="https://github.com/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="linkedin"
                            className="flex items-center gap-2"
                          >
                            <Linkedin className="h-4 w-4" /> LinkedIn
                          </Label>
                          <Input
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            placeholder="https://linkedin.com/in/username"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="instagram"
                            className="flex items-center gap-2"
                          >
                            <Instagram className="h-4 w-4" /> Instagram
                          </Label>
                          <Input
                            id="instagram"
                            name="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                            placeholder="https://instagram.com/username"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4 mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>

                    {/* Success/Error Message */}
                    {saveSuccess !== null && (
                      <div
                        className={cn(
                          "p-3 rounded-md flex items-center gap-2 text-sm",
                          saveSuccess
                            ? "bg-green-500/10 text-green-500 border border-green-500/20"
                            : "bg-destructive/10 text-destructive border border-destructive/20"
                        )}
                      >
                        {saveSuccess ? (
                          <>
                            <Check className="h-4 w-4" />
                            Profile updated successfully!
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4" />
                            There was an error updating your profile. Please try
                            again.
                          </>
                        )}
                      </div>
                    )}
                  </form>
                </Tabs>
              </div>
            )}

            {/* Tabs Navigation */}
            <Tabs
              defaultValue="saved"
              className="mb-8"
              onValueChange={handleTabChange}
            >
              <TabsList className="grid w-full grid-cols-2 mb-8 h-13">
                <TabsTrigger value="saved" className="text-base py-3">
                  Saved Blogs{" "}
                  <Badge variant="outline" className="ml-2">
                    {savedBlogs.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="my-blogs" className="text-base py-3">
                  My Blogs{" "}
                  <Badge variant="outline" className="ml-2">
                    {myBlogs.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              {/* Saved Blogs Tab Content */}
              <TabsContent value="saved" className="mt-0">
                {savedBlogs.length === 0 ? (
                  <EmptyState
                    title="No saved blogs yet"
                    description="Blogs you save will appear here. Start exploring and save blogs you find interesting!"
                    icon={<Save className="h-12 w-12 text-muted-foreground" />}
                    action={
                      <Button asChild>
                        <Link href="/blogs">Explore Blogs</Link>
                      </Button>
                    }
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedBlogs.map((blog) => (
                      <SavedBlogCard
                        key={blog.id}
                        blog={blog}
                        onRemove={handleRemoveSaved}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* My Blogs Tab Content */}
              <TabsContent value="my-blogs" className="mt-0">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Blogs</h2>
                  <Button>
                    <PenSquare className="mr-2 h-4 w-4" />
                    Write New Blog
                  </Button>
                </div>

                {myBlogs.length === 0 ? (
                  <EmptyState
                    title="You haven't written any blogs yet"
                    description="Share your knowledge and insights with the world by writing your first blog post."
                    icon={
                      <PenSquare className="h-12 w-12 text-muted-foreground" />
                    }
                    action={
                      <Button>
                        <PenSquare className="mr-2 h-4 w-4" />
                        Write Your First Blog
                      </Button>
                    }
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myBlogs.map((blog) => (
                      <MyBlogCard
                        key={blog.id}
                        blog={blog}
                        onDelete={handleDeleteBlog}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Saved Blog Card Component
interface SavedBlogCardProps {
  blog: {
    id: number;
    title: string;
    image: string;
    author: {
      name: string;
      avatar: string;
    };
    savedDate: string;
  };
  onRemove: (id: number) => void;
}

function SavedBlogCard({ blog, onRemove }: SavedBlogCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg">
      <Link href={`/blog/${blog.id}`} className="block">
        <div className="relative aspect-video w-full">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <Image
                  src={blog.author.avatar || "/placeholder.svg"}
                  alt={blog.author.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-xs">{blog.author.name}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              Saved {blog.savedDate}
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove(blog.id);
        }}
        className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
        aria-label="Remove from saved"
      >
        {/* <X className="h-4 w-4" /> */}
        <Bookmark className="h-4 w-4 fill-primary text-primary bg-primary/10" />
      </button>
    </div>
  );
}

// My Blog Card Component
interface MyBlogCardProps {
  blog: {
    id: number;
    title: string;
    image: string;
    publishedDate: string;
    views: number;
    likes: number;
    status: string;
  };
  onDelete: (id: number) => void;
}

function MyBlogCard({ blog, onDelete }: MyBlogCardProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      case "under-review":
        return <Badge className="bg-amber-500">Under Review</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-video w-full">
        <Image
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2">
          {getStatusBadge(blog.status)}
        </div>
      </div>
      <div className="p-5">
        <Link href={blog.status === "published" ? `/blog/${blog.id}` : "#"}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between mb-4">
          {blog.status === "published" ? (
            <>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {blog.publishedDate}
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center text-xs text-muted-foreground">
                  <Eye className="w-3 h-3 mr-1" />
                  {blog.views}
                </span>
                <span className="flex items-center text-xs text-muted-foreground">
                  <Heart className="w-3 h-3 mr-1" />
                  {blog.likes}
                </span>
              </div>
            </>
          ) : (
            <div className="text-xs text-muted-foreground">
              {blog.status === "draft"
                ? "Not published yet"
                : "Awaiting approval"}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button asChild size="sm" variant="outline">
            <Link href={`/blog/edit/${blog.id}`}>
              <Edit className="mr-1 h-3.5 w-3.5" />
            </Link>
          </Button>

          {showConfirmDelete ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowConfirmDelete(false)}
                className="text-xs"
              >
                <X className="mr-1 h-3.5 w-3.5" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  onDelete(blog.id);
                  setShowConfirmDelete(false);
                }}
                className="text-xs"
              >
                <CheckIcon className="mr-1 h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setShowConfirmDelete(true)}
            >
              <Trash2 className="mr-1 h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: React.ReactNode;
}

function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="mb-4 text-muted-foreground">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action}
    </div>
  );
}
