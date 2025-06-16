"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Mail, MapPin, Calendar, Shield, Bell, Camera, Save, Eye, EyeOff, Activity, Settings } from "lucide-react"

export default function AdminProfilePage() {
  const [showPassword, setShowPassword] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Experienced blog administrator with a passion for content management and user engagement.",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Super Admin",
    joinDate: "2023-01-15",
    lastLogin: "2024-01-20 14:30",
    notifications: {
      email: true,
      push: true,
      comments: true,
      newPosts: false,
      userRegistrations: true,
    },
  })

  const recentActivity = [
    { action: 'Published blog post "Advanced React Patterns"', time: "2 hours ago", type: "post" },
    { action: "Approved 5 comments", time: "4 hours ago", type: "comment" },
    { action: "Updated user permissions for Editor role", time: "1 day ago", type: "user" },
    { action: "Modified site settings", time: "2 days ago", type: "settings" },
    { action: 'Created new category "Technology"', time: "3 days ago", type: "category" },
  ]

  const handleSave = () => {
    console.log("Profile saved:", profile)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Profile" />
                    <AvatarFallback>
                      {profile.firstName[0]}
                      {profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    <Shield className="mr-1 h-3 w-3" />
                    {profile.role}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span>Last login: {profile.lastLogin}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>Manage your password and security preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable 2FA</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <Button variant="outline" size="sm">
                        Configure 2FA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>Choose how you want to be notified about activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={profile.notifications.email}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            notifications: { ...profile.notifications, email: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                      </div>
                      <Switch
                        checked={profile.notifications.push}
                        onCheckedChange={(checked) =>
                          setProfile({
                            ...profile,
                            notifications: { ...profile.notifications, push: checked },
                          })
                        }
                      />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-medium">Activity Notifications</h4>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Comments</Label>
                          <p className="text-sm text-muted-foreground">When someone comments on a blog post</p>
                        </div>
                        <Switch
                          checked={profile.notifications.comments}
                          onCheckedChange={(checked) =>
                            setProfile({
                              ...profile,
                              notifications: { ...profile.notifications, comments: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>New Posts</Label>
                          <p className="text-sm text-muted-foreground">When a new blog post is published</p>
                        </div>
                        <Switch
                          checked={profile.notifications.newPosts}
                          onCheckedChange={(checked) =>
                            setProfile({
                              ...profile,
                              notifications: { ...profile.notifications, newPosts: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>User Registrations</Label>
                          <p className="text-sm text-muted-foreground">When new users register on the site</p>
                        </div>
                        <Switch
                          checked={profile.notifications.userRegistrations}
                          onCheckedChange={(checked) =>
                            setProfile({
                              ...profile,
                              notifications: { ...profile.notifications, userRegistrations: checked },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>Your recent actions and activity on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                          <div className="mt-1">
                            {activity.type === "post" && <Settings className="h-4 w-4 text-blue-500" />}
                            {activity.type === "comment" && <Mail className="h-4 w-4 text-green-500" />}
                            {activity.type === "user" && <User className="h-4 w-4 text-purple-500" />}
                            {activity.type === "settings" && <Settings className="h-4 w-4 text-orange-500" />}
                            {activity.type === "category" && <Settings className="h-4 w-4 text-red-500" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
